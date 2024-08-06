import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableProducts from "@/components/Products/TableProducts";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "RetailRadar",
};

const ProductsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <div className="flex flex-col gap-10">
        <TableProducts />
      </div>
    </DefaultLayout>
  );
};

export default ProductsPage;
