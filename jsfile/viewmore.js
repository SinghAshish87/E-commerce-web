let currentIndex = 0;

function moveSlide(direction) {
  const images = document.querySelectorAll('.slider-images img');
  const totalImages = images.length;

  // Update the current index based on the direction (previous or next)
  currentIndex = (currentIndex + direction + totalImages) % totalImages; 

  const slider = document.querySelector('.slider-images');
  // Move the images by applying a translateX transform
  slider.style.transform = `translateX(-${currentIndex * 500}px)`; // Each image is 500px wide
}
