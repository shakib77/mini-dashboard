'use client';

import { motion, Variants } from "framer-motion";
import { FiUsers, FiFileText, FiBarChart2 } from "react-icons/fi";
import { ReactNode } from "react";
import { useFetch } from "@/hooks/useFetch";

// Basic types for the fetched data
interface Post {
  id: number;
}

interface User {
  id: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, isLoading }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4"
  >
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    {isLoading ? (
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
      </div>
    ) : (
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      </div>
    )}
  </motion.div>
);

export default function HomePage() {
  const { data: users, isLoading: isLoadingUsers } = useFetch<User[]>(
    ["users"],
    "users"
  );
  const { data: posts, isLoading: isLoadingPosts } = useFetch<Post[]>(
    ["posts"],
    "posts"
  );

  const isLoading = isLoadingUsers || isLoadingPosts;

  const userCount = users?.length ?? 0;
  const postCount = posts?.length ?? 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500 mt-1">Here&#39;s a summary of your dashboard.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate={!isLoading ? "visible" : "hidden"}
      >
        <StatCard
          icon={<FiUsers size={24} className="text-white" />}
          label="Total Users"
          value={userCount}
          color="bg-blue-500"
          isLoading={isLoading}
        />
        <StatCard
          icon={<FiFileText size={24} className="text-white" />}
          label="Total Posts"
          value={postCount}
          color="bg-green-500"
          isLoading={isLoading}
        />
        <StatCard
          icon={<FiBarChart2 size={24} className="text-white" />}
          label="Analytics"
          value="+12%"
          color="bg-indigo-500"
          isLoading={isLoading}
        />
      </motion.div>

      <motion.div
        className="mt-12 bg-white p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <p className="text-gray-600">This is a placeholder for a more complex component, like a chart or a list of recent activities, which could be animated as well.</p>
      </motion.div>
    </div>
  );
}