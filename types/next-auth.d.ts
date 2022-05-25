import NextAuth, { User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"

import { Nullable } from "@/core/interfaces/common";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    accessToken: Nullable<string>;
    refreshToken: Nullable<string>;
    error?: string;
  }

  export interface User {
    access: string;
    refresh: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  export interface JWT {
    accessToken: Nullable<string>;
    refreshToken: Nullable<string>;
    error?: string;
  }
}
