import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-[1320px] px-5 mx-auto">{children}</div>;
};

export default Container;
