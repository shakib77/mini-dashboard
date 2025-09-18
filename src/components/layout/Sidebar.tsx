import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 min-h-screen fixed top-16 left-0 hidden md:block p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/posts" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
          Posts
        </Link>
        <Link href="/users" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
          Users
        </Link>
      </nav>
    </aside>
  );
}