import Link from "next/link";

const Navbar = () => {
  return (
    <header className="container mx-auto pt-3 ">
      <nav className="flex items-center gap-5">
        <Link href="/" className="text-wrap font-semibold ">
          Home
        </Link>
        <Link href="/create" className="text-wrap font-semibold ">
          Create
        </Link>

        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full bg-slate-200 px-5 py-2 shadow-sm focus:shadow-md focus:outline-none focus:outline-offset-0 focus:outline-[#7fc1ff] focus:transition"
        />

        <h1 className="text-wrap text-lg font-semibold">User</h1>
      </nav>
    </header>
  );
};

export default Navbar;
