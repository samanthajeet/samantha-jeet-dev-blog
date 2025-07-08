import ChatBox from '@/components/ChatBox';

export default function AskSamPage() {
    return (
        <div className="py-12 px-4">
            {/* Header Section */}
            <div className="flex justify-center mb-12">
                <h1 className="text-5xl font-bold text-center font-permanent-marker text-dark inline-block relative">
                    <span className="relative z-10">Ask Sam</span>
                    <span
                        className="absolute -inset-x-4 inset-y-0 block bg-retroBlue/20 -skew-y-3 -z-10"
                        aria-hidden="true"
                    ></span>
                </h1>
            </div>

            {/* Profile Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-lg shadow-lg border-2 border-dark/10 p-8">
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-dark leading-relaxed">
                            This chatbot is built with React, TypeScript and Claude AI. It responds naturally as Sam,
                            drawing from my background and experiences. Feel free to ask about my career journey,
                            tech stack, teaching experiences, or life! Please note that as an AI system, responses
                            may not always be 100% accurate and should not be considered official statements.
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <ChatBox />
            </div>

            {/* Info Section */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg border-2 border-dark/10 p-8">
                    <h2 className="text-3xl font-bold text-dark mb-6 text-center font-permanent-marker">
                        <span className="relative z-10 inline-block">
                            What can you ask me about?
                            <span
                                className="absolute -inset-x-4 inset-y-0 block bg-primary/20 -skew-y-2 -z-10"
                                aria-hidden="true"
                            ></span>
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-dark">
                                <span className="relative z-10 inline-block">
                                    My Career
                                    <span
                                        className="absolute -inset-x-2 inset-y-0 block bg-retroBlue/20 -skew-y-1 -z-10"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            </h3>
                            <ul className="space-y-2 text-dark">
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    My journey from GIS to software engineering
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Experience at Pluralsight and SixFifty
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Teaching and mentoring at DevMountain
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    My work with Tech-Moms
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Technologies I work with
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-dark">
                                <span className="relative z-10 inline-block">
                                    Personal Life
                                    <span
                                        className="absolute -inset-x-2 inset-y-0 block bg-tertiary/20 -skew-y-1 -z-10"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            </h3>
                            <ul className="space-y-2 text-dark">
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Growing up in the Pacific islands
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    My love for Spam and rice
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Travel adventures around the world
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    Hobbies like analog photography
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    My family and daily life
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-light border-2 border-dark/10 rounded-lg">
                        <p className="text-dark text-center font-medium">
                            💡 <strong>Pro tip:</strong> I love talking about my experiences, so don&apos;t be shy!
                            Ask me anything from my coding journey to my favorite Bob&apos;s Burgers episodes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
