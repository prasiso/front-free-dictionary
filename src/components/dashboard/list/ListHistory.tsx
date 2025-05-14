import { GetUserHistory } from "@/services";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ComponentListEntrie } from "./ComponentListEntrie";
import { useUI } from "@/context";
import { catchException, format_date } from "@/helper";
import { useUpdateState } from "@/hooks";
import { useHistoryListStore } from "@/store";

export function ListHistory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalDocs, setTotalDocs] = useState(0);
  const data = useHistoryListStore((set)=> set.data)
  const setData = useHistoryListStore((set)=> set.setData)
  const [hasMore, setHasMore] = useState(false);
  const [entrie, setEntrie] = useState("");
  const [refresh, setRefreshTrigger] = useState(0);

  const time = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert, setLoading } = useUI();

  function UpdateQuery() {
    let query = `entrie=${entrie}`;
    searchParams.forEach((value, key) => {
      if (key === "entrie") return;
      query += `&${key}=${value}`;
    });
    router.push(`?${query}`, { scroll: false });
  }

  async function clickWord(word: string) {
    setEntrie(word);
  }

  const fetchData = async () => {
    try {
      const res = await GetUserHistory({
        page,
        limit: 200,
        search,
      });
      const words = res.results.map((item: any) => ({
        word: item.word,
        added: format_date(item.added),
      }));
      const body = page === 1 ? [] : data;
      const updatedData = body.concat(words);

      if (!updatedData.length) {
        showAlert({ type: "info", message: "Not found list of word" });
      }
      setTotalDocs(res.totalDocs);
      setData(updatedData);
      setHasMore(res.hasNext);
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, refresh]);

  useUpdateState(() => {
    if (time.current) clearTimeout(time.current);
    time.current = setTimeout(() => {
      setLoading(true);
      setPage(1);
      setData([]);
      setRefreshTrigger((prev) => prev + 1);
    }, 1500);
  }, [search]);

  useEffect(() => {
    UpdateQuery();
  }, [entrie]);

  useEffect(() => {
    setEntrie(String(searchParams.get("entrie") ?? ""));
    fetchData()
  }, [searchParams.get("entrie")]);

  function actionSearch(inp: string) {
    setSearch(inp);
  }

  function LoadMore() {
    setPage((page) => page + 1);
  }

  return (
    <div>
      <ComponentListEntrie
        data={data}
        totalDocs={totalDocs}
        hasMore={hasMore}
        onLoadMore={LoadMore}
        search={search}
        wordActive={entrie}
        onSearchChange={actionSearch}
        clickWord={clickWord}
      />
    </div>
  );
}
