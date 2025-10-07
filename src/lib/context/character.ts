import { getContext, setContext } from "svelte";

const key = Symbol("characterContext");

interface CharacterContext {
  characterID: number;
}

export function setCharacterContext(context: CharacterContext) {
  setContext(key, context);
}

export function getCharacterContext() {
  return getContext<CharacterContext | undefined>(key);
}
