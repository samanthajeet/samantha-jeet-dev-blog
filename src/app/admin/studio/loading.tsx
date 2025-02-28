export default function Loading() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-t-brand-coral border-b-brand-sage rounded-full animate-spin"></div>
                <p className="text-lg text-brand-navy">Loading Sanity Studio...</p>
            </div>
        </div>
    )
} 