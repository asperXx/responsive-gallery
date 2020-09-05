<template>
  <div class="container">
    <div class="upload">
      <input
        type="text"
        class="upload__url"
        @click="$event.target.select();"
        v-model="inputURL"
        :placeholder="placeholder"
      />
      <p class="upload__example-link">
        For example :
        <input readonly="readonly" @click="$event.target.select();" v-model="URL" />
      </p>
      <div class="upload__buttons">
        <button class="button" @click="switchURL();isJSON = !isJSON; ">Switch</button>
        <button class="button" @click="findSizeImg();">Upload</button>
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
      URL: "https://api.jsonbin.io/b/5f4e3eeb993a2e110d3c2046/2",
      imgHeight: null,
      imgWidth: null,
      placeholder: "Enter the link to the JSON file",
      inputURL: "",
      isJSON: true,
    };
  },
  methods: {
    ...mapActions(["GET_IMAGE_FROM_URL", "GET_IMAGES_FROM_JSON_URL"]),
    // Добавление картинки или json файла
    uploadImages() {
      console.log(this.isJSON);
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
    // Смена JSON ссылки на image
    switchURL() {
      if (!this.isJSON) {
        this.URL = "https://api.jsonbin.io/b/5f4e3eeb993a2e110d3c2046/2";
        this.placeholder = "Enter the link to the JSON file";
      } else {
        this.URL =
          "https://avatars.mds.yandex.net/get-pdb/367895/727a996a-b45e-4a70-bcf5-20ed6685f3ed/s1200";
        this.placeholder = "Enter the link to the image";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

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
</style>
