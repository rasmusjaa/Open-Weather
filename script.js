var city = "Helsinki";
var direction = 0;

$(document).ready(function() {
	getCookie();
	getWeather(city);

	$('button').click(function() {
		var newCity = $("#city").val();
        if (newCity && newCity != '') {
			getWeather(newCity);
		}
	});

	$('#city').keyup(function(e){
		if(e.keyCode == 13)
		{
			$('button').click();
		}
	});
});

function getWeather(name) {
	$.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=8e205031c8a2f36276597a403a5d0e79`, 
	function (data) {
		$("#error").addClass("hidden");
		console.log(data);

		city = name;
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

		var sunrise = new Date(data.sys.sunrise * 1000);
		var sunset = new Date(data.sys.sunset * 1000);

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
		$("#error").text(`Couldn't find ${name}, try another one.`);
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
	document.cookie = `remember=${$("#remember").is(':checked')};`
	document.cookie = `expires=${now.toUTCString()};`
	console.log(document.cookie);
};

function getCookie() {
	console.log(document.cookie);
	if (document.cookie) {
		var cookiearray = document.cookie.split(';');
		var value;
		cookiearray.forEach(function (item, index) {
			value = item.split('=');
			if (value[0].trim() === "city")
				city =  JSON.parse(value[1]);
			else if (value[0].trim() === "remember")
				$("#remember").prop("checked", JSON.parse(value[1]));
			
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
