const Donation = require('../models/Donation');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = async (req, res) => {
    try {
        const { amount, currency, paymentMethod, notes, receiptName } = req.body;

        if (!amount || !paymentMethod) {
            return res.status(400).json({ success: false, message: 'Amount and payment method are required' });
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

        // Create PDF
        const doc = new PDFDocument({ margin: 50 });
        const filename = `Receipt_${donation.transactionId}.pdf`;

        // Setting response headers so the browser downloads the PDF instead of opening it inline
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF directly to the Express response
        doc.pipe(res);

        // --- Build Receipt Design ---
        doc.fontSize(20).text('GANPATI MANDAL', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text('Donation Receipt', { align: 'center', underline: true });
        doc.moveDown(2);

        doc.fontSize(12).text(`Receipt No: ${donation.transactionId}`);
        doc.text(`Date: ${new Date(donation.date).toLocaleDateString()}`);
        doc.moveDown();

        const displayName = donation.receiptName || `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        doc.text(`Received with thanks from: ${displayName}`);
        if (donation.devotee.email) {
            doc.text(`Email: ${donation.devotee.email}`);
        }
        doc.moveDown();

        doc.font('Helvetica-Bold').fontSize(14).text(`Donation Amount: ${donation.currency} ${donation.amount}`, {
            background: '#eeeeee'
        });
        doc.font('Helvetica').fontSize(12);

        doc.moveDown();
        doc.text(`Payment Method: ${donation.paymentMethod}`);
        if (donation.notes) {
            doc.text(`Notes: ${donation.notes}`);
        }

        doc.moveDown(4);
        doc.text('Authorized Signatory', { align: 'right' });
        doc.text('-------------------', { align: 'right' });

        // Finalize PDF and end response
        doc.end();

    } catch (error) {
        console.error('Receipt Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server Error generating receipt' });
        }
    }
};
