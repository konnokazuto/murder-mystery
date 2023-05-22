<template>
  <button
    v-for="(choice, index) in currentScenario.choices"
    :key="index"
    @click="goToScenario(choice.nextId)"
  >
    {{ choice.text }}
  </button>
</template>
