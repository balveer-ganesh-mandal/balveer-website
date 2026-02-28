"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Donate() {
    const { user, token, isAuthenticated, loading, API_URL } = useAuth();
    const router = useRouter();

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
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Redirect to login if not authenticated when trying to access the donation form directly
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=donate');
        }
        // Pre-fill receipt name with user's name
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
            setError('Please enter a valid donation amount.');
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
                setSuccessMessage(`Thank you for your generous donation of ${formData.currency} ${formData.amount}!`);
                setFormData({ ...formData, amount: '', notes: '' }); // Reset form

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            } else {
                setError(data.message || 'Error processing donation.');
            }
        } catch (err) {
            setError('An error occurred while connecting to the server.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg border border-orange-100">

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-orange-600 font-yatra mb-2">
                        Make a Donation
                    </h1>
                    <p className="text-gray-600">
                        Your contribution helps us organize better events and maintain the Mandal.
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
                        <p className="text-sm text-green-600 mt-1">Redirecting to your dashboard to view the receipt...</p>
                    </div>
                )}

                {!successMessage && (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Quick Amounts */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    min="1"
                                    required
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="UPI">UPI</option>
                                <option value="Net Banking">Net Banking</option>
                                <option value="Mock">Mock Testing Payment</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message / Notes (Optional)</label>
                            <textarea
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                placeholder="E.g., In memory of..."
                            ></textarea>
                        </div>

                        {/* Name for Receipt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name for Receipt</label>
                            <input
                                type="text"
                                name="receiptName"
                                required
                                value={formData.receiptName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                placeholder="Enter name to print on receipt"
                            />
                            <p className="mt-1 text-xs text-gray-500">This name will appear on the donation receipt PDF.</p>
                        </div>

                        {/* Address for Receipt */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Address (for Receipt)</label>
                            <div>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder="Address Line 1 (House/Flat No., Street)"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    placeholder="Address Line 2 (Area, Landmark)"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">City / Town / Village</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                        placeholder="e.g. Malkapur"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                    >
                                        <option value="">Select State</option>
                                        {indianStates.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Optional. This address will appear on the donation receipt PDF.</p>
                        </div>

                        {/* Devotee Info Display */}
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 border border-gray-200">
                            Logged in as: <strong>{user?.firstName} {user?.lastName}</strong>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
                            >
                                {submitting ? 'Processing...' : `Donate ${formData.currency} ${formData.amount || '0'}`}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
