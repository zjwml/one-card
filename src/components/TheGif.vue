<!--
 * @Autor: zengjun1.fj
 * @Date: 2024-08-19 15:30:39
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-04 14:33:19
 * @Description: 
-->
<template>
  <div>
    <img :src="getImage(currentImage)" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, defineEmits } from 'vue';

const props = defineProps({
  imageList: {
    type: Array,
    required: true
  },
  //帧间隔毫秒
  timeout: {
    type: Number,
    default: 200
  },
  //是否循环
  isLoop: {
    type: Boolean,
    default: true
  }
})

const pathParent = "../assets/img/";
let getImage = name => {
  return new URL(pathParent + name, import.meta.url).href;
}

// 当前显示的图片索引  
const currentIndex = ref(0);
// 当前显示的图片URL  
const currentImage = computed(() => props.imageList[currentIndex.value]);
// 设置一个定时器，每隔timeout秒更新当前索引  
let intervalId = null;

const emit = defineEmits(['playCompleted']);

onMounted(() => {

  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.imageList.length; // 循环显示图片  
    // 如果需要，可以在这里添加播放完成的逻辑  
    if (!props.isLoop && currentIndex.value === 0) { // 假设回到第一张图片时视为播放完成  
      clearInterval(intervalId);
      emit('playCompleted', '播放完成'); // 向父组件发送消息  
    }
  }, props.timeout); // timeout秒 


});

onUnmounted(() => {
  // 组件卸载时清除定时器  
  clearInterval(intervalId);
});  
</script>

<style lang="scss" scoped></style>