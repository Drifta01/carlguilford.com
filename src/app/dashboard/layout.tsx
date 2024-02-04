import TopNav from '../components/navigation/TopNav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <nav>
        <TopNav />
      </nav>
      <section>{children}</section>
    </main>
  );
}
