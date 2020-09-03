<template>
  <div class="container">
    <div class="upload">
      <input type="text" class="upload__url" />
      <div class="upload__buttons">
        <div class="button">Clear</div>
        <div class="button">Switch</div>
        <div class="button">Upload</div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.container {
    max-width: 860px;
    min-width: 320px;
}
.upload {
    display: flex;
    flex-direction: column;
    &__buttons {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    &__url {
        width: 100%;
    }
}
.button {
  background-color: black;
  width: 300px;
  height: 50px;
  color: white;
  font-size: 20px;
}
</style>