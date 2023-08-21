// store/dialogue.ts
import { defineStore } from "pinia";
import scenarios from "../server/api/scenarios.ts";

export const useDialogueStore = defineStore("dialogue", {
  state: () => ({
    currentDialogue: null,
    dialogueIndex: 0,
    scenarios,
  }),
  actions: {
    advanceDialogue() {
      if (this.dialogueIndex < this.scenarios.length) {
        const newDialogue = this.scenarios[this.dialogueIndex];
        console.log(newDialogue);
        this.dialogueIndex++;
        this.currentDialogue = newDialogue;
      }
    },
    initialize() {
      this.advanceDialogue();
    },
  },
});
