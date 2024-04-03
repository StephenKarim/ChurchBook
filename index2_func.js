document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let intervalId = null;
  let videoElement = slides[currentSlide].querySelector('video');

  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function resetSlideInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    videoElement = slides[currentSlide].querySelector('video');
    videoElement.currentTime = 0;
    videoElement.play();
     // Enable autoplay when the video becomes active
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    videoElement = slides[currentSlide].querySelector('video');
    videoElement.currentTime = 0;
    videoElement.play(); // Enable autoplay when the video becomes active
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetSlideInterval();
      videoElement = slides[i].querySelector('video');
      videoElement.play(); // Enable autoplay when the video becomes active
    });
  });

  showSlide(0);

  intervalId = setInterval(nextSlide, 5000);

  document.querySelector('.prev-arrow').addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
  });

  document.querySelector('.next-arrow').addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
  });

  const slideshowContainer = document.querySelector('.top-left-container');

  slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(intervalId);
  });

  slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    resetSlideInterval();
  });

  function handleSwipe() {
    const minSwipeDistance = 50;

    if (touchEndX - touchStartX > minSwipeDistance) {
      prevSlide();
    } else if (touchStartX - touchEndX > minSwipeDistance) {
      nextSlide();
    }
  }
 
  let autoTransition = true;
  const watchButton = document.querySelector('.watch-button');

  function handleWatchButtonClick() {
    autoTransition = !autoTransition;
    watchButton.classList.toggle('active', !autoTransition);

    if (autoTransition) {
      // Resume auto-transitions
      resetSlideInterval();
      watchButton.textContent = "Watch";
    } else {
      // Stop auto-transitions
      clearInterval(intervalId);
      watchButton.textContent = "Continue";
    }
  }

  watchButton.addEventListener('click', handleWatchButtonClick);

  const videoElement2 = document.getElementById('video');
const heightNumberElement = document.getElementById('height-number');

function updateVideoHeight() {
  const videoHeight = (videoElement2.videoHeight / videoElement2.videoWidth) * videoElement2.offsetWidth;
  let vhHeight = (videoHeight / window.innerHeight) * 100;
  vhHeight = Math.min(vhHeight, 100); // Limit vhHeight to 100
  heightNumberElement.textContent = vhHeight.toFixed(2);

  slideshowContainer.style.minHeight = `${vhHeight}vh`; // Update min-height instead of height
}

function observeVideoHeight() {
  const observer = new ResizeObserver(updateVideoHeight);
  observer.observe(videoElement2);
}

window.addEventListener('resize', updateVideoHeight);
setTimeout(function () {
  observeVideoHeight();
  updateVideoHeight();
}, 5);

window.addEventListener('load', function () {
 
  observeVideoHeight();
  updateVideoHeight();

});




});
