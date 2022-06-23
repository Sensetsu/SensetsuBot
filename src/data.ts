import { Song } from "./voice.js";

export interface SavedGuildData {
    queue: Song[]
}

export const savedGuildData = new Map<string, SavedGuildData>();

export function createSavedGuildDataEntry() {
    return {
        queue: []
    }
}