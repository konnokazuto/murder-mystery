<template>
  <div v-if="data">
    <img :src="generateImgPath(currentDialogue.face)" />
    <p>{{ currentDialogue.speaker }}「{{ animatedText }}」</p>
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
const { data } = await useFetch("/api/scenarios");
console.log(data);
let currentScenarioId = ref(1);
let currentScenario = computed(() =>
  data.value?.find((scenario) => scenario.id === currentScenarioId.value)
);
let dialogueIndex = ref(0);
let currentDialogue = computed(
  () => currentScenario.value?.dialogues[dialogueIndex.value]
);
let animatedText = ref("");

watch(
  currentDialogue,
  async (newDialogue) => {
    animatedText.value = "";
    for (const char of newDialogue.text) {
      animatedText.value += char;
      await new Promise((resolve) => setTimeout(resolve, 50)); // 調節可能な遅延
    }
  },
  { immediate: true }
);

onMounted(() => {
  nextDialogue();
});
const generateImgPath = (fileName) => {
  return new URL(`../assets/face/${fileName}.png`, import.meta.url).href;
};
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
