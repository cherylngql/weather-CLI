const https = require('https');

function printError(error) {
  console.error(error.message);
}

function getWeather(query) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://api.wunderground.com/api/f5c270a1bbf84358/conditions/q/${query}.json`, response => {
                              if (response.statusCode === 200) {
                                let body = "";
                                // Read the data
                                response.on('data', data => {
                                  body += data.toString();
                                });
      
                                response.on('end', () => {
                                  try {
                                    // Parse the data
                                    const content = JSON.parse(body);                            
                                    // Print the data
                                    if (content.current_observation) {
                                      console.log('Current temperature in '+ content.current_observation.display_location.city + ' is '+content.current_observation.temp_f + 'F');
                                    } else {
                                      const queryError = new Error(`The location ${query.replace('_',' ')} was not found.`);
                                      printError(queryError);
                                    }
                                  } catch (error) {
                                    printError(error);
                                  }
                                });
                              } else {
                                const message = `There was an error getting the weather for ${city} (${response.statusCode})`;
                                const statusCodeError = new Error(message);
                                printError(statusCodeError);
                              }
                            });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

const query = process.argv.slice(2).join('_');
getWeather(query);