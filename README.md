# Open-Weather

Demo published with Github Pages on https://weather.lense.fi/

Get current weather in Helsinki (default), your location (allow location tracking) or any other city. Checking "Remember me" creates a browser cookie with last location and "Remember me" selection for one month.

Uses OpenWeatherMap API (free plan with max 60 calls per minute) to get current weather data for city and display it on a dark mobile-optimized design. No page loads or ajax needed since calls are made on button clicks or pressing enter while in input. Built with HTML, CSS, JS and jQuery.

Data shown:
- Location, based on your query or coordinates
- Weather, as icon and as text with more accurate description (text only if available from query)
- Current temperature, rounded to 0 decimals
- Rainfall amounts, within last 1h and 3h (data usually not available from API though)
- Wind speed
- Wind direction, as degrees and with visual arrow
- Cloudiness percentage
- Humidity percentage
- Area temperature, minimum and maximum current temperature in area if multiple data points available
- Atmospheric pressure
- Sunrise in local time
- Sunset in local time
