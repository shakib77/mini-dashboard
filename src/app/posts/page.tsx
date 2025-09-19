"use client";

import { Fragment, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import { motion, type Variants } from "framer-motion";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function PostsPage() {
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const [forceError, setForceError] = useState(false);
  const endpoint = forceError ? "invalid-endpoint" : "posts";

  const {
    data,
    error,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfinitePosts(loadMoreRef, endpoint);

  const handleRefetch = () => {
    if (forceError) {
      setForceError(false);
    } else {
      refetch();
    }
  };

  const renderContent = () => {
    if (status === "pending") {
      return <p className="text-center">Loading...</p>;
    }

    if (status === "error") {
      return (
        <div className="text-center text-red-500">
          <p className="mb-4">
            Error: {error?.message ?? "An unknown error occurred."}
          </p>
          <button
            onClick={handleRefetch}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (
      status === "success" &&
      Array.isArray(data?.pages) &&
      data.pages.length > 0
    ) {
      return (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {data.pages.map((page, i) => (
              <Fragment key={i}>
                {page.map((post) => (
                  <motion.div variants={cardVariants} key={post.id}>
                    <Card href={`/posts/${post.id}`} title={post.title}>
                      {post.body}
                    </Card>
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </motion.div>

          <div className="flex justify-center mt-6">
            <button
              ref={loadMoreRef}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </button>
          </div>
        </>
      );
    }

    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No posts found
        </h3>
        <p className="text-gray-500 text-center">
          We couldn't find any posts. Try refreshing or check back later.
        </p>
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefetch}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Refetch
          </button>
          <button
            onClick={() => setForceError(true)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Simulate Error
          </button>
        </div>
      </div>

      {renderContent()}
    </motion.div>
  );
}
