// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


import Vue from 'vue/dist/vue.js';
import App from './App.vue';
import VueRouter from 'vue-router';
import DetailsPage from './components/details.vue'
import MainPage from './components/MainPage.vue'

// import firebase from 'firebase'
// import 'firebase/firestore'
// import VueFirestore from 'vue-firestore'

// firebase.initializeApp({
//     databaseURL: "https://td1-js-20c58.firebaseio.com",
//     projectId: "td1-js-20c58",
// });
// export const db = firebase.firestore();



// Vue.use(VueFirestore)
Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
    { path: '/RestaurantDetail', component: DetailsPage},
    { path: '/', component: MainPage},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBaVhUddCvTmslvg9tw9QhPbr2LZ35bLWk',
  }
});

new Vue({  
    render: h => h(App),
    router: router,
}).$mount('#app')




