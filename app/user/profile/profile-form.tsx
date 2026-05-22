"use client";

import { updateProfileShema } from "@/lib/validators";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { upadateProfile } from "@/lib/actions/user.actions";
import { toast } from "sonner";

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateProfileShema>>({
    resolver: zodResolver(updateProfileShema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProfileShema>) => {
    const res = await upadateProfile(data);

    if (!res.success) {
      return toast.error(res.message);
    }

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: data.name,
      },
    };

    await update(newSession)

    toast(res.message)
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your account details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled
              placeholder="Email"
              className="input-field"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name"
              className="input-field"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="button col-span-2 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
