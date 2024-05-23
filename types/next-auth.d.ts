//typescript declaration file

import { DefaultSession } from "next-auth";

//modify the shape of existing types
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface User {
    role: String | null;
  }
}
