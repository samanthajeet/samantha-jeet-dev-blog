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
                                <h1 className="text-2xl text-primary font-permanent-marker">SAMANTHA JEET</h1>
                            </Link>
                        </div>
                        <div className="flex space-x-8">
                            <Link
                                href="/blog"
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