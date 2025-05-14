"use client";
import { TabPanel, Tabs } from "@/components";
import { ListEntrie, ListHistory } from "./list";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useWordListStore } from "@/store";
import { useEffect } from "react";
export function GetListEntries() {
  const searchParms = useSearchParams();
  const setResult = useWordListStore((set)=> set.setResult)
  const tabs = [
    {
      label: "Word",
      type: "word",
    },
    {
      label: "History",
      type: "history",
    },
    {
      label: "Favorite",
      type: "favorite",
    },
  ] as { label: string; type: "word" | "history" | "favorite" }[];

  const changeTab = (
    ind: number,
    tab: { label: string; type: "word" | "history" | "favorite" }
  ) => {
    setResult({
      tab: tab.type
    })
  };
  useEffect(()=> {
    setResult({
      tab: 'word'
    })
  })
  return (
    <AnimatePresence>
      <motion.div
        layout
        className={
          searchParms.get("entrie")
            ? "hidden"
            : "" + (" flex w-full p-4 justify-center aligm-center  lg:block")
        }
      >
        <Tabs changeTab={changeTab}>
          {tabs.map((tab, ind) => (
            <TabPanel key={ind} label={tab.label} type={tab.type}>
              {tab.type === "history" && <ListHistory />}
              {tab.type === "word" && <ListEntrie />}
            </TabPanel>
          ))}
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
