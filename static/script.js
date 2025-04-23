const map = L.map("map").setView([19, 0], 2);

let lat = 0;
let lng = 0;
let circle_area = null;
let radius = 0; // km
let population = 0; // result

const radius_slider = document.getElementById("radius-slider");
const radius_display = document.getElementById("radius-value");
const lat_display = document.getElementById("lat");
const lng_display = document.getElementById("lng");
const result_display = document.getElementById("population-result");

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

async function onAreaChange() {
  lat_display.textContent = lat;
  lng_display.textContent = lng;
  radius_display.textContent = radius;

  if (!circle_area) {
    circle_area = L.circle([lat, lng], { radius: radius * 1000 }).addTo(map);
  } else {
    circle_area.setLatLng([lat, lng]);
    circle_area.setRadius(radius * 1000);
  }

  await getAreaPopulation();
}

function onSliderChange(_) {
  radius = radius_slider.value;
  radius_display.textContent = radius;

  // Too many UI updates on slider, just redraw with new radius on next click
  // onAreaChange();
}

async function onMapClick(e) {
  lat = e.latlng.lat;
  lng = e.latlng.lng;
  await onAreaChange();
}

async function getAreaPopulation() {
  const request = { lat: lat, lng: lng, radius: radius };
  const response = await fetch("/population", {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    // Do something
    return;
  }

  let population = (await response.json()).population;
  result_display.textContent = population;
}

radius_slider.addEventListener("input", onSliderChange, false);
map.on("click", onMapClick);
