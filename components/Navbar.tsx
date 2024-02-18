import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="container mx-auto pt-3 sticky z-999 top-0 bg-white pb-1">
      <nav className="flex items-center gap-5 ">
        <Link href="/" className="text-wrap  ">
          Home
        </Link>
        <SignedIn>
          <Link href="/create" className="text-wrap">
            Create
          </Link>
        </SignedIn>

        <input
          type="text"
          disabled={true}
          placeholder="Search is disabled"
          className="w-full rounded-full bg-slate-200 px-5 py-2 shadow-sm focus:shadow-md focus:outline-none focus:outline-offset-0 focus:outline-[#7fc1ff] focus:transition"
        />

        <SignedOut>
          <Button asChild>
            <Link href="/sign-up" className="text-wrap">
              Login
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
