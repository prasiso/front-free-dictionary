import { Input } from "@/components";
import { useEffect, useRef } from "react";

export function ComponentListEntrie({
  data,
  wordActive,
  hasMore,
  onLoadMore,
  search,
  onSearchChange,
  clickWord,
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    if (!containerRef.current || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) onLoadMore();
  };
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el?.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scrool", onScroll);
  }, [hasMore, onLoadMore]);

  const itemActive = (word: string)=> {
    return `${word === wordActive? "border-blue-500 text-gray-700" : "boder-gray-300 text-gray-500"} flex border roundend px-3 py-1 bg-white text-center justify-center items-center`

  }
  return (
    <div className="flex flex-col h-full ">
      <div className="sticky top-0 bg-white z-10 border-b border-gray-300 p-2">
        <Input
          label="Search"
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        ></Input>
      </div>
      <div ref={containerRef} className="flex-1 overflow-auto">
        <ul className=" grid sm:grid-cols-3 md:grid-cols-5 gap-4 font-sans text-base  p-2">
          {data?.map((word: string, i: number) => (
            <li
              key={i}
              className={
                itemActive(word)          
              }
              onClick={() => clickWord(word)}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
