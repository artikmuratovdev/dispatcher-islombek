import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { AddMessageRes, ChatResponse, MessageRequest, MessageResponse, readMessages } from "./types";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMessages: build.query<MessageResponse[], void>({
      query: () => ({
        url: PATHS.CHAT,
        method: "GET",
      }),
      providesTags: [API_TAGS.MESSAGE],
    }),
    addMessage: build.mutation<AddMessageRes, MessageRequest>({
      query: (body) => ({
        url: PATHS.POST_MESSAGE,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.MESSAGE],
    }),
    getChat: build.query<ChatResponse, string>({
      query: (id) => ({
        url: PATHS.CHAT + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.MESSAGE],
    }),
    readMessages: build.mutation<void, readMessages>({
      query: ({receiverId, messageId: id}) => ({
        url: PATHS.READ_MESSAGE + `${receiverId}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [API_TAGS.MESSAGE],
    })
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetChatQuery,
  useAddMessageMutation,
  useReadMessagesMutation
} = messageApi;
