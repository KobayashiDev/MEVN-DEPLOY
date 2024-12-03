<template>
    <div class="topbar">
      <div class="contact-info">
        <span>{{ contactEmail }}</span>
        <span>{{ address }}</span>
      </div>
      <div class="language-currency">
        <span>{{ language }}</span> | <span>{{ currency }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      contactEmail: "support@example.com",
      address: "Kleine Pierbard 8-6 2249 KV Vries",
      language: "English",
      currency: "USD",
    };
  },
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background-color: #f5f5f5;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #fff;
    height: 100px;
}

.topbar {
    display: flex;
    justify-content: space-between;
    background-color: #eee;
    padding: 10px 30px;
    font-size: 14px;
}

.contact-info, .language-currency {
    display: flex;
    gap: 20px;
}




.logo img {
    height: 25px ;
    padding-left: 200px;
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
    
}



header .icons {
    display: flex;
    gap: 20px;
    padding-right: 100px;
}

header .icons img {
    width: 20px;
}

.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 30px;
    background-color: #eaeef2;
    
}

.hero-text {
    
    padding-left: 200px;
}

.hero-text h2 {
    font-size: 48px;
    line-height: 1.2;
    color: #000;
}

.hero-text h2 span {
    color: #ff5555;
}

.hero-text p {
    margin: 15px 0;
    font-size: 16px;
    color: #666;
}

.explore-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    margin-top: 15px;
}

.hero-image img {
    
    padding-right: 400px;
    height: 600px;
}

.pagination {
    position: absolute;
    bottom: 50px;
    right: 30px;
    font-size: 18px;
    color: #666;
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

.icons a {
    display: flex; 
    align-items: center; 
}

.icons {
    padding-right: 250px;
}

.hero{
    height: 600px;
}


      
.slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
    
    
  }
  .slide {
    min-width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: auto;
    background-color: #eaeef2;
    
  }
  .slide img {
    
    padding-left: 850px;
    height: 500px;
    padding-top:30px;
  }
  .hero-text {
    position: absolute;
    z-index: 2;
    color: white;
    text-align: center;
  }
  .pagination {
    position: absolute;
    bottom: 10px;
    right: 20px;
    color: white;
  }
  .prev, .next {
    position: absolute;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 24px;    
    padding: 10px;
    cursor: pointer;
    z-index: 2;
    border-radius: 100%;

  }
  
  .prev { left: 10px; }
  .next { right: 10px; }






 


  </style>
  