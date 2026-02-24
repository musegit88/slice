import InfoCard from "@/components/info-card";
import ListOrderIcon from "@/components/ui/icons/list-order";
import PizzaIcon from "@/components/ui/icons/pizza-icon";
import SquareStack from "@/components/ui/icons/square-stack";
import UsersIcon from "@/components/ui/icons/users-icon";
import { getUser } from "@/currentuser/user";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const currentUser = getUser();
  if (!(await currentUser)?.isAdmin) {
    return redirect("/");
  }
  const allOrders = await prisma.order.count();
  const allUsers = await prisma.user.count();
  const allMenus = await prisma.menu.count();
  const allCategories = await prisma.category.count();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoCard
        title="Orders"
        count={allOrders}
        href="/dashboard/orders"
        icon={<ListOrderIcon className="text-green-500" />}
      />
      <InfoCard
        title="Users"
        count={allUsers}
        href="/dashboard/users"
        icon={<UsersIcon className="text-blue-500" />}
      />
      <InfoCard
        title="Menus"
        count={allMenus}
        href="/dashboard/menus"
        icon={<PizzaIcon className="text-red-500" />}
      />
      <InfoCard
        title="Categories"
        count={allCategories}
        href="/dashboard/categories"
        icon={<SquareStack className="text-cyan-500" />}
      />
    </div>
  );
};

export default AdminPage;
