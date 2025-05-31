// src/components/UploadForm.js
'use client';

import { useState } from 'react';

export default function UploadForm() {
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
                setMessage('✅ 房源提交成功！');
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
                setMessage('❌ 提交失败：' + data.error);
            }
        } catch (err) {
            setMessage('❌ 网络错误，请稍后再试。');
        }

        setIsSubmitting(false);
    };

    return (
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>📤 上传你的房源</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <input name="title" placeholder="标题（如：Evanston中心好房）" value={formData.title} onChange={handleChange} required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <input name="roomType" placeholder="房型（如：1B1B）" value={formData.roomType} onChange={handleChange} required />
                <input type="number" name="price" placeholder="价格 (USD/月)" value={formData.price} onChange={handleChange} required />
                <input name="address" placeholder="地址（可选）" value={formData.address} onChange={handleChange} />
                <input name="feature" placeholder="特色（如：包家具，近地铁）" value={formData.feature} onChange={handleChange} />
                <input name="contact" placeholder="联系方式（微信/邮箱）" value={formData.contact} onChange={handleChange} required />
                <input name="href" placeholder="房源链接（可选）" value={formData.href} onChange={handleChange} />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ 提交中...' : '提交房源'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
}
