let currentTheme="dark-theme";
document.documentElement.setAttribute("data-theme", currentTheme);

// Get a reference to the button element
var button = document.getElementById("signin_button");

// Add a click event listener to the button
button.addEventListener("click", function() {
    // Perform an action when the button is clicked
    alert("Sign in Button clicked!");
});
// Function to toggle between light and dark themes
function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    
    // Toggle the theme
    if (currentTheme === "light-theme") {
        document.documentElement.setAttribute("data-theme", "dark-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "light-theme");
    }
}

// Add event listener to the button for toggling theme
document.getElementById("toggleThemeButton").addEventListener("click", toggleTheme);
