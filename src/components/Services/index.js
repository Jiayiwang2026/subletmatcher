export default function Services() {
    const services = [
        {
            icon: '🏢',
            title: '公寓长租',
            description: '提供1-12个月长期租赁服务，精选优质公寓，确保安全舒适的居住环境。'
        },
        {
            icon: '🤝',
            title: '室友匹配',
            description: '智能匹配系统帮您找到合适的室友，降低租房成本，提升居住体验。'
        },
        {
            icon: '📋',
            title: '租约咨询',
            description: '专业的法律顾问团队为您审核租约条款，保障您的租房权益。'
        },
        {
            icon: '🚚',
            title: '家具租赁',
            description: '精选高品质家具，提供灵活的租赁方案，拎包入住无需购买大件家具。'
        },
        {
            icon: '🔧',
            title: '安装维修',
            description: '专业技师团队提供家具安装和维修服务，快速响应各种居住问题。'
        },
        {
            icon: '🏠',
            title: '搬家服务',
            description: '提供专业的搬家打包服务，让您的搬迁过程轻松无忧。'
        },
        {
            icon: '🧳',
            title: '行李寄存',
            description: '安全可靠的行李寄存服务，配备先进安保系统，灵活存取时间。'
        },
        {
            icon: '📦',
            title: '包裹转运',
            description: '专业的国际包裹转运服务，连接中美两地，安全快速到达。'
        }
    ];

    // 滚动到指定区域的函数（与Header组件中相同的实现）
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleServiceClick = (serviceName) => {
        // 滚动到联系我们区域
        scrollToSection('contact');

        // 可选：在滚动后设置一些状态或存储用户选择的服务
        // 比如存储到localStorage或状态管理中
        localStorage.setItem('selectedService', serviceName);
    };

    const handleMainCTAClick = () => {
        // 主按钮点击，滚动到联系我们区域
        scrollToSection('contact');
    };

    return (
        <div className="services-container">
            {/* 主标题部分 */}
            <div className="hero-section">
                <h1 className="main-title">全方位生活服务</h1>
                <div className="title-underline"></div>
                <p className="main-description">
                    为国际学生和年轻专业人士提供一站式生活解决方案，让您在异国他乡也能享受便捷舒适的生活体验。
                    从住房到家居，从寄存到转运，我们用心服务每一个细节。
                </p>
            </div>

            {/* 服务网格 */}
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                        <button className="service-button">了解详情</button>
                    </div>
                ))}
            </div>

            {/* 底部行动区域 */}
            <div className="bottom-action">
                <div className="action-content">
                    <h2>准备开始您的便捷生活？</h2>
                    <p>我们的专业团队随时为您提供个性化的服务方案</p>
                    <button
                        className="main-cta-button"
                        onClick={handleMainCTAClick}
                    >
                        立即咨询所有服务
                    </button>
                </div>
            </div>

            <style jsx>{`
                .services-container {
                    min-height: 100vh;
                    padding: 40px 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                    background: transparent;
                }

                .hero-section {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .main-title {
                    font-size: 42px;
                    font-weight: 300;
                    color: #333;
                    margin-bottom: 15px;
                    line-height: 1.2;
                }

                .title-underline {
                    width: 80px;
                    height: 3px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    margin: 0 auto 25px;
                }

                .main-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #2d3748;
                    max-width: 800px;
                    margin: 0 auto;
                    font-weight: 500;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                    margin-bottom: 80px;
                }

                .service-card {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    padding: 20px 15px;
                    text-align: center;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    height: fit-content;
                }

                .service-card:hover {
                    transform: translateY(-8px);
                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
                }

                .service-card:active {
                    transform: translateY(-4px);
                }

                .service-icon {
                    font-size: 38px;
                    margin-bottom: 14px;
                    display: block;
                }

                .service-title {
                    font-size: 19px;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 10px;
                    line-height: 1.3;
                }

                .service-description {
                    font-size: 14px;
                    line-height: 1.5;
                    color: #2d3748;
                    margin-bottom: 0;
                    font-weight: 500;
                }

                .bottom-action {
                    text-align: center;
                    padding: 60px 40px;
                    background: rgba(247, 249, 252, 0.8);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }

                .action-content h2 {
                    font-size: 32px;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 16px;
                }

                .action-content p {
                    font-size: 18px;
                    color: #2d3748;
                    margin-bottom: 32px;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .main-cta-button {
                    padding: 16px 48px;
                    font-size: 18px;
                    font-weight: 600;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .main-cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
                }

                @media (max-width: 768px) {
                    .services-container {
                        padding: 30px 15px;
                    }

                    .main-title {
                        font-size: 32px;
                    }

                    .main-description {
                        font-size: 15px;
                    }

                    .services-grid {
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                        margin-bottom: 50px;
                    }

                    .service-card {
                        padding: 18px 12px;
                    }

                    .service-icon {
                        font-size: 34px;
                        margin-bottom: 12px;
                    }

                    .service-title {
                        font-size: 17px;
                        margin-bottom: 8px;
                    }

                    .service-description {
                        font-size: 13px;
                    }

                    .service-description {
                        height: auto;
                        min-height: 50px;
                    }

                    .bottom-action {
                        padding: 40px 20px;
                    }

                    .action-content h2 {
                        font-size: 26px;
                    }

                    .main-cta-button {
                        padding: 14px 32px;
                        font-size: 16px;
                    }
                }

                @media (max-width: 480px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                    }

                    .main-title {
                        font-size: 36px;
                    }
                }
            `}</style>
        </div>
    );
}