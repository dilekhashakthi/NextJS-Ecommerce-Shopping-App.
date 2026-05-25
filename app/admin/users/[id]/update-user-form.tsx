"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/lib/constants";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Controller,
  ControllerRenderProps,
  FormProvider,
  useForm,
} from "react-hook-form";
import z from "zod";

type UserFormValues = z.infer<typeof updateUserSchema>;

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  return (
    <FormProvider {...form}>
      <Card>
        <CardContent>
          <form
            method="POST"
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Email */}
            <div>
              <Controller
                control={form.control}
                name="email"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<UserFormValues, "email">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="name" className="pb-1.5">
                      Email
                    </Label>
                    <Input
                      disabled={true}
                      placeholder="Enter user email"
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

            {/* Name */}
            <div>
              <Controller
                control={form.control}
                name="name"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<UserFormValues, "name">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="name" className="pb-1.5">
                      Name
                    </Label>
                    <Input
                      disabled={true}
                      placeholder="Enter user name"
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

            {/* Role */}
            <div>
              <Controller
                control={form.control}
                name="role"
                render={({
                  field,
                  fieldState,
                }: {
                  field: ControllerRenderProps<UserFormValues, "role">;
                  fieldState: { error?: { message?: string } };
                }) => (
                  <div className="w-full">
                    <Label htmlFor="name" className="pb-1.5">
                      Role
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex-between mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Submitting ... "
                  : "Update User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default UpdateUserForm;
