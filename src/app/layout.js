// src/app/layout.js

import '../styles/global.css';
import BubblesBackground from '@/components/FloatingShapesBackground';
export const metadata = {
  title: 'Sneh Patel Portfolio',
  description: 'Showcasing projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BubblesBackground />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
