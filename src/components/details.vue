<template>
  <!DOCTYPE html>
  <html>
    <!-- credits template : w3css open source template (with personel modifications)-->
    <title>Restaurant</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <body class="w3-content" style="max-width: 1200px">
      <div class="w3-panel">
        <div class="w3-bar w3-light-grey">
          <a href="http://localhost:8081" class="w3-bar-item w3-button">Home</a>
          <button class="open-button w3-bar-item w3-button" @click="openForm()">
            Login
          </button>
        </div>
      </div>
      <!-- First Grid: Logo & About -->
      <div class="w3-row">
        <div class="w3-half w3-container">
          <h1 class="w3-xxlarge w3-text-grey">{{ restaurant.name }}</h1>
          <h1 class="w3-jumbo">In {{ restaurant.borough }}</h1>
          <div id="map">
            <GmapMap
              :center="{
                lat: this.restaurant.address.coord[0],
                lng: this.restaurant.address.coord[1],
              }"
              :zoom="7"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
            </GmapMap>
          </div>
        </div>
        <div class="w3-half w3-container w3-xlarge w3-text-grey">
          <p class="">Our speciality is {{ restaurant.cuisine }}</p>
          <h2>Recent Grades</h2>
          <ul id="grades">
            <li v-for="(grade, index) in restaurant.grades" v-bind:key="index">
              {{ grade.date }} - {{ grade.grade }} - {{ grade.score }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="w3-row w3-section">
        <div
          class="w3-third w3-container w3-black w3-large"
          style="height: 250px"
        >
          <h2>Find us in</h2>
          <p>
            <i class="fa fa-map-marker" style="width: 30px"></i>
            {{ restaurant.address.building }} , {{ restaurant.address.street }}
          </p>
          <p>
            <i class="fa fa-map-marker" style="width: 30px"></i>
            {{ restaurant.address.zipcode }}
          </p>
          <p>
            <i class="fa fa-map-marker" style="width: 30px"> </i>
            {{ restaurant.borough }}
          </p>
        </div>
        <div
          class="w3-third w3-center w3-large w3-dark-grey w3-text-white"
          style="height: 250px"
        >
          <img
            src="https://myfrugaladventures.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-07-at-11.19.18-AM.png"
            alt="food"
            style="height: 100%"
          />
        </div>
        <div
          class="w3-third w3-center w3-large w3-grey w3-text-white"
          style="height: 250px"
        >
          <h2>Like Us</h2>
          <a href="https://www.youtube.com/watch?v=Obgnr9pc820"
            ><i class="w3-xlarge fa fa-facebook-official"></i><br
          /></a>
          <i class="w3-xlarge fa fa-pinterest-p"></i><br />
          <i class="w3-xlarge fa fa-twitter"></i><br />
          <i class="w3-xlarge fa fa-flickr"></i><br />
          <i class="w3-xlarge fa fa-linkedin"></i>
        </div>
      </div>
      <div class="w3-container w3-text-grey">
        <p>
          Powered by
          <a href="https://www.w3schools.com/w3css/default.asp" target="_blank"
            >w3.css</a
          >
        </p>
      </div>
    </body>
  </html>
</template>





<script>
export default {
  name: "DetailsPage",
  data: () => ({
    restaurant: [],
  }),
  components: {},
  mounted() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.getRestaurantById(this.id);
  },
  methods: {
    getRestaurantById(id) {
      fetch("http://localhost:8080/api/restaurants/" + id, {
        method: "get",
      })
        .then((responseJSON) => {
          responseJSON.json().then((responseJS) => {
            console.log(responseJS);
            this.restaurant = responseJS.restaurant;
            console.log(this.restaurant);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

