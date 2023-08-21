<template>
  <div class="question w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-black opacity-80 z-50">
    <div class="question__contents w-[900px] flex flex-col align-middle items-center">
      <div class="question__topic text-white font-hiragino text-4xl m-auto">
          {{ questions.questionTitle }}
      </div>
      <button
        v-for="(choice, index) in questions.choices"
        :key="index"
        @click="goToScenario(choice.nextId)"
        class="border-green hover:border-pink hover:opacity-80 border-4 w-full h-25 mb-4.5 box-border leading-snug cursor-pointer text-center text-3xl font-bold bg-choice mb-10 rounded-md py-6"
      >
      <span>{{ choice.text }}</span>
      </button>
    </div>
    </div>
</template>
<script setup>
import { filename } from "pathe/utils";

const questions = reactive({
  questionTitle: "死の手前に",
  choices: [
    { text: "食べる", nextId: 2 },
    { text: "食べない", nextId: 3 },
    { text: "ちゃぶ台をひっくり返す", nextId: 4 },
  ]
});
</script>