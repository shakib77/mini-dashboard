'use client';

import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Post } from "@/lib/api";
import { use, useState } from "react";
import Button from "@/components/ui/Button";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [forceError, setForceError] = useState(false);
  const endpoint = forceError ? `invalid-endpoint/${id}` : `posts/${id}`;

  const { data: post, isLoading, isError, error, refetch } = useFetch<Post>(
    ["post", id, endpoint],
    endpoint
  );

  const handleRefetch = () => {
    if (forceError) {
      setForceError(false);
    } else {
      refetch();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center">Loading post...</p>;
    }

    if (isError) {
      return (
        <div className="text-center text-red-500">
          <p className="mb-4">Error: {error?.message ?? "Failed to load post."}</p>
          <Button onClick={handleRefetch}>Retry</Button>
        </div>
      );
    }

    if (post) {
      return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {post.body}
          </p>
        </article>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <Link href="/posts" className="text-blue-500 hover:underline">
          &larr; Back to Posts
        </Link>
        <div className="flex space-x-2">
          <Button onClick={handleRefetch}>Refetch</Button>
          <Button onClick={() => setForceError(true)} variant="danger">
            Simulate Error
          </Button>
        </div>
      </div>

      {renderContent()}
    </motion.div>
  );
}
