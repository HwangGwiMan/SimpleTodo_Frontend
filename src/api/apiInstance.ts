import axios from 'axios';
import { Notify } from 'quasar';
import router from '@/router';

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      //토큰이 없을 경우 로그인 페이지로 이동
      Notify.create({
        message: '로그인이 필요합니다.',
        color: 'warning',
        icon: 'warning',
        position: 'top',
        timeout: 3000,
      })

      router.push('/LoginPage')
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(error);
  }
);

export default apiInstance;
