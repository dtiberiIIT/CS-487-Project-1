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
Given a set of ride objects, generate a table
-Dan Tiberi
*/
function generateRidesTable(rides){
    let table = document.getElementById("ridesTable");
    let data = Object.keys(rides[0]);
    generateTableHead(table, data, null);
    generateTable(table, rides);
}

/*
Generates table of requested rides.
-Dan Tiberi
*/
function generateRequestedRidesTable(){
    let rides = getRides("requested");
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
        generateTableHead(table, data, "DriverMainPage");
        populateRequestedRidesTable(table, rides);
    }  
}

/*
Generates table of active rides.
-Dan Tiberi
*/
function generateActiveRidesTable(){
    let rides = getRides("taken");
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
        generateTableHead(table, data, "DriverMainPage");
        populateActiveRidesTable(table, rides);
    }
}

/*
Given a table, generates header row.
-Dan Tiberi
*/
function generateTableHead(table, data, style) {
    let thead = table.createTHead();

    if(style == "DriverMainPage"){
        thead.className = "thead-light";
        data[data.length] = "Action"
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
    var id = getUserID(window.localStorage.getItem('rider_email'));
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

        //Cancel button cell
        let cell = row.insertCell();
        var button = document.createElement("button");
        button.innerHTML = "Cancel";

        //Code for button:
        button.addEventListener("click", function() {
            //console.log(element); //Gives ride display object.
            
            //Set ride status to requested, remove from taken table (rebuild table), move to requested table.
            set("rides", "status", "requested", element.ride_id);
            document.getElementById("activeRidesTable").innerHTML = "";
            generateActiveRidesTable(); 
            document.getElementById("pendingRidesTable").innerHTML = "";           
            generateRequestedRidesTable();   
                    
        });

        cell.appendChild(button);

    }
}