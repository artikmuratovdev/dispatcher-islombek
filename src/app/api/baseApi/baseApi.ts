// baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { API_TAGS, SERVER_URL } from '@/constants';
import { saveRequestOffline } from '@/utils';

// Constants
const CACHE_KEY = 'rtk_cache';
const TOKEN_KEY = 'auth_token';
let isToastShown = false;

// Load full cache
const loadCache = (): Record<string, any> => {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Cache`ni yuklashda xatolik:', error);
    return {};
  }
};

// Update cache with URL and optionally save token
const updateCache = (url: string, data: any) => {
  try {
    const cache = loadCache();

    cache[url] = data;

    // store token if it exists
    const token = data?.token ?? data?.accessToken;
    if (token) {
      cache[TOKEN_KEY] = token;
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

  } catch (error) {
    console.error('❌ Cache`ni yangilashda xatolik:', error);
  }
};

export const getTokenFromCache = (): string | null => {
  const cache = loadCache();
  return cache[TOKEN_KEY] ?? null;
};

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const url = typeof args === 'string' ? args : args.url ?? '';

  if (!navigator.onLine) {
    await saveRequestOffline(args);

    if (typeof args !== 'string' && args.method !== 'GET' && !isToastShown) {
      isToastShown = true;
      toast.error(
        'So‘rovingiz saqlandi, internetga ulanganingizda yuboriladi.'
      );
      setTimeout(() => {
        isToastShown = false;
      }, 3000);
    }

    const cache = loadCache();
    if (cache[url]) {
      return { data: cache[url] };
    }

    return {
      error: {
        status: 'offline',
        message: "Internetga ulanmagan, siz offline'siz!",
      },
    };
  }

  const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      const token = getTokenFromCache();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // Only cache GET requests
  if (
    !('error' in result) &&
    result.data &&
    (typeof args === 'string' || args.method === 'GET')
  ) {
    updateCache(url, result.data);
  }

  return result;
};

// Create base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
});

export { updateCache };
export default baseApi;
