<template>
  <div class="w-[1100px] h-[720px] m-auto relative bg-black h-screen" v-if="data">
    <FaceImage :face="currentDialogue.face" />
    <Background :background="currentDialogue.background" />
    <Choices />
    <div class="relative w-[800px] h-[222px] m-auto rounded-xl rounded-10 z-20">
      <p :class="`${messageWindowClass.bg} font-hiragino w-[290px] h-[77px] absolute left-0 top-[-64px] rounded-lg text-center text-3xl text-white font-bold flex items-center justify-center`">{{ currentDialogue.speaker }}</p>
      <div
      :class="`font-hiragino text-3xl py-7 px-7 rounded-xl rounded-10 border-8 h-full border-solid mx-auto bg-white leading-1.5 border-5  py-30 px-25 font-bold tracking-0.5 cursor-pointer relative text-32 ${messageWindowClass.border}`"
    >
      {{ animatedText }}
    </div>
    <button
      v-if="
        !currentScenario.choices ||
        dialogueIndex < currentScenario.dialogues.length - 1
      "
      @click="nextDialogue"
      :class="`font-hiragino w-[200px] h-[80px] m-auto absoluterounded-full bottom-0 text-3xl ${messageWindowClass.bg} ${messageWindowClass.hover} text-white border-8 border-solid transition absolute rounded-full right-[-20px] bottom-[-20px]`"
    >
      NEXT
    </button>
    </div>
    <div
      v-if="
        currentScenario.choices &&
        dialogueIndex === currentScenario.dialogues.length - 1
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
  (newDialogue, oldDialogue) => {
    if (newDialogue !== oldDialogue) {
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
    }
  },
  { immediate: true }
);

watch(data, () => {
  dialogueIndex.value = 0;
});
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
/* let messageWindowClass = computed(() => {
  return currentDialogue.value && currentDialogue.value?.speaker === 'ボク' ? 'green' : 'pink';
}); */

let messageWindowClass = computed(() => {
  if (currentDialogue.value && currentDialogue.value?.speaker === 'ボク') {
    return {
      bg: 'bg-green',
      border: 'border-green',
      hoverBorder: 'hover:border-green'
    };
  } else {
    return {
      bg: 'bg-pink',
      border: 'border-pink',
      hoverBorder: 'hover:border-pink'
    };
  }
});
</script>
