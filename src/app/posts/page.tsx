"use client";

import { Fragment, useRef } from "react";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

export default function PostsPage() {
  const loadMoreRef = useRef<any>(null);

  const {
    data,
    error,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts(loadMoreRef);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>

      {status === "pending" ? (
        <p className="text-center">Loading...</p>
      ) : status === "error" ? (
        <div className="text-center text-red-500">
          <p>Error: {error?.message ?? "An unknown error occurred."}</p>
        </div>
      ) : status === "success" && Array.isArray(data?.pages) ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.pages.map((page, i) => (
              <Fragment key={i}>
                {page.map((post) => (
                  <Card
                    key={post.id}
                    href={`/posts/${post.id}`}
                    title={post.title}
                  >
                    {post.body}
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>

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
      ) : (
        <>No Post Found!</>
      )}
    </motion.div>
  );
}
