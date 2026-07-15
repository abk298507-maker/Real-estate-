import React, { useState } from 'react';
import { useOrganization, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Sparkles, Shield, User, Send, Compass, MessageSquare, ArrowRight, Brain, AlertCircle, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  showToast: (msg: string) => void;
}

export default function AIAssistant({ showToast }: AIAssistantProps) {
  const { user, isSignedIn } = useUser();
  const { membership } = useOrganization();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [simulatedRole, setSimulatedRole] = useState<'org:admin' | 'member'>('org:admin');
  const [useSimulation, setUseSimulation] = useState(false);

  // Determine active role
  const isOrgAdmin = membership?.role === 'org:admin';
  const activeRole = useSimulation ? simulatedRole : (isOrgAdmin ? 'org:admin' : 'member');
  const isMasterUser = activeRole === 'org:admin';

  const handleAskAI = async (customPrompt?: string) => {
    const promptToSend = customPrompt || prompt;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setResult('');
    showToast("Sharma Prop Mart AI is generating a response...");

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: promptToSend,
          orgRole: activeRole
        })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.reply);
      } else {
        setResult(`Error: ${data.error || 'Failed to connect to AI.'}`);
      }
    } catch (error) {
      setResult('AI connection failed. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const templates = isMasterUser 
    ? [
        { label: "Business Growth Strategy", text: "Write a high-level expansion plan for Sharma Prop Mart covering Greater Noida and Yamuna Expressway sectors." },
        { label: "Analyze High-Value Deals", text: "Create an analytical checklist for assessing high-value commercial plot transactions in Yamuna Expressway Sector 22D." },
        { label: "Executive Performance KPI", text: "Suggest key metrics and an incentive program to audit and motivate our real estate agents." }
      ]
    : [
        { label: "Luxury 3BHK Description", text: "Write an elegant, premium property description for a luxury 3BHK apartment on Yamuna Expressway with luxury amenities." },
        { label: "Plot Pitch for Investor", text: "Draft a persuasive client pitch highlighting the rapid price appreciation of plots in Greater Noida Sector 150." },
        { label: "Client Follow-up Email", text: "Write a professional follow-up email template for a lead who recently visited a sector plot but has been unresponsive." }
      ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8" id="ai-assistant-container">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#0078db]/10 border border-[#0078db]/20 px-3 py-1 rounded-full text-[#0078db] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Google Gemini Powered</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#091e42] tracking-tight uppercase">
          Sharma Prop Mart <span className="text-[#34a853]">AI Core</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
          The ultimate intelligent business partner. Streamline descriptions, craft negotiation pitches, or run strategic analytics in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Control Panel / Role Info */}
        <div className="md:col-span-1 bg-white border border-slate-150 rounded-2xl p-5 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-[#091e42] text-sm flex items-center gap-2 uppercase tracking-wide">
              <Shield className="w-4 h-4 text-[#0078db]" />
              <span>Identity & Permissions</span>
            </h3>

            {/* Clerk User Info Display */}
            {isSignedIn && user ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || "User"} 
                  className="w-10 h-10 rounded-full border border-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-xs text-[#091e42] truncate">{user.fullName || "Real Estate Professional"}</p>
                  <p className="text-[10px] text-slate-500 font-bold truncate">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200/50 rounded-xl text-center space-y-2">
                <p className="text-[11px] text-amber-800 font-extrabold flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Not Signed In</span>
                </p>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  Sign in with Clerk to automatically sync your profile roles.
                </p>
                <SignInButton mode="modal">
                  <button className="w-full py-1.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-[10px] font-black uppercase rounded-lg transition-colors cursor-pointer">
                    Sign In Now
                  </button>
                </SignInButton>
              </div>
            )}

            {/* Active Security Role Badge */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Mode</span>
              <div className={`p-3 rounded-xl border text-center flex flex-col justify-center items-center gap-1 ${
                isMasterUser 
                  ? "bg-rose-50/50 border-rose-200/60 text-rose-700" 
                  : "bg-blue-50/50 border-blue-200/60 text-[#0078db]"
              }`}>
                <span className="text-xl">{isMasterUser ? "👑" : "💼"}</span>
                <span className="text-xs font-black uppercase tracking-wider">
                  {isMasterUser ? "Master User / Owner" : "Field Agent / Dealer"}
                </span>
                <span className="text-[9px] font-bold opacity-80 leading-snug">
                  {isMasterUser 
                    ? "Full business analytics & performance strategy metrics authorized." 
                    : "Property descriptions, follow-up emails, and pitch optimization authorized."}
                </span>
              </div>
            </div>
          </div>

          {/* Simulation Toggle Box */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Simulate Org Role</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useSimulation} 
                  onChange={(e) => setUseSimulation(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0078db]"></div>
              </label>
            </div>

            {useSimulation && (
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setSimulatedRole('org:admin')}
                  className={`py-1 text-[10px] font-black uppercase rounded-md transition-all cursor-pointer ${
                    simulatedRole === 'org:admin' ? 'bg-[#0078db] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  👑 Owner
                </button>
                <button
                  onClick={() => setSimulatedRole('member')}
                  className={`py-1 text-[10px] font-black uppercase rounded-md transition-all cursor-pointer ${
                    simulatedRole === 'member' ? 'bg-[#0078db] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  💼 Agent
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Input Area & Output panel */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Main prompt input card */}
          <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#0078db]" />
              <span>Ask AI Core</span>
            </div>

            <textarea
              className="w-full p-4 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-[#0078db]/35 outline-none font-medium min-h-[100px] transition-all bg-slate-50/20"
              placeholder={isMasterUser ? "Ask for quarterly growth plans, revenue checklists, or expansion analysis..." : "Enter property specs or pitch criteria..."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              id="ai-prompt-textarea"
            />

            {/* Template quick-tap suggestions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Quick Starter Suggestions</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.label}
                    onClick={() => {
                      setPrompt(tpl.text);
                      showToast(`Loaded: "${tpl.label}"`);
                    }}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-slate-700 text-[11px] font-bold text-left transition-colors cursor-pointer hover:border-slate-350"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button bar */}
            <div className="pt-2 flex justify-between items-center gap-4">
              <p className="text-[10px] text-slate-400 font-semibold">
                * Respects role-based workspace restrictions.
              </p>
              <button
                onClick={() => handleAskAI()}
                disabled={loading || !prompt.trim()}
                className="bg-[#0078db] hover:bg-[#005ca8] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                id="ai-submit-button"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI IS THINKING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND TO AI CORE</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI output display card */}
          {(result || loading) && (
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#34a853]/10 flex items-center justify-center text-[#34a853]">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black text-[#091e42] uppercase tracking-wider">AI Output Stream</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34a853] animate-ping" />
                  <span className="text-[9px] text-[#34a853] font-extrabold uppercase tracking-widest">ready</span>
                </div>
              </div>

              {loading ? (
                <div className="space-y-3 py-4">
                  <div className="h-4 bg-slate-100 rounded-md animate-pulse w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded-md animate-pulse w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded-md animate-pulse w-1/2"></div>
                </div>
              ) : (
                <div className="text-slate-800 text-sm font-medium leading-relaxed whitespace-pre-wrap py-2 select-all selection:bg-blue-100">
                  {result}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
