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
    getAllUsers: builder.query<MeResponse[], AllUsersRequest>({
      query: ({ roles }) => ({
        url: PATHS.USERS,
        params: { roles },
      }),
      providesTags: [API_TAGS.USER],
    }),
    getOneUser: builder.query<MeResponse, GetOneUserRequest>({
      query: (id) => ({
        url: PATHS.UPDATE + id,
      }),
      providesTags: [API_TAGS.USER],
    }),
  }),
});

export const {
    useMessageMutation,
    useGetAllUsersQuery,
    useGetOneUserQuery,
    useGetMessagesQuery,
    useGetChatsQuery,
} = chat