// Store user preferences globally
let userPreferences = {};

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
    document.getElementById("quiz").style.display = "none";
    document.getElementById("game").style.display = "block";
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
    document.getElementById("game").style.display = "none";
    document.getElementById("results").style.display = "block";
    
    // Show the recommendation to the user
    document.getElementById("results").innerHTML = `
        <h2>Recommended Vacation Destination</h2>
        <p>Based on your preferences, we recommend a vacation to: <strong>${destination}</strong></p>
    `;
}

// Algorithm to calculate the vacation destination
function calculateDestination(preferences) {
    // Basic example algorithm (this can be expanded)
    let destination = "";

    // Example logic: Climate preference affects the type of vacation destination
    if (preferences.climate === "tropical" && preferences.vacationType === "Beach") {
        destination = "Hawaii";
    } else if (preferences.climate === "cold" && preferences.vacationType === "Mountain") {
        destination = "Aspen, Colorado";
    } else if (preferences.vacationType === "City") {
        destination = "New York City";
    } else if (preferences.vacationType === "Nature") {
        destination = "Yellowstone National Park";
    } else {
        destination = "Bali";  // Default fallback
    }
    
    // Return the destination
    return destination;
}
