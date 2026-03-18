"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { user, token, loading, logout, API_URL } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [fetching, setFetching] = useState(true);

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
                a.download = `Receipt_${transactionId}.pdf`;
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
        }
    };

    if (loading || (!user && !loading)) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header */}
                <div className="bg-white p-6 rounded-xl shadow border border-orange-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-orange-600 font-yatra">My Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back, {user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50 transition-colors">
                        Logout
                    </button>
                </div>

                {/* Donation History */}
                <div className="bg-white p-6 rounded-xl shadow border border-orange-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-yatra">Donation History</h2>

                    {fetching ? (
                        <p className="text-gray-500">Loading your donations...</p>
                    ) : donations.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
                            <button onClick={() => router.push('/donate')} className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                                Make a Donation
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-orange-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {donations.map((donation) => (
                                        <tr key={donation._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(donation.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {donation.currency === 'INR' ? '₹' : donation.currency} {donation.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {donation.paymentMethod}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {donation.status === 'completed' && (
                                                    <button
                                                        onClick={() => handleDownloadReceipt(donation._id, donation.transactionId)}
                                                        className="text-orange-600 hover:text-orange-900 focus:outline-none"
                                                        title="Download Receipt">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                                                        </svg>
                                                    </button>
                                                )}
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
