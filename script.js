let currentTrip = {};

function startPlanning() {
  dataLayer.push({ event: "start_planning_click" });
  window.location.href = "itinerary.html";
}

// Generate itinerary
function generateItinerary() {
  let destination = document.getElementById("destination").value;
  let budget = document.getElementById("budget").value;

  document.getElementById("loading").style.display = "block";

  setTimeout(() => {
    let itinerary = getPlan(destination, budget);

    document.getElementById("loading").style.display = "none";

    document.getElementById("result").innerHTML = itinerary;

    currentTrip = { destination, budget, itinerary };

    // GTM event
    dataLayer.push({
      event: "generate_itinerary",
      destination: destination,
      budget: budget
    });

  }, 1500);
}

// Logic for itinerary
function getPlan(destination, budget) {
  let plans = {
    goa: ["Beach Day", "Water Sports", "Night Party"],
    manali: ["Snow Trek", "Solang Valley", "Mall Road"],
    kerala: ["Backwaters", "Houseboat", "Tea Gardens"]
  };

  let days = plans[destination];

  return `
    <h3>3-Day Plan for ${destination}</h3>
    <ul>
      <li>Day 1: ${days[0]}</li>
      <li>Day 2: ${days[1]}</li>
      <li>Day 3: ${days[2]}</li>
    </ul>
    <p>Budget: ₹${budget}</p>
  `;
}

// Save trip
function saveTrip() {
  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(currentTrip);

  localStorage.setItem("trips", JSON.stringify(trips));

  alert("Trip Saved!");

  dataLayer.push({
    event: "save_trip"
  });
}

// Load saved trips
if (document.getElementById("savedTrips")) {
  let trips = JSON.parse(localStorage.getItem("trips")) || [];

  let html = "";

  trips.forEach((trip, index) => {
    html += `
      <div>
        <h3>${trip.destination}</h3>
        <p>Budget: ₹${trip.budget}</p>
        ${trip.itinerary}
      </div>
      <hr>
    `;
  });

  document.getElementById("savedTrips").innerHTML = html;

  dataLayer.push({
    event: "view_saved_trips"
  });
}

// Contact form tracking
function submitForm(e) {
  e.preventDefault();

  dataLayer.push({
    event: "form_submission"
  });

  alert("Submitted!");
}
