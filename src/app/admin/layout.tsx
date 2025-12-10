export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar Admin</aside>
      <main>{children}</main>
    </div>
  );
}
