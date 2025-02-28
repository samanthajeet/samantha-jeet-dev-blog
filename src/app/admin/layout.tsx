import './globals.css'

export const metadata = {
    title: 'Admin - Sanity Studio',
    description: 'Content management for your website',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen w-screen">
            {children}
        </div>
    )
} 