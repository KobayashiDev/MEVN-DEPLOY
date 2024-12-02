<template>
  <section class="slider">
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <Slide
        v-for="(slide, index) in slides"
        :key="index"
        :slide="slide"
      />
    </div>
    <button class="prev" @click="prevSlide">&#10094;</button>
    <button class="next" @click="nextSlide">&#10095;</button>
    <div class="pagination">
      <span>{{ currentIndex + 1 }}</span> / <span>{{ slides.length }}</span>
    </div>
  </section>
</template>

<script>
import Slide from './AppSlide.vue';

export default {
  components: { Slide },
  data() {
    return {
      currentIndex: 0,
      slides: [
          {
            image: require("@/assets/banner-image-1.png"),
            title: "Up To",
            discount: "50% Discount",
            subtitle: "Summer Lookbook - 2020",
            description: "New Modern Stylist Fashionable Men's Wear Jeans Shirt.",
            buttonText: "Explore Now"
          },
          {
            image: require("@/assets/banner-image-2.png"),
            title: "Exclusive Deal",
            discount: "40%",
            subtitle: "Winter Collection",
            description: "Best stylish jackets and coats for this season.",
            buttonText: "Explore Now"
          },
          {
            image: require("@/assets/banner-image-3.png"),
            title: "New Arrival",
            discount: "30%",
            subtitle: "Autumn Fashion",
            description: "Discover the best autumn fashion trends.",
            buttonText: "Explore Now"
          }
        ]
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 5000); // Auto-slide every 5 seconds
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
    position: relative; /* Đặt vị trí tương đối cho khối chứa */
    width: fit-content; /* Chiều rộng tự động phù hợp với nội dung */
    box-shadow: 0 4px 8px rgba(0, 0, 0.1, 0.1); /* Tạo bóng cho ô nhập */
}

.search-container input {
    padding-right: 30px; /* Thêm khoảng trống bên phải để không bị đè lên biểu tượng */
    padding-left: 10px; /* Thêm khoảng trống bên trái */
    height: 36px; /* Chiều cao ô nhập */
    border: 1px solid #ccc; /* Đường viền cho ô nhập */
    border-radius: 4px; /* Bo góc cho ô nhập */
     
}

.search-container img {
    position: absolute; /* Đặt biểu tượng ở vị trí tuyệt đối */
    top: 50%; /* Đặt vị trí từ trên xuống giữa */
    right: 10px; /* Khoảng cách từ bên phải */
    transform: translateY(-50%); /* Canh giữa theo chiều dọc */
    display: flex; /* Đảm bảo biểu tượng nằm trong flexbox */
    align-items: center; /* Canh giữa biểu tượng */
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

/* Cập nhật slider với hiệu ứng vuốt */
.slider {
  position: relative;
  overflow: hidden; /* Ẩn phần ngoài khung slider */
  width: 100%; /* Đảm bảo slider chiếm toàn bộ chiều rộng container */
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