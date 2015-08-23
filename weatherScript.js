



var postCode = '';

// IMAGES
var $homeImg = $('#bkg_img');

var $clearImg = $('#clear_img');
var $cloudyImg = $('#cloudy_img');
var $part_cloudyImg = $('#part_cloudy_img');
var $rainImg = $('#rain_img');



$clearImg.hide();
$cloudyImg.hide();
$part_cloudyImg.hide();
$rainImg.hide();

/*

function enterClick() {

	$('#userZip').keypress(function(e) {
			if (e.which === 13) {
				runParse();
				console.log('enter works');
				return false;
			}
	});
}

*/


var holderImg = [];

holderImg.push($homeImg);




// LOGIC _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

function clearValue() {
	var elem = document.getElementById('userZip');
	elem.value = '';
}

function checkFunction() {
		var button = document.getElementById('checkbtn');
		var userInput = document.getElementById('userZip').value;

		postCode = userInput;

		runParse();
}



function runParse() {
	$.ajax({
		
		url : "http://api.wunderground.com/api/ee2c13f577bdf0a1/geolookup/conditions/forecast/q/US/" + postCode +".json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location = parsed_json['location']['city'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			var wind = parsed_json['current_observation']['wind_mph'];
			var weather = parsed_json['current_observation']['weather'];
			var uv = parsed_json['current_observation']['UV'];

			var forecast = parsed_json.forecast.txt_forecast.forecastday;


				for (index in forecast) {
    				console.log('Weather forecast for ' + forecast[index]['title'] +
        				' is ' + forecast[index]['fcttext_metric']);
				}

				console.log(parsed_json);

			var cityPlace = document.getElementById('featureOne');
			cityPlace.innerHTML = location;

			var weatherPlace = document.getElementById('featureTwo');
			weatherPlace.innerHTML = weather;

			var place = document.getElementById('featureThree');
			place.innerHTML = temp_f + 'F';

			var windPlace = document.getElementById('featureFour');
			windPlace.innerHTML = 'Wind ' + wind + ' mpg';

			//var uvPlace = document.getElementById('featureFour');
			//uvPlace.innerHTML = 'UV Index ' + uv;

			var day_one = document.getElementById('day1');
			day_one.innerHTML = forecast[2]['title'] + "<br />" + forecast[2]['icon'];

			var day_two = document.getElementById('day2');
			day_two.innerHTML = forecast[4]['title'] + "<br />" + forecast[4]['icon'];

			var day_three = document.getElementById('day3');
			day_three.innerHTML = forecast[6]['title'] + "<br />" + forecast[6]['icon'];

			// WEATHER IMAGE CONDITIONALS _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

			if (weather === 'Clear') {
				holderImg[0].hide();
				$clearImg.show();

				holderImg.shift();
				holderImg.push($clearImg);
				
				}

			if (weather === 'Rain' || weather === 'Light Rain') {
				holderImg[0].hide();
				$rainImg.show();

				holderImg.shift();
				holderImg.push($rainImg);

			}

			if (weather === 'Cloudy' || weather === 'Overcast') {
				holderImg[0].hide();
				$cloudyImg.show();

				holderImg.shift();
				holderImg.push($cloudyImg);
			}

			if (weather === 'Partly Cloudy') {
				holderImg[0].hide();
				$cloudyImg.show();

				holderImg.shift();
				holderImg.push($cloudyImg);
			}


		}

	});
}

