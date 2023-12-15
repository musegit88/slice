import Navbar from "@/components/navbar";
import { getUser } from "../currentuser/user";
const LocationLayout = async ({ children }) => {
  const currentUser = await getUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
    </>
  );
};

export default LocationLayout;
