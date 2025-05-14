"use client";
import { TabPanel, Tabs } from "@/components";
import { ListEntrie, ListHistory } from "./list";
import { AnimatePresence, motion } from "framer-motion";
export function GetListEntries() {
  const tabs = [
    {
      label: "History",
      type: "history",
    },
    {
      label: "Word",
      type: "word",
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
    console.log(ind, tab);
  };
  return (
    <AnimatePresence>
      <motion.div layout className="flex w-full p-4 justify-center aligm-center hidden lg:block">
        <Tabs changeTab={changeTab}>
          {tabs.map((tab, ind) => (
            <TabPanel key={ind} label={tab.label} type={tab.type}>
              {tab.type=== 'history' && <ListHistory />}
              {tab.type=== 'word' && <ListEntrie />}
            </TabPanel>
          ))}
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
