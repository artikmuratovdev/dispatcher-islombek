import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi/baseApi";
import { PATHS } from "../baseApi/path";
import { ComplaintGetRequest, ComplaintRequest, ComplaintResponse } from "./types";

export const complaint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendComplaint: build.mutation<object, ComplaintRequest>({
      query: (body) => ({
        url: PATHS.COMPLAINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.COMPLAINT],
    }),
    getComplaint: build.query<object, ComplaintGetRequest>({
      query: (id) => ({
        url: PATHS.COMPLAINTS + id,
      }),
      providesTags: [API_TAGS.COMPLAINT],
    }),
    getComplaints: build.query<ComplaintResponse[], void>({
        query: () => ({
            url: PATHS.COMPLAINT_MESS,
        }),
        providesTags: [API_TAGS.COMPLAINT],
    })
  }),
});

export const { useSendComplaintMutation, useGetComplaintQuery, useGetComplaintsQuery } = complaint;
