const map = L.map("map").setView([19, 0], 2);

let circle_area = null;
let radius = 0; // km

let radius_slider = document.getElementById("radius-slider");
let radius_display = document.getElementById("radius-value");
const lat_display = document.getElementById("lat");
const lng_display = document.getElementById("lng");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Reset the slider value to the default when the page loads
window.onload = function () {
  radius = 10; // Set the default value
  radius_slider.value = radius;
  radius_display.textContent = radius;
};

function onSliderChange(_) {
  radius = radius_slider.value;
  radius_display.textContent = radius;

  if (circle_area) {
    circle_area.setRadius(radius * 1000);
  }
}

function onMapClick(e) {
  lat_display.textContent = e.latlng.lat;
  lng_display.textContent = e.latlng.lng;

  if (!circle_area) {
    circle_area = L.circle(e.latlng, { radius: radius * 1000 }).addTo(map);
  } else {
    circle_area.setLatLng(e.latlng);
  }
}

radius_slider.addEventListener("input", onSliderChange, false);
map.on("click", onMapClick);
