import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 h-16 z-50 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MiniDash
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-500 dark:hover:text-gray-300">
            Home
          </Link>
          <Link href="/posts" className="hover:text-gray-500 dark:hover:text-gray-300">
            Posts
          </Link>
          <Link href="/users" className="hover:text-gray-500 dark:hover:text-gray-300">
            Users
          </Link>
        </nav>
      </div>
    </header>
  );
}