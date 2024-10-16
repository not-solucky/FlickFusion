"use client"
import { useSession, signOut, signIn } from "next-auth/react"


const Navbar = () => {
  const { data: session } = useSession()
  console.log(session);



  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    })
  }
  const handleLogout = async () => {
    await signOut({
      redirectTo: '/'
    })
  }
  return (
    <nav className="container m-auto px-10 flex items-center justify-between py-10">

      <h1 className="text-2xl font-bold text-primary-blue dark:text-primary-red">FlickFusion</h1>

      <ul className="flex items-center justify-center gap-3">
        <li><a href="/" className="text-lg">Home</a></li>
        <li><a href="/about" className="text-lg">About</a></li>
      </ul>
      <div className="flex items-center justify-center gap-3">
        {session && session && (
          <button className="px-4 py-1 bg-primary-blue dark:bg-primary-red text-white rounded-full" onClick={handleLogout}>Logout</button>
        )}
        {session === null && (
          <button className="px-4 py-1 bg-primary-blue dark:bg-primary-red text-white rounded-full" onClick={handleLogin}>Login</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar;