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

        // Register Devanagari font for Marathi support
        const devanagariFont = path.join(__dirname, '..', 'fonts', 'NotoSansDevanagari.ttf');
        const hasDevanagari = fs.existsSync(devanagariFont);

        // Create PDF
        const doc = new PDFDocument({ margin: 50 });
        const filename = `Receipt_${donation.transactionId}.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        if (hasDevanagari) {
            doc.registerFont('Devanagari', devanagariFont);
            doc.registerFont('DevanagariB', devanagariFont);
        }

        const useFont = (type) => {
            if (type === 'mr') {
                doc.font(hasDevanagari ? 'Devanagari' : 'Helvetica');
            } else if (type === 'bold') {
                doc.font(hasDevanagari ? 'DevanagariB' : 'Helvetica-Bold');
            } else {
                doc.font('Helvetica');
            }
        };

        // --- Header ---
        useFont('en');
        doc.fontSize(22).text('GANPATI MANDAL', { align: 'center' });
        if (hasDevanagari) {
            useFont('mr');
            doc.fontSize(18).text('गणपती मंडळ', { align: 'center' });
        }

        doc.moveDown(0.5);

        // --- Divider line ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#8b0000');
        doc.moveDown(0.5);

        // --- Title ---
        useFont('en');
        doc.fontSize(14).text('Donation Receipt', { align: 'center' });
        if (hasDevanagari) {
            useFont('mr');
            doc.fontSize(13).text('दान पावती', { align: 'center' });
        }
        doc.moveDown(1.5);

        // --- Receipt Details ---
        useFont('en');
        doc.fontSize(11);
        doc.text(`Receipt No / पावती क्र.: ${donation.transactionId}`);

        const dateEn = new Date(donation.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        const dateMr = new Date(donation.date).toLocaleDateString('mr-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        doc.text(`Date / दिनांक: ${dateEn} (${dateMr})`);
        doc.moveDown();

        // --- Donor Info ---
        const displayName = donation.receiptName || `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        useFont('en');
        doc.text(`Received with thanks from / यांच्याकडून सधन्यवाद प्राप्त:`);
        useFont('bold');
        doc.fontSize(13).text(displayName);
        useFont('en');
        doc.fontSize(11);

        if (donation.address) {
            doc.text(`Address / पत्ता: ${donation.address}`);
        }
        if (donation.devotee.email) {
            doc.text(`Email / ई-मेल: ${donation.devotee.email}`);
        }
        doc.moveDown();

        // --- Divider ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cccccc');
        doc.moveDown(0.5);

        // --- Amount ---
        useFont('bold');
        doc.fontSize(15).text(`Donation Amount / दान रक्कम: ${donation.currency} ${donation.amount}`);
        useFont('en');
        doc.fontSize(11);
        doc.moveDown();

        doc.text(`Payment Method / पेमेंट पद्धत: ${donation.paymentMethod}`);
        if (donation.notes) {
            doc.text(`Notes / टीप: ${donation.notes}`);
        }

        doc.moveDown(3);

        // --- Divider ---
        doc.moveTo(50, doc.y).lineTo(560, doc.y).stroke('#cccccc');
        doc.moveDown(1);

        // --- Signatory ---
        useFont('en');
        doc.text('Authorized Signatory / अधिकृत स्वाक्षरी', { align: 'right' });
        doc.text('-------------------', { align: 'right' });

        doc.moveDown(2);
        doc.fontSize(9).fillColor('#888888').text('This is a computer-generated receipt. / ही संगणक-निर्मित पावती आहे.', { align: 'center' });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('Receipt Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server Error generating receipt' });
        }
    }
};
