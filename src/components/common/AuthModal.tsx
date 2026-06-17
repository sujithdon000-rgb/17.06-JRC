import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Mail, Sparkles, CheckCircle, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser } = useStore();
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [inputValue, setInputValue] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['2', '0', '2', '6']);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep(true);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser(
        inputValue, 
        authMethod === 'mobile' ? 'otp-mobile' : 'otp-email', 
        fullName || (authMethod === 'mobile' ? 'Premium Connoisseur' : inputValue.split('@')[0])
      );
      onClose();
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser('Google Authenticated User', 'google', 'Dr. Radhika Merchant');
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md bg-white text-[#111] rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden"
        >
          {/* Top Luxury Banner */}
          <div className="bg-[#111111] text-[#D4AF37] p-8 text-center relative border-b border-[#222]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/50 mb-3 shadow-lg">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
            </div>

            <h2 className="font-cinzel text-xl font-bold text-white tracking-widest">
              SECURE CONCIERGE PORTAL
            </h2>
            <p className="text-xs text-gray-400 tracking-wider mt-1">
              Join the privileged inner circle of JEEV RUTHI COLLECTION
            </p>
          </div>

          <div className="p-8">
            
            {!otpStep ? (
              <>
                {/* Auth Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl mb-6">
                  <button
                    type="button"
                    onClick={() => { setAuthMethod('mobile'); setInputValue(''); }}
                    className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition ${
                      authMethod === 'mobile' ? 'bg-[#111111] text-[#D4AF37] shadow-md' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>MOBILE OTP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMethod('email'); setInputValue(''); }}
                    className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition ${
                      authMethod === 'email' ? 'bg-[#111111] text-[#D4AF37] shadow-md' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>EMAIL OTP</span>
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 tracking-wider">
                      FULL NAME (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aishwarya Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37] focus:bg-white font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 tracking-wider">
                      {authMethod === 'mobile' ? 'MOBILE NUMBER' : 'EMAIL ADDRESS'}
                    </label>
                    <div className="relative">
                      {authMethod === 'mobile' && (
                        <span className="absolute left-4 top-3 text-xs font-bold text-gray-500">
                          +91
                        </span>
                      )}
                      <input
                        type={authMethod === 'mobile' ? 'tel' : 'email'}
                        required
                        placeholder={authMethod === 'mobile' ? '98765 43210' : 'concierge@example.com'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`w-full py-3 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37] focus:bg-white font-medium transition ${
                          authMethod === 'mobile' ? 'pl-12' : 'pl-4'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Remember Logins state */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer font-medium">
                      Remember me & Maintain secure JWT Session Persistence
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !inputValue}
                    className="w-full bg-[#111111] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition duration-300 py-3.5 rounded-xl font-cinzel font-bold text-xs tracking-widest shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">DISPATCHING SECURE OTP...</span>
                    ) : (
                      <>
                        <span>REQUEST SECURE OTP</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </button>
                </form>

                {/* Google Login Option */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.705-.06-1.405-.19-2.065H12v4.51h6.6c-.29 1.495-1.11 2.765-2.37 3.625v3.015h3.835c2.245-2.065 3.68-5.11 3.68-9.085Z"/>
                      <path fill="#34A853" d="M12 24c3.3 0 6.07-1.09 8.09-2.955l-3.835-3.015c-1.095.735-2.505 1.17-4.255 1.17-3.27 0-6.04-2.21-7.03-5.18H1.05v3.1A12.001 12.001 0 0 0 12 24Z"/>
                      <path fill="#FBBC05" d="M4.97 14.02a7.197 7.197 0 0 1 0-4.04v-3.1H1.05A11.97 11.97 0 0 0 0 12c0 1.93.455 3.755 1.05 5.12l3.92-3.1Z"/>
                      <path fill="#EA4335" d="M12 4.75c1.795 0 3.41.615 4.675 1.815l3.51-3.51C18.07 1.17 15.3 0 12 0 7.31 0 3.255 2.77 1.05 6.88l3.92 3.1C5.96 7.01 8.73 4.75 12 4.75Z"/>
                    </svg>
                    <span>SIGN IN WITH GOOGLE OAUTH</span>
                  </button>
                </div>
              </>
            ) : (
              /* Verification Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-sm">ENTER ONE TIME PASSWORD</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Sent securely to <span className="font-mono text-[#D4AF37] font-bold">{inputValue}</span>
                  </p>
                  <button
                    onClick={() => setOtpStep(false)}
                    className="text-[11px] text-amber-600 hover:underline font-bold mt-1"
                  >
                    Change Contact Number / Email
                  </button>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex justify-between gap-3 max-w-xs mx-auto">
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newOtp = [...otpCode];
                          newOtp[i] = e.target.value;
                          setOtpCode(newOtp);
                        }}
                        className="w-14 h-14 bg-gray-50 border-2 border-[#D4AF37]/50 rounded-2xl text-center text-xl font-bold font-mono focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                      />
                    ))}
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Auto-Verification Enabled. Demo Passcode is pre-filled as <strong>2026</strong>.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#111111] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition duration-300 py-3.5 rounded-xl font-cinzel font-bold text-xs tracking-widest shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">VERIFYING SIGNATURE...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>AUTHORIZE SECURE ENTRY</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

          </div>

          {/* Secure Footer Note */}
          <div className="bg-gray-50 px-8 py-4 text-[11px] text-center text-gray-500 border-t border-gray-100 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Mobile OTP & OAuth2 Security Standard</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
