document.addEventListener("DOMContentLoaded", function() 
{
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const circles = Array.from(document.querySelectorAll(".circle"));
    const images = Array.from(carousel.getElementsByTagName("img"));
  
    let currImgIndex = 0;
  
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currImgIndex * 100}%)`;
  
      circles.forEach((circle, index) => {
        circle.classList.toggle("active", index === currImgIndex);
      });
    }
  
    function showImage(index) {
      currImgIndex = index;
      updateCarousel();
    }
  
    prevBtn.addEventListener("click", function() {
      currImgIndex = (currImgIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  
    nextBtn.addEventListener("click", function() {
      currImgIndex = (currImgIndex + 1) % images.length;
      updateCarousel();
    });
  
    circles.forEach((circle, index) => {
      circle.addEventListener("click", function() {
        showImage(index);
      });
    });

    setInterval(function() {
      currImgIndex = (currImgIndex + 1) % images.length;
      updateCarousel();
    }, 3000);
  
    updateCarousel();
  });
  