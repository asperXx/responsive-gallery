<template>
  <div class="upload">
    <div class="upload__container">
      <input
        type="text"
        class="upload__url"
        @click="$event.target.select();"
        v-model="inputURL"
        placeholder="Enter the URL to JSON or image"
      />
      <p class="upload__example-link">
        For example :
        <input readonly="readonly" @click="$event.target.select();" v-model="URL" />
      </p>
      <div class="upload__buttons">
        <button class="button" @click="typeOfURL(inputURL); overlay = true">Upload</button>
      </div>
    </div>
    <div class="preloader" v-if="overlay">
      <div class="preloader__container">
        <div class="dash uno"></div>
        <div class="dash dos"></div>
        <div class="dash tres"></div>
        <div class="dash cuatro"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      isActive: true,
      URL: "https://api.jsonbin.io/b/5f4e3eeb993a2e110d3c2046/2",
      imgHeight: null,
      imgWidth: null,
      inputURL: "",
      isJSON: true,
      overlay: false,
    };
  },
  methods: {
    ...mapActions(["GET_IMAGE_FROM_URL", "GET_IMAGES_FROM_JSON_URL"]),
    // Добавление картинки или json файла
    uploadImages() {
      if (this.isJSON == false) {
        this.GET_IMAGE_FROM_URL({
          url: this.inputURL,
          width: this.imgWidth,
          height: this.imgHeight,
        });
      } else {
        if (this.inputURL !== "") {
          this.GET_IMAGES_FROM_JSON_URL(this.inputURL);
          
        }
      }
    },
    // Определение размера картинки до загрузки
    findSizeImg() {
      if (this.isJSON) {
        this.uploadImages();
      } else {
        var newImg = new Image();
        newImg.onload = () => {
          try {
            this.imgHeight = newImg.height;
            this.imgWidth = newImg.width;
            this.uploadImages();
          } catch (e) {
            console.log(e);
          }
        };
        newImg.src = this.inputURL;
      }
    },
    async typeOfURL(url) {
      try {
        let { data } = await axios.get(url);
        if (typeof data == "object") {
          this.isJSON = true;
          this.findSizeImg();
        } else {
          this.isJSON = false;
          this.findSizeImg();
        }
      } catch {
        this.isJSON = false;
        this.findSizeImg();
      }
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
