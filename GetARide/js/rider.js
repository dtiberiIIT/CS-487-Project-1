console.log("hello");
mapboxgl.accessToken = 'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ';

function run() {
	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy: true
	})
}

function successLocation(position) {
	console.log(position)
	setupMap([position.coords.longitude, position.coords.latitude])
	long = position.coords.longitude;
	lat = position.coords.latitude;
}

function errorLocation() {
	setupMap([-87.62, 41.88])
}

function successLocation2(position) {
	console.log(position)
	long = position.coords.longitude;
	lat = position.coords.latitude;
}

function errorLocation2() {
	console.log("error");
}

function setupMap(center) {
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: center,
		zoom: 14
	})
	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav);
	var directions = new MapboxDirections({
		accessToken: 'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ',
		unit: 'metric',
		profile: 'mapbox/driving'
	});
	map.addControl(directions, 'top-left');
	var geocoder = new MapboxGeocoder({
		accessToken: 'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ',
		types: 'address',
		mapboxgl: mapboxgl
	});
	var form = document.getElementById("rideform");
	var orig = form["orig"].value;
	var dest = form["dest"].value;
	var pu_time = form["pickup_time"].value;
	directions.setOrigin(orig);
	directions.setDestination(dest);
	var curloc = form["ownloc"];
	if (curloc.checked == true) {
		navigator.geolocation.getCurrentPosition(function(position) {
			orig_first = position.coords.longitude.toString();
			orig_sec = position.coords.latitude.toString();
			orig = [orig_first, orig_sec];
			directions.setOrigin([orig_first, orig_sec]);
			const Http2 = new XMLHttpRequest();
			const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + dest + ".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
			Http2.open("GET", url2);
			Http2.send();
			var ans2;
			Http2.onreadystatechange = (e) => {
				if (Http2.readyState === 4) {
					ans2 = JSON.parse(Http2.responseText);
					dest_first = ans2.features[0].center[0].toString();
					dest_sec = ans2.features[0].center[1].toString();
					const Http = new XMLHttpRequest();
					const url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + orig_first + "," + orig_sec + ";" + dest_first + "," + dest_sec + "?access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
					Http.open("GET", url);
					Http.send();
					Http.onreadystatechange = (e) => {
						if (Http.readyState === 4) {
							var ans = JSON.parse(Http.responseText);
							console.log(ans.routes[0].duration);
							console.log(ans.routes[0].distance);
							var price = ans.routes[0].distance / 1000;
							var tax = price * 0.2;
							console.log(tax);
							newRide(getUserID(window.localStorage.getItem('rider_email')), '-1', '-1', price, tax, orig, dest, 1, ans.routes[0].duration, '-1', '-1');
                            //var intervalId = window.setInterval(function(){check_and_alert();}, 2000);
						}
					}
				}
			}
		}, errorLocation2, {
			enableHighAccuracy: true
		});
	} else {
		const Http1 = new XMLHttpRequest();
		const url1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + orig + ".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
		Http1.open("GET", url1);
		Http1.send();
		var ans1;
		Http1.onreadystatechange = (e) => {
			if (Http1.readyState === 4) {
				ans1 = JSON.parse(Http1.responseText);
				orig_first = ans1.features[0].center[0].toString();
				orig_sec = ans1.features[0].center[1].toString();
				const Http2 = new XMLHttpRequest();
				const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + dest + ".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
				Http2.open("GET", url2);
				Http2.send();
				var ans2;
				Http2.onreadystatechange = (e) => {
					if (Http2.readyState === 4) {
						ans2 = JSON.parse(Http2.responseText);
						dest_first = ans2.features[0].center[0].toString();
						dest_sec = ans2.features[0].center[1].toString();
						const Http = new XMLHttpRequest();
						const url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + orig_first + "," + orig_sec + ";" + dest_first + "," + dest_sec + "?access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
						Http.open("GET", url);
						Http.send();
						Http.onreadystatechange = (e) => {
							if (Http.readyState === 4) {
								var ans = JSON.parse(Http.responseText);
								console.log(ans.routes[0].duration);
								console.log(ans.routes[0].distance);
								var price = ans.routes[0].distance / 1000;
								var tax = price * 0.2;
								console.log(tax);
								newRide(getUserID(window.localStorage.getItem('rider_email')), '-1', '-1', price, tax, orig, dest, 1, ans.routes[0].duration, '-1', '-1');
                                var inter = window.setInterval(function(){check_and_alert(inter);}, 3000);
							}
						}
					}
				}
			}
		}
	}
}

/*
Generate table of saved addresses.
-Dan Tiberi
*/
function generateAddressTable(user_id) {
	/*
	let addresses = getRides("complete", driver_id);
	let table = document.getElementById("ridesTable");
	let data = Object.keys(rides[0]);
	generateTableHead(table, data, "history");
	generateTable(table, rides);
	*/

    //console.log("!GEN ADDRESSES TABLE!");

    let addresses = getAddresses(user_id);
	let table = document.getElementById("addressesTable");

    if(addresses.length == 0){
        var tag = document.createElement("h4");
        var text = document.createTextNode("No Addresses Stored");
        tag.appendChild(text);
        table.appendChild(tag);
        //console.log("!NO STORED ADDRESSES!");
    }
    else{
        //console.log("!STORED ADDRESSES!");
        for(let field of addresses){
            delete field.user_id;
        }
    
        let data = Object.keys(addresses[0]);
    
        generateAddressTableHead(table, data);
        populateAddressesTable(table, addresses);
    }
}

/*
Given a table, generates header row.
-Dan Tiberi
*/
function generateAddressTableHead(table, data) {
    let thead = table.createTHead();

    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);

        //Replace '_' in text with spaces and set the first letter of each word to uppercase.
        let s = String(text.textContent).replace(/_/g," ");
        const words = s.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        s = words.join(" ");
        if(s=="Adr Id"){
            s = "Address ID";
        }
        text.textContent = s;

        th.appendChild(text);
        row.appendChild(th);
    }
}

/*
Populates requested ride table given data
-Dan Tiberi
*/
function populateAddressesTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            //console.log(key)
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }

        //Select button cell
        let cell = row.insertCell();
        var button = document.createElement("button");
        button.innerHTML = "Select";

        //Code for button.
        button.addEventListener("click", function() {
            console.log(element); //Gives ride display object.
            
            document.getElementById("addressField").value = element.address;
        });

        cell.appendChild(button);
    }
}

/*
Captures input from new address form and stores it in the db.
-Dan Tiberi
*/
function captureNewAddress() {
	var form = document.getElementById('newaddress');

    //Check if required fields are filled
    requiredFieldsFilled = true;
    for(var i=0; i < form.elements.length; i++) {
        if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            requiredFieldsFilled = false;
        }
    }

    if(requiredFieldsFilled){
        //Check credentials.
        var inputs = form.elements;   
		var concat = inputs["na-adr"].value + ", " + inputs["na-city"].value + ", " + inputs["na-state"].value + ", " + inputs["na-zip"].value + ", " + inputs["na-country"].value;

        //console.log(concat);
        
		newAddress(concat, getUserID(window.localStorage.getItem('rider_email')));
		alert("New Address Added!");
    }
}

/*
called each sec to check if the ride was taken and if yes, inform the rider about what vehicle to expect
-Ange Veillon
*/
function check_and_alert(inter){
    var res = getRidesPass("taken", getUserID(window.localStorage.getItem('rider_email')));
    if (typeof res !== "undefined"){
        console.log(res[0]);
        var v_id = res[0].vehicle_id;
        var lpn = getVehicle(v_id).lplate_num;
        var maker = getVehicle(v_id).vehicle_make;
        var model = getVehicle(v_id).vehicle_model;
        var text = "Your ride was taken! Look for a " + maker.toString() + " "+ model.toString() + " with license plate: " + lpn.toString();
        alert(text);
        clearInterval(inter);
    }

}