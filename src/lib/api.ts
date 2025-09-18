
// Define the structure of a Post
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Function to fetch posts from the API for useInfiniteQuery
export const fetchPosts = async ({
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
