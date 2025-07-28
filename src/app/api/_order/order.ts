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
} from './types';
import { PATH } from './path';

export const dispatcherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveDispatches: builder.query<GetActiveResponse, void>({
      query: () => PATH.ACTIVE_ORDERS,
    }),
    getPreOrderDispatches: builder.query<preOrder[], void>({
      query: () => PATH.PRE_ORDERS,
    }),
    getActiveDispatch: builder.query<activeOrder, GetRequest>({
      query: ({ id }) => PATH.ACTIVE_ORDERS_ID + id, // order id
    }),
    getPreDispatch: builder.query<activeOrder, GetRequest>({
      query: ({ id }) => PATH.PRE_ORDERS_ID + id, // order id
    }),
    getBreadPrices: builder.query<breadInfo[], GetRequest>({
      query: ({ id: clientId }) =>
        PATH.BREAD_PRICES + (clientId ? `?client=${clientId}` : ''),
    }),
    getOrderByClientId: builder.query<activeOrder[], GetRequest>({
      query: ({ id }) => PATH.WITH_CLIENT_ID + id + '/orders',
    }),
    getClients: builder.query<Clients, ClientQuery>({
      query: ({ client }) => ({
        url: PATH.CLIENT_QUERY + (client ? `?search=${client}` : ''),
        method: 'GET',
      }),
    }),
    addActiveOrder: builder.mutation<AddActiveOrderRes, AddActiveOrderReq>({
      query: (data) => ({
        url: PATH.CREATE_ACTIVE_ORDER,
        method: 'POST',
        body: data,
      }),
    }),
    addPreOrder: builder.mutation<AddActiveOrderRes, AddPreOrderReq>({
      query: (data) => ({
        url: PATH.CREATE_PRE_ORDER,
        method: 'POST',
        body: data,
      }),
    }),
    deleteOrder: builder.mutation<DeleteRes, DeleteReq>({
      query: ({ id }) => ({
        url: `/order/orders/${id}`,
        method: 'DELETE',
      }),
    }),
    updateActiveOrders: builder.mutation<UpdateRes, UpdateReq>({
      query: (data) => ({
        url: (PATH.UPDATE_ACTIVE + data._id),
        method: 'PATCH',
        body: data,
      }),
    }),
    updatePreOrders: builder.mutation<UpdateRes, UpdateReq>({
      query: (data) => ({
        url: (PATH.UPDATE_PRE + data._id),
        method: 'PATCH',
        body: data,
      }),
    })
  }),
});

export const {
  useLazyGetActiveDispatchesQuery,
  useLazyGetActiveDispatchQuery,
  useLazyGetPreOrderDispatchesQuery,
  useLazyGetClientsQuery,
  useLazyGetOrderByClientIdQuery,
  useLazyGetBreadPricesQuery,
  useAddActiveOrderMutation,
  useDeleteOrderMutation,
  useUpdateActiveOrdersMutation,
  useUpdatePreOrdersMutation
} = dispatcherApi;
