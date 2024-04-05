function generateUniqueId() {
    // Get current timestamp
    var timestamp = new Date().getTime();

    // Generate a random number
    var randomNumber = Math.random() * Math.pow(10, 17); // Adjust the power of 10 as needed for uniqueness

    // Concatenate timestamp and random number
    var uniqueId = timestamp.toString() + randomNumber.toString();

    return uniqueId;
}


// Function to set a cookie with a unique identifier
function setDeviceCookie() {
    var deviceId = generateUniqueId(); // You would need to implement generateUniqueId() function
    document.cookie = "device_id=" + deviceId + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

// Function to get the value of the device cookie
function getDeviceCookie() {
    var name = "device_id=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Example usage:
//deleteCookie("device_id");

// Example usage
var deviceId = getDeviceCookie();
if (!deviceId) {
    setDeviceCookie();
    console.log("Device cookie set.");
} else {
    console.log("Device cookie found: " + deviceId);
}