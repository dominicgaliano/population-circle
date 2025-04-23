const map = L.map("map").setView([19, 0], 2);
let circle_area = null;
let radius = 10; // km
const lat_display = document.getElementById("lat");
const lng_display = document.getElementById("lng");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function onMapClick(e) {
  lat_display.textContent = e.latlng.lat;
  lng_display.textContent = e.latlng.lng;

  if (!circle_area) {
    circle_area = L.circle(e.latlng, { radius: radius * 1000 }).addTo(map);
  } else {
    circle_area.setLatLng(e.latlng);
  }
}

map.on("click", onMapClick);
