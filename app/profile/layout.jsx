import Navbar from "@/components/navbar";
import { getUser } from "@/app/currentuser/user";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }) => {
  const currentUser = await getUser();
  if (!currentUser?.isAdmin) {
    redirect("/");
  }
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
    </>
  );
};

export default HomeLayout;
