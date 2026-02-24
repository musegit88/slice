import { getUser } from "@/currentuser/user";
import CartItems from "@/components/cart-items";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect("/login");
  }

  // get default address
  const defaultAddress = currentUser.address.filter(
    (address) => address.isDefault,
  );
  // destructure default address
  const userAddress = [
    {
      userId: currentUser.id,
      username: currentUser.name,
      email: currentUser.email,
      label: defaultAddress.map((address) => address.label)[0],
      phoneNumber: defaultAddress.map((address) => address.phonenumber)[0],
      street: defaultAddress.map((address) => address.street)[0],
      block: defaultAddress.map((address) => address.block)[0],
      floor: defaultAddress.map((address) => address.floor)[0],
      houseNumber: defaultAddress.map((address) => address.housenumber)[0],
      isApartement: defaultAddress.map((address) => address.isApartement)[0],
      isDefault: defaultAddress.map((address) => address.isDefault)[0],
    },
  ];
  return (
    <div>
      <CartItems userAddress={userAddress} />
    </div>
  );
};

export default CartPage;
