<script setup>
const { data } = await useFetch("/api/scenarios");
let currentScenarioId = ref(1);
let currentScenario = computed(() =>
  data.value?.find((scenario) => scenario.id === currentScenarioId.value)
);
let dialogueIndex = ref(0);
console.log(dialogueIndex.value);
let currentDialogue = computed(
  () => currentScenario.value?.dialogues[dialogueIndex.value]
);
const nextDialogue = () => {
  if (
    currentScenario.value &&
    dialogueIndex.value < currentScenario.value.dialogues.length - 1
  ) {
    dialogueIndex.value++;
  }
};

const goToScenario = (nextId) => {
  currentScenarioId.value = nextId;
  dialogueIndex.value = 0;
};
</script>

<template>
  <div v-if="currentDialogue.speaker && currentDialogue.text">
    <p>{{ currentDialogue.speaker }}「{{ currentDialogue.text }}」</p>
    <button
      v-if="
        !currentScenario.choices ||
        dialogueIndex < currentScenario.dialogues.length - 1
      "
      @click="nextDialogue"
    >
      次へ
    </button>
    <div
      v-if="
        currentScenario.choices &&
        dialogueIndex >= currentScenario.dialogues.length - 1
      "
    >
      <button
        v-for="(choice, index) in currentScenario.choices"
        :key="index"
        @click="goToScenario(choice.nextId)"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
  <div v-else>ローディング...</div>
</template>
