import ApiService from './ApiService';

export async function apiGetHomePage<T>(
    [_]: [string],
) {
    return ApiService.fetchDataWithAxios<T>({
        url: _,
        method: 'get',
    });
}

export async function apiGetPodcastCategories<T>(
    [_]: [string],
) {
    console.log('apiGetPodcastCategories',_);
    return ApiService.fetchDataWithAxios<T>({
        url: _,
        method: 'get',
    });
}

export async function apiGetPodcasts<T,  U extends Record<string, unknown> = Record<string, unknown>    >(
    [_, category_id, params]: [string, number, U | undefined],
) {
    return ApiService.fetchDataWithAxios<T>({
        url: _,
        method: 'get',
        params: {
            ...params,
            where: {
                category_id: category_id ? category_id : undefined,
            },
        }
    });
}