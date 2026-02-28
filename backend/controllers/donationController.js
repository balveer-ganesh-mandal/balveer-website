const Donation = require('../models/Donation');
const PDFDocument = require('pdfkit');
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

        // Create PDF
        const doc = new PDFDocument({ margin: 50 });
        const filename = `Receipt_${donation.transactionId}.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        // --- Header ---
        doc.fontSize(22).text('GANPATI MANDAL', { align: 'center' });
        doc.moveDown(0.5);

        // --- Divider line ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#8b0000');
        doc.moveDown(0.5);

        doc.fontSize(14).text('Donation Receipt', { align: 'center', underline: true });
        doc.moveDown(1.5);

        // --- Receipt Details ---
        doc.fontSize(11);
        doc.text(`Receipt No: ${donation.transactionId}`);

        const dateStr = new Date(donation.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        doc.text(`Date: ${dateStr}`);
        doc.moveDown();

        // --- Donor Info ---
        const displayName = donation.receiptName || `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        doc.text('Received with thanks from:');
        doc.font('Helvetica-Bold').fontSize(13).text(displayName);
        doc.font('Helvetica').fontSize(11);

        if (donation.address) {
            doc.text(`Address: ${donation.address}`);
        }
        if (donation.devotee.email) {
            doc.text(`Email: ${donation.devotee.email}`);
        }
        doc.moveDown();

        // --- Divider ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cccccc');
        doc.moveDown(0.5);

        // --- Amount ---
        doc.font('Helvetica-Bold').fontSize(15).text(`Donation Amount: ${donation.currency} ${donation.amount}`);
        doc.font('Helvetica').fontSize(11);
        doc.moveDown();

        doc.text(`Payment Method: ${donation.paymentMethod}`);
        if (donation.notes) {
            doc.text(`Notes: ${donation.notes}`);
        }

        doc.moveDown(3);

        // --- Divider ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cccccc');
        doc.moveDown(1);

        // --- Signatory ---
        doc.text('Authorized Signatory', { align: 'right' });
        doc.text('-------------------', { align: 'right' });

        doc.moveDown(2);
        doc.fontSize(9).fillColor('#888888').text('This is a computer-generated receipt.', { align: 'center' });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('Receipt Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server Error generating receipt' });
        }
    }
};
