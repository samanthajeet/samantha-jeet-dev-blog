'use client'

import { useState, useEffect } from 'react'

interface CommentFormProps {
    postId: string
}

const initialFormState = {
    name: '',
    email: '',
    text: ''
}

export default function CommentForm({ postId }: CommentFormProps) {
    const [mounted, setMounted] = useState(false)
    const [formData, setFormData] = useState(initialFormState)
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null // or a loading placeholder
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')
        setError(null)

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    postId,
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to submit comment')
            }

            setStatus('success')
            setFormData(initialFormState)
        } catch (err) {
            setStatus('error')
            setError(err instanceof Error ? err.message : 'Failed to submit comment')
        }
    }

    return (
        <div className="mt-16 pt-8 border-t border-brand-navy/10">
            <h2 className="text-2xl font-permanent-marker text-brand-navy mb-8 relative inline-block">
                <span className="relative z-10">Leave a Comment</span>
                <span
                    className="absolute -inset-x-2 inset-y-0 block bg-secondary/20 -skew-y-3 -z-0"
                    aria-hidden="true"
                ></span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-dark mb-2"
                    >
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border-2 border-dark/10 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                        required
                        minLength={2}
                        disabled={status === 'submitting'}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-dark mb-2"
                    >
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border-2 border-dark/10 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter a valid email address"
                        disabled={status === 'submitting'}
                    />
                </div>

                <div>
                    <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-dark mb-2"
                    >
                        Comment *
                    </label>
                    <textarea
                        id="comment"
                        value={formData.text}
                        onChange={(e) => {
                            // Remove HTML tags, URLs, code patterns and extra spaces
                            const sanitized = e.target.value
                                .replace(/<[^>]*>/g, '') // Remove HTML tags
                                .replace(/https?:\/\/\S+/g, '') // Remove URLs
                                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                            setFormData(prev => ({ ...prev, text: sanitized }));
                        }}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border-2 border-dark/10 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                        required
                        minLength={10}
                        maxLength={300}
                        disabled={status === 'submitting'}
                        placeholder="Share your thoughts (no HTML, links, code snippets or extra spaces allowed)"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-dark text-light px-6 py-2 rounded-lg hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Comment'}
                </button>

                {status === 'success' && (
                    <p className="text-green-600 text-sm">
                        Thank you for your comment! It will appear once approved.
                    </p>
                )}
            </form>
        </div>
    )
} 