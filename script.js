const getLocationBtn = document.getElementById("getLocation");
const removeLocationBtn = document.getElementById("removeLocation");
const mapDiv = document.getElementById("map");

if (navigator.geolocation) {
    getLocationBtn.addEventListener("click", getLocation);
  } else {
    mapDiv.innerHTML = "Geolocation is not supported by this browser.";
  }

function getLocation() {
    getLocationBtn.disabled = true;

    if(localStorage.getItem("lat") && localStorage.getItem("long")) {
        const lat = parseFloat(localStorage.getItem("lat"));
        const long = parseFloat(localStorage.getItem("long"));
        displayMap(lat, long);
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                localStorage.setItem("lat", lat);
                localStorage.setItem("long", long);
                displayMap(lat, long);
            },
            (error) => {
                mapDiv.textContent = `Error: ${error.message}`;
            }
        );
    }
}

function displayMap() {
    // Get latitude and longitude from local storage
    const lat = localStorage.getItem("lat");
    const long = localStorage.getItem("long");
  
    // Check if latitude and longitude are present
    if (lat && long) {
      // Create a Google Maps search link with the latitude and longitude
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
  
      // Create an iframe element and set its attributes
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", mapsLink);
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "500");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("style", "border:0;");
  
      // Get the map container div and append the iframe element to it
      const mapContainer = document.getElementById("map");
      mapContainer.appendChild(iframe);
    }
  }
  
removeLocationBtn.addEventListener("click", removeLocation);

// Function to remove the user's location from local storage
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  // Remove the map from the DOM
  mapDiv.innerHTML = "";
  // Enable the get location button
  getLocationBtn.disabled = false;
}