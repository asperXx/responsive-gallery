<template>
  <div class="container">
    <div class="gallery" ref="fileform">
      <a
        v-for="(img,id) in IMAGES"
        :key="id"
        class="gallery__item"
        :style="{ width: (justifyScale * img.width / img.height) + 'px', flexGrow: img.width / img.height}"
      >
        <img :src="img.url" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
   data(){
      return {
        dragAndDropCapable: false,
        files: [],
        uploadPercentage: 0,
        src: "",
        justifyScale: screen.height * 0.2,
        imgHeight: null,
        imgWidth: null
      }
    },
    mounted(){
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if( this.dragAndDropCapable ){
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
          this.$refs.fileform.addEventListener(evt, function(e){
            e.preventDefault();
            e.stopPropagation();
          }.bind(this), false);
        }.bind(this));
        this.$refs.fileform.addEventListener('drop', function(e){
          for( let i = 0; i < e.dataTransfer.files.length; i++ ){
            this.files.push( e.dataTransfer.files[i] );
            this.setImage();
          }
        }.bind(this));
      }
    },
    methods: {
      ...mapActions(["GET_IMAGE_FROM_URL"]),
      determineDragAndDropCapable(){
        var div = document.createElement('div');
        return ( ( 'draggable' in div )
                || ( 'ondragstart' in div && 'ondrop' in div ) )
                && 'FormData' in window
                && 'FileReader' in window;
      },
      setImage(){
        for( let i = 0; i < this.files.length; i++ ){
          if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
            this.findSizeImg();
            let reader = new FileReader();
            reader.addEventListener("load", function(){
              this.src = reader.result;
              const picture = {
              url: this.src,
              width: this.imgWidth,
              height: this.imgHeight,
            };
            console.log(picture);
            this.GET_IMAGE_FROM_URL(picture);
            }.bind(this), false);
            reader.readAsDataURL( this.files[i] );
          } 
        }
      },
       findSizeImg() {
      var newImg = new Image();
      newImg.onload = () => {
        try {
          this.imgHeight = newImg.height;
          this.imgWidth = newImg.width;
        } catch (e) {
          console.log(e);
        }
      };
      newImg.src = this.url;
    },
  
},
computed: {
    ...mapGetters(["IMAGES"])
  },
}
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
</style>
