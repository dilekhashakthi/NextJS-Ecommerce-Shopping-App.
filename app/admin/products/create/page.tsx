import ProductFrom from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = async () => {
  await requireAdmin();
  return (
    <h2 className="h2-bold">
      <div className="my-8">
        <ProductFrom type="Create" />
      </div>
    </h2>
  );
};

export default CreateProductPage;
