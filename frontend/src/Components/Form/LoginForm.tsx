import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormFields } from "../../schemas/auth.schema";
import { useLoginMutation } from "../../features/auth/mutations";

const LoginForm = () => {
  const { mutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
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
          placeholder="Enter your email"
          error={errors.email}
          {...register("email")}
        />
        <Input
          label="PASSWORD"
          placeholder="Enter your password"
          error={errors.password}
          {...register("password")}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || isPending}
      >
        {isSubmitting || isPending ? "Logging in..." : "Login"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Need an account?{" "}
        <Link to={"/register"} className="text-accent font-bold">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
