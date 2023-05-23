<template>
  <div v-if="data">
    <FaceImage :face="currentDialogue.face" />
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
let currentScenarioId = ref(1);
let currentScenario = computed(() =>
  data.value?.find((scenario) => scenario.id === currentScenarioId.value)
);
let dialogueIndex = ref(0);
let currentDialogue = computed(
  () => currentScenario.value?.dialogues[dialogueIndex.value]
);
let animatedText = ref("");
let animationTimeouts = [];

watch(
  currentDialogue,
  (newDialogue) => {
    // 全ての既存のタイムアウトをキャンセルします
    for (const timeout of animationTimeouts) {
      clearTimeout(timeout);
    }
    animationTimeouts = [];
    animatedText.value = "";
    let i = 0;
    const animateText = () => {
      if (i < newDialogue.text.length) {
        animatedText.value += newDialogue.text[i];
        i++;
        // 新しいタイムアウトをスケジュールし、そのIDを保存します
        const timeout = setTimeout(animateText, 50); // 調節可能な遅延
        animationTimeouts.push(timeout);
      }
    };
    animateText();
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
