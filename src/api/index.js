// src/api/index.js

import axios from 'axios';

// 创建一个 axios 实例，可以统一配置 baseURL、headers 等
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://www.subletmatcher.club', // 从环境变量读取，或使用默认值
  headers: {
    'Content-Type': 'application/json',
  },
});

// 可选：添加请求拦截器（比如添加 token）
apiClient.interceptors.request.use(
  (config) => {
    // 例如：从 localStorage 中获取 token 并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 可选：添加响应拦截器（比如统一处理错误）
apiClient.interceptors.response.use(
  (response) => {
    // 直接返回数据部分
    return response.data;
  },
  (error) => {
    // 统一处理错误，比如 401 未授权、500 服务器错误等
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      // 请求发送失败，比如网络问题
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error); // 继续抛出错误，让调用方处理
  }
);

// 定义具体的 API 方法
export const getSublets = (queryParams) => {
    // 如果需要传递查询参数，可以使用 queryParams 参数
    return apiClient.get('/api/sublets', { params: queryParams });
};

export const postSublets = (payload) => {
  return apiClient.post('/api/sublets/add', payload);
};

export const postListings = (payload) => {
  return apiClient.post('/api/sublets/listing', payload);
};
