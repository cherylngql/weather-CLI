const https = require('https');

//Print Error Messages
function printError(error) {
  console.error(error.message);
}

//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                              if (response.statusCode === 200) {
                                let body = "";
                                // Read the data
                                response.on('data', data => {
                                  body += data.toString();
                                });
      
                                response.on('end', () => {
                                  try {
                                    // Parse the data
                                    const profile = JSON.parse(body);                            
                                    // Print the data
                                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                                  } catch (error) {
                                    printError(error);
                                  }
                                });
                              } else {
                                const message = `There was an error getting the profile for ${username} (${response.statusCode})`;
                                const statusCodeError = new Error(message);
                                printError(statusCodeError);
                              }
                            });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

const users = process.argv.slice(2);
users.forEach(getProfile);
