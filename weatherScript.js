
var postCode = '';

function clearValue() {
	var elem = document.getElementById('userZip');
	elem.value = '';
}

function checkFunction() {
		var button = document.getElementById('checkbtn');
		var userInput = document.getElementById('userZip').value;

		postCode = userInput;
	

	$.ajax({
		
		url : "http://api.wunderground.com/api/ee2c13f577bdf0a1/geolookup/conditions/q/US/" + postCode +".json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location = parsed_json['location']['city'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			var wind = parsed_json['current_observation']['wind_mph'];
			var weather = parsed_json['current_observation']['weather'];
			var uv = parsed_json['current_observation']['UV'];

			var weatherPlace = document.getElementById('featureOne');
			weatherPlace.innerHTML = weather;

			var place = document.getElementById('featureTwo');
			place.innerHTML = temp_f + 'F';

			var windPlace = document.getElementById('featureThree');
			windPlace.innerHTML = 'Wind ' + wind + ' mpg';

			var uvPlace = document.getElementById('featureFour');
			uvPlace.innerHTML = 'UV Index ' + uv;
		}
	});
}