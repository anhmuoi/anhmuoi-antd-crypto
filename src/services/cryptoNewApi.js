import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'd8835ff8ccmsh8e07e8387bbe6fbp1eda14jsnc9a608d92d47'

}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) =>({ url, headers: cryptoNewsHeader })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) =>({
        getCryptoNews: builder.query({
            query: ({ newsCategory , count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const {
    useGetCryptoNewsQuery,

} = cryptoNewsApi;