'use client'

import { Comment } from '@/types'
import { useState } from 'react'
import { parseISO, format } from 'date-fns'

interface CommentsProps {
    comments: Comment[]
}

const formatDate = (date: string) => {
    return format(parseISO(date), 'MMMM dd, yyyy')
}

export default function Comments({ comments }: CommentsProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const displayComments = isExpanded ? comments : comments.slice(0, 3)
    const hasMoreComments = comments.length > 3

    return (
        <div className="mt-16 pt-8 border-t border-dark/10">
            <h2 className="text-2xl font-permanent-marker text-dark mb-8 relative inline-block">
                <span className="relative z-10">Comments ({comments.length})</span>
                <span
                    className="absolute -inset-x-2 inset-y-0 block bg-secondary/20 -skew-y-3 -z-0"
                    aria-hidden="true"
                ></span>
            </h2>

            <div className="space-y-6">
                {displayComments.map((comment) => (
                    <div
                        key={comment._id}
                        className="bg-white p-6 rounded-lg shadow-sm border-2 border-dark/10"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-dark">
                                {comment.name}
                            </h3>
                            <span className="text-xs text-secondary font-mono">
                                {formatDate(comment.createdAt)}
                            </span>
                        </div>
                        <p className="text--dark/80 whitespace-pre-line">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>

            {hasMoreComments && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                    {isExpanded ? 'Show Less' : `Show All Comments (${comments.length})`}
                </button>
            )}
        </div>
    )
} 