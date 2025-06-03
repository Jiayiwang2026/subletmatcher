// src/components/HouseForm.js
'use client';

import { useState } from 'react';

export default function HouseForm() {
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        roomType: '',
        price: '',
        address: '',
        feature: '',
        contact: '',
        href: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const res = await fetch('/api/uploadListing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setMessage('✅ Listing submitted successfully!');
                setFormData({
                    title: '',
                    startDate: '',
                    endDate: '',
                    roomType: '',
                    price: '',
                    address: '',
                    feature: '',
                    contact: '',
                    href: ''
                });
            } else {
                setMessage('❌ Submission failed: ' + data.error);
            }
        } catch (err) {
            setMessage('❌ Network error, please try again later.');
        }

        setIsSubmitting(false);
    };

    return (
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>📤 Upload Your Listing</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <input name="title" placeholder="Title (e.g., Evanston Central Apartment)" value={formData.title} onChange={handleChange} required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <input name="roomType" placeholder="Room Type (e.g., 1B1B)" value={formData.roomType} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price (USD/month)" value={formData.price} onChange={handleChange} required />
                <input name="address" placeholder="Address (optional)" value={formData.address} onChange={handleChange} />
                <input name="feature" placeholder="Features (e.g., furnished, near transit)" value={formData.feature} onChange={handleChange} />
                <input name="contact" placeholder="Contact (WeChat/Email)" value={formData.contact} onChange={handleChange} required />
                <input name="href" placeholder="Listing URL (optional)" value={formData.href} onChange={handleChange} />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Submitting...' : 'Submit Listing'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
}
