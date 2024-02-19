import Navbar from "./Component/navbar"
import Link from 'next/link';
import { SignInButton, SignUpButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-15  relative">
      <Navbar/>
  <div className="w-full flex flex-row-reverse items-center justify-between font-mono text-sm lg:flex  z-50 relative">
    <div className="flex items-center justify-end mb-5 w-full lg:w-auto">
         <SignInButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-3" afterSignInUrl="page/select-user" afterSignUpUrl="/onboarding">
      Sign in
    </SignInButton>
 
    <SignUpButton className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 mr-5" afterSignInUrl="page/select-user" afterSignUpUrl="/onboarding">
      Sign up
    </SignUpButton>
      
    </div>
  </div>
</main>
  );
}