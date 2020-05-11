# Open-Weather

Demo published with Github Pages on https://weather.lense.fi/

Get current weather in Helsinki (default), your location (allow location tracking) or any other city. Checking "Remember me" creates a browser cookie with last location and "Remember me" selection for one month.

Uses OpenWeatherMap API (free plan with max 60 calls per minute) to get current weather data for city and display it on a dark mobile-optimized design. No page loads needed since AJAX function calls are made on button clicks or on pressing enter while in input. Built with HTML, CSS, JS and jQuery.

### Data shown:
<ul>
<li>Location, based on your query or coordinates</li>
<li>Weather, as icon and as text with more accurate description (text only if available from query)</li>
<li>Current temperature, rounded to 0 decimals</li>
<li>Rainfall amounts, within last 1h and 3h (data usually not available from API though)</li>
<li>Wind speed</li>
<li>Wind direction, as degrees and with visual arrow</li>
<li>Cloudiness percentage</li>
<li>Humidity percentage</li>
<li>Area temperature, minimum and maximum current temperature in area if multiple data points available</li>
<li>Atmospheric pressure</li>
<li>Sunrise in local time</li>
<li>Sunset in local time</li>
</ul>
<img src="/images/weather-375x812.jpg">
