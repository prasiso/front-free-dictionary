import { EntriesGetEntries } from "@/services";
import { useWordListStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ComponentListEntrie } from "./ComponentListEntrie";
import { useUI } from "@/context";
import { catchException } from "@/helper";
export function ListEntrie() {
  const result = useWordListStore((state) => state.result);
  const setResult = useWordListStore((state) => state.setResult);
  const resetSearch = useWordListStore((state) => state.resetSearch);
  const router = useRouter();
  const { showAlert, showLoading, setLoading } = useUI();
  const time = useRef<NodeJS.Timeout | null>(null);
  const searchParms = useSearchParams();
  useEffect(() => {
    setLoading(true);
    const page = searchParms.get("page");
    const limit = searchParms.get("limit");
    const search = searchParms.get("search");
    const entrie = searchParms.get("entrie");
    result.entrie = String(entrie || "");
    result.limit = Number(limit) ?? 40;
    result.page = Number(page) ?? 1;
    result.search = String(search);
    setResult(result);
  }, []);
  function UpdateQuery() {
    const query = new URLSearchParams();
    query.set("page", String(result.page));
    query.set("limit", String(result.limit));
    query.set("search", result.search ?? "");
    query.set("entrie", result.entrie ?? "");
    router.push(`?${query.toString()}`, { scroll: false });
  }
  async function clickWord(entrie: string) {
    if (result.entrie === entrie) {
      result.entrie = "";
      UpdateQuery();
      return await setResult({
        entrie: "",
      });
    }

    await setResult({
      entrie,
    });
    result.entrie = entrie;
    UpdateQuery();
  }

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
      const res = await EntriesGetEntries({
        page,
        limit,
        search,
      });
      const data = [
        ...result.data,
        ...res.results.map((res) => ({ word: res })),
      ];
      if (!data.length)
        showAlert({ type: "info", message: "Not found list of word" });

      setResult({
        data,
        hasNext: res.hasNext,
        hasPrev: res.hasPrev,
        totalDocs: res.totalDocs,
      });
      result.data = data;
      result.hasNext = res.hasNext;
      result.hasPrev = res.hasPrev;
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchString = searchParms.get("search") ?? "";
    if (!searchString) return;
    setResult({ search: searchString });
  }, [searchParms.get("search")]);

  useEffect(() => {
    UpdateQuery();
  }, [result.page]);
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
  }, [searchParms.get("page"), searchParms.get("search")]);
  function actionSearch(inp: string) {
    setResult({ search: inp });
    if (time.current) {
      clearTimeout(time.current);
    }
    time.current = setTimeout(() => {
      setLoading(true);
      resetSearch();
      let queryParams = `search=${inp}`;
      searchParms.forEach((value, key) => {
        if (key === "search") return;
        queryParams += `&${key}=${value}`;
      });
      router.push(`?${queryParams}`, { scroll: false });
    }, 1500);
  }
  async function LoadMore() {
    const limit = Number(searchParms.get("limit") || "10");
    const page = Number(searchParms.get("page") || "1") + 1;
    await setResult({ page, limit });
  }
  return (
    <ComponentListEntrie
      data={result.data}
      totalDocs={result.totalDocs}
      hasMore={result.hasNext}
      onLoadMore={LoadMore}
      search={result.search}
      wordActive={result.entrie}
      onSearchChange={actionSearch}
      clickWord={clickWord}
    />
  );
}
