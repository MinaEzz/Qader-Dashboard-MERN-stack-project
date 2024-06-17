import { LoginForm } from "../components";

const LoginPage = () => {
  return (
    <section className="w-full min-h-[100dvh] flex items-center justify-center">
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
