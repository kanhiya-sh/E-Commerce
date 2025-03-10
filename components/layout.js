import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react"
export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn("google")} className="bg-white p-3  px-4 rounded-lg">Login With Google</button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
        <Nav/>
        <h1 className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</h1>
    </div>
  );
}
