<template>
  <img
    v-if="imgUrl"
    :src="images[imgUrl]"
    :key="imgUrl"
    class="background w-full h-full absolute top-0 left-0 z-8 object-cover blur-sm z-10"
  />
  hoge
</template>

<script setup>
import { filename } from "pathe/utils";
const props = defineProps({
  background: {
    type: String,
    required: true,
  },
});

let imgUrl = ref("");
const glob = import.meta.glob("~/assets/background/*.jpg", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
watch(
  () => props.background,
  (newFace) => {
    if (newFace) {
      imgUrl.value = newFace;
    }
  },
  { immediate: true }
);
</script>
