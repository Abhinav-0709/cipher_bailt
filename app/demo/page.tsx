'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
    role: 'user' | 'model';
    content: string;
}

interface Intel {
    upi: string[];
    bank_ac: string[];
    links: string[];
}

export default function DemoPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Namaste beta! Who is this? Why are you messaging me on this old phone?" }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scamDetected, setScamDetected] = useState<boolean | null>(null);
    const [confidence, setConfidence] = useState(0);
    const [intel, setIntel] = useState<Intel>({ upi: [], bank_ac: [], links: [] });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMsg = inputText.trim();
        setInputText('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the very first greeting if it was local only, 
            // but here we can send it or just send what we have. 
            // The API expects history to be meaningful. 
            // Let's send the previous messages excluding the one we just added for now, 
            // or actually the API usually wants the history SO FAR + the new message is the 'message' param.
            // So history should comprise PREVIOUS turn.

            // Filter out the initial greeting (index 0 is model) to ensure history starts with 'user'
            // Gemini API requires history to start with 'user'.
            const apiHistory = messages
                .filter(m => m.role !== 'model' || messages.indexOf(m) !== 0) // Simple check: remove if it's the very first message AND it's a model
                // Better: just slice(1) if we know the first is always greeting, but let's be robust:
                // Actually, for this demo, just filtering out the LOCAL greeting is enough.
                // We know the first message is the greeting.
                .slice(1)
                .map(m => ({
                    role: m.role === 'model' ? 'assistant' : 'user',
                    content: m.content
                }));

            const res = await fetch('/api/honeypot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'project-die-secure-v1' // In a real app, this might be proxied or public-facing API doesn't need key if protected by other means. For demo, we hardcode or env.
                    // Since this is client-side, exposing the key is not ideal for PRODUCTION, 
                    // but for this Hackathon Demo it's the simplest way to make it work.
                },
                body: JSON.stringify({
                    message: userMsg,
                    history: apiHistory,
                    sessionId: 'demo-session-' + Date.now()
                })
            });

            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'model', content: "⚠️ System Error: " + data.error }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: data.response_message }]);
                setScamDetected(data.scam_detected);
                setConfidence(data.confidence);
                setIntel(data.extracted_intel);
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "⚠️ Network Error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-black flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span className="font-semibold text-zinc-300">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className="text-sm text-zinc-400 font-mono">
                            {isLoading ? 'ANALYZING...' : 'SYSTEM READY'}
                        </span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col: Chat Interface */}
                <div className="lg:col-span-2 flex flex-col rounded-2xl border border-white/10 bg-zinc-900/30 overflow-hidden shadow-2xl h-[calc(100vh-8rem)]">
                    {/* Header */}
                    <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                👨‍🦳
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">Dada Ji</h2>
                                <p className="text-xs text-zinc-400">Target Persona (Running on Gemini 1.5)</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setMessages([{ role: 'model', content: "Namaste beta! Who is this? Why are you messaging me on this old phone?" }]); setScamDetected(null); setIntel({ upi: [], bank_ac: [], links: [] }); }}
                            className="text-xs px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
                        >
                            Reset Session
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5'
                                    }`}>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 border border-white/5 flex gap-2 items-center">
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black/40 border-t border-white/5">
                        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message as a scammer..."
                                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputText.trim()}
                                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-xl px-6 transition-colors"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Col: Live Analysis */}
                <div className="flex flex-col gap-6 h-full overflow-y-auto">
                    {/* Threat Meter */}
                    <div className={`rounded-2xl p-6 border ${scamDetected ? 'bg-red-500/10 border-red-500/30' : 'bg-zinc-900/30 border-white/10'}`}>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Threat Status</h3>
                        <div className="flex items-end gap-3">
                            <span className={`text-4xl font-bold ${scamDetected ? 'text-red-500' : 'text-emerald-500'}`}>
                                {scamDetected === null ? 'WAITING' : (scamDetected ? 'DETECTED' : 'SAFE')}
                            </span>
                            {scamDetected !== null && (
                                <span className="text-zinc-500 mb-1 font-mono">
                                    {Math.round(confidence * 100)}% CONFIDENCE
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Extracted Intel */}
                    <div className="flex-1 rounded-2xl bg-zinc-900/30 border border-white/10 p-6">
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Extracted Intelligence
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs text-zinc-500 font-mono block mb-2">UPI IDs</label>
                                {intel.upi.length === 0 ? (
                                    <div className="text-zinc-700 italic text-sm">No IDs captured yet</div>
                                ) : (
                                    <div className="space-y-2">
                                        {intel.upi.map((id, i) => (
                                            <div key={i} className="bg-red-500/10 text-red-400 px-3 py-2 rounded text-sm font-mono border border-red-500/20">{id}</div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 font-mono block mb-2">Bank Accounts</label>
                                {intel.bank_ac.length === 0 ? (
                                    <div className="text-zinc-700 italic text-sm">No accounts captured yet</div>
                                ) : (
                                    <div className="space-y-2">
                                        {intel.bank_ac.map((val, i) => (
                                            <div key={i} className="bg-orange-500/10 text-orange-400 px-3 py-2 rounded text-sm font-mono border border-orange-500/20">{val}</div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 font-mono block mb-2">Phishing Links</label>
                                {intel.links.length === 0 ? (
                                    <div className="text-zinc-700 italic text-sm">No links captured yet</div>
                                ) : (
                                    <div className="space-y-2">
                                        {intel.links.map((val, i) => (
                                            <div key={i} className="bg-yellow-500/10 text-yellow-400 px-3 py-2 rounded text-sm font-mono border border-yellow-500/20 break-all">{val}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-zinc-900/50 p-6 border border-white/5">
                        <p className="text-xs text-zinc-500 leading-relaxed text-center">
                            ⚠️ This is a simulated environment. Conversations are processed by Google Gemini 2.5 Flash. Do not share real personal data.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
