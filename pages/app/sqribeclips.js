import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import { useSelector } from "react-redux";
import React from "react";
import { Resizable } from "re-resizable";

const Sqribeclips = () => {
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscription;

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex flex-col items-center pb-24 pt-10">
          Coming Soon...
        </div>
        <Resizable
      defaultSize={{ width: 200, height: 200 }} // Initial size
      minWidth={100} // Minimum width
      maxWidth={1000} // Maximum width
      enable={{ top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      style={{
        border: "1px solid #ddd",
        background: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Resize Me (X-axis only)
      </div>
    </Resizable>
      </div>
    </AppShell>
  );
};

export default withAuth(Sqribeclips);
