import { EntriesGetEntries } from "@/services";
import { useWordListStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ComponentListEntrie } from "./ComponentListEntrie";
import { useUI } from "@/context";
import { catchExcpetion } from "@/helper";
export function ListEntrie() {
  const result = useWordListStore((state) => state.result);
  const setResult = useWordListStore((state) => state.setResult);
  const router = useRouter();
  const { showAlert, showLoading, setLoading } = useUI();
  const time = useRef<NodeJS.Timeout | null>(null);
  const searchParms = useSearchParams();
  function UpdateQuery() {
    const query = new URLSearchParams();
    query.set("page", String(result.page));
    query.set("limit", String(result.limit));
    if (result.search || result.search == "")
      query.set("search", result.search);
    if (result.entrie) query.set("entrie", result.entrie);
    router.replace(`?${query.toString()}`, { scroll: false });
  }
  async function clickWord(entrie: string) {
    await setResult({
      entrie,
    });
    result.entrie = entrie
    UpdateQuery();
  }

  useEffect(() => {
    UpdateQuery();
  }, [result.page, result.limit]);

  const fetchData = async ({
    limit,
    page,
    search,
  }: {
    limit: number;
    page: number;
    search: string;
  }) => {
    try {
      await showLoading(async () => {
        const data = await EntriesGetEntries({
          page,
          limit,
          search,
        });
        setResult({
          data: data.results,
        });
      });
    } catch (error) {
      const message = catchExcpetion(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchString = searchParms.get("search") ?? "";
    setResult({ search: searchString });
  }, [searchParms.get("search")]);
  useEffect(() => {
    const limit = Number(searchParms.get("limit") || "10");
    const page = Number(searchParms.get("page") || "1");
    const search = searchParms.get("search") || "";
    setResult({
      limit,
      page,
      search,
    });
    fetchData({ limit, page, search });
  }, [searchParms]);
  function actionSearch(inp: string) {
    setResult({ search: inp });
    if (time.current) {
      clearTimeout(time.current);
    }
    time.current = setTimeout(() => {
      setLoading(true);
      let queryParams = `search=${inp}`;
      searchParms.forEach((value, key) => {
        if (key === "search") return;
        queryParams += `&${key}=${value}`;
      });
      router.replace(`?${queryParams}`, { scroll: false });
    }, 1500);
  }
  return (
    <ComponentListEntrie
      data={result.data}
      hasMore={true}
      onLoadMore={fetchData}
      search={result.search}
      wordActive={result.entrie}
      onSearchChange={actionSearch}
      clickWord={clickWord}
    />
  );
}
