var city = "Helsinki";
var direction = 0;

$(document).ready(function() {
	GetCookie();
	GetWeather(city);

	$('button').click(function() {
		var newCity = $("#city").val();
        if (newCity && newCity != '') {
			GetWeather(newCity);
		}
	});

	$('#city').keyup(function(e){
		if(e.keyCode == 13)
		{
			$('button').click();
		}
	});
});

function GetWeather(name) {
	$.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=8e205031c8a2f36276597a403a5d0e79`, 
	function (data) {
		$("#error").addClass("hidden");
		console.log(data);
		var cityUpper = data.name;
		var weather = data.weather[0].main;
		var weather_description = data.weather[0].description;
		var icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

		var temp = Math.round(data.main.temp);
		var feels_like = data.main.feels_like;
		
		var rain1h;
		var rain3h;

		var temp_max = data.main.temp_max;
		var temp_min = data.main.temp_min;
		
		var wind_speed = data.wind.speed;
		var wind_direction = data.wind.deg;

		var humidity = data.main.humidity;
		var pressure = data.main.pressure;
		var cloudiness = data.clouds.all;

		var sunrise = new Date(data.sys.sunrise * 1000);
		var sunset = new Date(data.sys.sunset * 1000);

		$(".city").text(cityUpper);
		if (weather) {
			$(".weather").text(`${weather} (${weather_description})`);
		}
		$(".icon").attr("src", icon);
		
		$(".temp").text(temp);
		$(".feels_like").text(feels_like);

		if (data.rain && data.rain['1h'] && data.rain['3h']) {
			rain1h = data.rain['1h'];
			rain3h = data.rain['3h'];
			$("#rain").removeClass("hidden");
			$(".rain").text(`Last hour: ${rain1h} mm, last 3 hours: ${rain3h} mm`);
		} else {
			$("#rain").addClass("hidden");
		}

		$(".min").text(temp_min);
		$(".max").text(temp_max);

		$(".humidity").text(humidity);
		$(".pressure").text(pressure);
		$(".cloudiness").text(cloudiness);
		
		$(".sunrise").text(`${sunrise.getHours()}:${sunrise.getMinutes()}`);
		$(".sunset").text(`${sunset.getHours()}:${sunrise.getMinutes()}`);

		$('#arrow').animate({  transform: wind_direction }, {
			step: function(wind_direction,fx) {
				$('#arrow').css({
					'-webkit-transform':'rotate('+wind_direction+'deg)', 
					'-moz-transform':'rotate('+wind_direction+'deg)',
					'transform':'rotate('+wind_direction+'deg)'
				});
			}
		});
		$(".wind_speed").text(wind_speed);
		$(".wind_direction").text(wind_direction);
		city = cityUpper;
		WriteCookie();
		console.log(document.cookie);
	}
	)
	.fail(function() {
		$("#error").removeClass("hidden");
		$("#error").text(`Couldn't find ${name}, try another one.`);
	});
};

window.onunload = function () {
    WriteCookie();
};

function WriteCookie() {
    var now = new Date();
    now.setMonth( now.getMonth() + 1 );
    var x = JSON.stringify(city);
    document.cookie = "city=" + x + ";";
    document.cookie = "expires=" + now.toUTCString() + ";"
};

function GetCookie() {
	console.log(document.cookie);
	var allcookies = document.cookie;
	if (allcookies) {
		var cookiearray = allcookies.split(';');
		var value = cookiearray[0].split('=')[1];
		cookie = JSON.parse(value);
		city = cookie;
	};
};
