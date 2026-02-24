import { Switch } from "@/components/ui/switch";
import React from "react";

const AdminSwitch = ({ data }) => {
  const id = data.id;
  const handelCheckedChange = async (checked: boolean) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ checked }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };
  return (
    <div>
      <Switch checked={data.isAdmin} onCheckedChange={handelCheckedChange} />
    </div>
  );
};

export default AdminSwitch;
