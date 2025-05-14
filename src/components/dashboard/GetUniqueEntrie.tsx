"use client";
import { useUI } from "@/context/UIContext";
import { catchExcpetion } from "@/helper";
import { EntriesGetEntrie, WordEntry } from "@/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GetRowAudio } from "./unique/GetRowAudio";
import { IPropsRowAudio } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export function GetUniqueEntrie() {
  const { showAlert, showLoading, setLoading } = useUI();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [body, setBody] = useState<WordEntry | undefined>(undefined);
  const query = useSearchParams();
  const entrie = query.get("entrie");
  async function HandleSearchEntrie() {
    try {
      await showLoading(async () => {
        if (!entrie) {
          setBody(undefined);
          return;
        }
        const resp = await EntriesGetEntrie(String(entrie));
        resp.audio = resp.audio.sort((a, b) => (!a.audio && b.audio ? 1 : -1));
        setBody(resp);
      });
    } catch (error) {
      setLoading(false);
      await closeGetUnique();
      const message = catchExcpetion(error);
      await showAlert({ type: "error", message });
    } finally {
    }
  }
  function closeGetUnique() {
    setBody(undefined);
  }

  async function playAudio(row: IPropsRowAudio) {
    if (!audioRef.current) audioRef.current = new Audio(row.audio);
    audioRef.current.currentTime = 0;
    await audioRef.current.play();
    audioRef.current = null;
  }
  useEffect(() => {
    HandleSearchEntrie();
  }, [entrie]);

  return (
    <>
      <AnimatePresence>
        {body && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-sm w-full bg-purple-50 rounded-lg p-5 shadow-sm relative"
          >
            <button
              aria-label="Close"
              onClick={closeGetUnique}
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h1 className="text-center text-2xl font-semibold text-black mb-6">
              {body.word} {body.phonetic && <span> - {body.phonetic} </span>}
            </h1>

            <ul className="list-disc list-inside overflow-y-auto space-y-4 mb-6 max-h-65">
              {body.audio.map((aud, ind) => (
                <GetRowAudio
                  key={ind}
                  audio={aud.audio}
                  country={aud.country}
                  text={aud.text}
                  playAudio={playAudio}
                />
              ))}
            </ul>

            <div>
              <p className="font-semibold text-black mb-3">Meanings</p>
              <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm max-h-64 overflow-y-auto pr-2">
                {body?.meanings.map((row, ind) => (
                  <li key={ind}>
                    {row.speach} - {row.definition}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-start space-x-3">
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition">
                Voltar
              </button>
              <button className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm hover:bg-purple-800 transition">
                Próximo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
