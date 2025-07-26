// authApi.ts
import { API_TAGS } from '@/constants';
import { baseApi, updateCache } from '../baseApi';
import { PATHS } from './path';
import {
  EditPasswordRequest,
  EditPasswordResponse,
  GetSalaryResponse,
  LoginRequest,
  LoginResponse,
  MeRequest,
  MeResponse,
  UpdateMeRequest,
  UpdateMeResponse,
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
    edit: builder.mutation<UpdateMeResponse, UpdateMeRequest>({
      query: (body) => ({
        url: PATHS.UPDATE + body._id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    editPassword: builder.mutation<EditPasswordResponse, EditPasswordRequest>({
      query: (body) => ({
        url: PATHS.EDITPASSWORD,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    getSalary: builder.query<GetSalaryResponse[], void>({
      query: () => ({
        url: PATHS.SALARY,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useEditMutation,
  useEditPasswordMutation,
  useGetSalaryQuery,
} = authApi;
