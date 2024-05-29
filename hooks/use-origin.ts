// import { useEffect, useState } from "react";

// export const useOrigin = () => {
//   const [mounted, setmounted] = useState(false);
//   const origin =
//     typeof window !== undefined && window.location.origin
//       ? window.location.origin
//       : "";
//   //to make sure we are on the client...
//   useEffect(() => {
//     setmounted(true);
//   }, []);
//   if (!mounted) {
//     return "";
//   }
//   return origin;
// };

import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return origin;
};
