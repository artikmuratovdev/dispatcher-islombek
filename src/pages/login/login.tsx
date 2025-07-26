import { LoginForm } from "@/components";

export const Login = () => {
  return (
    <div>
      <div className="pt-5">
        <h1 className="text-center text-white text-3xl font-bold  leading-[44.61px] tracking-wide">
          Dispatcher
        </h1>
        <img className="w-[165px] m-auto mt-[10px]" src="./login_logo.svg" />
        <h2 className="text-center text-white text-3xl font-bold leading-[44.61px] tracking-wide">
          Tizimga kirish
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};
