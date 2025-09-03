import { API_TAGS } from '@/constants';
import baseApi from '../baseApi/baseApi';
import { PATHS } from './path';
import { Notification } from './types';

export const notification = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getByUserId: build.query<Notification[],string>({
      query : (id) => ({
        url: PATHS.HEAD + id + '/' + PATHS.TAIL
      }),
      providesTags:[API_TAGS.NOTIFICATION]
    }),
    getById: build.query<Notification,string>({
      query : (id) => ({
        url: PATHS.HEAD + PATHS.TAIL + '/' + id
      }),
      providesTags:[API_TAGS.NOTIFICATION]
    }),
    saleNotification: build.query<Notification[],string>({
      query : (id) => ({
        url: PATHS.SALE_NOTIFICATION + (id !== '' ? '/' + id : '')
      }),
      providesTags:[API_TAGS.NOTIFICATION]
    }),
    saleNotificationEdit: build.mutation<Notification[],string>({
      query : (id) => ({
        url: PATHS.SALE_NOTIFICATION + (id !== '' ? '/' + id : ''),
        method: 'PATCH'
      }),
      invalidatesTags:[API_TAGS.NOTIFICATION]
    })
  }),
});

export const { useGetByIdQuery, useGetByUserIdQuery , useSaleNotificationEditMutation, useSaleNotificationQuery} =
  notification;
