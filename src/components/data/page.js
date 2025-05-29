import React, { useState, useEffect } from 'react';

export default function DataHubPage() {
    // 模拟的转租信息数据
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 模拟数据加载
    useEffect(() => {
        // 这里模拟从API获取数据
        const mockData = [
            {
                id: 1,
                title: "市中心精装公寓转租",
                location: "朝阳区CBD",
                price: "¥4500/月",
                area: "45㎡",
                contact: "张先生",
                phone: "138****8888",
                description: "精装修一居室，家具家电齐全，交通便利",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "2024-03-15",
                urgent: true
            },
            {
                id: 2,
                title: "温馨两居室急转",
                location: "海淀区中关村",
                price: "¥6800/月",
                area: "65㎡",
                contact: "李女士",
                phone: "159****6666",
                description: "南北通透，采光好，近地铁站",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "2024-03-14",
                urgent: false
            },
            {
                id: 3,
                title: "学区房单间出租",
                location: "西城区德胜门",
                price: "¥3200/月",
                area: "25㎡",
                contact: "王同学",
                phone: "177****9999",
                description: "近重点小学，适合陪读家长",
                images: ["https://via.placeholder.com/300x200"],
                publishTime: "2024-03-13",
                urgent: true
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
                        <span>{message.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                            <span className="mr-2">📐</span>
                            <span>{message.area}</span>
                        </div>
                        <div className="text-lg font-bold text-red-500">
                            {message.price}
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {message.description}
                </p>

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
                <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200">
                    联系 {message.contact}
                </button>
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
                            <h1 className="text-2xl font-bold text-gray-900">转租信息中心</h1>
                            <p className="mt-1 text-gray-600">所有转租信息汇总展示</p>
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
                            急租
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            价格排序
                        </button>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            时间排序
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