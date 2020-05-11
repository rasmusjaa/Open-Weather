var city = 'q=' + 'Helsinki';
var last_direction = 0;

$(document).ready(function() {
	getCookie();
	getWeather(city);

	$('#find').click(function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		} else {
			$("#error").removeClass("hidden");
			$("#error").text(`No geolocation available, you have to allow location tracking on your browser for this site.`);
		}
		
		function successFunction(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			getWeather(`lat=${lat}&lon=${lon}`);
		} function errorFunction() {
			$("#error").removeClass("hidden");
			$("#error").text(`No geolocation available, you have to allow location tracking on your browser for this site.`);
		}
	});

	$('#show').click(function() {
		var newCity = $("#city").val();
        if (newCity && newCity != '') {
			getWeather('q=' + newCity);
		}
	});

	$('#city').keyup(function(e){
		if(e.keyCode == 13)
		{
			$('#show').click();
		}
	});
});

function getWeather(location) {
	$.getJSON(`https://api.openweathermap.org/data/2.5/weather?${location}&units=metric&appid=8e205031c8a2f36276597a403a5d0e79`, 
	function (data) {
		$("#error").addClass("hidden");
		console.log(data);

		city = location;

		var cityUpper = data.name;

		var icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		var temp = Math.round(data.main.temp);
		var weather = data.weather[0].main;
		var weather_description = data.weather[0].description;
		var feels_like = data.main.feels_like;
		
		var rain1h;
		var rain3h;
		
		var wind_speed = data.wind.speed;
		var wind_direction = data.wind.deg;
		
		var cloudiness = data.clouds.all;
		var humidity = data.main.humidity;
		var temp_min = data.main.temp_min;
		var temp_max = data.main.temp_max;
		var pressure = data.main.pressure;

		var date = new Date();
		var user_diff = date.getTimezoneOffset() * 60;
		var sunrise = new Date((data.sys.sunrise + data.timezone + user_diff) * 1000);
		var sunset = new Date((data.sys.sunset + data.timezone + user_diff) * 1000);

		$(".city").text(cityUpper);

		$(".icon").attr("src", icon);
		$(".temp").text(temp);

		if (weather) {
			$(".weather").text(`${weather} (${weather_description})`);
		}
		$(".feels_like").text(feels_like);

		if (data.rain && data.rain['1h'] && data.rain['3h']) {
			rain1h = data.rain['1h'];
			rain3h = data.rain['3h'];
			$("#rain").removeClass("hidden");
			$(".rain").text(`Last hour: ${rain1h} mm, last 3 hours: ${rain3h} mm`);
		} else {
			$("#rain").addClass("hidden");
		}

		$({deg: last_direction}).animate({deg: wind_direction}, {
			duration: 500,
			easing: 'swing',
			step: function(now,fx) {
				$('#arrow').css({
					'-webkit-transform':'rotate('+now+'deg)', 
					'-moz-transform':'rotate('+now+'deg)',
					'transform':'rotate('+now+'deg)'
				});
				last_direction = wind_direction;
			}
		});
		$(".wind_speed").text(wind_speed);
		$(".wind_direction").text(wind_direction);
		
		$(".cloudiness").text(cloudiness);
		$(".humidity").text(humidity);
		$(".min").text(temp_min);
		$(".max").text(temp_max);
		$(".pressure").text(pressure);
		
		$(".sunrise").text(`${sunrise.getHours()}:${sunrise.getMinutes()}`);
		$(".sunset").text(`${sunset.getHours()}:${sunrise.getMinutes()}`);
	})
	.fail(function() {
		$("#error").removeClass("hidden");
		$("#error").text(`Couldn't find ${location.substring(2)}, try another one.`);
	});
};

window.onunload = function () {
	if ($("#remember").is(':checked')) {
		writeCookie();
	} else {
		deleteCookie()
	}
};

function writeCookie() {
    var now = new Date();
    now.setMonth( now.getMonth() + 1 );
    var x = JSON.stringify(city);
	document.cookie = `city=${x};`
	document.cookie = `remember="${$("#remember").is(':checked')}";`
	document.cookie = `expires=${now.toUTCString()};`
};

function getCookie() {
	if (document.cookie) {
		var cookiearray = document.cookie.split(';');
		var value;
		cookiearray.forEach(function (item, index) {
			value = item.trim();
			if (value.startsWith("city")) {
				city = value.substring(6, value.length - 1); // using substring instead of '=' split to handle coordinates
			}
			else if (value.startsWith("remember"))
			{
				$("#remember").prop("checked", value.substring(10, value.length - 1));
			}
		});
	};
};

function deleteCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
