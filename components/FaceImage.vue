<template>
  <div class="mt-[160px] mb-[20px] flex justify-center items-center">
    {{ face }}
    <img
      v-if="imgUrl"
      :class="getImageClass(props.face)"
      :src="images[imgUrl]"
      :key="imgUrl"
      class="h-auto z-20"
    />
  </div>
</template>

<script setup>
import { filename } from "pathe/utils";
const props = defineProps({
  face: {
    type: String,
    required: true,
  },
});

let imgUrl = ref("");
const glob = import.meta.glob("~/assets/face/*.png", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

watch(
  () => props.face,
  (newFace) => {
    if (newFace) {
      imgUrl.value = newFace;
    }
  },
  { immediate: true }
);
const getImageClass = (imageUrl) => {
  let baseClasses = "object-cover";
  switch (imageUrl) {
    case "enmadaiou":
      baseClasses += " w-60";
      break;
    case "daughter_laugh":
      baseClasses += " w-64";
      break;
    case "dog":
      baseClasses += " w-72";
      break;
    default:
      baseClasses += " w-52";
      break;
  }
  return baseClasses;
};
</script>

<style>
@keyframes img-wrap {
  0% {
    clip-path: circle(0 at 50% 50%);
    -webkit-clip-path: circle(0 at 50% 50%);
  }

  100% {
    clip-path: circle(100% at 50% 50%);
    -webkit-clip-path: circle(100% at 50% 50%);
  }
}
</style>

<style>
@screen pc {
  .character__characterImage {
    @apply w-52;
  }
  .character__characterImage.enmadaiou {
    @apply w-60;
  }
  .character__characterImage.daughter_laugh {
    @apply w-64;
  }
  .character__characterImage.dog {
    @apply w-72;
  }
  .character__subWindow {
    @apply absolute top-0 right-48 bg-gray-200 border-2 border-black rounded-md transition-all animate-img-wrap;
  }
  .character__subWindowImage {
    @apply w-36;
  }
}

@screen sp {
  .character__characterImage {
    @apply w-44 h-60;
  }
  .character__characterImage.enmadaiou {
    @apply w-52;
  }
  .character__subWindow {
    @apply absolute top-0 right-2 bg-gray-200 border-2 border-black rounded-md transition-all animate-img-wrap;
  }
  .character__subWindowImage {
    @apply w-24;
  }
}
</style>
