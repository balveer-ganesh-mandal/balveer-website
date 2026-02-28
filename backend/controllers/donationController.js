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

        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const filename = `Receipt_${donation.transactionId}.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        // Register Devanagari font for Marathi
        const devanagariFont = path.join(__dirname, '..', 'fonts', 'NotoSansDevanagari.ttf');
        if (fs.existsSync(devanagariFont)) {
            doc.registerFont('Devanagari', devanagariFont);
        }

        const pageWidth = doc.page.width;
        const marginLeft = 50;
        const marginRight = pageWidth - 50;
        const contentWidth = marginRight - marginLeft;

        // === HEADER BAR (maroon background) ===
        doc.rect(0, 0, pageWidth, 120).fill('#8b0000');

        // Header text - English
        doc.fillColor('#fceabb');
        doc.fontSize(24).text('Balveer Ganesh Mandal', marginLeft, 18, { align: 'center', width: contentWidth });

        // Header text - Marathi
        if (fs.existsSync(devanagariFont)) {
            doc.font('Devanagari').fontSize(18).text('\u092C\u093E\u0932\u0935\u0940\u0930 \u0917\u0923\u0947\u0936 \u092E\u0902\u0921\u0933', marginLeft, 48, { align: 'center', width: contentWidth });
            doc.font('Helvetica');
        }

        doc.fillColor('#fceabb');
        doc.fontSize(10).text('Chandicha Pawan Ganpati | Est. 1924 | Malkapur', marginLeft, 72, { align: 'center', width: contentWidth });

        // Gold accent line
        doc.rect(0, 120, pageWidth, 4).fill('#d4af37');

        // === RECEIPT TITLE ===
        doc.fillColor('#8b0000');
        doc.fontSize(18).text('DONATION RECEIPT', marginLeft, 140, { align: 'center', width: contentWidth });

        // Thin line under title
        doc.moveTo(marginLeft + 150, 165).lineTo(marginRight - 150, 165).lineWidth(1).stroke('#d4af37');

        // === RECEIPT INFO ===
        let y = 185;
        doc.fillColor('#666666').fontSize(10);
        doc.text('Receipt No:', marginLeft, y);
        doc.fillColor('#333333').fontSize(11);
        doc.text(donation.transactionId, marginLeft + 120, y);

        y += 20;
        const dateStr = new Date(donation.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        doc.fillColor('#666666').fontSize(10);
        doc.text('Date:', marginLeft, y);
        doc.fillColor('#333333').fontSize(11);
        doc.text(dateStr, marginLeft + 120, y);

        // === DIVIDER ===
        y += 30;
        doc.moveTo(marginLeft, y).lineTo(marginRight, y).lineWidth(0.5).stroke('#e0e0e0');

        // === DONOR INFO BOX ===
        y += 15;
        doc.rect(marginLeft, y, contentWidth, 80).lineWidth(1).stroke('#e8d5a3');
        doc.rect(marginLeft, y, contentWidth, 80).fill('#faf7f0');

        doc.fillColor('#999999').fontSize(9);
        doc.text('RECEIVED WITH THANKS FROM', marginLeft + 15, y + 10);

        const displayName = donation.receiptName || `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        doc.fillColor('#4a0808').fontSize(16);
        doc.font('Helvetica-Bold').text(displayName, marginLeft + 15, y + 25);
        doc.font('Helvetica');

        let infoY = y + 48;
        if (donation.address) {
            doc.fillColor('#555555').fontSize(10);
            doc.text('Address: ' + donation.address, marginLeft + 15, infoY, { width: contentWidth - 30 });
            infoY += 15;
        }
        if (donation.devotee.email) {
            doc.fillColor('#555555').fontSize(10);
            doc.text('Email: ' + donation.devotee.email, marginLeft + 15, infoY);
        }

        // === AMOUNT BOX (maroon) ===
        y += 100;
        doc.rect(marginLeft, y, contentWidth, 50).fill('#8b0000');
        doc.fillColor('#fceabb').fontSize(11);
        doc.text('Donation Amount', marginLeft + 20, y + 10);

        const currencySymbol = donation.currency === 'INR' ? 'Rs.' : donation.currency;
        doc.fillColor('#fceabb').fontSize(22);
        doc.font('Helvetica-Bold').text(`${currencySymbol} ${donation.amount.toLocaleString('en-IN')}`, marginLeft + 20, y + 15, { align: 'right', width: contentWidth - 40 });
        doc.font('Helvetica');

        // === PAYMENT DETAILS ===
        y += 70;
        doc.fillColor('#666666').fontSize(10);
        doc.text('Payment Method:', marginLeft, y);
        doc.fillColor('#333333').fontSize(11);
        doc.text(donation.paymentMethod, marginLeft + 120, y);

        y += 20;
        doc.fillColor('#666666').fontSize(10);
        doc.text('Status:', marginLeft, y);
        doc.fillColor('#2e7d32').fontSize(11);
        doc.text('Completed', marginLeft + 120, y);

        if (donation.notes) {
            y += 20;
            doc.fillColor('#666666').fontSize(10);
            doc.text('Notes:', marginLeft, y);
            doc.fillColor('#333333').fontSize(11);
            doc.text(donation.notes, marginLeft + 120, y, { width: contentWidth - 120 });
        }

        // === DIVIDER ===
        y += 40;
        doc.moveTo(marginLeft, y).lineTo(marginRight, y).lineWidth(0.5).stroke('#e0e0e0');

        // === SIGNATORY ===
        y += 30;
        doc.moveTo(marginRight - 180, y + 20).lineTo(marginRight, y + 20).lineWidth(0.5).stroke('#999999');
        doc.fillColor('#888888').fontSize(9);
        doc.text('Authorized Signatory', marginRight - 180, y + 25, { width: 180, align: 'center' });

        // === FOOTER ===
        y += 70;
        doc.moveTo(marginLeft, y).lineTo(marginRight, y).lineWidth(0.5).stroke('#e8d5a3');
        y += 10;
        doc.fillColor('#aaaaaa').fontSize(8);
        doc.text('This is a computer-generated receipt and does not require a physical signature.', marginLeft, y, { align: 'center', width: contentWidth });
        doc.text(`© ${new Date().getFullYear()} Balveer Ganesh Mandal (Chandicha Pawan Ganpati), Malkapur`, marginLeft, y + 12, { align: 'center', width: contentWidth });

        doc.end();

    } catch (error) {
        console.error('Receipt Generation Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server Error generating receipt' });
        }
    }
};
