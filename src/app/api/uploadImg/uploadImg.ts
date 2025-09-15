import { baseApi } from "../baseApi/baseApi";
import { PATHS } from "./path";
import { UploadImageRequest, UploadImageResponse } from "./types";

export const uploadImg = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<UploadImageResponse, UploadImageRequest>({
      query: (file) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body: file,
      }),
    }),
  }),
});
export const { useUploadImageMutation } = uploadImg;
