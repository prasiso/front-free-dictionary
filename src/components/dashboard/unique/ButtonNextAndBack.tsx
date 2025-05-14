import { useWordListStore } from "@/store/useWordListStore";
import { useEffect, useState } from "react";
export function ButtonNextAndBack({ entrie }: { entrie: string }) {
  const result = useWordListStore((state) => state.result);
  const setResult = useWordListStore((state) => state.setResult);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    validNextOrBack();
  }, [result.entrie]);
  function validNextOrBack() {
    const { ind, data } = foundEntrie();
    if (ind === -1) {
      setHasNext(true);
      setHasPrev(true);
    }
    if(!data[ind+1]){
        setHasNext(true)
    }
    if(!data[ind-1]){
        setHasPrev(true)
    }
  }

  function foundEntrie() {
    const data = whichStoreToUse();
    const ind = data.findIndex((ind) => ind === result.entrie);
    return { ind, data };
  }

  function whichStoreToUse() {
    // APOS INSERÇÃO DOS OUTROS TIPOS HISTORY E FAVORITE
    return result.data;
  }

  function nextOrBack(isPlus = true) {
    const { ind, data } = foundEntrie();
    if (ind === -1) {
      return;
    }

    const newEntrie = data[isPlus ? ind + 1 : ind - 1];
    if (!newEntrie) {
      return;
    }
    setResult({ entrie: newEntrie });
    result.entrie = newEntrie;
  }

  function onBack() {
    nextOrBack(false);
  }

  function onNext() {
    nextOrBack(true);
  }

  return (
    <div className="mt-6 flex justify-start space-x-3">
      <button
        onClick={onBack}
        disabled={hasPrev}
        className="disabled:cursor-not-allowed bg-gray-300 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={hasNext}
        className="disabled:cursor-not-allowed bg-purple-700 text-white px-5 py-2 rounded-md text-sm hover:bg-purple-800 transition"
      >
        Next
      </button>
    </div>
  );
}
