"use client";

import { shippingAddressSchema } from "@/lib/validators";
import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ArrowRight, Loader } from "lucide-react";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { updateUserAddress } from "@/lib/actions/user.actions";

type ShippingAddressSchema = z.infer<typeof shippingAddressSchema>;

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values,
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push("/payment-method");
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="h2-bold mt-4">Shipping Address</h1>
      <p className="text-sm text-muted-foreground">
        Please enter an address to ship to
      </p>
      <Card>
        <CardContent>
          <form
            id="shipping-address-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddressSchema,
                    "fullName"
                  >;
                  fieldState: {
                    invalid: boolean;
                    error?: { message?: string };
                  };
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="shipping-fullName">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="shipping-fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter full name"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="streetAddress"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddressSchema,
                    "streetAddress"
                  >;
                  fieldState: {
                    invalid: boolean;
                    error?: { message?: string };
                  };
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="shipping-streetAddress">
                      Street Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="shipping-streetAddress"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter address"
                      autoComplete="street-address"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="shipping-city">City</FieldLabel>
                    <Input
                      {...field}
                      id="shipping-city"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter city"
                      autoComplete="address-level2"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="postalCode"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddressSchema,
                    "postalCode"
                  >;
                  fieldState: {
                    invalid: boolean;
                    error?: { message?: string };
                  };
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="shipping-postalCode">
                      Postal Code
                    </FieldLabel>
                    <Input
                      {...field}
                      id="shipping-postalCode"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter postal code"
                      autoComplete="postal-code"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="country"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddressSchema,
                    "country"
                  >;
                  fieldState: {
                    invalid: boolean;
                    error?: { message?: string };
                  };
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="shipping-country">Country</FieldLabel>
                    <Input
                      {...field}
                      id="shipping-country"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter country"
                      autoComplete="country-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="shipping-address-form"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}{" "}
              Continue
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShippingAddressForm;
