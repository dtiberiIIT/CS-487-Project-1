function selectRide(idx){
    console.log(idx);
}

/*
Functions to generate table of rides that the driver has done. 
See:
https://www.valentinog.com/blog/html-table/
-Dan Tiberi
*/

/*
Given table of past rides.
-Dan Tiberi
*/
function generateRideHistoryTable(driver_id){
    let rides = getRides("complete", driver_id);
    let table = document.getElementById("ridesTable");
    let data = Object.keys(rides[0]);
    generateTableHead(table, data, "history");
    generateTable(table, rides);
}

/*
Generates table of requested rides.
-Dan Tiberi
*/
function generateRequestedRidesTable(){
    let rides = getRidesThatAre("requested");
    let table = document.getElementById("pendingRidesTable");
    
    if(rides.length == 0){
        var tag = document.createElement("h4");
        var text = document.createTextNode("No Pending Rides");
        tag.appendChild(text);
        table.appendChild(tag);
    }
    else {
        //Remove fields from table.
        for(let field of rides){
            delete field.tax;
            delete field.payment_card_id;
            delete field.start_time;
            delete field.user_rating;
            delete field.vehicle_id;
            delete field.user_id;
            delete field.driver_id;
        }

        let data = Object.keys(rides[0]);
        generateTableHead(table, data, "requested");
        populateRequestedRidesTable(table, rides);
    }  
}

/*
Generates table of active rides.
-Dan Tiberi
*/
function generateActiveRidesTable(){
    var id = getDriverID(window.localStorage.getItem('driver_email'));
    let rides = getRides("taken", id);
    let table = document.getElementById("activeRidesTable");
    
    if(rides.length == 0){
        var tag = document.createElement("h4");
        var text = document.createTextNode("No Active Rides");
        tag.appendChild(text);
        table.appendChild(tag);
    }
    else{
        //Remove fields from table.
        for(let field of rides){
            delete field.tax;
            delete field.payment_card_id;
            delete field.start_time;
            delete field.user_rating;
            delete field.vehicle_id;
            delete field.user_id;
            delete field.driver_id;
        }

        let data = Object.keys(rides[0]);
        generateTableHead(table, data, "active");
        populateActiveRidesTable(table, rides);
    }
}

/*
Given a table, generates header row.
-Dan Tiberi
*/
function generateTableHead(table, data, style) {
    let thead = table.createTHead();

    if(style == "history"){
        thead.className = "thead-light";
    }
    else if(style == "requested" || style == "active"){
        thead.className = "thead-light";
        data[data.length] = "Action" //Add column
        if(style == "active"){
            data[data.length] = "Complete" //Add column
        }
    }
    

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
        text.textContent = words.join(" ");

        th.appendChild(text);
        row.appendChild(th);
    }
}

/*
Populates table given data
-Dan Tiberi
*/
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            //console.log(key)
            let cell = row.insertCell();

            let text = document.createTextNode(element[key]);
            switch(key) {
                case "passenger_id":
                    text = document.createTextNode(getUser(element[key]).fname + " " + getUser(element[key]).lname);
                    break;
                case "driver_id":
                    text = document.createTextNode(getDriver(element[key]).lname);
                    break;
                case "vehicle_id":
                    text = document.createTextNode(getVehicle(element[key]).lplate_num);
                    break;
                case "fee":
                    text = document.createTextNode("$"+element[key]);
                    break;
                case "tax":
                    text = document.createTextNode("$"+element[key]);
                    break;
            }

            cell.appendChild(text);
        }
    }
}

/*
Populates requested ride table given data
-Dan Tiberi
*/
function populateRequestedRidesTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            //console.log(key)
            let cell = row.insertCell();

            let text = document.createTextNode(element[key]);
            switch(key) {
                case "passenger_id":
                    text = document.createTextNode(getUser(element[key]).fname + " " + getUser(element[key]).lname);
                    break;
                case "fee":
                    text = document.createTextNode("$"+element[key]);
                    break;
            }

            cell.appendChild(text);
        }

        //Accept button cell
        let cell = row.insertCell();
        var button = document.createElement("button");
        button.innerHTML = "Accept";

        //Code for button.
        button.addEventListener("click", function() {
            //console.log(element); //Gives ride display object.
            
            if(getRides("taken").length == 0){ //If no ride is currenly selected.
                //Set ride status to taken, remove from requested table (rebuild table), move to active table.
                set("rides", "status", "taken", element.ride_id);

                var id = getDriverID(window.localStorage.getItem('driver_email'));
                set("rides", "driver_id", id, element.ride_id);//Assign ride this driver's id
                set("drivers", "status", true, id);//Set driver status: true

                document.getElementById("activeRidesTable").innerHTML = "";
                document.getElementById("pendingRidesTable").innerHTML = "";
                generateActiveRidesTable(); 
                generateRequestedRidesTable(); 
            }        
            else{
                alert("Only 1 Active Ride Allowed");
            }
        });

        cell.appendChild(button);

    }
}


/*
"it is called by the button to update status in the driver main page"
-Ange Veillon
*/
function updateAvail()
{
    var id = getUserID(window.localStorage.getItem('driver_email'));
    var form = document.getElementById("availform");
    var status = form["a_status"].value;
    var status_bool;
    if (status == "CC1") {
        status_bool=true;
    }
    if (status == "CC2") {
        status_bool=false;
    }
    setDriverStatus(id, status_bool);
}

/*
Populates active ride table given data
-Dan Tiberi
*/
function populateActiveRidesTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            //console.log(key)
            let cell = row.insertCell();

            let text = document.createTextNode(element[key]);
            switch(key) {
                case "passenger_id":
                    text = document.createTextNode(getUser(element[key]).fname + " " + getUser(element[key]).lname);
                    break;
                case "fee":
                    text = document.createTextNode("$"+element[key]);
                    break;
            }

            cell.appendChild(text);
        }

        //Cancel button cell
        let cancelBttnCell = row.insertCell();
        var cancelBttn = document.createElement("button");
        cancelBttn.innerHTML = "Cancel";

        //Code for cancel button:
        cancelBttn.addEventListener("click", function() {
            //console.log(element); //Gives ride display object.
            
            //Set ride status to requested, remove from taken table (rebuild table), move to requested table.
            set("rides", "status", "requested", element.ride_id);
            document.getElementById("activeRidesTable").innerHTML = "";
            generateActiveRidesTable(); 
            document.getElementById("pendingRidesTable").innerHTML = "";           
            generateRequestedRidesTable();   
            
            var id = getDriverID(window.localStorage.getItem('driver_email'));
            set("rides", "driver_id", -1, element.ride_id);
            set("drivers", "status", false, id);//Set driver status: false
        });
        cancelBttnCell.appendChild(cancelBttn);

        //Complete button cell
        let completeBttnCell = row.insertCell();
        var completeBttn = document.createElement("button");
        completeBttn.innerHTML = "\u2713"; //Unicode check mark

        //Code for complete button:
        completeBttn.addEventListener("click", function() {
            set("rides", "status", "complete", element.ride_id);
            document.getElementById("activeRidesTable").innerHTML = "";
            generateActiveRidesTable(); 
            
            var id = getDriverID(window.localStorage.getItem('driver_email'));
            set("drivers", "status", false, id);//Set driver status: false
        });

        completeBttnCell.appendChild(completeBttn);

    }
    //displayRoute();
}

/* 
map related 
"it displays the active route in the map for the driver"
-Ange Veillon
*/
function displayRoute() {
    var id = getDriverID(window.localStorage.getItem('driver_email'));
    console.log(id);
    var dest = getActiveRide(id).destination;
    var orig = getActiveRide(id).origin;
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy:true})
}
function successLocation(position){
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
    long = position.coords.longitude;
    lat = position.coords.latitude;
}   
function errorLocation(){
    setupMap([-87.62,41.88])
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
    
    var id = getDriverID(window.localStorage.getItem('driver_email'));
    console.log("erf",id);
    var dest = getActiveRide(id).destination;
    var orig = getActiveRide(id).origin;
    directions.setOrigin(center);
    directions.addWaypoint(orig);
    directions.setDestination(dest);

    }
//End of map related