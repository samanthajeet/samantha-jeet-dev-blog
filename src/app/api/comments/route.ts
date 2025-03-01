import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function POST(req: Request) {
    try {
        const { name, email, text, postId } = await req.json()

        // Check all required fields
        if (!name || !email || !text || !postId) {
            return NextResponse.json(
                {
                    error: `Missing required field${[name, email, text, postId].filter(field => !field).length > 1 ? 's' : ''}: ${[
                        !name && 'name',
                        !email && 'email',
                        !text && 'text',
                        !postId && 'postId'
                    ].filter(Boolean).join(', ')}`
                },
                { status: 400 }
            )
        }

        const comment = await client.create({
            _type: 'comment',
            name,
            email,
            text,
            title: `Comment by ${name}`, // Add a title for the Sanity Studio preview
            post: {
                _type: 'reference',
                _ref: postId
            },
            approved: false, // Comments need approval by default
            createdAt: new Date().toISOString(),
        })

        return NextResponse.json({ message: 'Comment submitted', comment })
    } catch (error) {
        console.error('Error submitting comment:', error)
        return NextResponse.json(
            { error: 'Error submitting comment' },
            { status: 500 }
        )
    }
} 