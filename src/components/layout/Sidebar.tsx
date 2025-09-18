import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

const sidebarVariants: Variants = {
  closed: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  return (
    <AnimatePresence>
      {/* Desktop Sidebar */}
      <aside
        key="desktop-sidebar"
        className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 min-h-screen fixed top-16 left-0 hidden md:block p-4"
      >
        <nav className="flex flex-col space-y-2">
          <Link
            href="/"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/posts"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
          >
            Posts
          </Link>
          <Link
            href="/users"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Mobile Sidebar (Overlay) */}
      {isOpen && (
        <motion.div
          key="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggle}
        />
      )}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 min-h-screen fixed top-16 left-0 md:hidden p-4 z-40"
      >
        <nav className="flex flex-col space-y-2">
          <Link
            href="/"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
            onClick={toggle}
          >
            Dashboard
          </Link>
          <Link
            href="/posts"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
            onClick={toggle}
          >
            Posts
          </Link>
          <Link
            href="/users"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
            onClick={toggle}
          >
            Users
          </Link>
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
}
