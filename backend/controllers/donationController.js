const Donation = require('../models/Donation');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = async (req, res) => {
    try {
        const { amount, currency, paymentMethod, notes, receiptName, address, transactionId } = req.body;

        if (!amount || !paymentMethod || !receiptName || !address || !transactionId) {
            return res.status(400).json({ success: false, message: 'Amount, payment method, name, address, and transaction reference are required' });
        }

        const donation = await Donation.create({
            devotee: req.user.id,
            amount,
            currency: currency || 'INR',
            paymentMethod,
            transactionId,
            receiptName: receiptName || '',
            address: address || '',
            notes,
            status: 'pending'
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

        // Handle missing devotee gracefully (mock test users or deleted users)
        const devoteeId = donation.devotee ? donation.devotee._id.toString() : null;

        // Make sure user owns the donation (or is admin)
        if (devoteeId && devoteeId !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to view this receipt' });
        }

        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const safeTransactionId = donation.transactionId || `LEGACY_${donation._id.toString().substring(0, 6).toUpperCase()}`;
        const filename = `Receipt_${safeTransactionId}.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        // Register fonts for header only
        const fontsDir = path.join(__dirname, '..', 'fonts');
        const yatraFont = path.join(fontsDir, 'YatraOne-Regular.ttf');
        const muktaFont = path.join(fontsDir, 'Mukta-Regular.ttf');

        if (fs.existsSync(yatraFont)) doc.registerFont('YatraOne', yatraFont);
        if (fs.existsSync(muktaFont)) doc.registerFont('Mukta', muktaFont);

        const hasYatra = fs.existsSync(yatraFont);
        const hasMukta = fs.existsSync(muktaFont);

        const pageWidth = doc.page.width;
        const marginLeft = 50;
        const marginRight = pageWidth - 50;
        const contentWidth = marginRight - marginLeft;

        // === HEADER BAR (maroon background) ===
        doc.rect(0, 0, pageWidth, 155).fill('#8b0000');
        doc.fillColor('#fceabb');

        // Add logos
        const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
        const cpgPath = path.join(__dirname, '..', 'public', 'cpg.png');
        const logoSize = 90;
        const logoY = 8;

        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, marginLeft, logoY, { fit: [logoSize, logoSize], align: 'center', valign: 'center' });
        }
        if (fs.existsSync(cpgPath)) {
            doc.image(cpgPath, marginRight - logoSize, logoY, { fit: [logoSize, logoSize], align: 'center', valign: 'center' });
        }

        // Center text between logos
        const textLeft = marginLeft + logoSize + 10;
        const textWidth = contentWidth - (logoSize + 10) * 2;

        // English name (Yatra One)
        if (hasYatra) doc.font('YatraOne');
        doc.fillColor('#fceabb').fontSize(15).text('Balveer Ganesh Mandal', textLeft, 14, { align: 'center', width: textWidth });
        doc.fontSize(10).text('(Chandicha Pawan Ganpati)', textLeft, 32, { align: 'center', width: textWidth });

        // English address (Helvetica)
        doc.font('Helvetica').fontSize(8);
        doc.text('Address: Kalipura, Malkapur, Dist. Buldhana - 443101', textLeft, 48, { align: 'center', width: textWidth });

        // Marathi name (Yatra One or Mukta)
        if (hasYatra) doc.font('YatraOne');
        else if (hasMukta) doc.font('Mukta');
        doc.fillColor('#fceabb').fontSize(13);
        doc.text('\u092C\u093E\u0932\u0935\u0940\u0930 \u0917\u0923\u0947\u0936 \u092E\u0902\u0921\u0933 (\u091A\u093E\u0902\u0926\u0940\u091A\u093E \u092A\u093E\u0935\u0928 \u0917\u0923\u092A\u0924\u0940)', textLeft, 68, { align: 'center', width: textWidth });

        // Marathi address (Mukta)
        if (hasMukta) doc.font('Mukta');
        doc.fontSize(8);
        doc.text('\u092A\u0924\u094D\u0924\u093E : \u0915\u093E\u0933\u0940\u092A\u0941\u0930\u093E, \u092E\u0932\u0915\u093E\u092A\u0942\u0930, \u091C\u093F. \u092C\u0941\u0932\u0922\u093E\u0923\u093E - \u096A\u096A\u0969\u0967\u0966\u0967', textLeft, 90, { align: 'center', width: textWidth });

        // Established line - use Mukta for entire line to keep alignment
        if (hasMukta) doc.font('Mukta');
        doc.fillColor('#fceabb').fontSize(9);
        doc.text('Established: 1924  |  \u0938\u094D\u0925\u093E\u092A\u0928\u093E : \u0967\u096F\u0968\u096A', textLeft, 110, { align: 'center', width: textWidth });

        // Gold accent line
        doc.rect(0, 155, pageWidth, 4).fill('#d4af37');

        // Reset to Helvetica for body
        doc.font('Helvetica');

        // === RECEIPT TITLE ===
        doc.fillColor('#8b0000');
        doc.fontSize(16).text('DONATION RECEIPT', marginLeft, 170, { align: 'center', width: contentWidth });

        // Thin line under title
        doc.moveTo(marginLeft + 150, 190).lineTo(marginRight - 150, 190).lineWidth(1).stroke('#d4af37');

        // === RECEIPT INFO ===
        let y = 205;
        doc.font('Helvetica');
        doc.fillColor('#666666').fontSize(10);
        doc.text('Receipt No:', marginLeft, y);
        doc.fillColor('#333333').fontSize(11);
        doc.text(safeTransactionId, marginLeft + 120, y);

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

        let baseName = 'Anonymous Donor';
        if (donation.devotee) {
            baseName = `${donation.devotee.firstName} ${donation.devotee.lastName}`;
        }
        const displayName = donation.receiptName || baseName;
        
        doc.fillColor('#4a0808').fontSize(14);
        doc.font('Helvetica-Bold').text(displayName, marginLeft + 15, y + 25);
        doc.font('Helvetica');

        let infoY = y + 45;
        if (donation.address) {
            doc.fillColor('#555555').fontSize(10);
            doc.text('Address: ' + donation.address, marginLeft + 15, infoY, { width: contentWidth - 30 });
            infoY += 15;
        }
        if (donation.devotee && donation.devotee.email) {
            doc.fillColor('#555555').fontSize(10);
            doc.text('Email: ' + donation.devotee.email, marginLeft + 15, infoY);
        }

        // === AMOUNT BOX (maroon) ===
        y += 100;
        doc.rect(marginLeft, y, contentWidth, 50).fill('#8b0000');
        doc.fillColor('#fceabb').fontSize(11);
        doc.font('Helvetica');
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
        doc.text(donation.paymentMethod || 'Online Payment', marginLeft + 120, y);

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

        // === SIGNATORIES ===
        y += 30;

        // Register signature font
        const signatureFont = path.join(fontsDir, 'AlexBrush-Regular.ttf');
        const hasSignatureFont = fs.existsSync(signatureFont);
        if (hasSignatureFont) doc.registerFont('AlexBrush', signatureFont);

        const signatories = [
            { name: 'Swapnil D. Deshpande', title: 'President' },
            { name: 'Nilesh N. Pimparkar', title: 'Vice President' },
            { name: 'Chinmay C. Deshpande', title: 'Treasurer' },
        ];

        const sigWidth = contentWidth / 3;
        signatories.forEach((sig, i) => {
            const sigX = marginLeft + (i * sigWidth);

            // Signature in cursive font
            if (hasSignatureFont) doc.font('AlexBrush');
            doc.fillColor('#1a1a1a').fontSize(13);
            doc.text(sig.name, sigX, y, { width: sigWidth, align: 'center' });

            // Line under signature
            const lineStart = sigX + 15;
            const lineEnd = sigX + sigWidth - 15;
            doc.moveTo(lineStart, y + 22).lineTo(lineEnd, y + 22).lineWidth(0.5).stroke('#999999');

            // Designation
            doc.font('Helvetica').fillColor('#888888').fontSize(8);
            doc.text(sig.title, sigX, y + 26, { width: sigWidth, align: 'center' });
        });

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

// @desc    Get ALL donations (admin)
// @route   GET /api/donations/all
// @access  Admin
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate('devotee', 'firstName lastName email')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        console.error('Get All Donations Error:', error);
        res.status(500).json({ success: false, message: 'Server Error fetching donations' });
    }
};

// @desc    Upload receipt for a donation (admin)
// @route   PUT /api/donations/:id/upload-receipt
// @access  Admin
exports.uploadReceipt = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }

        // Mark receipt as generated and set status to completed
        donation.receiptGenerated = true;
        donation.status = 'completed';
        await donation.save();

        res.status(200).json({
            success: true,
            data: donation
        });
    } catch (error) {
        console.error('Upload Receipt Error:', error);
        res.status(500).json({ success: false, message: 'Server Error uploading receipt' });
    }
};
