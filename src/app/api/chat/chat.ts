import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi/baseApi";
import { PATHS } from "../baseApi/path";
import { AllUsersRequest, GetOneUserRequest, MeResponse, MessageRequest, MessageResponse } from "./types";

export const chat = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    message: builder.mutation<MessageResponse, MessageRequest>({
      query: (body) => ({
        url: PATHS.MESSAGE,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.MESSAGE],
    }),
    getMessages: builder.query<MessageResponse[], string>({
      query: (id) => ({
        url: PATHS.MESSAGES + id,
      }),
    }),
    getChats: builder.query<{ lastMessage: string; chat: MeResponse }[], void>({
      query: () => ({
        url: PATHS.MESSAGE,
      }),
    }),
  }),
});

export const {
    useMessageMutation,
    useGetMessagesQuery,
    useGetChatsQuery,
} = chat