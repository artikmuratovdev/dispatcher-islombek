export enum PATH {
  ACTIVE_ORDERS = "order/faol-zakaz",
  PRE_ORDERS = "order/oldindan-zakaz",
  ACTIVE_ORDERS_ID = "order/order/faol/",
  PRE_ORDERS_ID = "order/order/oldindan/",
  BREAD_PRICES = "order/client/bread-prices",
  CREATE_ACTIVE_ORDER = "order/create-order/faol-zakaz",
  CREATE_PRE_ORDER = "order/create-order/oldindan-zakaz",
  UPDATE_ACTIVE = "order/update-order/faol-zakaz/",
  UPDATE_PRE = "order/oldindan-zakaz/",
  WITH_CLIENT_ID = "order/client/", // + "/orders"
  CUSTOMER_QUERY = "order/client",
  CLIENT_QUERY = "auth/get-all-users",
  DELETE_ORDER = 'order/orders/'
}
