"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";

// Define the structure of a Post
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Function to fetch posts from the API
const fetchPosts = async ({
  pageParam = 1,
  endpoint,
}: {
  pageParam: unknown;
  endpoint: string;
}) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/${endpoint}?_page=${pageParam}&_limit=9`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch posts from '${endpoint}'`);
  }
  return res.json() as Promise<Post[]>;
};

export default function PostsPage() {
  const [endpoint, setEndpoint] = useState("posts");
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", endpoint],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, endpoint }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has items, calculate the next page number
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      // The API has 100 posts. 100 posts / 9 per page = 11.11, so 12 pages.
      return nextPage && nextPage <= 12 ? nextPage : undefined;
    },
    enabled: endpoint === "posts", // Only run query automatically for the correct endpoint
  });

  const handleSimulateError = () => {
    setEndpoint("invalid-posts");
  };

  const handleReset = () => {
    setEndpoint("posts");
  };

  useEffect(() => {
    if (endpoint === "invalid-posts") {
      refetch();
    }
  }, [endpoint, refetch]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div>
          <button
            onClick={handleReset}
            className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400"
            disabled={endpoint === "posts"}
          >
            Reset
          </button>
          <button
            onClick={handleSimulateError}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
            disabled={endpoint !== "posts"}
          >
            Simulate Error
          </button>
        </div>
      </div>

      {status === "pending" && <p className="text-center">Loading...</p>}

      {status === "error" && (
        <div className="text-center text-red-500">
          <p>Error: {error.message}</p>
          <p className="mt-2">Please reset to fetch the actual posts.</p>
        </div>
      )}

      {status === "success" && (
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
      )}
    </motion.div>
  );
}
