import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="container mx-auto pt-3 ">
      <nav className="flex items-center gap-5 sticky z-999 top-0">
        <Link href="/" className="text-wrap  ">
          Home
        </Link>
        <Link href="/create" className="text-wrap  ">
          Create
        </Link>

        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full bg-slate-200 px-5 py-2 shadow-sm focus:shadow-md focus:outline-none focus:outline-offset-0 focus:outline-[#7fc1ff] focus:transition"
        />

        <SignedOut>
          <Link href="/sign-up" className="text-wrap  ">
            Signup
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
