// components/SearchContainer.js
import { useState } from 'react';

export default function SearchContainer() {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        roomType: '',
        budget: ''
    });
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Fix calendar click issue
    const openDatePicker = (type) => {
        const pickerId = `${type}-date-picker`;
        const picker = document.getElementById(pickerId);
        if (picker) {
            try {
                if (picker.showPicker) {
                    picker.showPicker();
                } else {
                    picker.focus();
                    picker.click();
                    const event = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    picker.dispatchEvent(event);
                }
            } catch (error) {
                picker.focus();
            }
        }
    };

    const matchResults = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!formData.startDate || !formData.endDate) {
                setError('Please select check-in and check-out dates');
                setResults([]);
                setShowResults(true);
                return;
            }

            const response = await fetch('/api/listings/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Search failed, please try again later');
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            setResults(data);
            setShowResults(true);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (href, contact) => {
        if (href && href !== '#') {
            window.open(href, '_blank');
        } else if (contact) {
            alert(`Contact: ${contact}`);
        } else {
            alert('Please contact us through the form below for more information');
        }
    };

    return (
        <div className="search-container">
            <div className="search-grid">
                <div className="input-group date-input-group">
                    <input
                        type="text"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                        className="date-text-input"
                    />
                    <input
                        type="date"
                        id="start-date-picker"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        name="startDate"
                        className="date-picker-hidden"
                    />
                    <button
                        type="button"
                        className="calendar-btn"
                        onClick={() => openDatePicker('start')}
                    >
                        📅
                    </button>
                    <label className="date-label">Check-in Date</label>
                </div>

                <div className="input-group date-input-group">
                    <input
                        type="text"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                        className="date-text-input"
                    />
                    <input
                        type="date"
                        id="end-date-picker"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        name="endDate"
                        className="date-picker-hidden"
                    />
                    <button
                        type="button"
                        className="calendar-btn"
                        onClick={() => openDatePicker('end')}
                    >
                        📅
                    </button>
                    <label className="date-label">Check-out Date</label>
                </div>

                <div className="input-group">
                    <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Room Type</option>
                        <option value="studio">Studio</option>
                        <option value="1b1b">1B1B</option>
                        <option value="1.5b1b">1.5B1B</option>
                        <option value="2b1b">2B1B</option>
                        <option value="2b2b">2B2B</option>
                        <option value="4b2b">4B2B</option>
                    </select>
                </div>

                <div className="input-group">
                    <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="Budget (USD/month)"
                    />
                </div>
            </div>

            {error && (
                <div className="error-message bg-red-100 text-red-700 p-3 rounded-md mt-4">
                    {error}
                </div>
            )}

            <button
                className="search-btn"
                onClick={matchResults}
                disabled={isLoading}
            >
                {isLoading ? '⏳ Searching...' : '🔍 Smart Match'}
            </button>

            {showResults && (
                <div className={`results-container ${showResults ? 'show' : ''}`}>
                    {results.length === 0 ? (
                        <div className="no-results">
                            <h3>🔍 No Matching Listings Found</h3>
                            <p>Searched through {results.length} listings</p>
                            <p>Try adjusting your search criteria or contact us for custom assistance</p>
                        </div>
                    ) : (
                        <>
                            <div className="results-header">
                                <h3>Found {results.length} matching listings</h3>
                            </div>
                            <div className="results-grid">
                                {results.map((item, index) => (
                                    <div key={index} className="listing-card">
                                        <div className="match-score">{Math.round(item.score)}% Match</div>
                                        <h4 className="listing-title">{item.title}</h4>
                                        <div className="listing-details">
                                            <div className="detail-row">
                                                <span className="detail-label">📅 Available:</span>
                                                <span>{item.转租开始时间} ~ {item.转租结束时间}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">🏠 Type:</span>
                                                <span>{item.房型.toUpperCase()}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">📍 Location:</span>
                                                <span>{item.地址 || 'Contact for details'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">✨ Features:</span>
                                                <span>{item.特色 || 'Contact for details'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">💰 Price:</span>
                                                <span className="price">${item.价格}/month</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">⏰ Time Match:</span>
                                                <span>{item.coveragePercent}%</span>
                                            </div>
                                            {item.联系方式 && (
                                                <div className="detail-row">
                                                    <span className="detail-label">📱 Contact:</span>
                                                    <span>{item.联系方式}</span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="view-btn"
                                            onClick={() => handleViewDetails(item.href, item.联系方式)}
                                        >
                                            View Details →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            <style jsx>{`
                .search-container {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 900px;
                    width: 100%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideUp 1s ease-out 0.9s forwards;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .search-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .input-group {
                    position: relative;
                }

                .date-input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .date-text-input {
                    width: 100%;
                    padding: 15px 60px 15px 20px;
                    border: none;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    color: #333 !important; /* 强制设置深色文字 */
                }

                .date-text-input::placeholder {
                    color: #666 !important; /* 占位符颜色 */
                }

                .date-picker-hidden {
                    position: absolute;
                    opacity: 0;
                    pointer-events: none;
                    z-index: -1;
                    width: 1px;
                    height: 1px;
                    top: 0;
                    left: 0;
                }

                .calendar-btn {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    padding: 8px 10px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                    min-width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .calendar-btn:hover {
                    background: linear-gradient(45deg, #5a6fd8, #6a4190);
                    transform: translateY(-50%) scale(1.05);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }

                .date-label {
                    position: absolute;
                    top: -8px;
                    left: 15px;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 2px 8px;
                    font-size: 12px;
                    color: #666 !important; /* 强制设置标签颜色 */
                    border-radius: 4px;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    z-index: 3;
                }

                .input-group input,
                .input-group select {
                    width: 100%;
                    padding: 15px 20px;
                    border: none;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    color: #333 !important; /* 强制设置深色文字 */
                }

                .input-group input::placeholder {
                    color: #666 !important;
                }

                .input-group select option {
                    color: #333 !important;
                    background: white;
                }

                .input-group input:focus,
                .input-group select:focus,
                .date-text-input:focus {
                    outline: none;
                    background: white;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    color: #333 !important;
                }

                .search-btn {
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
                    position: relative;
                    overflow: hidden;
                }

                .search-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
                }

                .search-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .results-container {
                    margin-top: 30px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.5s ease;
                }

                .results-container.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .results-header {
                    text-align: center;
                    margin-bottom: 20px;
                    color: white;
                }

                .results-grid {
                    display: grid;
                    gap: 20px;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                }

                .listing-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 15px;
                    padding: 25px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .listing-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .listing-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                }

                .match-score {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                }

                .listing-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 15px;
                    color: #333;
                }

                .listing-details {
                    display: grid;
                    gap: 8px;
                    margin-bottom: 15px;
                    font-size: 14px;
                    color: #666;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 10px;
                }

                .detail-label {
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .price {
                    color: #667eea;
                    font-weight: 700;
                    font-size: 18px;
                }

                .view-btn {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .view-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }

                .no-results {
                    text-align: center;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    color: #666;
                }

                .no-results h3 {
                    margin-bottom: 15px;
                    color: #333;
                }

                @keyframes slideUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .search-container {
                        margin: 0 15px;
                        padding: 25px 20px;
                    }

                    .search-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}