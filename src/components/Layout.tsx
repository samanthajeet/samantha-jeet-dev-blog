import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen">
            <nav className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/" className="flex items-center text-dark">
                                <h1 className="text-2xl font-permanent-marker text-dark inline-block relative">
                                    <span className="relative z-10">SAM JEET</span>
                                    <span
                                        className={`absolute -inset-x-4 inset-y-0 block ${['bg-primary/20', 'bg-secondary/20', 'bg-tertiary/20', 'bg-retroBlue/20'][Math.floor(Math.random() * 4)]} -skew-y-3 -z-10`}
                                        aria-hidden="true"
                                    ></span>
                                </h1>
                            </Link>
                        </div>
                        <div className="flex space-x-8">
                            <Link
                                href="/blog_v2"
                                className="inline-flex items-center px-1 pt-1 text-tertiary font-sans hover:text-secondary "
                            >
                                blog
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center px-1 pt-1 text-tertiary font-sans hover:text-secondary "
                            >
                                about
                            </Link>
                            <Link
                                href="/apps"
                                className="inline-flex items-center px-1 pt-1 text-tertiary font-sans hover:text-secondary "
                            >
                                apps
                            </Link>

                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
            <footer className="bg-light">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-dark text-sm">
                        <p>&copy; {new Date().getFullYear()} Samantha Jeet. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 