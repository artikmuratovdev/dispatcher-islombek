import { baseApi } from '../baseApi';
import {
  GetRequest,
  GetActiveResponse,
  activeOrder,
  preOrder,
  breadInfo,
  Clients,
  ClientQuery,
  AddActiveOrderReq,
  AddActiveOrderRes,
  DeleteReq,
  DeleteRes,
  UpdateReq,
  UpdateRes,
  AddPreOrderReq,
  client,
} from './types';
import { PATH } from './path';
import { API_TAGS } from '@/constants';

export const dispatcherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveDispatches: builder.query<GetActiveResponse, void>({
      query: () => PATH.ACTIVE_ORDERS,
      providesTags: [API_TAGS.ORDER],
    }),
    getPreDispatches: builder.query<preOrder[], void>({
      query: () => PATH.PRE_ORDERS,
      providesTags: [API_TAGS.ORDER],
    }),
    getActiveDispatch: builder.query<activeOrder, GetRequest>({
      query: ({ id }) => PATH.ACTIVE_ORDERS_ID + id, // order id
      providesTags: [API_TAGS.ORDER],
    }),
    getPreDispatch: builder.query<activeOrder, GetRequest>({
      query: ({ id }) => PATH.PRE_ORDERS_ID + id, // order id
      providesTags: [API_TAGS.ORDER],
    }),
    getBreadPrices: builder.query<breadInfo[], string>({
      query: (clientId) =>
        PATH.BREAD_PRICES + (clientId ? `?client=${clientId}` : ''),
      providesTags: [API_TAGS.ORDER],
    }),
    getOrderByClientId: builder.query<activeOrder[], GetRequest>({
      query: ({ id }) => PATH.WITH_CLIENT_ID + id + '/orders',
      providesTags: [API_TAGS.ORDER],
    }),
    getCustomers: builder.query<Clients, ClientQuery>({
      query: ({ client }) => ({
        url: PATH.CUSTOMER_QUERY + (client ? `?search=${client}` : ''),
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    getClients: builder.query<client[], void>({
      query: () => ({
        url: PATH.CLIENT_QUERY + '?roles=CLIENT',
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    getClientById: builder.query<GetActiveResponse, GetRequest>({
      query: ({ id }) => PATH.WITH_CLIENT_ID + id + '/orders',
      providesTags: [API_TAGS.ORDER],
    }),
    addActiveOrder: builder.mutation<AddActiveOrderRes, AddActiveOrderReq>({
      query: (data) => ({
        url: PATH.CREATE_ACTIVE_ORDER,
        method: 'POST',
        body: data,
        invalidatesTags: [API_TAGS.ORDER],
      }),
    }),
    addPreOrder: builder.mutation<AddActiveOrderRes, AddPreOrderReq>({
      query: (data) => ({
        url: PATH.CREATE_PRE_ORDER,
        method: 'POST',
        body: data,
        invalidatesTags: [API_TAGS.ORDER],
      }),
    }),
    deleteOrder: builder.mutation<DeleteRes, DeleteReq>({
      query: ({ id }) => ({
        url: `/order/orders/${id}`,
        method: 'DELETE',
        invalidatesTags: [API_TAGS.ORDER],
      }),
    }),
    updateActiveOrders: builder.mutation<UpdateRes, UpdateReq>({
      query: (data) => ({
        url: PATH.UPDATE_ACTIVE + data._id,
        method: 'PATCH',
        body: data,
        invalidatesTags: [API_TAGS.ORDER],
      }),
    }),
    updatePreOrders: builder.mutation<UpdateRes, UpdateReq>({
      query: (data) => ({
        url: PATH.UPDATE_PRE + data._id,
        method: 'PATCH',
        body: data,
        invalidatesTags: [API_TAGS.ORDER],
      }),
    }),
  }),
});

export const {
  useGetPreDispatchQuery,
  useGetActiveDispatchesQuery,
  useGetPreDispatchesQuery,
  useGetBreadPricesQuery,
  useGetClientsQuery,
  useGetCustomersQuery,
  useGetClientByIdQuery,
  useLazyGetActiveDispatchesQuery,
  useLazyGetActiveDispatchQuery,
  useLazyGetPreDispatchesQuery,
  useLazyGetClientsQuery,
  useLazyGetOrderByClientIdQuery,
  useLazyGetBreadPricesQuery,
  useAddActiveOrderMutation,
  useAddPreOrderMutation,
  useDeleteOrderMutation,
  useUpdateActiveOrdersMutation,
  useUpdatePreOrdersMutation,
} = dispatcherApi;
