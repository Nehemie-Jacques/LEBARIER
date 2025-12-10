export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar Profile</aside>
      <main>{children}</main>
    </div>
  );
}
