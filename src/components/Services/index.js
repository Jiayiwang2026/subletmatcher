export default function Services() {
    const services = [
        {
            id: 'rental',
            title: '长租房服务',
            description: '为国际学生和年轻专业人士提供全方位的住房解决方案，让您在异国他乡也能找到温馨的家。我们的服务涵盖从寻找合适住所到入住后的全程支持。',
            items: [
                {
                    icon: '🏢',
                    title: '公寓长租',
                    description: '提供1-12个月长期租赁服务，精选优质公寓，确保安全舒适的居住环境。我们与可靠的房东建立了长期合作关系，为您提供稳定的住房解决方案。'
                },
                {
                    icon: '🤝',
                    title: '室友匹配',
                    description: '智能匹配系统帮您找到合适的室友，通过详细的个人偏好分析，确保生活习惯相容。不仅降低租房成本，更能建立珍贵的友谊，提升整体居住体验。'
                },
                {
                    icon: '📋',
                    title: '租约咨询',
                    description: '专业的法律顾问团队为您审核租约条款，解读复杂的法律术语，确保您的权益得到充分保障。从签约到退房，全程提供专业指导和建议。'
                }
            ]
        },
        {
            id: 'furniture',
            title: '家居帮手',
            description: '一站式家居服务，让您的新家瞬间变得温馨舒适。从家具租赁到维修服务，我们提供全方位的家居解决方案，让您专注于学习和工作。',
            items: [
                {
                    icon: '🚚',
                    title: '家具租赁',
                    description: '精选高品质家具，提供灵活的租赁方案。无论是短期需求还是长期使用，都能找到合适的选择。拎包入住，无需承担购买大件家具的负担和搬运困扰。'
                },
                {
                    icon: '🔧',
                    title: '安装维修',
                    description: '专业技师团队提供家具安装和维修服务，解决您居住中遇到的各种问题。快速响应，专业服务，让您的生活空间始终保持最佳状态。'
                },
                {
                    icon: '🏠',
                    title: '搬家服务',
                    description: '提供专业的搬家打包服务，经验丰富的搬运团队确保您的物品安全转移。从打包到运输，从搬运到安置，让您的搬迁过程轻松无忧。'
                }
            ]
        },
        {
            id: 'storage',
            title: '寄存/转运服务',
            description: '连接全球的物流服务，为海外华人提供便捷的物品寄存和国际转运解决方案。无论是临时寄存还是跨国转运，我们都能提供安全可靠的服务。',
            items: [
                {
                    icon: '🧳',
                    title: '行李寄存',
                    description: '安全可靠的行李寄存服务，配备先进的安保系统和恒温恒湿环境。短期长期存储皆可，灵活的取存时间安排，让您的出行更加自由便捷。'
                },
                {
                    icon: '📦',
                    title: '包裹转运',
                    description: '专业的国际包裹转运服务，连接中美两地的便民桥梁。快速清关，安全运输，实时跟踪，让您的重要物品跨越千山万水，安全到达目的地。'
                }
            ]
        }
    ];

    return (
        <>
            {services.map((service, serviceIndex) => (
                <section key={service.id} className="info-section">
                    {/* 标题和介绍 */}
                    <div className="section-header">
                        <h2 className="section-title">{service.title}</h2>
                        <div className="title-underline"></div>
                        <p className="section-description">{service.description}</p>
                    </div>

                    {/* 服务项目网格 */}
                    <div className="services-grid">
                        {service.items.map((item, index) => (
                            <div key={index} className="service-item">
                                <div className="service-icon">{item.icon}</div>
                                <h3 className="service-title">{item.title}</h3>
                                <p className="service-description">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* 行动按钮 */}
                    <div className="section-action">
                        <button className="cta-button">了解更多服务详情</button>
                    </div>

                    {/* 引用文字（仅在最后一个部分显示） */}
                    {serviceIndex === services.length - 1 && (
                        <div className="quote-section">
                            <blockquote className="service-quote">
                                "我们的使命不仅仅是提供服务，而是要成为您在异国他乡最可靠的伙伴，让每一位客户都能感受到家的温暖。"
                            </blockquote>
                            <p className="quote-detail">
                                我们深知留学生活的不易，因此在每一个细节上都精益求精。无论是深夜的紧急维修，还是节假日的贴心关怀，我们都会第一时间响应您的需求。选择我们，就是选择了一个可以依靠的家。
                            </p>
                        </div>
                    )}
                </section>
            ))}

            <style jsx>{`
                .info-section {
                    padding: 80px 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: transparent;
                }

                .section-header {
                    text-align: left;
                    margin-bottom: 60px;
                }

                .section-title {
                    font-size: 48px;
                    font-weight: 300;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .title-underline {
                    width: 80px;
                    height: 3px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    margin-bottom: 30px;
                }

                .section-description {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #666;
                    max-width: 800px;
                    margin-bottom: 20px;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 40px;
                    margin-bottom: 60px;
                }

                .service-item {
                    text-align: center;
                    padding: 0;
                }

                .service-icon {
                    font-size: 64px;
                    margin-bottom: 20px;
                    display: block;
                }

                .service-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.3;
                }

                .service-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #666;
                    text-align: left;
                }

                .section-action {
                    text-align: center;
                    margin-bottom: 80px;
                }

                .cta-button {
                    padding: 15px 40px;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
                }

                .quote-section {
                    margin-top: 80px;
                    padding: 60px 40px;
                    background: rgba(247, 249, 252, 0.8);
                    border-radius: 15px;
                    text-align: center;
                }

                .service-quote {
                    font-size: 24px;
                    font-style: italic;
                    color: #333;
                    line-height: 1.5;
                    margin-bottom: 40px;
                    font-weight: 300;
                    position: relative;
                }

                .service-quote::before {
                    content: '"';
                    font-size: 80px;
                    color: #667eea;
                    position: absolute;
                    left: -20px;
                    top: -20px;
                    font-family: serif;
                }

                .quote-detail {
                    font-size: 16px;
                    line-height: 1.7;
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                    text-align: left;
                }

                @media (max-width: 768px) {
                    .info-section {
                        padding: 60px 15px;
                    }

                    .section-title {
                        font-size: 36px;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }

                    .service-item {
                        text-align: center;
                    }

                    .service-description {
                        text-align: center;
                    }

                    .quote-section {
                        padding: 40px 20px;
                    }

                    .service-quote {
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    );
}