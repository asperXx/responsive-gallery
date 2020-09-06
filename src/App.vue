<template>
  <div id="app">
    <UploadImages />
    <Gallery />
  </div>
</template>

<script>
import UploadImages from "./components/UploadImages"
import Gallery from "./components/Gallery"
export default {
  name: 'App',
  components: {
    UploadImages,
    Gallery
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
