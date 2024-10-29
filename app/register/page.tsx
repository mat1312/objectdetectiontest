import { Metadata } from "next"
import Register from "@/components/supaauth/register"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24 font-sans antialiased">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <Register />
      </div>
    </div>
  )
}
