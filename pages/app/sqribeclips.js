import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import { useSelector } from "react-redux";
import React from "react";

const Sqribeclips = () => {
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscription;

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex flex-col items-center pb-24 pt-10">
            sqribe clips hehe
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Sqribeclips);
