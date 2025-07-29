// authApi.ts
import { API_TAGS } from '@/constants';
import { baseApi, updateCache } from '../baseApi';
import { PATHS } from './path';
import {
  GetAllUsersRequest,
  GetAllUsersResponse,
  LoginRequest,
  LoginResponse,
  MeRequest,
  MeResponse,
} from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: PATHS.LOGIN,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          updateCache(PATHS.LOGIN, data); // Store login data (including token) in cache
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),
    me: builder.query<MeResponse, MeRequest>({
      query: () => ({
        url: PATHS.ME,
      }),
      providesTags: [API_TAGS.USER],
    }),
    getAllUsers: builder.query<GetAllUsersResponse[], GetAllUsersRequest>({
      query: ({ roles }) => {
        const queryString = roles
          .map((role) => `roles=${encodeURIComponent(role)}`)
          .join("&");

        return {
          url: `/auth/get-all-users?${queryString}`,
          method: "GET",
        };
      },
      providesTags: [API_TAGS.USER],
    }),
    getUser: builder.query<MeResponse, string>({
      query: (id) => ({
        url: PATHS.USER + id,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useGetAllUsersQuery,
  useLazyGetUserQuery
} = authApi;
