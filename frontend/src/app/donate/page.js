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
        paymentMethod: 'Credit Card',
        receiptName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
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

    const content = {
        en: {
            title: 'Make a Donation',
            subtitle: 'Your contribution helps us organize better events and maintain the Mandal.',
            selectAmount: 'Select Amount',
            currency: 'Currency',
            customAmount: 'Custom Amount',
            enterAmount: 'Enter amount',
            paymentMethod: 'Payment Method',
            creditCard: 'Credit Card',
            debitCard: 'Debit Card',
            upi: 'UPI',
            netBanking: 'Net Banking',
            mockPayment: 'Mock Testing Payment',
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
            stateLabel: 'State',
            selectState: 'Select State',
            addressHint: 'Optional. This address will appear on the donation receipt PDF.',
            loggedInAs: 'Logged in as:',
            processing: 'Processing...',
            donate: 'Donate',
            thankYou: 'Thank you for your generous donation of',
            redirecting: 'Redirecting to your dashboard to view the receipt...',
            invalidAmount: 'Please enter a valid donation amount.',
            errorProcessing: 'Error processing donation.',
            serverError: 'An error occurred while connecting to the server.',
            loadingText: 'Loading...',
        },
        mr: {
            title: 'दान करा',
            subtitle: 'तुमच्या योगदानामुळे आम्हाला चांगले कार्यक्रम आयोजित करण्यास आणि मंडळाची देखभाल करण्यास मदत होते.',
            selectAmount: 'रक्कम निवडा',
            currency: 'चलन',
            customAmount: 'इच्छित रक्कम',
            enterAmount: 'रक्कम टाका',
            paymentMethod: 'पेमेंट पद्धत',
            creditCard: 'क्रेडिट कार्ड',
            debitCard: 'डेबिट कार्ड',
            upi: 'UPI',
            netBanking: 'नेट बँकिंग',
            mockPayment: 'चाचणी पेमेंट',
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
            stateLabel: 'राज्य',
            selectState: 'राज्य निवडा',
            addressHint: 'ऐच्छिक. हा पत्ता दान पावती PDF वर दिसेल.',
            loggedInAs: 'लॉग इन:',
            processing: 'प्रक्रिया सुरू...',
            donate: 'दान करा',
            thankYou: 'तुमच्या उदार दानाबद्दल धन्यवाद! रक्कम:',
            redirecting: 'पावती पाहण्यासाठी तुमच्या डॅशबोर्डवर पुनर्निर्देशित करत आहे...',
            invalidAmount: 'कृपया वैध दान रक्कम टाका.',
            errorProcessing: 'दान प्रक्रियेत त्रुटी.',
            serverError: 'सर्व्हरशी कनेक्ट करताना त्रुटी आली.',
            loadingText: 'लोड करत आहे...',
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(formData.amount),
                    currency: formData.currency,
                    paymentMethod: formData.paymentMethod,
                    receiptName: formData.receiptName,
                    address: [formData.addressLine1, formData.addressLine2, formData.city, formData.state].filter(Boolean).join(', '),
                    notes: formData.notes
                })
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMessage(`${t.thankYou} ${formData.currency} ${formData.amount}!`);
                setFormData({ ...formData, amount: '', notes: '' });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
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

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg border border-orange-100">

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-orange-600 font-yatra mb-2">
                        {t.title}
                    </h1>
                    <p className="text-gray-600">
                        {t.subtitle}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <p className="text-green-700 font-medium">{successMessage}</p>
                        <p className="text-sm text-green-600 mt-1">{t.redirecting}</p>
                    </div>
                )}

                {!successMessage && (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Quick Amounts */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectAmount}</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {[101, 501, 1001, 2100, 5100].map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => handleQuickAmount(amt)}
                                        className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors
                                            ${formData.amount === amt.toString()
                                                ? 'bg-orange-600 text-white border-orange-600'
                                                : 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50'}`}
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Amount */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.currency}</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.customAmount}</label>
                                <input
                                    type="number"
                                    name="amount"
                                    min="1"
                                    required
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder={t.enterAmount}
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentMethod}</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                            >
                                <option value="Credit Card">{t.creditCard}</option>
                                <option value="Debit Card">{t.debitCard}</option>
                                <option value="UPI">{t.upi}</option>
                                <option value="Net Banking">{t.netBanking}</option>
                                <option value="Mock">{t.mockPayment}</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.notes}</label>
                            <textarea
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                placeholder={t.notesPlaceholder}
                            ></textarea>
                        </div>

                        {/* Name for Receipt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.receiptName}</label>
                            <input
                                type="text"
                                name="receiptName"
                                required
                                value={formData.receiptName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                placeholder={t.receiptNamePlaceholder}
                            />
                            <p className="mt-1 text-xs text-gray-500">{t.receiptNameHint}</p>
                        </div>

                        {/* Address for Receipt */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">{t.addressTitle}</label>
                            <div>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder={t.addressLine1}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder={t.addressLine2}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.cityLabel}</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        placeholder={t.cityPlaceholder}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.stateLabel}</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    >
                                        <option value="">{t.selectState}</option>
                                        {indianStates.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">{t.addressHint}</p>
                        </div>

                        {/* Devotee Info Display */}
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 border border-gray-200">
                            {t.loggedInAs} <strong>{user?.firstName} {user?.lastName}</strong>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
                            >
                                {submitting ? t.processing : `${t.donate} ${formData.currency} ${formData.amount || '0'}`}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
