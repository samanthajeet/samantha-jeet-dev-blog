'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { Suspense } from 'react'
import Loading from './loading'

export default function AdminStudio() {
    return (
        <Suspense fallback={<Loading />}>
            <NextStudio config={config} />
        </Suspense>
    )
} 