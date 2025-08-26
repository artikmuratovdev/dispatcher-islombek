import { useMeQuery } from "@/app/api";
import { EditPasswordForm, Logout, ProfileTop } from "./components";
import { ArrowDown } from "@/icons";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { data } = useMeQuery();
  console.log(data);

  const navigate = useNavigate();

  return (
    <section className="h-screen bg-blue-950">
      <header className="py-3 border-b border-yellow-400 rounded-b-4xl flex justify-between items-center px-4">
        <ProfileTop />
      </header>
      <main className="px-5 flex flex-col gap-y-7 mt-10 pb-20">
        <div className="border-2 border-yellow-400 px-5 py-3 rounded-lg bg-white flex justify-between items-center">
          <h3 className="text-blue-950 text-lg font-bold">Maoshlarim</h3>
          <button
            onClick={() => navigate("/my-salaries")}
            type="button"
            className="p-2 bg-blue-950 rounded-lg"
          >
            <ArrowDown className="text-yellow-400 rotate-90" />
          </button>
        </div>
        <EditPasswordForm />
        <Logout />
      </main>
    </section>
  );
};