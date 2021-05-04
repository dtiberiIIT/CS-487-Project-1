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
    generateTableHead(table, data);
    generateTable(table, rides);
}

function generateTableHead(table, data) {
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
        text.textContent = words.join(" ");

        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            console.log(key)
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
  