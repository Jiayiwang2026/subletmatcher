
// components/Contact.js
import { useState } from 'react';

export default function Contact() {
    const [publishForm, setPublishForm] = useState({
        start_date: '',
        end_date: '',
        room_type: '',
        private_bathroom: '',
        roommates_count: '',
        monthly_rent: '',
        walking_distance: '',
        location: '',
        property_description: '',
        contact_name: '',
        wechat_id: '',
        phone_number: '',
        email_address: ''
    });

    const [contactForm, setContactForm] = useState({
        name: '',
        wechat: '',
        checkin: '',
        checkout: '',
        price: '',
        roomtype: '',
        notes: ''
    });

    const handlePublishChange = (e) => {
        setPublishForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleContactChange = (e) => {
        setContactForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePublishSubmit = (e) => {
        e.preventDefault();
        alert('✅ 房源信息提交成功！我们会尽快审核并联系您。');
        setPublishForm({
            start_date: '',
            end_date: '',
            room_type: '',
            private_bathroom: '',
            roommates_count: '',
            monthly_rent: '',
            walking_distance: '',
            location: '',
            property_description: '',
            contact_name: '',
            wechat_id: '',
            phone_number: '',
            email_address: ''
        });
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert('✅ 提交成功！我们会尽快联系您。\n\n' +
            '您的信息：\n' +
            '姓名：' + contactForm.name + '\n' +
            '微信：' + contactForm.wechat + '\n' +
            '入住时间：' + contactForm.checkin + '\n' +
            '退房时间：' + contactForm.checkout);
        setContactForm({
            name: '',
            wechat: '',
            checkin: '',
            checkout: '',
            price: '',
            roomtype: '',
            notes: ''
        });
    };

    return (
        <>
            {/* Publish Section */}
            <section className="contact-section" id="publish">
                <h2 className="contact-title">🏠 发布您的房源信息</h2>
                <p className="section-subtitle">
                    有房源要转租？快速发布，让更多人看到！
                </p>
                <div className="form-container">
                    <form onSubmit={handlePublishSubmit}>
                        <div className="form-section">
                            <h3 className="form-section-title">📅 租期信息</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-start-date" className="form-label">转租开始时间 *</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        id="pub-start-date"
                                        required
                                        className="form-input"
                                        value={publishForm.start_date}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-end-date" className="form-label">转租结束时间 *</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        id="pub-end-date"
                                        required
                                        className="form-input"
                                        value={publishForm.end_date}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">🏠 房源详情</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-room-type" className="form-label">房型 *</label>
                                    <select
                                        name="room_type"
                                        id="pub-room-type"
                                        required
                                        className="form-input"
                                        value={publishForm.room_type}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">请选择房型</option>
                                        <option value="studio">Studio</option>
                                        <option value="1b1b">1B1B</option>
                                        <option value="1.5b1b">1.5B1B</option>
                                        <option value="2b1b">2B1B</option>
                                        <option value="2b2b">2B2B</option>
                                        <option value="3b2b">3B2B</option>
                                        <option value="4b2b">4B2B</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-private-bath" className="form-label">是否有独立厕所 *</label>
                                    <select
                                        name="private_bathroom"
                                        id="pub-private-bath"
                                        required
                                        className="form-input"
                                        value={publishForm.private_bathroom}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">请选择</option>
                                        <option value="yes">有独立厕所</option>
                                        <option value="no">共用厕所</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-roommates" className="form-label">有几个室友</label>
                                    <select
                                        name="roommates_count"
                                        id="pub-roommates"
                                        className="form-input"
                                        value={publishForm.roommates_count}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">请选择</option>
                                        <option value="0">没有室友（整租）</option>
                                        <option value="1">1个室友</option>
                                        <option value="2">2个室友</option>
                                        <option value="3">3个室友</option>
                                        <option value="4">4个室友</option>
                                        <option value="5+">5个或以上</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-price" className="form-label">月租价格 (USD) *</label>
                                    <input
                                        type="number"
                                        name="monthly_rent"
                                        id="pub-price"
                                        placeholder="例如: 1200"
                                        required
                                        className="form-input"
                                        min="0"
                                        value={publishForm.monthly_rent}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">📍 位置信息</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-walking-distance" className="form-label">距离学校步行时间</label>
                                    <select
                                        name="walking_distance"
                                        id="pub-walking-distance"
                                        className="form-input"
                                        value={publishForm.walking_distance}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">请选择</option>
                                        <option value="0-5min">0-5分钟</option>
                                        <option value="5-10min">5-10分钟</option>
                                        <option value="10-15min">10-15分钟</option>
                                        <option value="15-20min">15-20分钟</option>
                                        <option value="20-30min">20-30分钟</option>
                                        <option value="30min+">30分钟以上</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-address" className="form-label">大概地址/社区</label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="pub-address"
                                        placeholder="例如: Evanston, Lincoln Park"
                                        className="form-input"
                                        value={publishForm.location}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">📝 房源描述</h3>
                            <div className="form-field">
                                <label htmlFor="pub-description" className="form-label">简短介绍一下你的房源 *</label>
                                <textarea
                                    name="property_description"
                                    id="pub-description"
                                    rows="5"
                                    placeholder="请描述房源的特色、设施、周边环境等，例如：&#10;- 房间朝南采光好&#10;- 家具齐全，拎包入住&#10;- 楼下有健身房和洗衣房&#10;- 附近有超市和餐厅"
                                    required
                                    className="form-textarea"
                                    value={publishForm.property_description}
                                    onChange={handlePublishChange}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">📞 联系方式</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-name" className="form-label">您的姓名 *</label>
                                    <input
                                        type="text"
                                        name="contact_name"
                                        id="pub-name"
                                        required
                                        className="form-input"
                                        value={publishForm.contact_name}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-wechat" className="form-label">微信号 *</label>
                                    <input
                                        type="text"
                                        name="wechat_id"
                                        id="pub-wechat"
                                        required
                                        className="form-input"
                                        value={publishForm.wechat_id}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-phone" className="form-label">电话号码</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        id="pub-phone"
                                        className="form-input"
                                        value={publishForm.phone_number}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-email" className="form-label">邮箱</label>
                                    <input
                                        type="email"
                                        name="email_address"
                                        id="pub-email"
                                        className="form-input"
                                        value={publishForm.email_address}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-disclaimer">
                            <p>
                                * 为必填项目。提交后我们会审核您的房源信息，通过后将显示在平台上。我们承诺不会泄露您的个人信息。
                            </p>
                        </div>

                        <button type="submit" className="submit-btn">🚀 发布房源</button>
                    </form>
                </div>
            </section>

            {/* News Section */}
            <section className="contact-section" id="news">
                <h2 className="contact-title">最新资讯 & 租房攻略</h2>
                <div className="news-grid">
                    <div className="news-card">
                        <h3>🏠 2025年芝加哥租房市场趋势</h3>
                        <p>了解最新的租金走势、热门社区推荐和租房注意事项...</p>
                        <a href="#" className="news-link">阅读更多</a>
                    </div>
                    <div className="news-card">
                        <h3>📋 留学生租房完整指南</h3>
                        <p>从找房到签约，一步步教你在美国租房的全流程...</p>
                        <a href="#" className="news-link">阅读更多</a>
                    </div>
                    <div className="news-card">
                        <h3>💡 短租vs长租：如何选择</h3>
                        <p>分析短租和长租的优缺点，帮你做出最佳决策...</p>
                        <a href="#" className="news-link">阅读更多</a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
                <h2 className="contact-title">没找到合适的房源？<br />留下您的信息，我们为您定制寻找</h2>
                <div className="form-container">
                    <form onSubmit={handleContactSubmit}>
                        <div className="form-grid">
                            <input
                                type="text"
                                name="name"
                                placeholder="姓名"
                                required
                                className="form-input"
                                value={contactForm.name}
                                onChange={handleContactChange}
                            />
                            <input
                                type="text"
                                name="wechat"
                                placeholder="微信号"
                                required
                                className="form-input"
                                value={contactForm.wechat}
                                onChange={handleContactChange}
                            />
                            <input
                                type="date"
                                name="checkin"
                                placeholder="入住时间"
                                required
                                className="form-input"
                                value={contactForm.checkin}
                                onChange={handleContactChange}
                            />
                            <input
                                type="date"
                                name="checkout"
                                placeholder="退房时间"
                                required
                                className="form-input"
                                value={contactForm.checkout}
                                onChange={handleContactChange}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="预算范围"
                                className="form-input"
                                value={contactForm.price}
                                onChange={handleContactChange}
                            />
                            <input
                                type="text"
                                name="roomtype"
                                placeholder="期望房型"
                                className="form-input"
                                value={contactForm.roomtype}
                                onChange={handleContactChange}
                            />
                        </div>
                        <textarea
                            name="notes"
                            rows="4"
                            placeholder="其他需求和备注..."
                            className="form-textarea"
                            value={contactForm.notes}
                            onChange={handleContactChange}
                        />
                        <button type="submit" className="submit-btn">🚀 提交需求</button>
                    </form>
                </div>
            </section>

            <style jsx>{`
        .contact-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 80px 20px;
          margin-top: 60px;
        }

        .contact-title {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 40px;
          line-height: 1.4;
        }

        .section-subtitle {
          text-align: center;
          color: white;
          margin-bottom: 40px;
          font-size: 18px;
        }

        .form-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .form-section {
          margin-bottom: 30px;
        }

        .form-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          width: 100%;
          padding: 15px 20px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 16px;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          margin-bottom: 20px;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-disclaimer {
          margin-bottom: 20px;
        }

        .form-disclaimer p {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px 30px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .news-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #333;
        }

        .news-card p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .news-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .news-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }
      `}</style>
        </>
    );
}
