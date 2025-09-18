import Link from "next/link";

type HeaderProps = {
  toggle: () => void;
};

export default function Header({ toggle }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 h-16 z-50 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={toggle} className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Link href="/" className="text-xl font-bold">
            MiniDash
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          {/* Navigation links removed as per request */}
        </nav>
      </div>
    </header>
  );
}