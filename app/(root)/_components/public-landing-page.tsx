import React from "react";

import Navbar from "./navbar";
import Hero from "./hero";

const LandingPage = () => {
  return (
    <main className="bg-gray-900 flex flex-col h-screen">
      <Navbar />
      <Hero />
    </main>
  );
};

export default LandingPage;
