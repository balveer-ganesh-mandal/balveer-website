"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });

    // Phone Auth State
    const [isPhoneMode, setIsPhoneMode] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, loginWithGoogle, sendOTP, verifyOTP } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signup(formData);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);
        const result = await loginWithGoogle(); // Firebase handles sign in vs sign up automatically
        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!phoneNumber) return setError('Please enter a phone number');

        // Add country code if missing
        let formattedPhone = phoneNumber;
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = '+91' + formattedPhone;
        }

        setError('');
        setLoading(true);

        const result = await sendOTP(formattedPhone, 'recaptcha-container');
        if (result.success) {
            setOtpSent(true);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!otp) return setError('Please enter the OTP');

        setError('');
        setLoading(true);

        const result = await verifyOTP(otp);
        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-orange-100 mt-16 lg:mt-0">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-600 font-yatra">
                        Join Devotee Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create an account to track your donations and download receipts
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleSignup} disabled={loading}
                    className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                {/* Phone Sign In Toggle */}
                {!isPhoneMode ? (
                    <button
                        onClick={() => setIsPhoneMode(true)} disabled={loading}
                        className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors mt-3">
                        <Phone size={18} className="text-gray-500" />
                        Continue with Phone Number
                    </button>
                ) : (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-medium text-gray-900">Phone Authentication</h3>
                            <button onClick={() => { setIsPhoneMode(false); setOtpSent(false); }} className="text-xs text-orange-600 hover:underline">Cancel</button>
                        </div>
                        {!otpSent ? (
                            <form onSubmit={handleSendOTP} className="space-y-3">
                                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required
                                    placeholder="Phone Number (e.g. 9876543210)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500" />
                                <div id="recaptcha-container"></div>
                                <button type="submit" disabled={loading} className="w-full py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:opacity-50">
                                    {loading ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP} className="space-y-3">
                                <p className="text-xs text-gray-600">Enter the OTP sent to {phoneNumber}</p>
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500 tracking-widest text-center" />
                                <button type="submit" disabled={loading} className="w-full py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                                    {loading ? 'Verifying...' : 'Verify OTP & Login'}
                                </button>
                            </form>
                        )}
                    </div>
                )}

                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign up with Email</span>
                    </div>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleEmailSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="sr-only">First Name</label>
                                <input id="firstName" name="firstName" type="text" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                    value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">Last Name</label>
                                <input id="lastName" name="lastName" type="text" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="phone" className="sr-only">Phone Number (Optional)</label>
                            <input id="phone" name="phone" type="tel"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number (Optional)"
                                value={formData.phone} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required minLength="6"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password (min 6 characters)"
                                value={formData.password} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400 transition-colors">
                            {loading && !isPhoneMode ? 'Creating account...' : 'Sign Up with Email'}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500 hover:underline">
                            Log in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
