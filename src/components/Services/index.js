export default function Services() {
    const services = [
        {
            id: 'rental',
            title: '长租房服务',
            items: [
                {
                    icon: '🏢',
                    title: '公寓长租',
                    description: '提供1-12个月长期租赁服务，稳定住房解决方案',
                    buttonText: '了解详情'
                },
                {
                    icon: '🤝',
                    title: '室友匹配',
                    description: '智能匹配合适室友，降低租房成本，提升居住体验',
                    buttonText: '立即匹配'
                },
                {
                    icon: '📋',
                    title: '租约咨询',
                    description: '专业租约审核和咨询服务，保障您的租房权益',
                    buttonText: '预约咨询'
                }
            ]
        },
        {
            id: 'furniture',
            title: '家居帮手',
            items: [
                {
                    icon: '🚚',
                    title: '家具租赁',
                    description: '短期家具租赁服务，拎包入住无需购买大件家具',
                    buttonText: '浏览家具'
                },
                {
                    icon: '🔧',
                    title: '安装维修',
                    description: '专业家具安装和维修服务，解决居住中的各种问题',
                    buttonText: '预约服务'
                },
                {
                    icon: '🏠',
                    title: '搬家服务',
                    description: '提供专业搬家打包服务，让您轻松搬迁',
                    buttonText: '获取报价'
                }
            ]
        },
        {
            id: 'storage',
            title: '寄存/转运服务',
            items: [
                {
                    icon: '🧳',
                    title: '行李寄存',
                    description: '安全可靠的行李寄存服务，短期长期存储皆可',
                    buttonText: '查看价格'
                },
                {
                    icon: '📦',
                    title: '包裹转运',
                    description: '国际包裹转运服务，连接中美两地的桥梁',
                    buttonText: '计算费用'
                }
            ]
        }
    ];

    return (
        <>
            {services.map((service) => (
                <section key={service.id} id={service.id} className="info-section">
                    <h2 className="section-title">{service.title}</h2>
                    <div className="services-info">
                        {service.items.map((item, index) => (
                            <div key={index} className="service-info-item">
                                <div className="service-icon">{item.icon}</div>
                                <div className="service-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <button className="service-btn">{item.buttonText}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <style jsx>{`
        .info-section {
          padding: 60px 20px;
          margin: 0;
          background: transparent;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          font-weight: 700;
          color: #333;
          margin-bottom: 40px;
        }

        .services-info {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .service-info-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .service-info-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.2);
        }

        .service-icon {
          font-size: 48px;
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .service-content {
          flex: 1;
        }

        .service-content h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #333;
        }

        .service-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .service-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .service-info-item {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .service-icon {
            align-self: center;
          }
        }
      `}</style>
        </>
    );
}