import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { OTPVerification } from './components/OTPVerification';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [step, setStep] = useState<'login' | 'otp' | 'success'>('login');
  const [error, setError] = useState<string | undefined>();

  // In a real app, these would be API calls
  const handleLogin = (email: string, password: string) => {
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setStep('otp');
        setError(undefined);
      } else {
        setError('Invalid credentials');
      }
    }, 1000);
  };

  const handleOTPVerify = (otp: string) => {
    // Simulate API call
    setTimeout(() => {
      if (otp === '123456') { // In reality, this would be validated against a server
        setStep('success');
        setError(undefined);
      } else {
        setError('Invalid verification code');
      }
    }, 1000);
  };

  const handleResendOTP = () => {
    // Simulate API call
    setTimeout(() => {
      alert('New verification code sent!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://images.unsplash.com/photo-1633265486064-086b219458ec?w=96&h=96&fit=crop&auto=format"
          alt="Secure Shop"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Secure Shopping
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'login' && (
            <LoginForm onSubmit={handleLogin} error={error} />
          )}
          {step === 'otp' && (
            <OTPVerification 
              onVerify={handleOTPVerify}
              onResend={handleResendOTP}
              error={error}
            />
          )}
          {step === 'success' && (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Authentication Successful</h3>
              <p className="mt-2 text-sm text-gray-500">
                You have successfully verified your identity.
              </p>
              <button
                onClick={() => setStep('login')}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;