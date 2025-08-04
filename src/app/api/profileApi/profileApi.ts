import { API_TAGS } from "@/constants";
import { PATHS } from "./paths";
import {
  StaffProfileCalculatedMoneyResponse,
  StaffProfileReceivedMoneyResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdatePasswordRequest,
} from "./type";
import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation<void, UpdatePasswordRequest>({
      query: (body) => ({
        url: PATHS.UPDATE_PASSWORD,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.PROFILE],
    }),
    ubdateAvatar: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: (body) => ({
        url: PATHS.UPDATE_AVATAR,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.PROFILE],
    }),
    ubdateStaffProfileReturn: build.mutation<
      void,
      { id: string; body: { amount: number } }
    >({
      query: ({ id, body }) => ({
        url: PATHS.UPDATE_STAFF_PROFILE_RETURN + `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.PROFILE],
    }),
    getStaffProfileReceivedMoney: build.query<
      StaffProfileReceivedMoneyResponse[],
      { id: string; startDate?: string; endDate?: string }
    >({
      query: ({ id, startDate, endDate }) => ({
        url: PATHS.GET_STAFF_PROFILE_RECEIVED_MONEY + `/${id}`,
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: [API_TAGS.PROFILE],
    }),
    getStaffProfileCalculatedMoney: build.query<
      StaffProfileCalculatedMoneyResponse[],
      { id: string; startDate?: string; endDate?: string }
    >({
      query: ({ id, startDate, endDate }) => ({
        url: PATHS.GET_STAFF_PROFILE_RETURNED_MONEY + `/${id}`,
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: [API_TAGS.PROFILE],
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useUbdateAvatarMutation,
  useUbdateStaffProfileReturnMutation,
  useGetStaffProfileReceivedMoneyQuery,
  useLazyGetStaffProfileReceivedMoneyQuery,
  useGetStaffProfileCalculatedMoneyQuery,
  useLazyGetStaffProfileCalculatedMoneyQuery,
} = profileApi;