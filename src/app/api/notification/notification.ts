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
    })
  }),
});

export const { useGetByIdQuery, useGetByUserIdQuery } =
  notification;
