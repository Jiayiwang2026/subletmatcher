'use client';

import React, { useState, useEffect } from 'react';

export default function DataHubPage() {
    // 模拟的转租信息数据
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 模拟数据加载
    useEffect(() => {
        // 西北大学转租房源数据
        const mockData = [
            {
                id: 1,
                title: "Evanston西北大学 暑假抢手超低价转租",
                location: "1606 Hinman Ave., Evanston, IL",
                price: "$1250/月",
                area: "2B1B",
                contact: "Jo",
                phone: "联系方式请私信",
                description: "西北大学附近公寓2B1B的一个卧室，拎包入住！超大空间，全套家具，步行至校园仅需5分钟。楼下就有Joy Yee中餐，WholeFoods超市步行2分钟。",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "6/10起租",
                urgent: true,
                rentPeriod: "6/10 - 9月中",
                facilities: ["全套家具", "Wi-Fi", "步行5分钟到校园", "步行2分钟WholeFoods"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5f113dc90000000001003abd"
            },
            {
                id: 2,
                title: "芝加哥暑期转租｜西北学区房🧑‍🎓",
                location: "811 Emerson st, Evanston, IL 60201",
                price: "$2900/月",
                area: "1B1B",
                contact: "阿什莉万",
                phone: "感兴趣请私信",
                description: "The Link顶楼拐角房，超高层高，房子朝南自带balcony。设计师家具设施齐全，拎包入住。室内洗烘&洗碗机&24h doorman。",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "6月中起租",
                urgent: false,
                rentPeriod: "6月中 - 8.26",
                facilities: ["顶楼拐角房", "自带balcony", "室内洗烘", "24h doorman", "设计师家具"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5d2f1f7400000000100243cd"
            },
            {
                id: 3,
                title: "Evanston Place西北大学暑期转租",
                location: "1715 Chicago Ave., Evanston, IL",
                price: "$1500/月 (原价$1750)",
                area: "2B2B次卧",
                contact: "鼠",
                phone: "有意者请私信",
                description: "2b2b次卧，有独立卫生间。步行5分钟到西北校园，楼下就是Whole Foods。公寓配置lounge、免费打印、露天游泳池、24小时健身房。",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "6月中旬起租",
                urgent: true,
                rentPeriod: "6月中旬 - 8月中旬",
                facilities: ["独立卫生间", "露天游泳池", "24小时健身房", "免费打印", "烧烤炉"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5f9e906800000000010064da"
            },
            {
                id: 4,
                title: "西北大学2b2b转租-仅女生",
                location: "811 Emerson street, Evanston, IL 60201",
                price: "$1800+/月",
                area: "2B2B",
                contact: "林瀚_Linhan",
                phone: "联系方式请私信",
                description: "The Link Evanston 2b2b，室友女生性格好。室内独立洗烘，全套家具拎包入住。步行5分钟到学校和downtown，大楼内有健身房、泳池、桑拿房等。",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "6月中起租",
                urgent: false,
                rentPeriod: "6月中 - 9月初",
                facilities: ["仅限女生", "室内洗烘", "健身房", "室外泳池", "桑拿房", "瑜伽房"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/633a9a2d000000001901d316"
            }
        ];

        // 模拟加载延迟
        setTimeout(() => {
            setMessages(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    // 单个卡片组件
    const MessageCard = ({ message }) => (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* 图片区域 */}
            <div className="relative">
                <img
                    src={message.images[0]}
                    alt={message.title}
                    className="w-full h-48 object-cover"
                />
                {message.urgent && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            急租
          </span>
                )}
            </div>

            {/* 内容区域 */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {message.title}
                </h3>

                <div className="space-y-2 mb-3">
                    <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2">📍</span>
                        <span className="truncate">{message.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                            <span className="mr-2">🏠</span>
                            <span>{message.area}</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                            {message.price}
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2">📅</span>
                        <span>{message.rentPeriod}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {message.description}
                </p>

                {/* 设施标签 */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {message.facilities.slice(0, 3).map((facility, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {facility}
            </span>
                    ))}
                    {message.facilities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{message.facilities.length - 3}
            </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        <span className="mr-2">👤</span>
                        {message.contact}
                    </div>
                    <div className="text-xs text-gray-400">
                        {message.publishTime}
                    </div>
                </div>

                {/* 联系按钮 */}
                <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200">
                        联系 {message.contact}
                    </button>
                    <a
                        href={message.xiaohongshu}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors duration-200 text-sm"
                    >
                        📱小红书
                    </a>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载转租信息中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部 */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">西北大学转租信息中心</h1>
                            <p className="mt-1 text-gray-600">Northwestern University 暑期转租房源汇总</p>
                        </div>
                        <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                共 {messages.length} 条信息
              </span>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                                发布信息
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 筛选栏 */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4 text-sm">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            全部
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            急租房源
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            仅限女生
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            价格低到高
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            最新发布
                        </button>
                    </div>
                </div>
            </div>

            {/* 主要内容区域 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {messages.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📭</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无转租信息</h3>
                        <p className="text-gray-600">还没有收到任何转租信息，请稍后再来查看</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {messages.map((message) => (
                            <MessageCard key={message.id} message={message} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}