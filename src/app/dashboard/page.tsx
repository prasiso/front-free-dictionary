import { GetUniqueEntrie, GetListEntries, Header, Footer } from "@/components";

export default function Dashboard() {
  return (
    <div className=" h-screen w-screen">
      <Header />
      <div className="flex  items-center justify-around p-6">
        <GetUniqueEntrie />
        <GetListEntries />
      </div>
      <Footer/>
    </div>
  );
}
