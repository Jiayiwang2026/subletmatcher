// src/app/admin/route.js
'use client'
import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authorized) {
            fetch('/api/sublets')
                .then(res => res.json())
                .then(setData)
                .finally(() => setLoading(false));
        }
    }, [authorized]);

    if (!authorized) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>🔐 管理员登录</h2>
                <input 
                    type="password" 
                    placeholder="请输入密码"
                    onChange={(e) => {
                        if (e.target.value === 'Wjy20031211') setAuthorized(true);
                    }} 
                />
            </div>
        );
    }

    if (loading) return <div style={{ padding: '2rem' }}>📦 加载中...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>📋 房源管理后台</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>房型</th>
                        <th>时间</th>
                        <th>价格</th>
                        <th>地址</th>
                        <th>联系方式</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                            <td>{item.title || '—'}</td>
                            <td>{item.房型}</td>
                            <td>{item.转租开始时间} ~ {item.转租结束时间}</td>
                            <td>${item.价格}/月</td>
                            <td>{item.地址 || '—'}</td>
                            <td>{item.联系方式 || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
