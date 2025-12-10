export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Produit: {params.slug}</h1>
    </div>
  );
}
