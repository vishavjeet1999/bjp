import image from "./image.png";

export function CatMascot({ className = "" }: { className?: string }) {
  return (
    <img
      src={image}
      alt="Billa mascot — a sleek nocturnal cat silhouette"
      width={400}
      height={400}
      fetchPriority="high"
    />
  );
}
