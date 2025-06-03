'use client';
import { useState } from 'react';
import axios from 'axios';

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

    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handlePublishSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = {
                ...publishForm,
                monthly_rent: Number(publishForm.monthly_rent)
            };

            const response = await axios.post('http://localhost:5000/api/listings', formData);
            
            if (response.status === 201) {
                alert('✅ Listing submitted successfully! We will review and contact you soon.');
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
            }
        } catch (error) {
            console.error('Error submitting listing:', error);
            let errorMessage = 'Submission failed, please try again later.';
            if (error.response?.data?.error) {
                errorMessage += '\nError: ' + error.response.data.error;
            } else if (error.message === 'Network Error') {
                errorMessage += '\nNetwork connection error, please check your internet connection.';
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert('✅ Submitted successfully! We will contact you soon.\n\n' +
            'Your Information:\n' +
            'Name: ' + contactForm.name + '\n' +
            'WeChat: ' + contactForm.wechat + '\n' +
            'Check-in: ' + contactForm.checkin + '\n' +
            'Check-out: ' + contactForm.checkout);
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
                <h2 className="contact-title">🏠 Post Your Listing</h2>
                <p className="section-subtitle">
                    Have a place to sublet? Post it quickly and reach more people!
                </p>
                <div className="form-container">
                    <form onSubmit={handlePublishSubmit}>
                        <div className="form-section">
                            <h3 className="form-section-title">📅 Lease Period</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-start-date" className="form-label">Start Date *</label>
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
                                    <label htmlFor="pub-end-date" className="form-label">End Date *</label>
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
                            <h3 className="form-section-title">🏠 Property Details</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-room-type" className="form-label">Room Type *</label>
                                    <select
                                        name="room_type"
                                        id="pub-room-type"
                                        required
                                        className="form-input"
                                        value={publishForm.room_type}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">Select Room Type</option>
                                        <option value="studio">Studio</option>
                                        <option value="1b1b">1B1B</option>
                                        <option value="1.5b1b">1.5B1B</option>
                                        <option value="2b1b">2B1B</option>
                                        <option value="2b2b">2B2B</option>
                                        <option value="3b2b">3B2B</option>
                                        <option value="4b2b">4B2B</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-private-bath" className="form-label">Private Bathroom *</label>
                                    <select
                                        name="private_bathroom"
                                        id="pub-private-bath"
                                        required
                                        className="form-input"
                                        value={publishForm.private_bathroom}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Private Bathroom</option>
                                        <option value="no">Shared Bathroom</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-roommates" className="form-label">Number of Roommates</label>
                                    <select
                                        name="roommates_count"
                                        id="pub-roommates"
                                        className="form-input"
                                        value={publishForm.roommates_count}
                                        onChange={handlePublishChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="0">No Roommates (Entire Unit)</option>
                                        <option value="1">1 Roommate</option>
                                        <option value="2">2 Roommates</option>
                                        <option value="3">3 Roommates</option>
                                        <option value="4+">4+ Roommates</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-rent" className="form-label">Monthly Rent (USD) *</label>
                                    <input
                                        type="number"
                                        name="monthly_rent"
                                        id="pub-rent"
                                        required
                                        min="0"
                                        className="form-input"
                                        value={publishForm.monthly_rent}
                                        onChange={handlePublishChange}
                                        placeholder="e.g., 1200"
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-distance" className="form-label">Walking Distance to Campus (min)</label>
                                    <input
                                        type="number"
                                        name="walking_distance"
                                        id="pub-distance"
                                        min="0"
                                        className="form-input"
                                        value={publishForm.walking_distance}
                                        onChange={handlePublishChange}
                                        placeholder="e.g., 15"
                                    />
                                </div>
                                <div className="form-field full-width">
                                    <label htmlFor="pub-location" className="form-label">Address *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="pub-location"
                                        required
                                        className="form-input"
                                        value={publishForm.location}
                                        onChange={handlePublishChange}
                                        placeholder="e.g., 1234 Sherman Ave, Evanston, IL"
                                    />
                                </div>
                                <div className="form-field full-width">
                                    <label htmlFor="pub-description" className="form-label">Property Description</label>
                                    <textarea
                                        name="property_description"
                                        id="pub-description"
                                        className="form-input"
                                        rows="4"
                                        value={publishForm.property_description}
                                        onChange={handlePublishChange}
                                        placeholder="Describe your property, amenities, and any special features..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">📞 Contact Information</h3>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="pub-name" className="form-label">Name *</label>
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
                                    <label htmlFor="pub-wechat" className="form-label">WeChat ID</label>
                                    <input
                                        type="text"
                                        name="wechat_id"
                                        id="pub-wechat"
                                        className="form-input"
                                        value={publishForm.wechat_id}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="pub-phone" className="form-label">Phone Number</label>
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
                                    <label htmlFor="pub-email" className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        name="email_address"
                                        id="pub-email"
                                        required
                                        className="form-input"
                                        value={publishForm.email_address}
                                        onChange={handlePublishChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                        </button>
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
                <h2 className="contact-title">📬 Contact Us</h2>
                <p className="section-subtitle">
                    Need help finding the perfect place? Let us know your requirements!
                </p>
                <div className="form-container">
                    <form onSubmit={handleContactSubmit}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="contact-name" className="form-label">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="contact-name"
                                    required
                                    className="form-input"
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="contact-wechat" className="form-label">WeChat ID *</label>
                                <input
                                    type="text"
                                    name="wechat"
                                    id="contact-wechat"
                                    required
                                    className="form-input"
                                    value={contactForm.wechat}
                                    onChange={handleContactChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="contact-checkin" className="form-label">Check-in Date *</label>
                                <input
                                    type="date"
                                    name="checkin"
                                    id="contact-checkin"
                                    required
                                    className="form-input"
                                    value={contactForm.checkin}
                                    onChange={handleContactChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="contact-checkout" className="form-label">Check-out Date *</label>
                                <input
                                    type="date"
                                    name="checkout"
                                    id="contact-checkout"
                                    required
                                    className="form-input"
                                    value={contactForm.checkout}
                                    onChange={handleContactChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="contact-price" className="form-label">Budget (USD/month)</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="contact-price"
                                    className="form-input"
                                    value={contactForm.price}
                                    onChange={handleContactChange}
                                    placeholder="e.g., 1200"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="contact-roomtype" className="form-label">Preferred Room Type</label>
                                <select
                                    name="roomtype"
                                    id="contact-roomtype"
                                    className="form-input"
                                    value={contactForm.roomtype}
                                    onChange={handleContactChange}
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="studio">Studio</option>
                                    <option value="1b1b">1B1B</option>
                                    <option value="1.5b1b">1.5B1B</option>
                                    <option value="2b1b">2B1B</option>
                                    <option value="2b2b">2B2B</option>
                                    <option value="3b2b">3B2B</option>
                                    <option value="4b2b">4B2B</option>
                                </select>
                            </div>
                            <div className="form-field full-width">
                                <label htmlFor="contact-notes" className="form-label">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    id="contact-notes"
                                    className="form-input"
                                    rows="4"
                                    value={contactForm.notes}
                                    onChange={handleContactChange}
                                    placeholder="Any specific requirements or preferences..."
                                ></textarea>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Send Inquiry</button>
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
