import AxiosBase from './axios/AxiosBase';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data);
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

    postData<Response = unknown, Request = Record<string, unknown>>(
        url: string,
        body: Request | FormData,
        config?: AxiosRequestConfig<Request>,
    ): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase.post(url, body, config)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data);
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

    patchData<Response = unknown, Request = Record<string, unknown>>(
        url: string,
        body: Request | FormData,
        config?: AxiosRequestConfig<Request>,
    ): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase.patch(url, body, config)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data);
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

    putData<Response = unknown, Request = Record<string, unknown>>(
        url: string,
        body: Request | FormData,
        config?: AxiosRequestConfig<Request>,
    ): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase.put(url, body, config)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data);
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

    deleteData<Response = unknown>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase.delete(url, config)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data);
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

    getDataFileWithAxios<Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<void>((resolve, reject) => {
            AxiosBase({
                ...param,
                responseType: 'blob', // Ensure the response is a blob for file download
            })
                .then((response: AxiosResponse<Blob>) => {
                    // Get filename from Content-Disposition header
                    const disposition = response.headers['content-disposition'];

                    console.log('Content-Disposition:', disposition); 
                    let fileName = 'downloaded_file';
                    if (disposition) {
                        // In ra để debug
                        console.log('Content-Disposition:', disposition);

                        // Regex linh hoạt hơn, loại bỏ khoảng trắng
                        let matches = /filename\*=UTF-8''([^;]+)(;|$)/i.exec(disposition);
                        if (matches && matches[1]) {
                            fileName = decodeURIComponent(matches[1]);
                        } else {
                            matches = /filename="?([^";\n]+)"?/i.exec(disposition);
                            if (matches && matches[1]) {
                                fileName = matches[1].trim();
                            }
                        }
                    }

                    // If fileName does not have an extension, try to extract it from the disposition
                    if (!/\.[a-zA-Z0-9]+$/.test(fileName)) {
                        const extMatch = /\.([a-zA-Z0-9]+)(?="?$)/.exec(disposition || '');
                        if (extMatch && extMatch[1]) {
                            fileName += '.' + extMatch[1];
                        }
                    }

                    // Create a URL for the blob and trigger download
                    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode?.removeChild(link);
                    window.URL.revokeObjectURL(url);

                    resolve();
                })
                .catch((errors: AxiosError) => {
                    reject(errors);
                });
        });
    },

};

export default ApiService;
