export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar Employee</aside>
      <main>{children}</main>
    </div>
  );
}
