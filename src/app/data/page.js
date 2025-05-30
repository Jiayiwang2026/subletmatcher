'use client';

import React, { useState, useEffect } from 'react';

export default function DataPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('全部');
    const [sortBy, setSortBy] = useState('最新发布');
    const [favorites, setFavorites] = useState(new Set());

    // 模拟房源数据
    useEffect(() => {
        const mockData = [
            {
                id: 1,
                title: "Evanston西北大学 暑假抢手超低价转租",
                location: "1606 Hinman Ave., Evanston, IL",
                price: 1250,
                priceText: "$1,250/月",
                originalPrice: "$1,400",
                area: "2B1B",
                contact: "Jo",
                phone: "联系方式请私信",
                description: "西北大学附近公寓2B1B的一个卧室，拎包入住！超大空间，全套家具，步行至校园仅需5分钟。楼下就有Joy Yee中餐，WholeFoods超市步行2分钟。",
                images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop&auto=format"],
                publishTime: "6/10起租",
                urgent: true,
                rentPeriod: "6/10 - 9月中",
                facilities: ["全套家具", "Wi-Fi", "步行5分钟到校园", "步行2分钟WholeFoods", "中餐厅楼下"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5f113dc90000000001003abd",
                gender: "不限",
                publishDate: new Date('2024-05-20'),
                rating: 4.8,
                views: 156,
                verified: true
            },
            {
                id: 2,
                title: "芝加哥暑期转租｜西北学区房🧑‍🎓",
                location: "811 Emerson st, Evanston, IL 60201",
                price: 2900,
                priceText: "$2,900/月",
                area: "1B1B",
                contact: "阿什莉万",
                phone: "感兴趣请私信",
                description: "The Link顶楼拐角房，超高层高，房子朝南自带balcony。设计师家具设施齐全，拎包入住。室内洗烘&洗碗机&24h doorman。",
                images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop&auto=format"],
                publishTime: "6月中起租",
                urgent: false,
                rentPeriod: "6月中 - 8.26",
                facilities: ["顶楼拐角房", "自带balcony", "室内洗烘", "24h doorman", "设计师家具"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5d2f1f7400000000100243cd",
                gender: "不限",
                publishDate: new Date('2024-05-22'),
                rating: 4.9,
                views: 243,
                verified: true
            },
            {
                id: 3,
                title: "西北大学附近暑期转租",
                location: "1715 Chicago Ave., Evanston, IL",
                price: 1500,
                priceText: "$1,500/月",
                originalPrice: "$1,750",
                area: "2B2B次卧",
                contact: "鼠",
                phone: "有意者请私信",
                description: "2b2b次卧，有独立卫生间。步行5分钟到西北校园，楼下就是Whole Foods。公寓配置lounge、免费打印、露天游泳池、24小时健身房。",
                images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop&auto=format"],
                publishTime: "6月中旬起租",
                urgent: true,
                rentPeriod: "6月中旬 - 8月中旬",
                facilities: ["独立卫生间", "露天游泳池", "24小时健身房", "免费打印", "烧烤炉"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/5f9e906800000000010064da",
                gender: "不限",
                publishDate: new Date('2024-05-18'),
                rating: 4.6,
                views: 89,
                verified: false
            },
            {
                id: 4,
                title: "西北大学学区房转租-仅女生",
                location: "811 Emerson street, Evanston, IL 60201",
                price: 1800,
                priceText: "$1,800+/月",
                area: "2B2B",
                contact: "林瀚_Linhan",
                phone: "联系方式请私信",
                description: "精装学区房2b2b，室友女生性格好。室内独立洗烘，全套家具拎包入住。步行5分钟到学校和downtown，大楼内有健身房、泳池、桑拿房等。",
                images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop&auto=format"],
                publishTime: "6月中起租",
                urgent: false,
                rentPeriod: "6月中 - 9月初",
                facilities: ["仅限女生", "室内洗烘", "健身房", "室外泳池", "桑拿房", "瑜伽房"],
                xiaohongshu: "https://www.xiaohongshu.com/user/profile/633a9a2d000000001901d316",
                gender: "仅女生",
                publishDate: new Date('2024-05-25'),
                rating: 4.7,
                views: 134,
                verified: true
            },
            {
                id: 5,
                title: "芝加哥市中心豪华公寓转租",
                location: "220 E Illinois St, Chicago, IL 60611",
                price: 3200,
                priceText: "$3,200/月",
                area: "1B1B",
                contact: "Alex Chen",
                phone: "联系方式请私信",
                description: "芝加哥市中心豪华公寓，37楼高层，360度城市景观。步行到Northwestern医学院5分钟，地铁红线紫线交汇处。楼内健身房、屋顶泳池、24小时门卫。",
                images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop&auto=format"],
                publishTime: "7月初起租",
                urgent: false,
                rentPeriod: "7月初 - 8月底",
                facilities: ["高层景观", "屋顶泳池", "24小时门卫", "健身房", "地铁站步行1分钟"],
                xiaohongshu: "#",
                gender: "不限",
                publishDate: new Date('2024-05-26'),
                rating: 4.9,
                views: 321,
                verified: true
            },
            {
                id: 6,
                title: "Sherman Ave学生公寓急租",
                location: "1234 Sherman Ave, Evanston, IL",
                price: 1100,
                priceText: "$1,100/月",
                area: "4B2B中的一间",
                contact: "小李",
                phone: "773-XXX-XXXX",
                description: "四室两卫中的一间卧室，与三个友好室友合租。步行10分钟到校园，附近有多家中餐厅。房间配备全套家具，包水电网。",
                images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&h=300&fit=crop&auto=format"],
                publishTime: "6月底起租",
                urgent: true,
                rentPeriod: "6月底 - 9月初",
                facilities: ["包水电网", "全套家具", "友好室友", "步行10分钟到校园"],
                xiaohongshu: "#",
                gender: "不限",
                publishDate: new Date('2024-05-15'),
                rating: 4.3,
                views: 67,
                verified: false
            }
        ];

        setTimeout(() => {
            setListings(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    // 切换收藏状态
    const toggleFavorite = (listingId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(listingId)) {
                newFavorites.delete(listingId);
            } else {
                newFavorites.add(listingId);
            }
            return newFavorites;
        });
    };

    // 筛选和排序逻辑
    const filteredAndSortedListings = listings
        .filter(listing => {
            const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = filterType === '全部' ||
                (filterType === '急租房源' && listing.urgent) ||
                (filterType === '仅限女生' && listing.gender === '仅女生') ||
                (filterType === '价格低于$1500' && listing.price < 1500) ||
                (filterType === '已认证房源' && listing.verified);

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case '价格低到高':
                    return a.price - b.price;
                case '价格高到低':
                    return b.price - a.price;
                case '评分最高':
                    return b.rating - a.rating;
                case '最新发布':
                    return b.publishDate - a.publishDate;
                default:
                    return 0;
            }
        });

    // 房源卡片组件
    const ListingCard = ({ listing }) => (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
            {/* 图片区域 */}
            <div className="relative overflow-hidden">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* 顶部标签区 */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        {listing.urgent && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                🔥 急租
                            </span>
                        )}
                        {listing.verified && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center">
                                ✓ 已认证
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => toggleFavorite(listing.id)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                    >
                            <span className="text-lg transition-colors">
                                {favorites.has(listing.id) ? '❤️' : '🤍'}
                            </span>
                    </button>
                </div>

                {/* 底部房型标签 */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                        {listing.area}
                    </span>
                </div>

                {/* 浏览量 */}
                <div className="absolute bottom-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs flex items-center">
                        <span className="mr-1">👁️</span>
                        {listing.views}
                    </span>
                </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6">
                {/* 标题和评分 */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 cursor-pointer flex-1 mr-2">
                        {listing.title}
                    </h3>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                        <span className="mr-1">⭐</span>
                        <span className="text-sm font-medium text-amber-700">{listing.rating}</span>
                    </div>
                </div>

                {/* 位置信息 */}
                <div className="flex items-center text-gray-600 text-sm mb-4">
                    <span className="mr-2">📍</span>
                    <span className="truncate">{listing.location}</span>
                </div>

                {/* 价格区域 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2">📅</span>
                        <span>{listing.rentPeriod}</span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {listing.priceText} %
                        </div>
                        {listing.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                                {listing.originalPrice}
                            </div>
                        )}
                    </div>
                </div>

                {/* 描述 */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {listing.description}
                </p>

                {/* 设施标签 */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {listing.facilities.slice(0, 4).map((facility, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-lg border border-blue-100 font-medium"
                        >
                            {facility}
                        </span>
                    ))}
                    {listing.facilities.length > 4 && (
                        <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-200 font-medium">
                            +{listing.facilities.length - 4}项
                        </span>
                    )}
                </div>

                {/* 房东信息 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white">👤</span>
                        </div>
                        <div>
                            <div className="font-medium text-gray-800">{listing.contact}</div>
                            <div className="text-xs text-gray-500">{listing.publishTime}</div>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                        <span className="mr-2">📞</span>
                        联系房东
                    </button>
                    {listing.xiaohongshu !== '#' && (
                        <a
                            href={listing.xiaohongshu}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 rounded-xl transition-all duration-200 text-sm font-medium flex items-center border border-red-200 hover:border-red-300"
                        >
                            <span className="mr-1">🔗</span>
                            小红书
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-6"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 animate-pulse"></div>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">正在加载精选房源...</p>
                    <p className="text-gray-500 text-sm mt-2">为您寻找最适合的住处</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            {/* 头部区域 */}
            <div className="relative bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                🏠 西北大学房源中心
                            </h1>
                            <p className="text-gray-600 text-lg">为Northwestern学子精选优质房源</p>
                            <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                    实时更新
                                </span>
                                <span className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    人工审核
                                </span>
                                <span className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                    安全可靠
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
                                <span className="text-sm font-medium text-blue-700">
                                    📊 共 {filteredAndSortedListings.length} 条优质房源
                                </span>
                            </div>
                            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                                ✨ 发布房源
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 搜索和筛选区域 */}
            <div className="bg-white/60 backdrop-blur-lg border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 搜索框 */}
                    <div className="mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>                                <input
                            type="text"
                            placeholder="搜索房源标题、地址或描述关键词..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-lg placeholder-gray-400 shadow-lg"
                        />
                        </div>
                    </div>

                    {/* 筛选和排序 */}
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500">🔍</span>
                                <span className="text-sm font-medium text-gray-700">智能筛选</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['全部', '急租房源', '仅限女生', '价格低于$1500', '已认证房源'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setFilterType(filter)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            filterType === filter
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                                : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">排序方式</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium"
                            >
                                <option value="最新发布">🕒 最新发布</option>
                                <option value="价格低到高">💰 价格低到高</option>
                                <option value="价格高到低">💎 价格高到低</option>
                                <option value="评分最高">⭐ 评分最高</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 房源列表 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredAndSortedListings.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-8 opacity-20">🏠</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">暂无匹配的房源</h3>
                        <p className="text-gray-600 mb-8 text-lg">尝试调整搜索条件或筛选选项</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterType('全部');
                            }}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            🔄 重置筛选条件
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredAndSortedListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </div>

            {/* 页脚 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white">🏠</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">西北大学房源中心</h3>
                        </div>
                        <p className="text-gray-600 mb-2">为留学生提供安全、便捷的租房信息平台</p>
                        <p className="text-sm text-gray-500">
                            💬 如有问题请联系平台管理员 | 📱 关注我们的小红书获取更多信息
                        </p>
                        <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
                            <span>🔒 信息安全保护</span>
                            <span>✅ 人工审核认证</span>
                            <span>⚡ 7x24小时服务</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}