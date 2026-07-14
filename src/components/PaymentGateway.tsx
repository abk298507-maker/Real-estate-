import React from 'react';
const bhimUpiQrPoster = new URL('../assets/images/bhim_upi_qr_poster_1784029560448.jpg', import.meta.url).href;
import { 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  QrCode, 
  CreditCard, 
  Check, 
  X, 
  Hourglass, 
  ArrowRight, 
  Sparkles, 
  Info,
  Phone,
  Lock
} from 'lucide-react';

interface PaymentGatewayProps {
  onPaymentSuccess?: () => void;
  onClose?: () => void;
}

export default function PaymentGateway({ onPaymentSuccess, onClose }: PaymentGatewayProps) {
  const [upiId, setUpiId] = React.useState('');
  const [paymentMode, setPaymentMode] = React.useState<'select' | 'qr' | 'collect' | 'success' | 'processing'>('select');
  const [timer, setTimer] = React.useState(180); // 3 minutes for QR code or collect request
  const [statusText, setStatusText] = React.useState('Awaiting transfer response...');
  const [txnId, setTxnId] = React.useState('');

  const merchantUPI = "9279533715@ybl";
  const merchantName = "Sharma Prop Mart";
  const amount = "999.00";
  const transactionNote = "Premium Listing Fee - Sharma Prop Mart";
  const gatewayRoute = "+91 9279533715";

  // Generate a random transaction ID upon mounting
  React.useEffect(() => {
    const randomHex = Math.floor(Math.random() * 10000000000);
    setTxnId(`SPM${randomHex}92795`);
  }, []);

  // Timer countdown
  React.useEffect(() => {
    let interval: any;
    if ((paymentMode === 'qr' || paymentMode === 'collect') && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setPaymentMode('select');
      alert('Payment request expired. Please try again.');
    }
    return () => clearInterval(interval);
  }, [paymentMode, timer]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePayNow = () => {
    const upiUrl = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    // Check if on mobile devices
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = upiUrl;
      // Also proceed to processing overlay so user has interactive states when returning
      setPaymentMode('processing');
      setStatusText('Processing deep link redirection to your UPI App...');
      setTimeout(() => {
        setPaymentMode('success');
        if (onPaymentSuccess) onPaymentSuccess();
      }, 5000);
    } else {
      // Desktop - prompt selection
      setPaymentMode('qr');
      setTimer(180); // reset timer to 3 mins
    }
  };

  const handleCollectRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. name@upi, number@paytm)');
      return;
    }
    setPaymentMode('collect');
    setTimer(120); // 2 minutes
    setStatusText(`UPI collect request of ₹999 dispatched to ${upiId}. Please approve in your UPI app.`);
    
    // Auto simulate success after 6 seconds for delightful prototyping experience
    setTimeout(() => {
      setPaymentMode('processing');
      setStatusText('Payment authorization received! Finalizing ledger entry...');
      setTimeout(() => {
        setPaymentMode('success');
        if (onPaymentSuccess) onPaymentSuccess();
      }, 2000);
    }, 6000);
  };

  const triggerMockSuccess = () => {
    setPaymentMode('processing');
    setStatusText('Verifying bank clearance with Gateway Route +91 9279533715...');
    setTimeout(() => {
      setPaymentMode('success');
      if (onPaymentSuccess) onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden max-w-lg mx-auto">
      {/* Decorative top strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
      
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* HEADER SECTION */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-black text-white tracking-wide uppercase flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span>SHARMA PROP MART</span>
        </h2>
        <p className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Secure Payment Gateway (Master User)</p>
      </div>

      {/* CONDITIONAL RENDER ACCORDING TO PAYMENT STATE */}
      {paymentMode === 'select' && (
        <div className="space-y-6">
          {/* Package Info Card */}
          <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl text-left relative overflow-hidden">
            <div className="absolute right-3 top-3 bg-blue-500/10 text-blue-400 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500/20">
              POPULAR
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-extrabold text-white text-base">Premium Property Plan</span>
              <span className="text-2xl font-black text-blue-400 font-mono">₹999</span>
            </div>
            <p className="text-xs text-slate-400">Validity: 3 Months • Unlimited Leads • Instant SMS Routing</p>
            
            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> Direct WhatsApp Routing
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> Spotlight Verified Badges
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> Unlimited Buyer Inquiries
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> Call Tracking Analytics
              </div>
            </div>
          </div>

          {/* Merchant & Route details */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Merchant Account:</span>
              <span className="text-white font-extrabold">Sharma Prop Mart</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Gateway Route:</span>
              <span className="text-white font-mono font-bold text-blue-400">{gatewayRoute}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Status:</span>
              <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Gateway
              </span>
            </div>
          </div>

          {/* Payment Methods Selection */}
          <div className="space-y-3">
            <button 
              onClick={handlePayNow}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-600/10 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Smartphone className="w-4 h-4" />
              <span>Proceed to Pay ₹999 via UPI App</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">Or Pay on Desktop</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleCollectRequest} className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-left">
                Enter UPI ID to receive payment request:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="e.g. 9279533715@ybl" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <CreditCard className="w-4 h-4 text-slate-600 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                <button 
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 rounded-xl transition"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[9px] font-mono">
            <Lock className="w-3 h-3 text-blue-500" />
            <span>256-Bit SSL Encrypted Bank-Direct Route Gateway</span>
          </div>
        </div>
      )}

      {/* QR CODE DESKTOP SIMULATION MODE */}
      {paymentMode === 'qr' && (
        <div className="space-y-6 text-center py-2">
          <div className="bg-white p-2.5 rounded-3xl inline-block shadow-2xl border border-slate-200 relative group overflow-hidden">
            {/* Real BHIM UPI Merchant QR Code */}
            <div className="w-56 bg-white flex items-center justify-center relative rounded-2xl overflow-hidden p-0.5">
              <img 
                src={bhimUpiQrPoster} 
                alt="BHIM UPI Accepted Here - Scan & Pay Using GPay, PhonePe or Paytm App" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            {/* Accent scanner horizontal light */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-blue-500/60 shadow-[0_0_10px_#3b82f6] animate-bounce" />
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-extrabold text-sm">Scan QR with your GPay, PhonePe or Paytm App</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Scan from your mobile screen or directly transfer to merchant UPI <span className="font-mono text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded">{merchantUPI}</span>
            </p>
            <div className="flex items-center justify-center gap-1 text-slate-500 font-mono text-[10px]">
              <Hourglass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>QR active for <span className="text-white font-bold">{formatTime(timer)}</span></span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center justify-between text-left text-xs">
            <div>
              <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-widest">Plan Details</span>
              <strong className="text-white block text-sm">₹999 • Premium Plan Upgrade</strong>
              <span className="text-slate-400 text-[10px]">Merchant: Sharma Prop Mart</span>
            </div>
            <button 
              onClick={triggerMockSuccess}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl transition"
            >
              Simulate Pay Success ⚡
            </button>
          </div>

          <button 
            onClick={() => setPaymentMode('select')}
            className="text-xs text-slate-500 hover:text-slate-400 underline"
          >
            Go Back & Change Method
          </button>
        </div>
      )}

      {/* COLLECT REQUEST WAITING MODE */}
      {paymentMode === 'collect' && (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Hourglass className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2.5 max-w-sm mx-auto">
            <h4 className="text-white font-black text-base">Request Dispatched!</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We've triggered a push payment request of <span className="font-bold text-white font-mono">₹999.00</span> to <span className="font-mono text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded">{upiId}</span>.
            </p>
            <p className="text-[11px] text-slate-500">
              Please open your UPI client app (such as Google Pay, PhonePe, or BHIM) to approve the pending request from <span className="font-bold text-slate-400">Sharma Prop Mart</span>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-slate-500 font-mono text-[10px]">
            <span>Request expires in <span className="text-white font-bold">{formatTime(timer)}</span></span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 max-w-sm mx-auto text-xs text-left space-y-1.5 text-slate-400">
            <div className="flex justify-between text-[11px]">
              <span>Gateway Node:</span>
              <span className="font-mono text-white font-bold">{gatewayRoute}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Reference Hex:</span>
              <span className="font-mono text-slate-300 font-bold">{txnId}</span>
            </div>
            <button 
              onClick={triggerMockSuccess}
              className="w-full mt-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2 rounded-xl transition text-[11px]"
            >
              Force Approve (Simulate User Accepted) ✔
            </button>
          </div>

          <button 
            onClick={() => setPaymentMode('select')}
            className="text-xs text-slate-500 hover:text-slate-400 underline"
          >
            Cancel Request & Go Back
          </button>
        </div>
      )}

      {/* INTERMEDIATE PROCESSING TRANSITION */}
      {paymentMode === 'processing' && (
        <div className="space-y-6 text-center py-8">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-slate-800 rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <h4 className="text-white font-extrabold text-base">Securing Allotment Route...</h4>
            <p className="text-xs text-slate-400 font-mono max-w-xs mx-auto leading-relaxed">
              {statusText}
            </p>
          </div>
        </div>
      )}

      {/* PAYMENT TRANSACTION SUCCESS RECEIPT SCREEN */}
      {paymentMode === 'success' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight pt-1">Payment Successful!</h3>
            <p className="text-xs text-slate-400">Your Premium Listing Plan is now active</p>
          </div>

          {/* Detailed Printable / Shareable Digital Receipt */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4 text-xs font-mono relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.03] text-white">
              <ShieldCheck className="w-32 h-32" />
            </div>

            <div className="border-b border-dashed border-slate-800 pb-3 flex justify-between items-center text-slate-400">
              <span>RECEIPT / INVOICE</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">PAID</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Merchant Account:</span>
                <span className="text-white font-bold font-sans">Sharma Prop Mart</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan Purchased:</span>
                <span className="text-white font-bold font-sans">Premium Property Plan (3M)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-slate-200 font-bold">{txnId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gateway Route:</span>
                <span className="text-blue-400 font-bold">{gatewayRoute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized At:</span>
                <span className="text-slate-200">{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="text-slate-500 font-sans">Amount Charged:</span>
              <span className="text-lg font-black text-emerald-400">₹ 999.00</span>
            </div>
          </div>

          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850/80 text-xs text-slate-400 flex gap-2.5 items-start">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-sans text-xs block mb-0.5">Master User Status Activated!</strong>
              <p className="text-[11px] leading-relaxed">
                You have been upgraded to the Premium Master Tier. You can now access the full Agent & Broker CRM, view live contact numbers, and list unlimited properties.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition shadow-lg shadow-blue-600/15 uppercase tracking-widest text-xs"
          >
            Done & Explore Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
