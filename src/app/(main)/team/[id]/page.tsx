export default function TeamMemberPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Membre: {params.id}</h1>
    </div>
  );
}
