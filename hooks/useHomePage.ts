import useSWR from "swr";
import {apiGetHomePage} from "@/services/AppService";
import {Banner, Recommend, RadioChannel, News,  Podcast} from "@/types"

export const useHomePage = () => {
    return useSWR<{
        banners: Banner[],
        recommends: Recommend[],
        radios: RadioChannel[],
        news: News[],
        podcasts: Podcast[],
    }>(
        [`/`],
        apiGetHomePage,
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
            suspense: true,
        },
    );
};