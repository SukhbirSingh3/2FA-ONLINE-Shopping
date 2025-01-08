import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
  error?: string;
}

export function OTPVerification({ onVerify, onResend, error }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <Shield className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
        <p className="mt-2 text-sm text-gray-600">
          Please enter the verification code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className="sr-only">
            Verification Code
          </label>
          <input
            id="otp"
            type="text"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-center text-2xl tracking-widest shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Verify
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onResend}
            disabled={countdown > 0}
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Resend Code {countdown > 0 && `(${countdown}s)`}
          </button>
        </div>
      </form>
    </div>
  );
}