import { API_TAGS } from '@/constants';
import { baseApi } from '../baseApi/baseApi';
import { ComplaintRequest, ComplaintResponse } from './types';
import { PATHS } from './path';

export const complaint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReceivedComplaints: build.query<ComplaintResponse[], void>({
      query: () => ({
        url: PATHS.RECEIVEDS,
      }),
      providesTags: [API_TAGS.COMPLAINT],
    }),
    sendComplaint: build.mutation<ComplaintResponse, ComplaintRequest>({
      query: (body) => ({
        url: PATHS.SEND_COMPLAINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.COMPLAINT],
    }),
    myComplaints: build.query<ComplaintResponse[], void>({
      query: () => ({
        url: PATHS.MY_COMPLAINTS
      }),
      providesTags: [API_TAGS.COMPLAINT],
    })
  }),
});

export const { useGetReceivedComplaintsQuery , useSendComplaintMutation, useMyComplaintsQuery} = complaint;
