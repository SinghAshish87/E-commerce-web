// JavaScript for the image slider and dot navigation
document.querySelectorAll('.image-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  const dots = slider.querySelectorAll('.dot');
  let currentIndex = 0;

  const showImage = (index) => {
    images.forEach((img, i) => {
      img.classList.remove('active');
      img.classList.add('hidden');
      if (i === index) {
        img.classList.add('active');
        img.classList.remove('hidden');
      }
    });
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.remove('active-dot');
      if (i === index) {
        dot.classList.add('active-dot');
      }
    });
  };

  // Show initial image
  showImage(currentIndex);

  // Prev/Next buttons functionality
  slider.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  slider.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Dot click functionality
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      showImage(index);
      currentIndex = index; // Update current index to the clicked dot's index
    });
  });
});
