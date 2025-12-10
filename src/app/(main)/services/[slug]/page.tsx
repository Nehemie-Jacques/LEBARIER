export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Service: {params.slug}</h1>
    </div>
  );
}
