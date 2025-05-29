import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    // 滚动到指定区域的函数
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 处理导航点击事件
    const handleNavClick = (id) => {
        if (id === 'datahub') {
            router.push('/datahub');
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

    return (
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
                            onClick={() => handleNavClick(item.id)}
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
                        onClick={() => handleNavClick(item.id)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

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
                }

                @media (max-width: 480px) {
                    .logo-text {
                        font-size: 14px;
                    }
                }

                /* 为页面内容添加顶部间距，避免被固定header遮挡 */
                body {
                    padding-top: 70px;
                }

                @media (max-width: 768px) {
                    body {
                        padding-top: 60px;
                    }
                }
            `}</style>
        </header>
    );
}