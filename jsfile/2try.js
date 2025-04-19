document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".image-slider");

  sliders.forEach((slider) => {
    const images = slider.querySelectorAll("img");
    const dots = slider.querySelectorAll(".dot");
    let index = 0;

    const showImage = (i) => {
      images.forEach((img, idx) => {
        img.classList.toggle("active", idx === i);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active-dot", idx === i);
      });
    };

    slider.querySelector(".prev").addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    slider.querySelector(".next").addEventListener("click", () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        index = parseInt(dot.getAttribute("data-index"));
        showImage(index);
      });
    });

    showImage(index);
  });
});
