import baseApi from '../baseApi/baseApi';
import { PATHS } from './path';
import { Notification } from './types';

export const notification = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getByUserId: build.query<Notification[],string>({
      query : (id) => ({
        url: PATHS.HEAD + id + '/' + PATHS.TAIL
      })
    }),
    getById: build.query<Notification,string>({
      query : (id) => ({
        url: PATHS.HEAD + PATHS.TAIL + '/' + id
      })
    }),
    saleNotification: build.query<Notification[],string>({
      query : (id) => ({
        url: PATHS.SALE_NOTIFICATION + (id !== '' ? '/' + id : '')
      })
    }),
    saleNotificationEdit: build.mutation<Notification[],string>({
      query : (id) => ({
        url: PATHS.SALE_NOTIFICATION + (id !== '' ? '/' + id : ''),
        method: 'PATCH'
      })
    })
  }),
});

export const { useGetByIdQuery, useGetByUserIdQuery , useSaleNotificationEditMutation, useSaleNotificationQuery} =
  notification;
