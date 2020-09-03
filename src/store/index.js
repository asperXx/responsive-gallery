import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: JSON.parse(localStorage.getItem('images') || '[]')
  },
  mutations: {
    SET_IMAGE_FROM_URL(state, image) {
      state.images.unshift(image)
      localStorage.setItem('images', JSON.stringify(state.images))
    },
    SET_IMAGES_FROM_JSON_URL(state, imagesJSON) {
      for (let i = imagesJSON.length-1; i >= 0; i--) {
        state.images.unshift(imagesJSON[i])
      }
      localStorage.setItem('images', JSON.stringify(state.images))
    }
  },
  actions: {
    GET_IMAGE_FROM_URL({commit}, picture) {
      commit('SET_IMAGE_FROM_URL',picture)
    },
    GET_IMAGES_FROM_JSON_URL: async (context, images) => {
      let {data} = await axios.get(images);
      console.log(data);
      context.commit('SET_IMAGES_FROM_JSON_URL', data.galleryImages);
    },
  },
  getters: {
    IMAGES: s=> s.images
  }
})
