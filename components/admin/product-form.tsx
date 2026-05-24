"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  ControllerRenderProps,
  FormProvider,
  SubmitHandler,
  useForm,
  type Resolver,
} from "react-hook-form";
import z from "zod";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Slugify from "slugify";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";

type ProductFormValues =
  | z.infer<typeof insertProductSchema>
  | z.infer<typeof updateProductSchema>;

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const schema = type === "Update" ? updateProductSchema : insertProductSchema;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(schema) as Resolver<ProductFormValues>,
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values,
  ) => {
    // On Create
    if (type === "Create") {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast(res.message);
      }

      router.push("/admin/products");
    }

    // On Upadte
    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast(res.message);
      }

      router.push("/admin/products");
    }
  };

  const images = form.watch("images");

  return (
    <FormProvider {...form}>
      <Card>
        <CardContent>
          <form
            method="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row gap-5">
              {/* Name */}
              <Controller
                control={form.control}
                name="name"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "name">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="name" className="pb-1.5">
                      Name
                    </Label>
                    <Input placeholder="Enter product name" {...field} />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {/* Slug */}
              <Controller
                control={form.control}
                name="slug"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "slug">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="slug" className="pb-1.5">
                      Slug
                    </Label>
                    <div className="relative">
                      <Input placeholder="Enter slug" {...field} />
                      <Button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                        onClick={() => {
                          const nameValue = form.getValues("name");
                          form.setValue(
                            "slug",
                            Slugify(nameValue, { lower: true }),
                          );
                        }}
                      >
                        Generate
                      </Button>
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* Category */}
              <Controller
                control={form.control}
                name="category"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "category">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="categoty" className="pb-1.5">
                      Category
                    </Label>
                    <Input placeholder="Enter category name" {...field} />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {/* Brand */}
              <Controller
                control={form.control}
                name="brand"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "brand">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="categoty" className="pb-1.5">
                      Brand
                    </Label>
                    <Input placeholder="Enter brand" {...field} />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* Price */}
              <Controller
                control={form.control}
                name="price"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "price">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="categoty" className="pb-1.5">
                      Price
                    </Label>
                    <Input placeholder="Enter product price" {...field} />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {/* Stock */}
              <Controller
                control={form.control}
                name="stock"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<ProductFormValues, "stock">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="categoty" className="pb-1.5">
                      Stock
                    </Label>
                    <Input placeholder="Enter stock" {...field} />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="upload-flex flex flex-col md:flex-row gap-5">
              {/* Images */}
              <Controller
                control={form.control}
                name="images"
                render={({
                  fieldState,
                }: {
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="images" className="pb-1.5">
                      Images
                    </Label>
                    {images.map((image: string) => (
                      <Image
                        key={image}
                        src={image}
                        alt="Product image"
                        className="w-20 h-20 object-cover object-center rounded-sm"
                        width={100}
                        height={100}
                      />
                    ))}
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res: { url: string }[]) => {
                        form.setValue("images", [...images, res[0].url]);
                      }}
                      onUploadError={(error:Error) => {
                        toast.error(`ERROR! ${error.message}`)
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="upload-field">{/* isFeatured */}</div>
            <div>
              {/* Description */}
              <Controller
                control={form.control}
                name="description"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    ProductFormValues,
                    "description"
                  >;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="categoty" className="pb-1.5">
                      Description
                    </Label>
                    <Textarea
                      className="resize-none h-35"
                      placeholder="Enter product description"
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              {/* Submit */}
              <Button type="submit">
                {form.formState.isSubmitted ? "submitting" : `${type} Product`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default ProductForm;
