import React from "react";
import BillboardClient from "./(components)/billboard-client";

const BillboardPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardPage;
