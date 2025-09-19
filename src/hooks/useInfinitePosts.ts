
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, RefObject } from "react";
import { fetchPosts, type Post } from "@/lib/api";

/**
 * Hook for fetching posts with infinite scrolling.
 * @param loadMoreRef A ref to the element that triggers loading more posts.
 */
 export function useInfinitePosts(
   loadMoreRef: RefObject<HTMLButtonElement | null>,
   endpoint: string
 ) {
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
     queryFn: ({ pageParam }) => fetchPosts({ pageParam, endpoint }),    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      // The API has 100 posts. 100 / 9 per page ≈ 11.11, so 12 pages.
      return nextPage && nextPage <= 12 ? nextPage : undefined;
    },
  });

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, loadMoreRef]);

  return {
    data,
    error,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
}
