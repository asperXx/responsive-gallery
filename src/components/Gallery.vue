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
          <div class="modal__close">x</div>
          <div class="modal__delete-image"></div>
          <div class="modal__slider">
          <div class="modal__arrow-prev" @click="imageId--"></div>
          <img :src="modalImage.url" alt="">
          <div class="modal__arrow-next" @click="imageId++"></div>
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
      imageId: null
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
    ...mapActions(["GET_IMAGE_FROM_URL"]),
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
  },
  computed: {
    ...mapGetters(["IMAGES", "IMAGE_BY_ID"]),
      modalImage() {
        return this.IMAGE_BY_ID(this.imageId)
      }
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  &__slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__container {
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  img {
    max-width: 860px;
  }
}

.modal__arrow-prev, .modal__arrow-next {
  width: 50px;
  height: 50px;
  background: rgba(black,0.8);
  border-radius: 50%;
  margin: 0 4px;
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
    box-shadow: 0 0 0 0 rgba(black, 0.5);
  
  &:hover {
    box-shadow: 0 0 0 5px rgba(black, 0.5);
  }
  &:focus {
    box-shadow: 0 0 0 5px rgba(black, 0.5);
    outline: none;
  }
  &:active {
    box-shadow: 0 0 0 5px rgba(black, 1);
  }
  
  &::before, &::after {
    content: '';
    width: 40%;
    height: 4px;
    margin-top: -2px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    border-radius: 4px;
  }
  &::before { transform: rotate(45deg); }
  &::after { transform: rotate(-45deg); }
}
.modal__arrow-prev {
  &::before, &::after { left: 32%; }
  &::before { transform-origin: 0 0;  }
  &::after { transform-origin: 0 100%; }
}
.modal__arrow-next {
  &::before, &::after { right: 32%; }
  &::before { transform-origin: 100% 100%; }
  &::after { transform-origin: 100% 0; }
}
</style>
