<template>
  <div class="container">
    <div class="upload">
      <input type="text" class="upload__url" v-model="URL" />
      <div class="upload__buttons">
        <div class="button" @click="URL = ''">Clear</div>
        <div class="button">Switch</div>
        <div class="button" @click="findSizeImg">Upload</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isActive: true,
      URL: "https://api.jsonbin.io/b/5f4e3eeb993a2e110d3c2046/1",
      imgHeight: null,
      imgWidth: null,
      isDisable: true,
    };
  },
  methods: {
    ...mapActions(["GET_IMAGE_FROM_URL", "GET_IMAGES_FROM_JSON_URL"]),
    // Добавление картинки или json файла
    uploadImages() {
      // const picture = {
      // url: this.url,
      // width: this.imgWidth,
      // height: this.imgHeight,
      // };
      // console.log(picture);
      // this.addPicture(picture);
      // this.url = "";
      this.GET_IMAGES_FROM_JSON_URL(this.URL);
      // }
    },
    // Определение размера картинки до загрузки
    findSizeImg() {
      var newImg = new Image();
      newImg.onload = () => {
        try {
          this.imgHeight = newImg.height;
          this.imgWidth = newImg.width;
          console.log(this.imgHeight, this.imgWidth)
        } catch (e) {
          console.log(e);
        }
      };
      newImg.src = this.URL;
    },
  },
};
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
