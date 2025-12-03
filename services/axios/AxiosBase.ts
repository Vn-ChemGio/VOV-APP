import type { AxiosError } from 'axios';
import axios from 'axios';
//import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback';
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback';
import appConfig from '@/configs/app.config';
import qs from 'qs';

const AxiosBase = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    // withCredentials: true
    paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
    },
});

AxiosBase.interceptors.request.use(
    (config) => {
        return AxiosRequestIntrceptorConfigCallback(config);
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);
/*
AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error);
        return Promise.reject(error);
    },
);*/

export default AxiosBase;
