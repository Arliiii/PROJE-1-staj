import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// This file only provides the root structure
export default function RootLayout({
  children
}: Props) {
  return children;
}
