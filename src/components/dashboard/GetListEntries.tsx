"use client";
import { TabPanel, Tabs } from "@/components";
import { ListEntrie } from "./list";
import { AnimatePresence, motion } from "framer-motion";

export function GetListEntries() {
  const tabs = [
    {
      label: "Word",
      type: "word",
    },
    {
      label: "Favorite",
      type: "favorite",
    },
    {
      label: "History",
      type: "history",
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
      <motion.div layout 
        className="flex w-full p-4 justify-center aligm"
      >
        <Tabs changeTab={changeTab}>
          {tabs.map((tab, ind) => (
            <TabPanel key={ind} label={tab.label} type={tab.type}>
              <ListEntrie />
            </TabPanel>
          ))}
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
