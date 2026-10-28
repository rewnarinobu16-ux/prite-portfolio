import './globals.css';
export const metadata = { title: 'Paiya Namna | Portfolio', description: 'Portfolio of Paiya Namna' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="th"><body>{children}</body></html>);
}