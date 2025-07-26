import { API_TAGS } from '@/constants';
import { MeResponse } from '../authApi/types';
import baseApi from '../baseApi/baseApi';
import { PATHS } from './path';
import { CreateNotificationRequest, PushNotificationRequest } from './types';

export const notification = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubscribe: build.mutation<MeResponse, CreateNotificationRequest>({
      query: (body) => ({
        url: PATHS.SUBSCRIBE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
    pushNotification: build.mutation<void, PushNotificationRequest>({
      query: ({ body, id }) => ({
        url: PATHS.PUSHNOTIFICATION + id,
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
  }),
});

export const { useCreateSubscribeMutation, usePushNotificationMutation } =
  notification;
