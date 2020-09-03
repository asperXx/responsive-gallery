<template>
  <div class="container">
    <div class="gallery">
      dfgdfg
      <!-- <a
        v-for="(img,id) in pictures"
        :key="id"
        class="gallery__item"
        :style="{ width: (justifyScale * img.width / img.height) + 'px', flexGrow: img.width / img.height}"
      >
        <img :src="img.url" />
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      justifyScale: screen.height * 0.2,
    };
  },
  computed: {},
};
</script>

<style scoped lang="scss">
html,
body {
  
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800px;
  width: 100%;
  background: #333;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  max-width: 860px;
  min-width: 320px;
  .gallery__item {
    margin: 2px;
    cursor: pointer;
    justify-content: center;
    &:hover {
      opacity: 0.9;
    }

    img {
      user-select: none;
      width: 100%;
      vertical-align: middle;
    }
  }

  &::after {
    content: "";
    flex-grow: 99999;
    min-width: calc(100vw / 4);
  }

  //Full width in mobile
  @media (max-width: 460px) {
    flex-direction: column;
    a {
      width: 100% !important;
    }
  }
}
</style>
