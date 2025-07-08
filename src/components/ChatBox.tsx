'use client'

import { useState, useRef, useEffect } from 'react';

// Retro pixel avatar SVGs
const SamAvatar = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#84a59d" />
        <rect x="10" y="10" width="20" height="20" rx="4" fill="#f6bd60" />
        <rect x="16" y="16" width="8" height="8" rx="2" fill="#2f3e46" />
        <rect x="18" y="18" width="2" height="2" fill="#fff" />
        <rect x="20" y="18" width="2" height="2" fill="#fff" />
        <rect x="18" y="22" width="4" height="2" fill="#f28482" />
    </svg>
);
const UserAvatar = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#00b4d8" />
        <rect x="12" y="12" width="16" height="16" rx="4" fill="#fff" />
        <rect x="16" y="18" width="8" height="4" rx="2" fill="#2f3e46" />
        <rect x="18" y="22" width="4" height="2" fill="#f28482" />
    </svg>
);

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const MESSAGE_LIMIT = 10; // Set your desired limit

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Sam Jeet. Ask me anything about myself, my career, or my interests! Or ask me to start a conversation! I'm excited to chat with you! 🚀",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [limitReached, setLimitReached] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        // On mount, check if the user already hit the limit
        const sentCount = Number(localStorage.getItem('askSamMessageCount') || '0');
        if (sentCount >= MESSAGE_LIMIT) {
            setLimitReached(true);
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const sentCount = Number(localStorage.getItem('askSamMessageCount') || '0');
        if (sentCount >= MESSAGE_LIMIT) {
            setLimitReached(true);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: "Ah, looks like I've met my AI Token limit and can't answer any more questions.",
                    isUser: false,
                    timestamp: new Date()
                }
            ]);
            setInputMessage('');
            return;
        }
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            text: inputMessage,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);
        localStorage.setItem('askSamMessageCount', (sentCount + 1).toString());

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble responding right now. Please try again!",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto border-[3px] border-[#b4b4b4] rounded-md bg-[#e9e9e9] shadow-[2px_2px_0_#b4b4b4] font-[system-ui,monospace]">
            {/* AIM Title Bar */}
            <div className="flex items-center justify-between bg-[#1a6ed8] h-8 px-3 border-b-[2px] border-[#b4b4b4]">
                <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-sm tracking-wide select-none">Ask Sam : Chat</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#f6bd60] border border-[#b4b4b4] rounded-sm" />
                    <div className="w-3 h-3 bg-[#84a59d] border border-[#b4b4b4] rounded-sm" />
                    <div className="w-3 h-3 bg-[#f28482] border border-[#b4b4b4] rounded-sm" />
                </div>
            </div>

            {/* Message Area */}
            <div className="flex bg-white border-b-[2px] border-[#b4b4b4]" style={{ height: 320 }}>
                {/* Buddy List/Avatars */}
                <div className="flex flex-col items-center pt-2 px-2 bg-[#e0eafc] border-r-[2px] border-[#b4b4b4] min-w-[56px]">
                    <SamAvatar />
                    <div className="mt-4"><UserAvatar /></div>
                </div>
                {/* Messages */}
                <div
                    className="flex-1 flex flex-col justify-end overflow-y-auto p-3 scrollbar-thumb-[#b4b4b4] scrollbar-track-[#e0eafc]"
                    style={{ fontFamily: 'monospace', fontSize: '15px', maxHeight: 320, minHeight: 320 }}
                >
                    {messages.map((message) => (
                        <div key={message.id} className="flex items-start mb-2">
                            {message.isUser ? (
                                <>
                                    <span className="font-bold text-[15px] text-[#d7263d] mr-2 select-none">You:</span>
                                    <span className="text-black whitespace-pre-line">{message.text}</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-bold text-[15px] text-[#1a6ed8] mr-2 select-none">SamJeet:</span>
                                    <span className="text-black whitespace-pre-line">{message.text}</span>
                                </>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start mb-2">
                            <span className="font-bold text-[15px] text-[#1a6ed8] mr-2 select-none">SamJeet:</span>
                            <span className="text-black">...
                                <span className="animate-pulse">_</span>
                            </span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center bg-[#f4f4f4] border-b-[2px] border-[#b4b4b4] px-2 h-8">
                <button className="w-6 h-6 flex items-center justify-center mr-1"><span className="font-bold text-lg">A</span></button>
                <button className="w-6 h-6 flex items-center justify-center mr-1"><span className="italic text-lg">A</span></button>
                <button className="w-6 h-6 flex items-center justify-center mr-1"><span className="underline text-lg">A</span></button>
                <button className="w-6 h-6 flex items-center justify-center mr-1">😊</button>
                <button className="w-6 h-6 flex items-center justify-center mr-1">🎲</button>
                <button className="w-6 h-6 flex items-center justify-center mr-1">📎</button>
                <div className="flex-1" />
                <button className="w-6 h-6 flex items-center justify-center mr-1"><span className="text-[#1a6ed8]">🔗</span></button>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex items-end bg-[#f4f4f4] px-2 py-2">
                <textarea
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder={limitReached ? "AI Token limit reached." : "Type a message..."}
                    className="flex-1 resize-none border-[2px] border-[#b4b4b4] rounded-sm bg-white px-2 py-1 text-[15px] font-mono focus:outline-none focus:border-[#1a6ed8]"
                    rows={2}
                    disabled={isLoading || limitReached}
                />
                <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading || limitReached}
                    className="ml-2 px-4 py-2 bg-[#e0eafc] border-[2px] border-[#b4b4b4] rounded-sm font-bold text-[#1a6ed8] shadow-[1px_1px_0_#b4b4b4] hover:bg-[#d6e0f5] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

// Add to your global CSS if you want a more custom retro scrollbar:
// .scrollbar-thin::-webkit-scrollbar { width: 8px; }
// .scrollbar-thin::-webkit-scrollbar-thumb { background: #b4b4b4; border-radius: 4px; }
// .scrollbar-thin::-webkit-scrollbar-track { background: #e0eafc; } 