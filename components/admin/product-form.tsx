"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import z from "zod";
import { Card } from "../ui/card";

type ProductFormValues =
  | z.infer<typeof insertProductSchema>
  | z.infer<typeof updateProductSchema>;

const ProductForm = ({
  type,
  product,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const schema = type === "Update" ? updateProductSchema : insertProductSchema;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(schema) as Resolver<ProductFormValues>,
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <Card>
        <form className="space-y-8">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Name */}
            {/* Slug */}
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {/* Category */}
            {/* Brand */}
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {/* Price */}
            {/* Stock */}
          </div>
          <div className="upload-flex flex flex-col md:flex-row gap-5">
            {/* Images */}
          </div>
          <div className="upload-field">{/* isFeatured */}</div>
          <div>{/* Description */}</div>
          <div>{/* Submit */}</div>
        </form>
      </Card>
    </FormProvider>
  );
};

export default ProductForm;
