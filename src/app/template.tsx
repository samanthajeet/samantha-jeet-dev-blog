import Layout from '@/components/Layout'

export default function Template({ children }: { children: React.ReactNode }) {
    // Don't wrap admin routes with the main layout
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        return children
    }

    return <Layout>{children}</Layout>
} 