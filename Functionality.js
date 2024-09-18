// Store user preferences globally
let userPreferences = {};

// List of specific vacation destinations based on climate and vacation type
const vacationDestinations = {
    tropical: {
        Beach: "Hawaii",
        Mountain: "St. Lucia",
        City: "Honolulu",
        Nature: "Costa Rica"
    },
    cold: {
        Beach: "Iceland (Hot Springs)",
        Mountain: "Aspen, Colorado",
        City: "Reykjavik",
        Nature: "Alaska"
    },
    temperate: {
        Beach: "California",
        Mountain: "The Alps",
        City: "San Francisco",
        Nature: "New Zealand"
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
    
    // Move to the game section
    showSection('game');
});

// Handle game selection
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
    const { climate, vacationType } = preferences;

    // Basic logic using destinations from previous code provided
    let destination = "";

    if (climate === "tropical" && vacationType === "Beach") {
        destination = "Hawaii";
    } else if (climate === "cold" && vacationType === "Mountain") {
        destination = "Aspen, Colorado";
    } else if (vacationType === "City") {
        destination = "New York City";
    } else if (vacationType === "Nature") {
        destination = "Yellowstone National Park";
    } else {
        destination = "Bali";  // Default fallback
    }
    
    return destination;
}

// Add navigation functionality for tabs (Quiz, Game, Results)
document.querySelectorAll('nav ul li a').forEach(function(tab) {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);  // Remove the "#" from href
        showSection(sectionId);  // Show the clicked section
    });
});

// Function to show one section and hide the others
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}
