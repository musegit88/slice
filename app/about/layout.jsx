import Navbar from "@/components/navbar";
import { getUser } from "../session/user";

const AboutLayout = async ({ children }) => {
  const currentUser = await getUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
    </>
  );
};
export default AboutLayout;
