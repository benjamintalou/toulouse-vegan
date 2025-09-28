import Image from "next/image";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Image
        src="/affiche-marche-noel-ethique-et-vegan-2025.png"
        alt="Marché de Noël Ethique et Végane de Toulouse 2025"
        width={800}
        height={600}
      />
    </div>
  );
}
