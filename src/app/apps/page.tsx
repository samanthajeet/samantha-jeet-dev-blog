import Link from 'next/link';
import Image from 'next/image';

interface App {
    id: string;
    title: string;
    description: string;
    image: string;
    tech: string[];
    status: 'live' | 'coming-soon';
}

const apps: App[] = [
    {
        id: 'askSam',
        title: 'Ask Sam',
        description: 'A fully functional AI chatbot built with React, TypeScript and Claude AI',
        image: '/images/askSam.png',
        tech: ['React', 'TypeScript', 'Claude AI'],
        status: 'live'
    },
];

export default function AppsPage() {
    return (
        <div className="py-12 px-4">
            <div className="flex justify-center mb-12">
                <h1 className="text-5xl font-bold text-center font-permanent-marker text-dark inline-block relative">
                    <span className="relative z-10">My Apps</span>
                    <span
                        className="absolute -inset-x-4 inset-y-0 block bg-primary/20 -skew-y-3 -z-10"
                        aria-hidden="true"
                    />
                </h1>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {apps.map((app) => (
                    <article
                        key={app.id}
                        className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300 border-2 border-dark/10"
                    >
                        <div className="relative aspect-video">
                            <div className="absolute inset-0 bg-dark/5 group-hover:bg-transparent transition-colors duration-300 z-10" />
                            <Image
                                src={app.image}
                                alt={app.title}
                                fill
                                className="object-cover filter saturate-[0.9] group-hover:saturate-100 transition-all duration-300"
                            />
                            {app.status === 'coming-soon' && (
                                <div className="absolute top-2 right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                                    Coming Soon
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <h2 className="text-xl font-bold mb-2 text-dark font-sans">
                                {app.title}
                            </h2>

                            <p className="text-dark/80 text-sm mb-4 flex-1">
                                {app.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {app.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 bg-tertiary/20 text-tertiary rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                {app.status === 'live' ? (
                                    <>
                                        <Link
                                            href={`/apps/${app.id}`}
                                            className="flex-1 bg-primary text-dark text-center py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                        >
                                            Try App
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        disabled
                                        className="flex-1 bg-gray-300 text-gray-500 text-center py-2 px-4 rounded-lg cursor-not-allowed text-sm"
                                    >
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}