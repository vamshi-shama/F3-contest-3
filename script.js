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
                const lang = position.coords.longitude;
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

function displayMap(lat, long) {
    const mapUrl = ;
    const iframe = document.createElement("iframe");
    iframe.src = mapUrl;
    iframe.width = "100%";
    iframe.height = "480";
    iframe.frameborder = "0";
    mapDiv.appendChild(iframe);
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