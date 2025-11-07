import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inviteSchema,
  type InviteFormFields,
} from "../../schemas/friends.schema";
import { useInviteMutation } from "../../features/friends/mutations";

const InviteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inviteSchema),
  });

  const { mutate, isPending } = useInviteMutation();

  const onSubmit: SubmitHandler<InviteFormFields> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="flex flex-col w-full px-8 space-y-4 py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col  space-y-4">
        <Input
          label="EMAIL"
          placeholder="Enter the users email"
          error={errors.targetEmail}
          {...register("targetEmail")}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || isPending}
      >
        {isSubmitting || isPending ? "Inviting..." : "Invite"}
      </Button>
    </form>
  );
};

export default InviteForm;
