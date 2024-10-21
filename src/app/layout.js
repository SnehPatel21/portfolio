// src/app/layout.js

import '../styles/global.css'; // Ensure the path is correct

export const metadata = {
  title: 'Sneh Patel Portfolio',
  description: 'Showcasing projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
