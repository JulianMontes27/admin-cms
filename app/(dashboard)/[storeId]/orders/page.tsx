import prisma from "@/lib/prisma";
import OrderClient from "./(components)/billboard-client";
import type { OrderColumn } from "./(components)/columns";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

const OrdersPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's orders
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted billboards to the client
  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((item) => item.product.name).join(","),
    isPaid: item.isPaid,
    totalPrice: formatPrice(
      item.orderItems.reduce((acc, curr) => acc + curr.product.price, 0)
    ),
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
