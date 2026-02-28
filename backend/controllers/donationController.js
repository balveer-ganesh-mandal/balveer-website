const Donation = require('../models/Donation');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = async (req, res) => {
    try {
        const { amount, currency, paymentMethod, notes, receiptName, address } = req.body;

        if (!amount || !paymentMethod || !receiptName || !address) {
            return res.status(400).json({ success: false, message: 'Amount, payment method, name, and address are required' });
        }

        // Mock a transaction ID for now since we aren't using a real payment gateway yet
        const transactionId = `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        const donation = await Donation.create({
            devotee: req.user.id,
            amount,
            currency: currency || 'INR',
            paymentMethod,
            transactionId,
            receiptName: receiptName || '',
            address: address || '',
            notes,
            status: 'completed' // Assuming immediate success for mock
        });

        res.status(201).json({
            success: true,
            data: donation
        });
    } catch (error) {
        console.error('Create Donation Error:', error);
        res.status(500).json({ success: false, message: 'Server Error creating donation' });
    }
};

// @desc    Get logged in user's donations
// @route   GET /api/donations/my-donations
// @access  Private
exports.getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ devotee: req.user.id }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        console.error('Get Donations Error:', error);
        res.status(500).json({ success: false, message: 'Server Error fetching donations' });
    }
};

// @desc    Generate and download PDF Receipt
// @route   GET /api/donations/:id/receipt
// @access  Private
exports.downloadReceipt = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate('devotee', 'firstName lastName email');

        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }

        // Make sure user owns the donation (or is admin)
        if (donation.devotee._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to view this receipt' });
        }

        // Read the HTML template
        const templatePath = path.join(__dirname, '..', 'templates', 'receipt.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        // Prepare data
        const displayName = donation.receiptName || `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        const dateStr = new Date(donation.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

        // Replace placeholders
        html = html.replace(/\{\{transactionId\}\}/g, donation.transactionId);
        html = html.replace(/\{\{date\}\}/g, dateStr);
        html = html.replace(/\{\{donorName\}\}/g, displayName);
        html = html.replace(/\{\{amount\}\}/g, donation.amount.toLocaleString('en-IN'));
        html = html.replace(/\{\{currency\}\}/g, donation.currency === 'INR' ? '₹' : donation.currency);
        html = html.replace(/\{\{paymentMethod\}\}/g, donation.paymentMethod);
        html = html.replace(/\{\{year\}\}/g, new Date().getFullYear().toString());

        // Handle conditional blocks - address
        if (donation.address) {
            html = html.replace(/\{\{#if address\}\}/g, '').replace(/\{\{\/if\}\}/g, '');
            html = html.replace(/\{\{address\}\}/g, donation.address);
        } else {
            html = html.replace(/\{\{#if address\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        // Handle conditional blocks - email
        if (donation.devotee.email) {
            html = html.replace(/\{\{#if email\}\}/g, '').replace(/\{\{\/if\}\}/g, '');
            html = html.replace(/\{\{email\}\}/g, donation.devotee.email);
        } else {
            html = html.replace(/\{\{#if email\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        // Handle conditional blocks - notes
        if (donation.notes) {
            html = html.replace(/\{\{#if notes\}\}/g, '').replace(/\{\{\/if\}\}/g, '');
            html = html.replace(/\{\{notes\}\}/g, donation.notes);
        } else {
            html = html.replace(/\{\{#if notes\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        // Launch puppeteer and generate PDF
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });

        await browser.close();

        // Send the PDF
        const filename = `Receipt_${donation.transactionId}.pdf`;
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.end(pdfBuffer);

    } catch (error) {
        console.error('Receipt Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server Error generating receipt' });
        }
    }
};
