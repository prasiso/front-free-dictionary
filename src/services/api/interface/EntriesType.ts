export interface entriesFindAllResp {
    "results": Array<string>,
    "totalDocs": number,
    "page": number,
    "totalPage": number,
    "hasNext": boolean,
    "hasPrev": boolean

}

type entriesPhonetics = {
    "text": string,
    "audio": string,
    "sourceUrl": string,
    "license": {
        "name": string,
        "url": string
    }
}
type definitions = {
    "definition": string,
    "synonyms": string[],
    "antonyms": string[]
}

type meanings = {
    "partOfSpeech": string,
    "definitions": definitions[]
}
type license = {
    name: string,
    url: string
}


export interface entriesGetFindOneResp {
    "word": string,
    "phonetic": string,
    "phonetics": entriesPhonetics[],
    "meanings": meanings[],
    "license": license,
    "sourceUrls": string[]
}