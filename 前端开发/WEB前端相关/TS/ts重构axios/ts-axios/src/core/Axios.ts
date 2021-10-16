import { AxiosPromise, AxiosRequestConfig } from '../types';
import dispatchRequest from './dispatchRequest';

export class Axios {
    request(config: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(config);
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'get', url });
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'delete', url });
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'head', url });
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'options', url });
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'post', data, url });
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'put', data, url });
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request({ ...config, method: 'patch', data, url });
    }
}
