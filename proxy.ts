import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { env, hasSupabaseEnv } from "@/lib/env";

export async function proxy(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        request.cookies.set({
          name,
          value,
          ...options
        });
        response = NextResponse.next({
          request
        });
        response.cookies.set({
          name,
          value,
          ...options
        });
      },
      remove(name, options) {
        request.cookies.set({
          name,
          value: "",
          ...options
        });
        response = NextResponse.next({
          request
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
          maxAge: 0
        });
      }
    }
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/favorites",
    "/api/checkout",
    "/api/stripe/:path*",
    "/api/admin/:path*"
  ]
};
