import { useEffect } from "react";
import { LoginForm } from "../components";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Admin Login";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="w-full min-h-[100dvh] flex items-center justify-center">
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
