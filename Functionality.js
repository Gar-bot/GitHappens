// Store user preferences globally
let userPreferences = {};

// Expanded list of specific vacation destinations based on climate and vacation type
const vacationDestinations = {
    tropical: {
        Beach: "Maldives",
        Mountain: "St. Lucia",
        City: "Honolulu",
        Nature: "Costa Rica",
        Surfing: "Bali",
        Diving: "Fiji",
        Snorkeling: "Bora Bora",
        Wildlife: "Galapagos Islands",
        Nightlife: "Phuket"
    },
    cold: {
        Beach: "Iceland (Hot Springs)",
        Mountain: "Aspen, Colorado",
        City: "Reykjavik",
        Nature: "Alaska",
        Skiing: "Swiss Alps",
        Hiking: "Patagonia",
        Glaciers: "Norway",
        NorthernLights: "Lapland",
        Wildlife: "Banff"
    },
    temperate: {
        Beach: "California",
        Mountain: "The Alps",
        City: "San Francisco",
        Nature: "New Zealand",
        Shopping: "Paris",
        Museums: "London",
        HistoricalTours: "Rome",
        CityTours: "Tokyo",
        WineTasting: "Cape Town"
    }
};

// Handle form submission from the quiz section
document.getElementById("preferencesForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission
    
    // Collect user inputs
    let climate = document.getElementById("climate").value;
    let budget = document.getElementById("budget").value;
    let activities = document.getElementById("activities").value.split(",");  // Split activities by comma
    
    // Store the preferences
    userPreferences.climate = climate;
    userPreferences.budget = parseInt(budget);
    userPreferences.activities = activities.map(activity => activity.trim());  // Trim extra spaces
    
    // Move to the environment section
    showSection('environment');
});

// Handle environment selection
let vacationType = "";
document.getElementById("beachButton").addEventListener("click", function() {
    vacationType = "Beach";
    processResults();
});
document.getElementById("mountainButton").addEventListener("click", function() {
    vacationType = "Mountain";
    processResults();
});
document.getElementById("cityButton").addEventListener("click", function() {
    vacationType = "City";
    processResults();
});
document.getElementById("natureButton").addEventListener("click", function() {
    vacationType = "Nature";
    processResults();
});

// Process results and generate vacation recommendation
function processResults() {
    userPreferences.vacationType = vacationType;
    
    let destination = calculateDestination(userPreferences);
    
    // Display the results section
    showSection('results');
    
    // Show the recommendation to the user
    document.getElementById("destinationDisplay").innerHTML = `
        <h2>Recommended Vacation Destination</h2>
        <p>Based on your preferences, we recommend a vacation to: <strong>${destination}</strong></p>
    `;
}

// Algorithm to calculate the vacation destination
function calculateDestination(preferences) {
    const { climate, vacationType, activities } = preferences;

    // Match based on climate and vacation type
    let destination = vacationDestinations[climate][vacationType] || "Bali";  // Default fallback

    // Refine further by matching activities
    const climateActivities = vacationDestinations[climate];
    
    // Check if user activities match available options for this climate
    activities.forEach(activity => {
        if (climateActivities[activity]) {
            destination = climateActivities[activity];
        }
    });
    
    return destination;
}

// Add navigation functionality for tabs (Quiz, Game, Results)
document.querySelectorAll('nav ul li a').forEach(function(tab) {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);  
        showSection(sectionId);  // Show the clicked section
    });
});

// Function to show one section and hide the others
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('environment').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}
