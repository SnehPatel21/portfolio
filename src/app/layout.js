'use client';

import './globals.css';
import BubblesBackground from '@/components/FloatingShapesBackground';
import Scrollbar from '@/components/CustomScrollbar';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          ::-webkit-scrollbar { display: none !important; }
          html { scrollbar-width: none !important; }
          body { -ms-overflow-style: none !important; }
        `}</style>
      </head>
      <body>
        <BubblesBackground />
        <Scrollbar />
        <CustomCursor />
        <main>{children}</main>
      </body>
    </html>
  );
}