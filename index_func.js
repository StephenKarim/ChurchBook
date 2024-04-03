
document.addEventListener('DOMContentLoaded', function() {
  const modelViewer = document.getElementById('book');
  const modelViewerClass = document.querySelector('.book');
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  const hiddenImage = document.getElementById('glow'); // Get reference to the image
  const hiddenVideo = document.getElementById('bookvid'); // Get reference to the video
  const hamburger = document.querySelector("model-viewer");  
  const overlay = document.querySelector(".overlay");
  const closeOverlayButton = document.getElementById("close-button");   
  const podiumModelViewer = document.getElementById('podium'); 
  const generalTimer = 500; 
  const podiumClass = document.querySelector('.podium'); 

  let isAnimating = false;
  let newPosition = 0;
  let isOpacityTriggered = false;

  modelViewerClass.classList.remove('animate');

  function setAnimationTime() {
    modelViewer.currentTime = (slider.value / 100) * modelViewer.duration;
  }

  function showHiddenElements() {
    hiddenImage.style.opacity = '0.0'; // Set opacity of image to 0.1
    hiddenVideo.style.opacity = '0.0'; // Set opacity of video to 0.1
    setTimeout(function() {
      hiddenImage.style.opacity = '1.0'; // Set opacity of image to 0.4 after 1.8 seconds
    }, 1500);
    setTimeout(function() {
      hiddenVideo.style.opacity = '1.0'; // Set opacity of video to 1.0 after 2 seconds
    }, 1000);
  }

  function goToSliderValue(value, totalDuration) {    

    const currentPosition = parseFloat(slider.value);
    const targetPosition = parseFloat(value);
    let currentTime = 0;
    const animationInterval = 10;

    function animate() {
      currentTime += animationInterval;
      if (currentTime >= totalDuration) {
        newPosition = targetPosition;
        slider.value = newPosition.toFixed(1);
        sliderValue.textContent = newPosition.toFixed(1);
        setAnimationTime();
        modelViewer.pause();       
        return;
      }
      

      const progress = currentTime / totalDuration;
      newPosition = currentPosition + progress * (targetPosition - currentPosition);
      slider.value = newPosition.toFixed(1);
      sliderValue.textContent = newPosition.toFixed(1);
      setAnimationTime();
      requestAnimationFrame(animate);
    }

    modelViewer.play();
    requestAnimationFrame(animate);

    // // Show the hidden elements (image and video) after 0.5 seconds once the slider reaches 4.3
    // if (!isOpacityTriggered && value >= 4.3) {
    //   isOpacityTriggered = true;
    //   setTimeout(showHiddenElements, 1000); // Call showHiddenElements() after a 1-second delay
    // }
  }

  // Trigger the animation on page load to go to position 4.4
  hamburger.addEventListener("click", function(event) {
    event.stopPropagation();
    podiumClass.style.animation = 'none';
    setTimeout(function() {
      goToSliderValue(4.4, 1000);
      setTimeout(function() {
        showHiddenElements();
      }, 500);
  }, 2000);
  });
  
  document.getElementById('sermons').addEventListener('mouseover', () => {
    goToSliderValue(11.2, generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('programs').addEventListener('mouseover', () => {
    goToSliderValue(24, generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('blog').addEventListener('mouseover', () => {
    goToSliderValue(30.4,generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('events').addEventListener('mouseover', () => {
    goToSliderValue(40, generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('media').addEventListener('mouseover', () => {
    goToSliderValue(49.6, generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('resources').addEventListener('mouseover', () => {
    goToSliderValue(59.2, generalTimer);
    showHiddenElements();
  });
  
  document.getElementById('donations').addEventListener('mouseover', () => {
    goToSliderValue(68.8, generalTimer);
    showHiddenElements();  
  });
  
  document.getElementById('aboutus').addEventListener('mouseover', () => {
    goToSliderValue(97.6, generalTimer);   
    showHiddenElements();   
  });

  // document.getElementById('aboutus').addEventListener('mouseover', () => {
  //   goToSliderValue(81.6);
  //   showHiddenElements();
  // });
  
  slider.addEventListener('input', () => {
    if (!isAnimating) {
      newPosition = parseFloat(slider.value);
      sliderValue.textContent = newPosition.toFixed(1);
      setAnimationTime();
      modelViewer.pause();
    }
  });

  
  // Function to toggle the menu overlay
  function toggleMenu() {
    if (overlay.style.display === "none" || overlay.style.display === "") {
      
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
    
  }
  
  // // Call toggleMenu() to show the menu on page load
  // toggleMenu();

  // Event listener to set opacity to 1 when book is loaded
  modelViewer.addEventListener("load", function() {
    overlay.style.opacity = "1";
  });

  // Event listener for the hamburger menu click
  hamburger.addEventListener("click", function(event) {
    event.stopPropagation();
    podiumModelViewer.play();
    setTimeout(function() {
      podiumModelViewer.pause();
      toggleMenu();
      modelViewer.pause();
      modelViewerClass.classList.add('animate');
   }, 1800);
    modelViewerClass.classList.remove('animate');
    
  });

  // Event listener for the close button click
  closeOverlayButton.addEventListener("click", function(event) {
    event.stopPropagation();    
    goToSliderValue(0, 50);    
    toggleMenu();
    location.reload();
  });
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
      const arrow = item.querySelector('.al-title-arrow');
      if (arrow) {
        arrow.classList.toggle('up-arrow');
      }
    });
  });
  
});

// document.addEventListener("DOMContentLoaded", function() {
//   const modelViewer = document.getElementById('book');
//   const hamburger = document.querySelector("model-viewer");
//   const overlay = document.querySelector(".overlay");
//   const closeOverlayButton = document.getElementById("close-button");   
//   const podiumModelViewer = document.getElementById('podium');  
  

//   // Function to toggle the menu overlay
//   function toggleMenu() {
//     if (overlay.style.display === "none" || overlay.style.display === "") {
      
//       overlay.style.display = "block";
//     } else {
//       overlay.style.display = "none";
//     }
    
//   }
  
//   // // Call toggleMenu() to show the menu on page load
//   // toggleMenu();

//   // Event listener to set opacity to 1 when book is loaded
//   modelViewer.addEventListener("load", function() {
//     overlay.style.opacity = "1";
//   });

//   // Event listener for the hamburger menu click
//   hamburger.addEventListener("click", function(event) {
//     event.stopPropagation();
//     podiumModelViewer.play();
//     setTimeout(function() {
//       podiumModelViewer.pause();
//   }, 1800);
//     toggleMenu();
//     modelViewer.pause();
//   });

//   // Event listener for the close button click
//   closeOverlayButton.addEventListener("click", function(event) {
//     event.stopPropagation();
//     goToSliderValue(0);
//     toggleMenu();
//   });

//   // // Event listener for clicks anywhere on the document
//   // document.addEventListener("click", function(event) {
       
//   //   // Check if the mouse is over the overlay or its child elements
//   //   const isMouseOverOverlay = (
//   //     event.target === overlay || overlay.contains(event.target)
//   //   );
  
//   //   // Toggle the menu only when the mouse is not over the overlay or its child elements
//   //   if (isMouseOverOverlay) {
//   //     // Mouse is not on the overlay, close the overlay if it's open
//   //     if (overlay.style.display === "block") {
//   //       toggleMenu();
//   //     }
//   //   }
//   // });  
// // Add a timeout before setting overlay display to "block"


  
// });

