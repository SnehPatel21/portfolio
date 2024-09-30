import '../app/globals.css';

export const metadata = {
  title: 'Portfolio - Home',
  description: 'Personal portfolio showcasing projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
