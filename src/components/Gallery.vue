<template>
  <div class="container">
    <div class="gallery" ref="gallery">
      <a
        v-for="(img, id) in IMAGES"
        :key="id"
        class="gallery__item"
        :style="{
          width: (justifyScale * img.width) / img.height + 'px',
          flexGrow: img.width / img.height,
        }"
        @click="isModal = !isModal; imageId = id;"
      >
        <img :src="img.url" />
      </a>
    </div>
    <div class="modal" v-if="isModal">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__menu">
            <div class="modal__delete-image" @click="deleteImage">
              <font-awesome-icon icon="trash" size="lg"/>
            </div>
            <div class="modal__close" @click="isModal = false">
              <font-awesome-icon icon="times" size="lg" />
            </div>
          </div>
          <div class="modal__slider">
            <div
              class="modal__arrow-prev"
              @click="imageId--; imageId < 0 ? imageId = 0 : imageId--"
            ></div>
            <img :src="modalImage.url" alt />
            <div
              class="modal__arrow-next"
              @click="imageId++; imageId > IMAGES.length-1 ? imageId = IMAGES.length-1 : imageId++"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      src: "",
      justifyScale: screen.height * 0.2,
      imgHeight: null,
      imgWidth: null,
      isModal: false,
      imageId: null,
    };
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if (this.dragAndDropCapable) {
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function (evt) {
          this.$refs.gallery.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );
      this.$refs.gallery.addEventListener(
        "drop",
        function (e) {
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
          }
          this.setImage();
          this.files = [];
        }.bind(this)
      );
    }
  },
  methods: {
    ...mapActions(["GET_IMAGE_FROM_URL", "DELETE_IMAGE"]),
    determineDragAndDropCapable() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    setImage() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              this.src = reader.result;
              this.findSizeImg();
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    findSizeImg() {
      var newImg = new Image();
      newImg.onload = () => {
        try {
          this.GET_IMAGE_FROM_URL({
            url: this.src,
            width: newImg.height,
            height: newImg.width,
          });
        } catch (e) {
          console.log(e);
        }
      };
      newImg.src = this.src;
    },
    deleteImage() {
      this.DELETE_IMAGE(this.imageId);
    }
  },
  computed: {
    ...mapGetters(["IMAGES", "IMAGE_BY_ID"]),
    modalImage() {
      return this.IMAGE_BY_ID(this.imageId);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
