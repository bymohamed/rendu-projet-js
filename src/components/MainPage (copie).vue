
<template>
  <div>
    
 
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <!-- <div v-if="restaurants.length">
            <ol>
                <li v-for="(restaurant, index) in restaurants" :key="index">
                    {{restaurant.restaurantName}} - {{restaurant.restaurantCuisine}} - {{restaurant.restaurantPrice}}<button @click="removeResto(restaurant)" style="background-color: red">Remove</button>
                </li>
            </ol>


        </div>
        <div v-else>
            <p>Hooray! No rastaurant in list sorry.</p>
        </div>  -->

    <div class="">
      <a href="http://localhost:8081" >Home</a>
      <a class="" >Nombre de restaurants : {{ total }}</a>
      <button class=" fa fa-search" type="submit" @click="getRestaurantsFromServer(0)">
      </button>

      <div class="form-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
    <h1>Login</h1>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit" class="btn">Login</button>
    <button type="button" class="btn cancel" @click="closeForm()">Close</button>
  </form>
</div>

          <input
        type="text"
        placeholder="Search.."
        name="searchVal"
        id="searchVal"
        @keydown="searchBar()"
          />
      
    </div>

    <datalist id="values">
      <option value="5"/>
      <option value="10"/>
      <option value="20"/>
      <option value="50"/>
      <option value="100"/>
    </datalist>

    <div class="slidecontainer">
      <input
        type="range"
        min="5"
        max="100"
        step="5"
        list="values"
        id="myRange"
        placeholder="Restaurants par page"
        v-on:change="updateSliderValue()"
      />
      <p style="text-align:center; margin:0px ; padding: 0px;">{{ sliderVal }}</p> 
    </div>

    <div id="table-restos">
    <table style="table-layout: fixed; width:100% ; margin: 5px">
      <tr >
        <th style="width:80px"> details </th>
        <th>Nom</th>
        <th>Cuisine</th>
        <th>ville</th>
      </tr>
      <tbody>
        <restaurant-list :restos="restaurants">
          <!-- <slot><restaurant :varia="restaurant"></restaurant></slot> -->
        </restaurant-list>
      </tbody>
    </table>
    <h3 v-if="restaurants.length==0"> 0 restaurants trouvés </h3>

    </div>
    <br />

    <div style="margin: auto">
      <div>
        <button
          v-on:click="previousPage()"
          value="precedent"
          :disabled="counter == 0"
        >
          precedent
        </button>
      </div>

      <div >
        <h4 >page number {{ counter }}</h4>
      </div>

      <div >
        <button
          
          v-on:click="nextPage()"
          value="suivant"
        >
          suivant
        </button>
      </div>
    </div>

    <hr />
    <!-- <p>New restaurant:</p>
    <form v-on:submit.prevent>
      <div>
        <input type="text" v-model="name" placeholder="restaurant Name" />
      </div>
      <div>
        <input type="text" v-model="cuisine" placeholder="restaurant Cuisine" />
      </div>
      <div>
        <input type="text" v-model="restaurantPrice" placeholder="Prix moyen" />
      </div>
      <div>
        <button @click="addResto()">Submit</button>
      </div>
    </form> -->
  </div>
</template>

<script>
import Vue from "vue/dist/vue.js";
import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

// import {data} from '../main.js'
import _ from "lodash";
export default {
  name: "MainPage",
  data: () => ({
    name: "",
    _id: "",
    cuisine: "",
    borough : "",
    restaurantPrice: "",
    restaurants: [],
    counter: 0,
    total: 0,
    sliderVal: 5,
    address: []
  }),
  mounted() {
    console.log("avant rendu html");
    this.getRestaurantsFromServer(0);
  },
  methods: {
    addResto() {
      this.$firestore.restaurants.add({
        name: this.name,
        cuisine: this.cuisine,
        restaurantPrice: this.restaurantPrice,
        dateCreated: new Date(),
      });
      this.name = "";
      this.cuisine = "";
      this.restaurantPrice = 0;
    },
    removeResto(resto) {
        let url = "http://localhost:8080/api/restaurants/" + resto._id;

        fetch(url, {
            method: "DELETE",
          })
            .then((responseJSON) => {
              responseJSON.json().then((resJS) => {
                console.log(resJS.msg);
                this.msg = resJS.msg;
                this.getRestaurantsFromServer();
              });
            })
            .catch(function (err) {
              console.log(err);
            });
    },
    getRestaurantsFromServer(x) {
      fetch(
        "http://localhost:8080/api/restaurants?page=" +
          x +
          "&pagesize=" +
          this.sliderVal +
          "&name=" +
          document.getElementById("searchVal").value.toLowerCase(),
        {
          method: "get",
        }
      )
        .then((responseJSON) => {
          responseJSON.json().then((responseJS) => {
            this.total = responseJS.count;
            console.log(responseJS);
            this.restaurants = responseJS.data;
            console.log(this.restaurants);

          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    searchBar: _.debounce(function () {
      this.getRestaurantsFromServer(0);
    }, 300),

    nextPage() {
      this.counter++;
      console.log(this.counter);
      this.getRestaurantsFromServer(this.counter, this.sliderVal);
    },
    previousPage() {
      this.counter--;
      console.log(this.counter);
      this.getRestaurantsFromServer(this.counter, this.sliderVal);
    },
    updateSliderValue() {
      this.sliderVal = document.getElementById("myRange").value;
      this.getRestaurantsFromServer(this.counter, this.sliderVal);
    },
    openForm() {
  document.getElementById("myForm").style.display = "block";
},

    closeForm() {
  document.getElementById("myForm").style.display = "none";
}
  },
};



Vue.component("restaurant-list", {
  props: ["restos"],
  template: `<fragment>
                <tr v-for="(restaurant, index) in restos" :key="index" >  
                <restaurant :varia="restaurant"></restaurant>
                </tr>
                </fragment>`,
});

Vue.component("restaurant", {
  template: `<fragment>
                <td> 
                  <div class="tooltip"> <a v-bind:href="'/RestaurantDetail?id='+ varia._id"> Ici </a>
                    <span class="tooltiptext"> 
                      building : {{varia.address.building}} <br>
                      street : {{varia.address.street}} <br>
                      zipcode : {{varia.address.zipcode}}
                    </span>
                  </div>          
                </td>
                <td> {{varia.name}} </td>
                <td> {{varia.cuisine}}</td>
                <td> {{varia.borough}} </td>
                <!-- <td> <button @click="removeResto(varia)">Remove</button> </td> -->
                </fragment>`,
  props: {
    varia: {
      type: Object,
      default: () => ({}),
    },
  } 

});

</script>

<style scoped>
div {
  margin-bottom: 20px;
}

.form-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}
</style>



