<template>
  <header>
    <div class="container">
      <router-link to="/">
        <div class="logo">
        <img :src="brandLogo" alt="Brand Logo" />
      </div>
      </router-link>
      <nav>
        <ul>
          <li><router-link to="/">HOME</router-link></li>
          <li><router-link to="/shop">SHOP</router-link></li>
          
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
            <a @click="goToProfile">Profile {{  }}</a>
            <a @click="logoutUser">Logout</a>
            <router-link to="/history">
              <a>Transaction History</a>
            </router-link>
            
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
      this.logout(); 
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
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); 
}


.logo img {
  height: 19px ;
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
color: #333; 


}


nav ul li a:hover {
border-bottom: 1px solid #000; 
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
  position: relative; 
  width: fit-content; 
  box-shadow: 0 4px 8px rgba(0, 0, 0.1, 0.1); 
}

.search-container input {
  padding-right: 30px; 
  padding-left: 10px; 
  height: 36px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
   
}

.search-container img {
  position: absolute; 
  top: 50%; 
  right: 10px; 
  transform: translateY(-50%); 
  display: flex; 
  align-items: center; 
}

.icons {
  display: flex;
  align-items: center; 
}


.dropdown-menu a:hover{
  background-color: #ccc;
  cursor:pointer;
}


    

.dropdown-menu a {
display: block;
text-decoration: none;
padding: 10px 15px;

}

.dropdown-menu{
  position:absolute;
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