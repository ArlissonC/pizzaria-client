export type ListOrdersResponse = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
  created_at: string;
};

export type GetOrderDetailsResponse = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export type FinishOrderResponse = {
  message: string;
};
