import { getUser } from "@/app/currentuser/user";
import Navbar from "@/components/navbar";
import Tabs from "@/components/tabs";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const currentUser = await getUser();
  if (!currentUser?.isAdmin) {
    redirect("/");
  }
  return (
    <>
      <Navbar currentUser={currentUser} />
      <Tabs />
      {children}
    </>
  );
};

export default DashboardLayout;
