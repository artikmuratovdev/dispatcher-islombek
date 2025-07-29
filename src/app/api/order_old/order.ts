import { API_TAGS } from "@/constants";
import { baseApi } from "../baseApi/baseApi";
import { PATH } from "./path";
import {
  CreateNotificationRequest,
  CreateNotificationResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrdersRequest,
  EditOrdersRequest,
  GetAllOrdersRequest,
  GetAllOrdersResponse,
} from "./types";

export const order = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: PATH.ORDER,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    getOrder: builder.query<GetAllOrdersResponse, string>({
      query: (id) => ({
        url: PATH.EDIT_ORDER + id,
        method: "GET",
      }),
    }),
    getAllOrders: builder.query<GetAllOrdersResponse[], GetAllOrdersRequest>({
      query: ({ status }) => ({
        url: PATH.ORDER,
        params: { status },
        method: "GET",
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    editOrders: builder.mutation<GetAllOrdersResponse, EditOrdersRequest>({
      query: ({ id, body }) => ({
        url: PATH.EDIT_ORDER + id,
        method: "PATCH",
        body,
      }),
    }),
    deleteOrders: builder.mutation<GetAllOrdersResponse, DeleteOrdersRequest>({
      query: ({ id }) => ({
        url: PATH.EDIT_ORDER + id,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    createNotification: builder.mutation<
      CreateNotificationResponse,
      CreateNotificationRequest
    >({
      query: (body) => ({
        url: PATH.NOTIFICATION,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.NOTIFICATION],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useEditOrdersMutation,
  useCreateNotificationMutation,
  useLazyGetOrderQuery,
} = order;
