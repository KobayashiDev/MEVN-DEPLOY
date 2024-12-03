<template>
  <header>
    <div class="container">
      <div class="logo">
        <img :src="brandLogo" alt="Brand Logo" />
      </div>
      <nav>
        <ul>
          <!-- Items suitable for Admin -->
          <li><router-link to="/add">ADD PRODUCT</router-link></li>
          <li><router-link to="/management">PRODUCT MANAGEMENT</router-link></li>
          <li><router-link to="/orderlist">ORDER MANAGEMENT</router-link></li>
          <li><router-link to="/usermanagement">USER MANAGEMENT</router-link></li>
        </ul>
      </nav>

      <div class="icons">
        <div class="search-container">
          <input type="text" placeholder="Search..." />
          <img :src="searchIcon" alt="Search" />
        </div>

        <div v-if="isLoggedIn">
          <div class="dropdown">
            <div class="user-icon" @click="toggleDropdown">
              <img :src="userIcon" alt="User" />
            </div>

            <div v-if="dropdownVisible" class="dropdown-menu">
              <a @click="goToProfile">Profile</a>
              <a @click="logoutUser">Logout</a>
            </div>
          </div>
        </div>

        <div v-else>
          <router-link to="/login">
            <img :src="userIcon" alt="User" />
          </router-link>
        </div>

        <router-link to="/cart">
          <img :src="cartIcon" alt="Cart" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      dropdownVisible: false,
      brandLogo: require("@/assets/logo.png.webp"),
      searchIcon: require("@/assets/search-icon.png"),
      userIcon: require("@/assets/user-icon.png"),
      cartIcon: require("@/assets/cart-icon.png")
    };
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    logoutUser() {
      this.logout(); // Call the logout action from Vuex
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #fff;
  height: 100px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); /* Light shadow */
}

.logo img {
  height: 19px;
  padding-left: 100px;
}

header nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

header nav ul li a {
  text-decoration: none;
  color: #000;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

nav ul li a {
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: #333; /* Default text color */
}

nav ul li a:hover {
  border-bottom: 1px solid #000; /* Underline on hover */
}

header .icons {
  display: flex;
  gap: 20px;
  padding-right: 50px;
}

header .icons img {
  width: 20px;
}

.search-container {
  position: relative; /* Position relative to the container */
  width: fit-content; /* Width adjusts to content */
  box-shadow: 0 4px 8px rgba(0, 0, 0.1, 0.1); /* Shadow for the input */
}

.search-container input {
  padding-right: 30px; /* Space on the right for icon */
  padding-left: 10px; /* Space on the left */
  height: 36px; /* Input height */
  border: 1px solid #ccc; /* Input border */
  border-radius: 4px; /* Rounded corners */
}

.search-container img {
  position: absolute; /* Absolute position for icon */
  top: 50%; /* Vertically center the icon */
  right: 10px; /* Space from the right */
  transform: translateY(-50%); /* Center vertically */
  display: flex; /* Ensure icon stays within flexbox */
  align-items: center; /* Center icon */
}

.icons {
  display: flex;
  align-items: center;
}

.dropdown-menu a:hover {
  background-color: #ccc;
  cursor: pointer;
}

.dropdown-menu a {
  display: block;
  text-decoration: none;
  padding: 10px 15px;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  min-width: 100px;
  box-shadow: 2px 2px 5px hsla(0, 0%, 0%, 0.8);
  z-index: 1010;
}

.dropdown-menu span {
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s;
}

.dropdown-menu span:hover {
  background-color: #f0f0f0;
}
</style>
