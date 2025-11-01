import Card from "../Components/Card/Card";
import CardHeader from "../Components/Card/CardHeader";
import LoginForm from "../Components/Form/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-background to-[#0b0c10] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground">
            We're so excited to see you again!
          </p>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
