import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/mutations";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormFields,
} from "../../schemas/auth.schema";

const RegisterForm = () => {
  const { mutate, isPending } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    mutate(data);
  };

  const isLoading = isPending || isSubmitting;

  return (
    <form
      className="flex flex-col w-full px-8 space-y-4 py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col  space-y-4">
        <Input label="USERNAME" placeholder="Enter your username" {...register("username")} error={errors.username}/>
        <Input label="EMAIL" placeholder="Enter your email" {...register("email")} error={errors.email}/>
        <Input label="PASSWORD" placeholder="Enter your password" {...register("password")} error={errors.password} />
      </div>
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Have an account?{" "}
        <Link to={"/login"} className="text-accent font-bold">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
