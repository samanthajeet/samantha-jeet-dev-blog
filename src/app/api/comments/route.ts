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

        // Create the comment first
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

        // Then update the post to include this comment
        await client
            .patch(postId)
            .setIfMissing({ comments: [] })
            .append('comments', [{
                _type: 'reference',
                _ref: comment._id
            }])
            .commit()

        return NextResponse.json({ message: 'Comment created successfully' })
    } catch (error) {
        console.error('Error creating comment:', error)
        return NextResponse.json(
            { error: 'Error creating comment' },
            { status: 500 }
        )
    }
} 