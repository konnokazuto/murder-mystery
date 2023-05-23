<template>
  <img v-if="imgUrl" :src="imgUrl" />
</template>

<script setup>
const props = defineProps({
  face: {
    type: String,
    required: true,
  },
});

let imgUrl = ref("");

const generateImgPath = (fileName) => {
  return new URL(`../assets/face/${fileName}.png`, import.meta.url).href;
};

watchEffect(() => {
  imgUrl.value = generateImgPath(props.face);
});
</script>
