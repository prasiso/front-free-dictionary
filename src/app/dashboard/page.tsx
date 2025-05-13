import { GetUniqueEntrie } from "@/components";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-around h-screen w-screen">
      <GetUniqueEntrie />
      <div>
        <p> ELEMENTO DE PESQUISA </p>
      </div>
    </div>
  );
}
