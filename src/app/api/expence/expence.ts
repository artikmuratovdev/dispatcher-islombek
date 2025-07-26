import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi/baseApi";
import { PATHS } from "./path";
import { GetAllExpenceResponse } from "./types";

export const expence = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExpence: build.query<GetAllExpenceResponse[], void>({
      query: () => ({
        url: PATHS.EXPENCE,
        method: "GET",
      }),
      providesTags: [API_TAGS.EXPENCE],
    }),
  }),
});

export const { useGetAllExpenceQuery } = expence