document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.querySelector("model-viewer");
    var overlay = document.getElementById("menuOverlay");
    var closeOverlayButton = document.getElementById("closeOverlayButton");
    var menu = document.querySelector(".menu");
    
    // Event listener for the hamburger menu click
    hamburger.addEventListener("click", function(event) {
      event.stopPropagation();
      toggleMenu();
    });
  
    // Event listener for the close button click
    closeOverlayButton.addEventListener("click", function(event) {
      event.stopPropagation();
      toggleMenu();
    });
  
    // Event listener for clicks anywhere on the document
    document.addEventListener("click", function(event) {
      var menuRect = menu.getBoundingClientRect();
      var mouseX = event.clientX;
      var mouseY = event.clientY;
  
      // Check if the mouse is within the menu element
      if (
        mouseX >= menuRect.left &&
        mouseX <= menuRect.right &&
        mouseY >= menuRect.top &&
        mouseY <= menuRect.bottom
      ) {
        // Mouse is on the menu element, do nothing
      } else {
        // Mouse is not on the menu element, close the overlay if it's open
        if (overlay.style.display === "block") {
          toggleMenu();
        }
      }
    });
  
    // Function to toggle the menu overlay
    function toggleMenu() {
      if (overlay.style.display === "none") {
        overlay.style.display = "block";
      } else {
        overlay.style.display = "none";
      }
    }
  });
  

// Load the YouTube API client library
gapi.load('client', initClient);

// Initialize the API client
function initClient() {
    gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function () {
    console.log('YouTube API client initialized');
    }, function (error) {
    console.error('Error initializing YouTube API client:', error);
    });
}

// Search for videos and display thumbnails
function searchVideos() {
    var query = document.getElementById('search-input').value;

    // Make a request to the YouTube API
    gapi.client.youtube.search.list({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: 9, // Adjust the number of results as needed
    channelId: 'UCdfnNbrz57aWRVX1No0lolg', // Replace with your YouTube channel ID
    }).then(function (response) {
    var videos = response.result.items;
    var videoContainer = document.getElementById('video-container');

    // Clear previous results
    videoContainer.innerHTML = '';

    // Display video thumbnails
    videos.forEach(function (video) {
        var videoThumbnail = document.createElement('div');
        videoThumbnail.className = 'video-thumbnail';
        videoContainer.appendChild(videoThumbnail);

        var thumbnailImage = document.createElement('img');
        thumbnailImage.src = video.snippet.thumbnails.medium.url;
        videoThumbnail.appendChild(thumbnailImage);
    });
    }, function (error) {
    console.error('Error searching videos:', error);
    });
}

  