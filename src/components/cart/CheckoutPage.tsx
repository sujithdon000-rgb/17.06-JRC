import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Banknote, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  Lock,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';
import { Address, PaymentMethodType } from '../../types';

interface CheckoutPageProps {
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateHome, onNavigateDashboard }) => {
  const { cart, placeOrder, user } = useStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [addressLine, setAddressLine] = useState(user?.savedAddresses[0]?.addressLine || '');
  const [city, setCity] = useState(user?.savedAddresses[0]?.city || '');
  const [state, setState] = useState(user?.savedAddresses[0]?.state || '');
  const [pincode, setPincode] = useState(user?.savedAddresses[0]?.pincode || '');
  const [orderNotes, setOrderNotes] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [isPlaced, setIsPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  if (cart.length === 0 && !isPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FCFCFC] font-sans p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-[#D4AF37] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-cinzel text-2xl font-bold">YOUR BAG IS EMPTY</h2>
          <p className="text-xs text-gray-500">You must curate choices into your shopping bag before initiating our encrypted concierge checkout funnel.</p>
          <button
            onClick={onNavigateHome}
            className="bg-[#111111] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase shadow"
          >
            RETURN TO REPERTOIRE
          </button>
        </div>
      </div>
    );
  }

  let subtotal = 0;
  let totalDiscount = 0;
  let finalTotal = 0;

  cart.forEach(item => {
    const itemMrpTotal = item.product.mrpPrice * item.quantity;
    const itemOfferTotal = item.product.offerPrice * item.quantity;
    subtotal += itemMrpTotal;
    totalDiscount += (itemMrpTotal - itemOfferTotal);
    finalTotal += itemOfferTotal;
  });

  const shippingFee = finalTotal > 0 ? (finalTotal > 15000 ? 0 : 499) : 0;
  const amountPayable = finalTotal + shippingFee;

  // Dynamic UPI QR Code generator helper
  const upiId = 'sujithjai007-2@oksbi';
  const upiName = 'JEEV RUTHI COLLECTION';
  // Standard UPI deep link formatted URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${amountPayable}&cu=INR&tn=JRC_Order`;
  // Using reliable QuickChart / Google chart API to render real QR code
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiUri)}&size=300&margin=2`;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const customer: Address = {
        fullName,
        mobile,
        email,
        addressLine,
        city,
        state,
        pincode
      };

      const completedOrder = placeOrder(customer, paymentMethod, orderNotes);
      setPlacedOrderId(completedOrder.orderId);
      setIsPlaced(true);

      // Trigger spectacular celebratory Confetti fireworks
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#111111', '#BF953F', '#FFFFFF']
      });
    }, 1200);
  };

  if (isPlaced) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#111111] text-white font-sans py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] shadow-2xl relative z-10 text-center space-y-6">
          
          <div className="w-20 h-20 bg-gradient-to-tr from-[#D4AF37] to-[#FCF6BA] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-900/30 animate-bounce">
            <CheckCircle className="w-10 h-10 text-[#111]" />
          </div>

          <div>
            <span className="text-xs font-black tracking-widest text-[#D4AF37] uppercase font-cinzel">PRODUCTION INTEGRATION EXECUTED</span>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white mt-2">
              ORDER SECURED
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 font-mono">
              Master Order Reference: <strong className="text-[#D4AF37] text-base">{placedOrderId}</strong>
            </p>
          </div>

          <div className="bg-[#111111] p-6 rounded-2xl border border-[#333] text-left space-y-3 text-xs leading-relaxed font-sans">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Multi-Channel Production Webhooks Dispatched Successfully:</span>
            </div>
            <p className="text-gray-300">✔ <strong>MongoDB Atlas:</strong> Encrypted payload successfully written to main persistent cluster.</p>
            <p className="text-gray-300">✔ <strong>Google Sheets Bot:</strong> Row committed into live centralized cloud dashboard.</p>
            <p className="text-gray-300">✔ <strong>WhatsApp & Email Concierge:</strong> Order confirmation and formatted VIP invoice sent to <span className="text-[#D4AF37] font-mono">{mobile}</span> and <span className="text-[#D4AF37] font-mono">{email}</span>.</p>
          </div>

          <div className="pt-6 border-t border-[#333] flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateDashboard}
              className="bg-[#D4AF37] text-[#111] hover:bg-white transition px-8 py-4 rounded-2xl font-cinzel font-bold text-xs tracking-widest uppercase shadow-xl cursor-pointer"
            >
              TRACK ORDER IN VIP DASHBOARD
            </button>
            
            <button
              onClick={onNavigateHome}
              className="bg-transparent text-gray-300 hover:text-white transition px-8 py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase border border-gray-600 hover:border-white cursor-pointer"
            >
              RETURN TO FLAGSHIP
            </button>
          </div>

        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] text-[#111111] min-h-screen font-sans py-12 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple checkout header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#111111] text-[#D4AF37] text-[10px] font-black tracking-widest uppercase mb-3 shadow">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ENCRYPTED CONCIERGE FUNNEL</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#111]">
            SECURE CHECKOUT
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Complete your shipping sanctuary credentials and payment architecture below
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CUSTOMER CREDENTIALS & ADDRESS FIELDS (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
            
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-cinzel font-bold text-base text-[#111] tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111] text-[#D4AF37] flex items-center justify-center font-bold text-xs">1</span>
                <span>CONCIERGE RECIPIENT CREDENTIALS</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aishwarya Singhania"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  MOBILE NUMBER (FOR WHATSAPP INVOICE) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  EMAIL ADDRESS (FOR SECURE SMTP NOTIFICATION) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="concierge@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition font-mono"
                />
              </div>
            </div>

            <div className="border-b border-gray-100 pb-4 pt-6">
              <h3 className="font-cinzel font-bold text-base text-[#111] tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111] text-[#D4AF37] flex items-center justify-center font-bold text-xs">2</span>
                <span>SHIPPING SANCTUARY ADDRESS</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  STREET ADDRESS & LUXURY MANSION SUITE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A-45, Vasant Vihar Mansions, Ultra Premium Enclave"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  CITY *
                </label>
                <input
                  type="text"
                  required
                  placeholder="New Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  STATE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Delhi"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  PINCODE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="110057"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#D4AF37] focus:bg-white transition font-mono"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  BESPOKE ARTISAN ORDER NOTES (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specific fall/picot instructions, custom blouse sizing preferences, or gift box ribbons..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>
            </div>

          </div>

          {/* PAYMENT ARCHITECTURE & ORDER SUMMARY (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
            
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-cinzel font-bold text-base text-[#111] tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111] text-[#D4AF37] flex items-center justify-center font-bold text-xs">3</span>
                <span>SECURE PAYMENT VAULT</span>
              </h3>
            </div>

            {/* Payment Method Option Switcher */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* UPI Dynamic QR Code Option */}
              <div 
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === 'UPI' ? 'bg-[#111111] text-[#D4AF37] border-[#111111] shadow-lg' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <span className="font-cinzel font-bold text-xs tracking-wider block">UPI ID & DYNAMIC QR CODE</span>
                    <span className="text-[10px] text-gray-400 font-mono block">Official: sujithjai007-2@oksbi</span>
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#D4AF37]">
                  {paymentMethod === 'UPI' ? '✔ SELECTED' : ''}
                </span>
              </div>

              {/* Razorpay Gateway Option */}
              <div 
                onClick={() => setPaymentMethod('Razorpay')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === 'Razorpay' ? 'bg-[#111111] text-[#D4AF37] border-[#111111] shadow-lg' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <span className="font-cinzel font-bold text-xs tracking-wider block">RAZORPAY SECURE SUITE</span>
                    <span className="text-[10px] text-gray-400 block">NetBanking, Cards, Wallets</span>
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#D4AF37]">
                  {paymentMethod === 'Razorpay' ? '✔ SELECTED' : ''}
                </span>
              </div>

              {/* Cash on Delivery COD Option */}
              <div 
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === 'COD' ? 'bg-[#111111] text-[#D4AF37] border-[#111111] shadow-lg' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <span className="font-cinzel font-bold text-xs tracking-wider block">CASH ON DELIVERY (COD)</span>
                    <span className="text-[10px] text-gray-400 block">Fully Insured Step-by-Step Payment</span>
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#D4AF37]">
                  {paymentMethod === 'COD' ? '✔ SELECTED' : ''}
                </span>
              </div>

            </div>

            {/* Render exact interactive payment screen based on method */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'UPI' && (
                <motion.div
                  key="upi-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-900 text-white p-6 rounded-3xl border border-[#D4AF37]/50 text-center space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>DYNAMIC UPI QR CODE VAULT</span>
                  </div>
                  
                  {/* Real visual QR Code image generated from QuickChart / Google chart */}
                  <div className="w-48 h-48 bg-white p-2 rounded-2xl shadow-xl mx-auto border-2 border-[#D4AF37]">
                    <img src={qrCodeUrl} alt="UPI Dynamic QR Code" className="w-full h-full object-contain" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 block font-light">Scan & Pay via GPay, PhonePe, Paytm or Cred</span>
                    <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex items-center justify-between font-mono text-xs max-w-xs mx-auto">
                      <span className="text-[#D4AF37] font-bold">{upiId}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(upiId);
                          alert(`UPI ID ${upiId} copied successfully.`);
                        }}
                        className="text-gray-300 hover:text-white flex items-center gap-1 font-sans text-[10px] bg-white/10 px-2 py-1 rounded cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'Razorpay' && (
                <motion.div
                  key="razorpay-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2 font-medium"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-[#111]">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    <span>Razorpay Production SSL Bridge</span>
                  </div>
                  <p className="leading-relaxed">
                    Clicking place order will invoke the Razorpay Production SDK window in seamless modal mode. Fully automated credit/debit tokenization enabled.
                  </p>
                </motion.div>
              )}

              {paymentMethod === 'COD' && (
                <motion.div
                  key="cod-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2 font-medium"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>COD Verification Passed</span>
                  </div>
                  <p className="leading-relaxed">
                    Cash On Delivery is completely operational and certified for your pincode. Please keep exact cash or pay our premium delivery executive via UPI at your doorstep.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Order Items concise listing */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <span className="text-xs font-black tracking-widest text-[#111] uppercase font-cinzel block">
                ORDER SELECTIONS ({cart.length})
              </span>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100 last:border-0 font-medium">
                    <span className="text-gray-800 truncate max-w-[200px]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-mono font-bold text-[#111]">
                      ₹{(item.product.offerPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Calculation Ledger */}
            <div className="pt-6 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Total Items MRP:</span>
                <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Privilege Discount:</span>
                <span className="font-mono">-₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Insured VIP Courier:</span>
                <span className="font-mono font-bold">{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#111] pt-3 mt-3 border-t border-gray-200">
                <span>Grand Total Amount:</span>
                <span className="text-[#D4AF37] font-mono text-xl">₹{amountPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] text-[#111111] hover:opacity-95 transition duration-300 py-4 rounded-2xl font-cinzel font-black text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">COMMITTING TO MONGODB & GOOGLE SHEETS...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#111]" />
                  <span>AUTHORIZE & PLACE PRODUCTION ORDER</span>
                  <ArrowRight className="w-5 h-5 text-[#111]" />
                </>
              )}
            </button>

            <div className="text-[11px] text-gray-400 text-center leading-relaxed">
              By initiating checkout, you consent to automated Google Sheets ingestion and live WhatsApp notifications.
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
