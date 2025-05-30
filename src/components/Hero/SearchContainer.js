// components/SearchContainer.js
import { useState, useEffect } from 'react';
import { realListingsData } from '../data/listing';

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

    useEffect(() => {
        const today = new Date();
        const futureDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

        setFormData(prev => ({
            ...prev,
            startDate: today.toISOString().split('T')[0],
            endDate: futureDate.toISOString().split('T')[0]
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 修复日历点击问题
    const openDatePicker = (type) => {
        const pickerId = `${type}-date-picker`;
        const picker = document.getElementById(pickerId);
        if (picker) {
            // 尝试多种方法打开日期选择器
            try {
                if (picker.showPicker) {
                    picker.showPicker();
                } else {
                    picker.focus();
                    picker.click();
                    // 触发点击事件
                    const event = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    picker.dispatchEvent(event);
                }
            } catch (error) {
                // 如果上面的方法都失败，尝试直接聚焦
                picker.focus();
            }
        }
    };

    const matchResults = () => {
        setIsLoading(true);

        setTimeout(() => {
            const startDate = new Date(formData.startDate);
            const endDate = new Date(formData.endDate);
            const budget = parseInt(formData.budget) || Infinity;

            if (!formData.startDate || !formData.endDate) {
                setResults([]);
                setShowResults(true);
                setIsLoading(false);
                return;
            }

            const matched = realListingsData.map(item => {
                const listingStart = new Date(item.转租开始时间);
                const listingEnd = new Date(item.转租结束时间);

                const overlapStart = Math.max(startDate, listingStart);
                const overlapEnd = Math.min(endDate, listingEnd);
                const overlapDays = Math.max(0, (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));

                const totalDaysNeeded = (endDate - startDate) / (1000 * 60 * 60 * 24);
                const timeScore = overlapDays / totalDaysNeeded * 100;

                const priceScore = item.价格 <= budget ? 100 - (item.价格 / budget * 50) : 0;
                const roomTypeScore = !formData.roomType || item.房型 === formData.roomType ? 100 : 50;

                const totalScore = (timeScore * 0.5 + priceScore * 0.3 + roomTypeScore * 0.2);

                return {
                    ...item,
                    score: totalScore,
                    overlapDays: overlapDays,
                    coveragePercent: Math.round(timeScore)
                };
            })
                .filter(item => item.overlapDays > 0 && item.价格 <= budget * 1.2)
                .sort((a, b) => b.score - a.score);

            setResults(matched);
            setShowResults(true);
            setIsLoading(false);
        }, 500);
    };

    const handleViewDetails = (href, contact) => {
        if (href && href !== '#') {
            window.open(href, '_blank');
        } else if (contact) {
            alert(`联系方式：${contact}`);
        } else {
            alert('请通过下方表单联系我们获取更多信息');
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
                    <label className="date-label">入住开始日期</label>
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
                    <label className="date-label">入住结束日期</label>
                </div>

                <div className="input-group">
                    <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                    >
                        <option value="">选择房型</option>
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
                        placeholder="预算 (USD/月)"
                    />
                </div>
            </div>

            <button
                className="search-btn"
                onClick={matchResults}
                disabled={isLoading}
            >
                {isLoading ? '⏳ 搜索中...' : '🔍 智能匹配房源'}
            </button>

            {showResults && (
                <div className={`results-container ${showResults ? 'show' : ''}`}>
                    {results.length === 0 ? (
                        <div className="no-results">
                            <h3>🔍 未找到完全匹配的房源</h3>
                            <p>共搜索了 {realListingsData.length} 条房源数据</p>
                            <p>建议调整搜索条件或联系我们为您定制寻找</p>
                        </div>
                    ) : (
                        <>
                            <div className="results-header">
                                <h3>找到 {results.length} 条匹配房源 (共 {realListingsData.length} 条数据)</h3>
                            </div>
                            <div className="results-grid">
                                {results.map((item, index) => (
                                    <div key={index} className="listing-card">
                                        <div className="match-score">{Math.round(item.score)}% 匹配</div>
                                        <h4 className="listing-title">{item.title}</h4>
                                        <div className="listing-details">
                                            <div className="detail-row">
                                                <span className="detail-label">📅 可租时间:</span>
                                                <span>{item.转租开始时间} ~ {item.转租结束时间}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">🏠 房型:</span>
                                                <span>{item.房型.toUpperCase()}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">📍 地址:</span>
                                                <span>{item.地址 || '详情请咨询'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">✨ 特色:</span>
                                                <span>{item.特色}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">💰 价格:</span>
                                                <span className="price">${item.价格}/月</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">⏰ 时间覆盖:</span>
                                                <span>{item.coveragePercent}%</span>
                                            </div>
                                            {item.联系方式 && (
                                                <div className="detail-row">
                                                    <span className="detail-label">📱 联系方式:</span>
                                                    <span>{item.联系方式}</span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="view-btn"
                                            onClick={() => handleViewDetails(item.href, item.联系方式)}
                                        >
                                            查看详情 →
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