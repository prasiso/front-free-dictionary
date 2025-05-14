import { GetUniqueEntrie, GetListEntries } from "@/components";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-around h-screen w-screen p-6">
        <GetUniqueEntrie />
        <GetListEntries />
    </div>
  );
}
