<template>
  <div v-if="scenarios.data">
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
    <div>
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

<script setup>
const { data } = await useFetch("/api/hello");
console.log(data);
let currentScenarioId = ref(1);
let currentScenario = computed(() =>
  scenarios.value?.find((scenario) => scenario.id === currentScenarioId.value)
);
let dialogueIndex = ref(0);
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
