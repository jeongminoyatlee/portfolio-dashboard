import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrders from "@/components/Orders/TableOrders";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "RetailRadar",
};

const OrdersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
      <div className="flex flex-col gap-20">
        <TableOrders />
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
