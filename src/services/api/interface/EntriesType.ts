type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "article"
  | "determiner";

type Pronunciation = {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
  country?: string;
};

type Meaning = {
  speach: PartOfSpeech | string;
  definition: string;
};

export type WordEntry = {
  word: string;
  phonetic: string;
  audio: Pronunciation[];
  meanings: Meaning[];
};
