import Link from 'next/link';
import { type ReactNode } from 'react';

type CardProps = {
  href: string;
  title: string;
  children: ReactNode;
};

export default function Card({ href, title, children }: CardProps) {
  return (
    <Link href={href} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {children}
      </p>
    </Link>
  );
}
