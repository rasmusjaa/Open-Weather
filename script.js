var city = "Helsinki";

$(document).ready(function() {
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
			var newCity = $("#city").val();
			if (newCity && newCity != '') {
				getWeather(newCity);
			}
		}
	});
});

function getWeather(name) {
	$.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=8e205031c8a2f36276597a403a5d0e79`, 
	function (data, textStatus, jqXHR) {
		$("#error").addClass("hidden");
		console.log(data);
		var icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		var weather = data.weather[0].main;
		var weatherDesc = data.weather[0].description;
		var city = data.name;

		var feels_like = data.main.feels_like;
		var humidity = data.main.humidity;
		var pressure = data.main.pressure;
		var temp = Math.round(data.main.temp);
		var temp_max = data.main.temp_max;
		var temp_min = data.main.temp_min;

		var sunrise = new Date(data.sys.sunrise * 1000);
		var sunset = new Date(data.sys.sunset * 1000);

		var wind_speed = data.wind.speed;
		var wind_direction = data.wind.deg;

		var cloudiness = data.clouds.all;

		/*
		var rain1h = data.rain.1h;
		var rain3h = data.rain.3h;
		*/

		$(".city").text(city);
		$(".icon").attr("src", icon);

		if (weather) {
			$(".weather").text(`${weather} (${weatherDesc})`);
		}
		
		$(".temp").text(`${temp}`);
		$(".feels_like").text(`${feels_like}`);
		$(".min").text(`${temp_min}`);
		$(".max").text(`${temp_max}`);
		$(".humidity").text(`${humidity}`);
		$(".pressure").text(`${pressure}`);
		
		$(".sunrise").text(`${sunrise.getHours()}:${sunrise.getMinutes()}`);
		$(".sunset").text(`${sunset.getHours()}:${sunrise.getMinutes()}`);

		$(".wind_speed").text(`${wind_speed}`);
		$(".wind_direction").text(`${wind_direction}`);

		$(".cloudiness").text(`${cloudiness}`);
	}
	)
	.fail(function() {
		$("#error").removeClass("hidden");
		$("#error").text(`Couldn't find ${name}, try another one.`);
	});
}



