import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFeatureName, setModalFeatureName] = useState('');
    const router = useRouter();

    // 滚动到指定区域的函数
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 使用mailto发送邮件
    const sendEmailWithMailto = (featureName) => {
        const subject = encodeURIComponent(`咨询功能：${featureName}`);
        const body = encodeURIComponent(
            `您好，\n\n我对 ${featureName} 功能很感兴趣，希望了解更多信息。\n\n功能名称：${featureName}\n咨询时间：${new Date().toLocaleString('zh-CN')}\n\n期待您的回复！`
        );
        const mailtoUrl = `mailto:subletmatcher@gmail.com?subject=${subject}&body=${body}`;

        // 打开用户的默认邮件客户端
        window.location.href = mailtoUrl;

        return true; // mailto总是"成功"的，因为它只是打开邮件客户端
    };

    // 打开弹窗并准备发送邮件
    const openModalAndPrepareEmail = (featureName) => {
        setModalFeatureName(featureName);
        setIsModalOpen(true);

        // 防止背景滚动
        document.body.style.overflow = 'hidden';
    };

    // 关闭弹窗
    const closeModal = () => {
        setIsModalOpen(false);
        setModalFeatureName('');
        // 恢复背景滚动
        document.body.style.overflow = 'auto';
    };

    // 处理邮件发送按钮点击
    const handleSendEmail = () => {
        sendEmailWithMailto(modalFeatureName);
        // 可以选择是否在发送后关闭弹窗
        // closeModal();
    };

    // 处理导航点击事件
    const handleNavClick = (id, name) => {
        if (id === 'datahub') {
            router.push('/datahub');
            return;
        }

        // 检查是否是开发中的功能
        if (id === 'home-services' || id === 'storage-shipping') {
            openModalAndPrepareEmail(name);
            setIsMobileMenuOpen(false);
            return;
        }

        scrollToSection(id);
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { name: '转租房源', id: 'datahub' },
        { name: '家居帮手', id: 'home-services' },
        { name: '寄存/转运', id: 'storage-shipping' },
        { name: 'News', id: 'news' },
        { name: '发布房源', id: 'publish-listing' },
        { name: '联系我们', id: 'contact' },
        { name: '打赏', id: 'donation' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // ESC键关闭弹窗
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    // 渲染弹窗内容
    const renderModalContent = () => {
        return (
            <>
                <div className="modal-icon">
                    📧
                </div>
                <div className="modal-title">功能开发中</div>
                <div className="modal-subtitle">感谢您使用 SubletMatcher</div>
                <div className="modal-content">
                    <strong>{modalFeatureName}</strong> 功能还在开发中，我们很期待为您提供这项服务！
                    <br /><br />
                    点击下方按钮将打开您的邮件客户端，我们已经为您准备好了咨询邮件模板。
                </div>
                <div className="contact-info">
                    <div className="contact-label">我们的邮箱：</div>
                    <div className="contact-email">subletmatcher@gmail.com</div>
                </div>
                <div className="modal-buttons">
                    <button className="btn btn-primary" onClick={handleSendEmail}>
                        发送咨询邮件
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                        稍后联系
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    {/* Logo部分 */}
                    <div className="logo">
                        <span className="logo-text">SubletMatcher 智能匹配找房</span>
                    </div>

                    {/* 桌面端导航 */}
                    <nav className="desktop-nav">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className="nav-item"
                                onClick={() => handleNavClick(item.id, item.name)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* 移动端菜单按钮 */}
                    <button
                        className="mobile-menu-button"
                        onClick={toggleMobileMenu}
                    >
                        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

                {/* 移动端导航菜单 */}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className="mobile-nav-item"
                            onClick={() => handleNavClick(item.id, item.name)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </header>

            {/* 弹窗组件 */}
            {isModalOpen && (
                <div
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="modal">
                        <button className="close-btn" onClick={closeModal}>
                            &times;
                        </button>
                        {renderModalContent()}
                    </div>
                </div>
            )}

            <style jsx>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(139, 126, 244, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 70px;
                }

                .logo {
                    flex-shrink: 0;
                }

                .logo-text {
                    font-size: 18px;
                    font-weight: 600;
                    color: white;
                    text-decoration: none;
                    letter-spacing: 0.5px;
                }

                .desktop-nav {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 8px 0;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .nav-item:hover {
                    color: rgba(255, 255, 255, 0.8);
                    transform: translateY(-1px);
                }

                .nav-item::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: white;
                    transition: width 0.3s ease;
                }

                .nav-item:hover::after {
                    width: 100%;
                }

                .mobile-menu-button {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                }

                .hamburger {
                    display: flex;
                    flex-direction: column;
                    width: 24px;
                    height: 18px;
                    position: relative;
                }

                .hamburger span {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background: white;
                    transition: all 0.3s ease;
                    transform-origin: center;
                }

                .hamburger span:nth-child(1) {
                    margin-bottom: 6px;
                }

                .hamburger span:nth-child(2) {
                    margin-bottom: 6px;
                }

                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }

                .mobile-nav {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(139, 126, 244, 0.98);
                    backdrop-filter: blur(20px);
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .mobile-nav.open {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }

                .mobile-nav-item {
                    display: block;
                    width: 100%;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 16px 20px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .mobile-nav-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                    padding-left: 30px;
                }

                .mobile-nav-item:last-child {
                    border-bottom: none;
                }

                /* 弹窗样式 */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .modal {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                    text-align: center;
                }

                @keyframes slideIn {
                    from {
                        transform: scale(0.7) translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1) translateY(0);
                        opacity: 1;
                    }
                }

                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .close-btn:hover {
                    color: #333;
                }

                .modal-icon {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 20px;
                    background: linear-gradient(135deg, #8b7ef4 0%, #667eea 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    color: white;
                }

                .modal-title {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                .modal-subtitle {
                    font-size: 16px;
                    color: #8b7ef4;
                    margin-bottom: 20px;
                    font-weight: 500;
                }

                .modal-content {
                    font-size: 16px;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 25px;
                    text-align: left;
                }

                .contact-info {
                    background: #f8f9ff;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 25px;
                    border-left: 4px solid #8b7ef4;
                    text-align: left;
                }

                .contact-label {
                    font-size: 14px;
                    color: #888;
                    margin-bottom: 8px;
                }

                .contact-email {
                    font-size: 16px;
                    color: #8b7ef4;
                    font-weight: 500;
                    word-break: break-all;
                }

                .modal-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                }

                .btn {
                    padding: 12px 30px;
                    border-radius: 25px;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .btn-primary {
                    background: linear-gradient(135deg, #8b7ef4 0%, #667eea 100%);
                    color: white;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(139, 126, 244, 0.4);
                }

                .btn-secondary {
                    background: #f0f0f0;
                    color: #666;
                }

                .btn-secondary:hover {
                    background: #e0e0e0;
                }

                /* 响应式设计 */
                @media (max-width: 768px) {
                    .header-container {
                        padding: 0 15px;
                        height: 60px;
                    }

                    .logo-text {
                        font-size: 16px;
                    }

                    .desktop-nav {
                        display: none;
                    }

                    .mobile-menu-button {
                        display: block;
                    }

                    .modal {
                        padding: 30px 20px;
                        margin: 20px;
                    }

                    .modal-buttons {
                        flex-direction: column;
                    }

                    .btn {
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .logo-text {
                        font-size: 14px;
                    }
                }

                /* 为页面内容添加顶部间距，避免被固定header遮挡 */
                :global(body) {
                    padding-top: 70px;
                }

                @media (max-width: 768px) {
                    :global(body) {
                        padding-top: 60px;
                    }
                }
            `}</style>
        </>
    );
}