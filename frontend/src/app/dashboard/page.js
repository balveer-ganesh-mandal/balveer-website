"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Dashboard() {
    const { user, token, loading, logout, API_URL } = useAuth();
    const router = useRouter();
    const { lang } = useLanguage();
    const [donations, setDonations] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);

    const content = {
        en: {
            dashboard: "My Dashboard",
            welcome: "Welcome back,",
            logout: "Logout",
            donationHistory: "Donation History",
            loading: "Loading your donations...",
            noDonations: "You haven't made any donations yet.",
            makeDonation: "Make a Donation",
            date: "Date",
            amount: "Amount",
            method: "Method",
            txnRef: "Txn Ref",
            status: "Status",
            receipt: "Receipt",
            pending: "Pending Verification",
            completed: "Verified",
            failed: "Failed",
            receiptReady: "Download",
            receiptPending: "Processing (5-7 days)",
            receiptNote: "📋 Donation receipts are generated manually by our team. Your receipt will be available within 5-7 working days after payment verification.",
        },
        mr: {
            dashboard: "माझे डॅशबोर्ड",
            welcome: "स्वागत,",
            logout: "लॉगआउट",
            donationHistory: "दान इतिहास",
            loading: "तुमचे दान लोड करत आहे...",
            noDonations: "तुम्ही अद्याप कोणतेही दान केलेले नाही.",
            makeDonation: "दान करा",
            date: "तारीख",
            amount: "रक्कम",
            method: "पद्धत",
            txnRef: "ट्रॅन्झॅक्शन",
            status: "स्थिती",
            receipt: "पावती",
            pending: "पडताळणी बाकी",
            completed: "पडताळणी झाली",
            failed: "अयशस्वी",
            receiptReady: "डाउनलोड",
            receiptPending: "प्रक्रिया सुरू (५-७ दिवस)",
            receiptNote: "📋 दान पावत्या आमच्या टीमद्वारे मॅन्युअली तयार केल्या जातात. पेमेंट पडताळणीनंतर ५-७ कामकाजाच्या दिवसांत तुमची पावती उपलब्ध होईल.",
        }
    };

    const t = content[lang];

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (token) {
            fetchDonations();
        }
    }, [token]);

    const fetchDonations = async () => {
        try {
            const res = await fetch(`${API_URL}/api/donations/my-donations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setDonations(data.data);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleDownloadReceipt = async (donationId, transactionId) => {
        setDownloadingId(donationId);
        try {
            const res = await fetch(`${API_URL}/api/donations/${donationId}/receipt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const safeTxName = transactionId || 'Donation';
                a.download = `Receipt_${safeTxName}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            } else {
                alert("Failed to download receipt");
            }
        } catch (error) {
            console.error('Error downloading receipt:', error);
            alert("Error downloading receipt");
        } finally {
            setDownloadingId(null);
        }
    };

    if (loading || (!user && !loading)) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const getStatusBadge = (donation) => {
        if (donation.status === 'completed' || donation.receiptGenerated) {
            return <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">✅ {t.completed}</span>;
        } else if (donation.status === 'pending') {
            return <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 animate-pulse">⏳ {t.pending}</span>;
        } else {
            return <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">{t.failed}</span>;
        }
    };

    const getReceiptAction = (donation) => {
        if (donation.status === 'completed' || donation.receiptGenerated) {
            const isDownloading = downloadingId === donation._id;
            return (
                <button
                    onClick={() => handleDownloadReceipt(donation._id, donation.transactionId)}
                    disabled={isDownloading}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs font-bold rounded-lg transition-all ${
                        isDownloading 
                            ? 'bg-gray-400 cursor-wait' 
                            : 'bg-gradient-to-r from-[#be1111] to-[#8b0000] hover:shadow-md cursor-pointer'
                    }`}
                    title="Download Receipt"
                >
                    {isDownloading ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                        </svg>
                    )}
                    {isDownloading ? t.loading : t.receiptReady}
                </button>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200">
                    <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {t.receiptPending}
                </span>
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#fff8f0] py-12 px-4 sm:px-6 lg:px-8 pt-28">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#fceabb]/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#be1111]">{t.dashboard}</h1>
                        <p className="text-gray-600 mt-1">{t.welcome} {user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="px-5 py-2.5 border-2 border-[#be1111] text-[#be1111] rounded-xl hover:bg-red-50 transition-colors font-bold">
                        {t.logout}
                    </button>
                </div>

                {/* Receipt Info Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-amber-800 text-sm font-medium">{t.receiptNote}</p>
                </div>

                {/* Donation History */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#fceabb]/50">
                    <h2 className="text-2xl font-bold text-[#8b0000] mb-6">{t.donationHistory}</h2>

                    {fetching ? (
                        <p className="text-gray-500">{t.loading}</p>
                    ) : donations.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-5xl mb-4">🙏</div>
                            <p className="text-gray-500 mb-4">{t.noDonations}</p>
                            <button onClick={() => router.push('/donate')} className="px-6 py-3 bg-gradient-to-r from-[#be1111] to-[#8b0000] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                                {t.makeDonation}
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-[#fceabb]/50 text-[#8b0000]">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">{t.date}</th>
                                        <th className="px-4 py-3 font-semibold">{t.amount}</th>
                                        <th className="px-4 py-3 font-semibold">{t.method}</th>
                                        <th className="px-4 py-3 font-semibold">{t.txnRef}</th>
                                        <th className="px-4 py-3 font-semibold">{t.status}</th>
                                        <th className="px-4 py-3 font-semibold text-right">{t.receipt}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {donations.map((donation) => (
                                        <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap text-gray-900">
                                                {new Date(donation.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap font-bold text-gray-900">
                                                {donation.currency === 'INR' ? '₹' : donation.currency} {donation.amount}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                                                {donation.paymentMethod}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-gray-500 font-mono text-xs">
                                                {donation.transactionId}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {getStatusBadge(donation)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right">
                                                {getReceiptAction(donation)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
