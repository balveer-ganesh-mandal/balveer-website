"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Donate() {
    const { user, token, isAuthenticated, loading, API_URL } = useAuth();
    const router = useRouter();
    const { lang } = useLanguage();

    const [formData, setFormData] = useState({
        amount: '',
        currency: 'INR',
        paymentMethod: '',
        transactionId: '',
        receiptName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        district: '',
        state: '',
        notes: ''
    });

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];

    const maharashtraDistricts = [
        'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad (Chhatrapati Sambhajinagar)',
        'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli',
        'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur',
        'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar',
        'Nashik', 'Osmanabad (Dharashiv)', 'Palghar', 'Parbhani', 'Pune',
        'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur',
        'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ];

    // Placeholder bank details
    const bankDetails = {
        bankName: "YOUR BANK NAME",
        accountHolder: "BALVEER GANESH MANDAL",
        accountNumber: "XXXX XXXX XXXX XXXX",
        ifscCode: "XXXX0XXXXXX",
        branch: "YOUR BRANCH NAME",
        upiId: "yourupi@bank"
    };

    const content = {
        en: {
            title: 'Make a Donation',
            subtitle: 'Your contribution helps us organize better events, provide free medical equipment, and maintain the Mandal.',
            howToPay: 'How to Pay',
            scanQR: 'Scan QR Code',
            scanDesc: 'Open any UPI app (Google Pay, PhonePe, Paytm) and scan the QR code below to pay.',
            orUseUPI: 'Or use UPI ID:',
            bankTransfer: 'Bank Transfer Details',
            bankName: 'Bank Name',
            accountHolder: 'Account Holder',
            accountNumber: 'Account Number',
            ifsc: 'IFSC Code',
            branch: 'Branch',
            step2: 'Step 2: Fill Donation Details',
            step2Desc: 'After completing payment, fill in the details below with your transaction reference number.',
            selectAmount: 'Select Amount',
            currency: 'Currency',
            customAmount: 'Custom Amount',
            enterAmount: 'Enter amount',
            paymentMethod: 'Payment Method',
            selectPayment: 'Select Payment Method',
            upi: 'UPI (Google Pay, PhonePe, Paytm)',
            bankTransferOpt: 'Bank Transfer (NEFT/IMPS/RTGS)',
            transactionRef: 'Transaction / UTR Reference Number',
            transactionPlaceholder: 'Enter UTR or transaction ID from your payment',
            transactionHint: 'You will find this in your payment confirmation SMS or app.',
            notes: 'Message / Notes (Optional)',
            notesPlaceholder: 'E.g., In memory of...',
            receiptName: 'Name for Receipt',
            receiptNamePlaceholder: 'Enter name to print on receipt',
            receiptNameHint: 'This name will appear on the donation receipt PDF.',
            addressTitle: 'Address (for Receipt)',
            addressLine1: 'Address Line 1 (House/Flat No., Street)',
            addressLine2: 'Address Line 2 (Area, Landmark)',
            cityLabel: 'City / Town / Village',
            cityPlaceholder: 'e.g. Malkapur',
            districtLabel: 'District',
            selectDistrict: 'Select District',
            districtPlaceholder: 'Enter district',
            stateLabel: 'State',
            selectState: 'Select State',
            addressHint: 'Required. This address will appear on the donation receipt PDF.',
            loggedInAs: 'Logged in as:',
            processing: 'Submitting...',
            submit: 'Submit Donation Details',
            thankYou: 'Donation details submitted successfully!',
            receiptNote: '📋 Your donation receipt will be available for download in your Dashboard within 5-7 working days after manual verification by our team.',
            redirecting: 'Redirecting to your dashboard...',
            nameRequired: 'Please enter a name for the receipt.',
            addressRequired: 'Please fill in Address Line 1, City, District, and State.',
            paymentRequired: 'Please select a payment method.',
            transactionRequired: 'Please enter the transaction/UTR reference number.',
            invalidAmount: 'Please enter a valid donation amount.',
            errorProcessing: 'Error processing donation.',
            serverError: 'An error occurred while connecting to the server.',
            loadingText: 'Loading...',
            receiptDisclaimer: '⏳ Note: Your donation receipt will be available within 5-7 working days after our team verifies your payment.',
        },
        mr: {
            title: 'दान करा',
            subtitle: 'तुमच्या योगदानामुळे आम्हाला चांगले कार्यक्रम आयोजित करण्यास, मोफत वैद्यकीय उपकरणे देण्यास आणि मंडळाची देखभाल करण्यास मदत होते.',
            howToPay: 'पेमेंट कसे करावे',
            scanQR: 'QR कोड स्कॅन करा',
            scanDesc: 'कोणतेही UPI ॲप (Google Pay, PhonePe, Paytm) उघडा आणि पेमेंट करण्यासाठी खालील QR कोड स्कॅन करा.',
            orUseUPI: 'किंवा UPI ID वापरा:',
            bankTransfer: 'बँक हस्तांतरण तपशील',
            bankName: 'बँकेचे नाव',
            accountHolder: 'खातेधारक',
            accountNumber: 'खाते क्रमांक',
            ifsc: 'IFSC कोड',
            branch: 'शाखा',
            step2: 'चरण २: दान तपशील भरा',
            step2Desc: 'पेमेंट पूर्ण केल्यानंतर, खालील तपशील तुमच्या ट्रॅन्झॅक्शन संदर्भ क्रमांकासह भरा.',
            selectAmount: 'रक्कम निवडा',
            currency: 'चलन',
            customAmount: 'इच्छित रक्कम',
            enterAmount: 'रक्कम टाका',
            paymentMethod: 'पेमेंट पद्धत',
            selectPayment: 'पेमंट पद्धत निवडा',
            upi: 'UPI (Google Pay, PhonePe, Paytm)',
            bankTransferOpt: 'बँक ट्रान्सफर (NEFT/IMPS/RTGS)',
            transactionRef: 'ट्रॅन्झॅक्शन / UTR संदर्भ क्रमांक',
            transactionPlaceholder: 'तुमच्या पेमेंटमधील UTR किंवा ट्रॅन्झॅक्शन आयडी टाका',
            transactionHint: 'हे तुमच्या पेमेंट कन्फर्मेशन SMS किंवा ॲपमध्ये मिळेल.',
            notes: 'संदेश / टीप (ऐच्छिक)',
            notesPlaceholder: 'उदा., स्मरणार्थ...',
            receiptName: 'पावतीवरील नाव',
            receiptNamePlaceholder: 'पावतीवर छापण्यासाठी नाव टाका',
            receiptNameHint: 'हे नाव दान पावती PDF वर दिसेल.',
            addressTitle: 'पत्ता (पावतीसाठी)',
            addressLine1: 'पत्ता ओळ १ (घर/फ्लॅट क्र., रस्ता)',
            addressLine2: 'पत्ता ओळ २ (परिसर, जवळचे ठिकाण)',
            cityLabel: 'शहर / गाव',
            cityPlaceholder: 'उदा. मलकापूर',
            districtLabel: 'जिल्हा',
            selectDistrict: 'जिल्हा निवडा',
            districtPlaceholder: 'जिल्हा टाका',
            stateLabel: 'राज्य',
            selectState: 'राज्य निवडा',
            addressHint: 'आवश्यक. हा पत्ता दान पावती PDF वर दिसेल.',
            loggedInAs: 'लॉग इन:',
            processing: 'सबमिट होत आहे...',
            submit: 'दान तपशील सबमिट करा',
            thankYou: 'दान तपशील यशस्वीरित्या सबमिट झाले!',
            receiptNote: '📋 तुमची दान पावती आमच्या टीमच्या मॅन्युअल पडताळणीनंतर ५-७ कामकाजाच्या दिवसांत तुमच्या डॅशबोर्डवर डाउनलोडसाठी उपलब्ध होईल.',
            redirecting: 'तुमच्या डॅशबोर्डवर पुनर्निर्देशित करत आहे...',
            nameRequired: 'कृपया पावतीसाठी नाव टाका.',
            addressRequired: 'कृपया पत्ता ओळ १, शहर, जिल्हा आणि राज्य भरा.',
            paymentRequired: 'कृपया पेमेंट पद्धत निवडा.',
            transactionRequired: 'कृपया ट्रॅन्झॅक्शन/UTR संदर्भ क्रमांक टाका.',
            invalidAmount: 'कृपया वैध दान रक्कम टाका.',
            errorProcessing: 'दान प्रक्रियेत त्रुटी.',
            serverError: 'सर्व्हरशी कनेक्ट करताना त्रुटी आली.',
            loadingText: 'लोड करत आहे...',
            receiptDisclaimer: '⏳ सूचना: तुमची दान पावती आमच्या टीमने पेमेंट पडताळणी केल्यानंतर ५-७ कामकाजाच्या दिवसांत उपलब्ध होईल.',
        }
    };

    const t = content[lang];

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=donate');
        }
        if (user && !formData.receiptName) {
            setFormData(prev => ({ ...prev, receiptName: `${user.firstName || ''} ${user.lastName || ''}`.trim() }));
        }
    }, [isAuthenticated, loading, router, user]);

    const handleChange = (e) => {
        if (e.target.name === 'state') {
            setFormData({ ...formData, state: e.target.value, district: '' });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleQuickAmount = (amount) => {
        setFormData({ ...formData, amount: amount.toString() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            setError(t.invalidAmount);
            return;
        }

        if (!formData.paymentMethod) {
            setError(t.paymentRequired);
            return;
        }

        if (!formData.transactionId.trim()) {
            setError(t.transactionRequired);
            return;
        }

        if (!formData.receiptName.trim()) {
            setError(t.nameRequired);
            return;
        }

        if (!formData.addressLine1.trim() || !formData.city.trim() || !formData.district.trim() || !formData.state) {
            setError(t.addressRequired);
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/api/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(formData.amount),
                    currency: formData.currency,
                    paymentMethod: formData.paymentMethod,
                    transactionId: formData.transactionId.trim(),
                    receiptName: formData.receiptName,
                    address: [formData.addressLine1, formData.addressLine2, formData.city, formData.district, formData.state].filter(Boolean).join(', '),
                    notes: formData.notes
                })
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMessage(t.thankYou);
                setFormData({ ...formData, amount: '', notes: '', transactionId: '' });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 4000);
            } else {
                setError(data.message || t.errorProcessing);
            }
        } catch (err) {
            setError(t.serverError);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">{t.loadingText}</div>;
    }

    const inputClass = "block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#be1111] focus:ring-[#be1111] sm:text-sm p-3 border bg-gray-50 focus:bg-white transition-colors text-gray-800";
    const labelClass = "block text-sm font-semibold text-[#8b0000] mb-1.5";

    return (
        <div className="min-h-screen bg-[#fff8f0] py-12 px-4 sm:px-6 lg:px-8 pt-28">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-[#be1111] mb-3">
                        {t.title}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Receipt Disclaimer Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center shadow-sm">
                    <p className="text-amber-800 font-medium text-sm">{t.receiptDisclaimer}</p>
                </div>

                {/* STEP 1: Payment Details */}
                <div className="bg-white rounded-2xl shadow-lg border border-[#fceabb]/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#be1111] to-[#8b0000] px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                            {t.howToPay}
                        </h2>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* UPI QR Code */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-[#8b0000] mb-3">{t.scanQR}</h3>
                                <p className="text-gray-600 text-sm mb-4">{t.scanDesc}</p>
                                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 inline-block mx-auto">
                                    {/* Placeholder QR Code */}
                                    <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-inner">
                                        <div className="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                                <rect x="14" y="14" width="3" height="3" />
                                                <rect x="18" y="18" width="3" height="3" />
                                                <rect x="14" y="18" width="3" height="3" />
                                                <rect x="18" y="14" width="3" height="3" />
                                            </svg>
                                            <span className="text-xs text-gray-400 font-medium">QR Code Placeholder</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-500">{t.orUseUPI}</p>
                                <p className="font-mono text-[#be1111] font-bold bg-red-50 inline-block px-4 py-2 rounded-lg border border-red-100 mt-1">
                                    {bankDetails.upiId}
                                </p>
                            </div>

                            {/* Bank Details */}
                            <div>
                                <h3 className="text-lg font-bold text-[#8b0000] mb-3">{t.bankTransfer}</h3>
                                <div className="space-y-3 bg-gradient-to-br from-[#fff8f0] to-[#fceabb]/20 rounded-xl p-5 border border-[#fceabb]/50">
                                    {[
                                        { label: t.bankName, value: bankDetails.bankName },
                                        { label: t.accountHolder, value: bankDetails.accountHolder },
                                        { label: t.accountNumber, value: bankDetails.accountNumber },
                                        { label: t.ifsc, value: bankDetails.ifscCode },
                                        { label: t.branch, value: bankDetails.branch },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-start py-2 border-b border-[#fceabb]/40 last:border-0">
                                            <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                                            <span className="text-sm font-bold text-[#4a0808] text-right font-mono">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {successMessage ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-sm">
                        <div className="text-5xl mb-3">✅</div>
                        <p className="text-green-800 font-bold text-xl mb-2">{successMessage}</p>
                        <p className="text-green-700 text-sm mb-4">{t.receiptNote}</p>
                        <p className="text-sm text-green-600">{t.redirecting}</p>
                    </div>
                ) : (
                    /* STEP 2: Donation Form */
                    <div className="bg-white rounded-2xl shadow-lg border border-[#fceabb]/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#be1111] to-[#8b0000] px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                                {t.step2}
                            </h2>
                            <p className="text-red-100 text-sm mt-1">{t.step2Desc}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                            {/* Quick Amounts */}
                            <div>
                                <label className={labelClass}>{t.selectAmount} <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {[101, 501, 1001, 2100, 5100].map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => handleQuickAmount(amt)}
                                            className={`py-2.5 px-4 border-2 rounded-xl text-sm font-bold transition-all
                                                ${formData.amount === amt.toString()
                                                    ? 'bg-[#be1111] text-white border-[#be1111] shadow-md shadow-red-900/20'
                                                    : 'bg-white text-[#8b0000] border-[#fceabb] hover:bg-[#fff8f0] hover:border-[#be1111]/30'}`}
                                        >
                                            ₹{amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Amount */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className={labelClass}>{t.currency}</label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="INR">₹ (INR)</option>
                                        <option value="USD">USD ($)</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className={labelClass}>{t.customAmount} <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="amount"
                                        min="1"
                                        required
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder={t.enterAmount}
                                    />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className={labelClass}>{t.paymentMethod} <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'UPI', label: t.upi, icon: '📱' },
                                        { value: 'Bank Transfer', label: t.bankTransferOpt, icon: '🏦' },
                                    ].map((method) => (
                                        <button
                                            key={method.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                                            className={`p-4 border-2 rounded-xl text-left transition-all flex items-start gap-3 ${formData.paymentMethod === method.value
                                                ? 'bg-red-50 border-[#be1111] shadow-md'
                                                : 'bg-white border-gray-200 hover:border-[#fceabb]'
                                                }`}
                                        >
                                            <span className="text-2xl">{method.icon}</span>
                                            <span className={`text-sm font-semibold ${formData.paymentMethod === method.value ? 'text-[#be1111]' : 'text-gray-700'}`}>
                                                {method.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Transaction Reference */}
                            <div>
                                <label className={labelClass}>{t.transactionRef} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="transactionId"
                                    required
                                    value={formData.transactionId}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder={t.transactionPlaceholder}
                                />
                                <p className="mt-1 text-xs text-gray-500">{t.transactionHint}</p>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className={labelClass}>{t.notes}</label>
                                <textarea
                                    name="notes"
                                    rows="2"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder={t.notesPlaceholder}
                                ></textarea>
                            </div>

                            {/* Name for Receipt */}
                            <div>
                                <label className={labelClass}>{t.receiptName} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="receiptName"
                                    required
                                    value={formData.receiptName}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder={t.receiptNamePlaceholder}
                                />
                                <p className="mt-1 text-xs text-gray-500">{t.receiptNameHint}</p>
                            </div>

                            {/* Address for Receipt */}
                            <div className="space-y-4">
                                <label className={labelClass}>{t.addressTitle} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    required
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder={t.addressLine1}
                                />
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder={t.addressLine2}
                                />
                                {/* State */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.stateLabel} <span className="text-red-500">*</span></label>
                                    <select
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">{t.selectState}</option>
                                        {indianStates.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* District */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.districtLabel} <span className="text-red-500">*</span></label>
                                    {formData.state === 'Maharashtra' ? (
                                        <select
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="">{t.selectDistrict}</option>
                                            {maharashtraDistricts.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder={t.districtPlaceholder}
                                        />
                                    )}
                                </div>

                                {/* City / Town / Village */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.cityLabel} <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder={t.cityPlaceholder}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">{t.addressHint}</p>
                            </div>

                            {/* Devotee Info Display */}
                            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 border border-gray-200">
                                {t.loggedInAs} <strong>{user?.firstName} {user?.lastName}</strong>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-[#be1111] to-[#8b0000] hover:shadow-red-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                            >
                                {submitting ? t.processing : `${t.submit}`}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
