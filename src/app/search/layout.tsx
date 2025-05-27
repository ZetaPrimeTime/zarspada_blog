import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Results | Zarspada Blog',
  description: 'Search results for blog posts',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 