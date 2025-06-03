// src/app/upload/page.js
'use client'

import Script from 'next/script'
import HouseForm from '@/components/HouseForm'

export default function UploadPage() {
    return (
        <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>📮 Post a Listing</h1>
            <HouseForm />
        </div>
    )
}
