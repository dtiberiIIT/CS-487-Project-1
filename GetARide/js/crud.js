/*
Creates dummy user for testing.
-Dan Tiberi
*/
function addDummyUser(){
    alasql("INSERT INTO users (email, password, fname, lname, dob, phone_number) \
    VALUES ('dtiberi@hawk.iit.edu', 'abc123', 'Dan', 'Tiberi', 1975-04-23, '555-555-5555')");
}

/*
Creates dummy driver for testing.
isAvail, boolean, will denote if the driver will be entered as available. 
-Dan Tiberi
*/
function addDummyDriver(isAvail){
    alasql("INSERT INTO drivers \
    (email, password, fname, lname, is_avail, avg_rating, num_trips, routing_number, last_background_check, phone_number) \
    VALUES ('aveillon@hawk.iit.edu', 'abc123' , 'Ange', 'Veillon', " + isAvail + " , 4.99, 3425, 'BanksAreFriendsNotFood', 2021-04-15, '555-555-5555')");
}

/*
Given email address, will return the driver_id (int) with that email address. 
If given invalid input or if driver does not exist, will return -1.
-Dan Tiberi
*/
function getDriverID(email){
    if(!typeof email == "string"){
        return -1;
    }
    else{
        res = -2;
        try{
            res = Object.values(alasql("SELECT driver_id FROM drivers WHERE email='" + email+"'"))[0].driver_id;
        } catch (error) {
            console.log("Alasql Error: ", error);
            res = -1
        }
            if(res == null){
            res = -1;
        }
        return res;
    }
}

/*
Given email address, will return the user_id (int) with that email address. 
If given invalid input or if user does not exist, will return -1.
-Dan Tiberi
*/
function getUserID(email){
    if(!typeof email == "string"){
        return -1;
    }
    else{
        res = -2;
        try{
            res = Object.values(alasql("SELECT user_id FROM users WHERE email='" + email+"'"))[0].user_id;
        } catch (error) {
            console.log("Alasql Error: ", error);
            res = -1
        }
        if(res == null || res == undefined){
            res = -1;
        }
        return res;
    }
}

//Create new user using given params. -Dan Tiberi
function newUser(email, password, fname, lname, dob, phoneNumber){
    alasql("INSERT INTO users (email, password, fname, lname, dob, phone_number) \
    VALUES ('" + email + "', '" + password + "', '" + fname + "', '" + lname + "', " + dob + ", '" + phoneNumber +"')");
}

/*
Create new driver using given params. Defaults rating to 5.0. Routing number and last background check are set to NULL.
-Dan Tiberi
*/
function newDriver(email, password, fname, lname, phoneNumber){
    alasql("INSERT INTO drivers (email, password, fname, lname, is_avail, avg_rating, num_trips, routing_number, last_background_check, phone_number)  \
    VALUES ('" + email + "', '" + password + "', '" + fname + "', '" + lname +"', false, 5.0, 0, NULL, NULL, '" + phoneNumber +"')");
}

/*
Returns user data from the DB given an ID. The data is stored in a generic object as parameters. 
If the user does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getUser(id){
    if(!typeof id == "number"){
        console.log("Invlaid user_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM users WHERE user_id=" + id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined user");
        }
        return res;
    }
}

/*
Returns driver data from the DB given an ID. The data is stored in a generic object as parameters. 
If the driver does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getDriver(id){
    if(!typeof id == "number"){
        console.log("Invlaid driver_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM drivers WHERE driver_id=" + id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined driver");
        }
        return res;
    }
}

/*
Returns ride data from the DB given an ID. The data is stored in a generic object as parameters. 
If the ride does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getRide(id){
    if(!typeof id == "number"){
        console.log("Invlaid ride_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM rides WHERE ride_id=" + id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride.");
        }
        return res;
    }
}

/*
Returns ride data from the DB given a driver ID. The data is stored in a generic object as parameters. 
If the driver does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getRides(id){
    if(!typeof id == "number"){
        console.log("Invlaid driver_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM rides WHERE driver_id=" + id));
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined driver.");
        }
        return res;
    }
}

/*
Returns all rides with the given status
If the driver does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getRidesThatAre(status){
    if(!typeof status == "string"){
        console.log("Invlaid status: ", status);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM rides WHERE status='" + status + "'"));
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
        return res;
    }
}

/*
Returns all rides
Returns -1 if failed.
-Dan Tiberi
*/
function getAllRides(){
    res = -1; //Should never reach this 
    try{
        res = Object.values(alasql("SELECT * FROM rides"));
    } catch (error) {
        res = -1
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Returns all rides with the given status belonging to a driver_id
If the driver does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getRides(status, driver_id){
    if(!typeof status == "string"){
        console.log("Invlaid status: ", status);
        return -1;
    }
    else if(!typeof driver_id == "number"){
        console.log("Invlaid driver_id: ", driver_id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM rides WHERE status='" + status + "' AND driver_id=" + driver_id));
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
        return res;
    }
}


/*
Returns all rides with the given status belonging to a passenger_id
If the driver does not exist or an invalid ID is given, it will return -1.
-Ange Veillon
*/
function getRidesPass(status, passenger_id){
    if(!typeof status == "string"){
        console.log("Invlaid status: ", status);
        return -1;
    }
    else if(!typeof passenger_id == "number"){
        console.log("Invalid passenger_id: ", passenger_id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM rides WHERE status='" + status + "' AND passenger_id=" + passenger_id));
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
        return res;
    }
}


/*
Returns vehicle data from the DB given an ID. The data is stored in a generic object as parameters. 
If the vehicle does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getVehicle(id){
    if(!typeof id == "number"){
        console.log("Invlaid vehicle_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM vehicles WHERE vehicle_id=" + id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined vehicle.");
        }
        return res;
    }
}

/*
Returns an array of the vehicles owned by the given driver.
If the vehicle does not exist or an invalid driver_id is given, it will return -1.
-Dan Tiberi
*/
function getVehicles(driver_id){
    if(!typeof driver_id == "number"){
        console.log("Invlaid driver_id: ", driver_id);
        return -1;
    }
    else{
        res = -2; 
        try{
            res = Object.values(alasql("SELECT * FROM vehicles WHERE driver_id=" + driver_id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined driver.");
        }
        return res;
    }
}

/*
Returns payment data from the DB given an ID. The data is stored in a generic object as parameters. 
If the payment method does not exist or an invalid ID is given, it will return -1.
-Dan Tiberi
*/
function getPaymentInfo(id){
    if(!typeof id == "number"){
        console.log("Invlaid card_id: ", id);
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM payment_info WHERE card_id=" + id))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined card.");
        }
        return res;
    }
}

/*
Returns payment data from the DB given an email + password. The data is stored in a generic object as parameters. 
If it fails then it will return -1.
-Dan Tiberi
*/
function getPaymentInfo(email, password){
    if(!typeof email == "string" || !typeof password == "string"){
        console.log("Invlaid credentials");
        return -1;
    }
    else if (getUser(getUserID(email)).password == password){
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM payment_info WHERE user_id=" + getUserID(email)))[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined card.");
        }
        return res;
    }
    else {
        return -1;
    }
}

/*
Set the given field in the given table to the given value at given id. 
Meant for general purpose inserts when a more specific function
is not availible. Returns 1 if successful. 
-Dan Tiberi
*/
function set(table, field, value, id) {
    if(typeof table != "string") {
        console.log("Invlaid table: ", table);
        return 0;
    }
    else if(typeof field != "string" ) {
        console.log("Invalid field: ", field);
        return 0;
    }
    else if(typeof id != "number" ) {
        console.log("Invalid id: ", id);
        return null;
    }

    let primaryKey = table.slice(0, -1) + "_id";
    if(table == "payment_info") {
        primaryKey = "card_id";
    }

    if(typeof value == "string"){
        value = "'" + value + "'";
    }

    try{
        alasql("UPDATE " + table + " SET " + field + " = " + value + " WHERE " + primaryKey + "=" + id);
        return 1;
    } catch (error) {
        console.log("Alasql Error: ", error);
        return 0;
    }
}

/*
Retrieve value of given field from given table at given primary-key.
Returns null if not defined.
-Dan Tiberi
*/
function retrieve(table, field, id) {
    if(typeof table != "string") {
        console.log("Invlaid table: ", table);
        return null;
    }
    else if(typeof field != "string" ) {
        console.log("Invalid field: ", field);
        return null;
    }
    else if(typeof id != "number" ) {
        console.log("Invalid id: ", id);
        return null;
    }

    let primaryKey = table.slice(0, -1) + "_id";
    if(table == "payment_info") {
        primaryKey = "card_id";
    }

    try{
        let res = Object.values(alasql("SELECT " + field + " FROM " + table + " WHERE " + primaryKey + "=" + id))[0];
        console.log("SELECT " + field + " FROM " + table + " WHERE " + primaryKey + "=" + id);
        return res;
    } catch (error) {
        console.log("Alasql Error: ", error);
        return null;
    }
}

/*
Loads DB into current page.
See example in First Name field of Rideprofile.html
-Dan Tiberi
*/
function load() {
    alasql("ATTACH localStorage DATABASE mdb AS mdb");
    alasql("USE mdb");
}

/*
Sets driver status given driver_id.
Returns -1 if failed, 1 if successful
-Dan Tiberi
*/
function setDriverStatus(driver_id, status) {
    if(typeof driver_id != "number" ) {
        console.log("Invalid driver_id: ", id);
        return -1;
    }
    else if(typeof status != "boolean" ) {
        console.log("Invalid status: ", id);
        return -1;
    }
    else {
        try{
            alasql("UPDATE drivers SET is_avail = " + status + " WHERE driver_id=" + driver_id);
            return 1;
        } catch (error) {
            console.log("Alasql Error: ", error);
            return -1;
        }
    }
}

/*
Creates a new ride using given parameters.
-Dan Tiberi
*/
function newRide(passenger_id, driver_id, vehicle_id, fee, tax, origin, destination, start_time, end_time, user_rating, payment_card_id) {
    res = -2;
    try{
        alasql("INSERT INTO rides (passenger_id, driver_id, vehicle_id, fee, tax, origin, destination, start_time, duration, user_rating, payment_card_id, status) VALUES (" + passenger_id+","+ driver_id+","+  vehicle_id+","+  fee+","+ tax + ",'" + origin +"','"+  destination+"',"+  start_time+","+  end_time+","+  user_rating+","+  payment_card_id+", 'requested')");
        res = 1;
    } catch (error) {
        res = -1
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Sets ride to given status. Status is an enum of request, taken, and complete. Returns 1 if successful, else -1
-Dan Tiberi
*/
function setRideStatus(id, status) {
    if(!typeof id == "number"){
        console.log("Invlaid ride_id: ", id);
        return -1;
    }
    else if(!typeof status == "string"){
        console.log("Invlaid ride status: " + status);
        return -1;
    }
    else{
        res = -2; 
        try{
            alasql("UPDATE rides set status = '" + status + "' WHERE ride_id = " + id)
            res = 1;
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride");
        }
        return res;
    }
}

/*
Sets ride to given status. Status is an enum of request, taken, and complete. Returns 1 if successful, else -1
-Dan Tiberi
*/
function getRideStatus(id) {
    if(!typeof id == "number"){
        console.log("Invlaid ride_id: ", id);
        return -1;
    }
    else{
        try{
            res = alasql("SELECT status FROM rides WHERE ride_id = " + id)[0].status
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride");
        }
        return res;
    }
}

/*
Set all rides to a given status. Returns 1 if successful.
-Dan Tiberi
*/
function setAllRidesStatus(status){
    if(!typeof status == "string"){
        console.log("Invlaid ride status: " + status);
        return -1;
    }
    else{
        res = -2; 
        try{
            alasql("UPDATE rides set status = '" + status + "'")
            res = 1;
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride");
        }
        return res;
    }
}

/*
Exists in place of a rateDriver function. Assigns a rating to a specified ride (id).
Returns -1 if unsuccessful.
-Dan Tiberi
*/
function rateRide(id, rating){
    if(!typeof id == "number" || !typeof rating == "number"){
        console.log("Invlaid ride_id or rating: "+ id + "," + rating);
        return -1;
    }
    else{
        res = -2; 
        try{
            alasql("UPDATE rides set user_rating = " + rating + " WHERE ride_id = " + id)
            res = 1;
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride");
        }
        return res;
    }
}

/*
Creates a new vehicle given parameters.
Returns 1 if successful.
-Dan Tiberi
*/
function newVehicle(driver_id, lplate_num, model_year, vehicle_make, vehicle_model, passed_qa, pas_capacity, quality_rating) {
    res = -2;
    try{
        alasql("INSERT INTO vehicles (driver_id, lplate_num, model_year, vehicle_make, vehicle_model, passed_qa, pas_capacity, quality_rating) VALUES (" + driver_id + ",'"+ lplate_num + "'," + model_year + ",'" + vehicle_make + "','" + vehicle_model + "'," + passed_qa + "," + pas_capacity + "," + quality_rating + ")");
        res = 1;
    } catch (error) {
        res = -1
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Creates a new payment method given parameters.
Returns 1 if successful.
-Dan Tiberi
*/
function newPaymentMethod(user_id, card_number, card_cvv, card_type) {
    res = -2;
    try{
        alasql("INSERT INTO payment_info (user_id, card_number, card_cvv, card_type) VALUES (" + user_id + ",'" + card_number + "'," + card_cvv + ",'" + card_type + "')");
        res = 1;
    } catch (error) {
        res = -1
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Returns a driver's average rating give his driver_id.
This is done by checking each ride that the driver has completed and finding the avg rating.
Returns -1 if failed, else 1.
-Dan Tiberi
*/
function getDriverRating(id){
    if(!typeof id == "number"){
        console.log("Invlaid driver_id: "+ id);
        return -1;
    }
    else{
        res = -2; 
        try{
            res = alasql("SELECT AVG(user_rating) AS DriverRating FROM rides WHERE driver_id =" + id+" AND status='complete'")[0].DriverRating;
            //Round result to 2 decimal places.
            res = (Math.round(res * 100) / 100).toFixed(2);
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined id");
        }
        return res;
    }
}

/*
Gets the currently active drive pertaining to a specified driver_id.
Returns -1 if failed.
-Dan Tiberi
*/
function getActiveRide(driver_id){
    if(!typeof driver_id == "number"){
        console.log("Invlaid driver_id: "+ driver_id);
        return -1;
    }
    else{
        res = -2; 
        try{
            res = alasql("SELECT * FROM rides WHERE driver_id =" + driver_id + " AND status='taken'")[0];
        } catch (error) {
            res = -1
            console.log("Alasql Error: ", error);
        }
        return res;
    }
}

/*
Creates a new stored address for the given user.
Returns -1 if failed, else 1.
-Dan Tiberi
*/
function newAddress(adr, user_id){
    var res = -1;
    try{
        alasql("INSERT INTO addresses (user_id, address) VALUES (" + user_id + ", '" + adr + "')");
        res = 1
    } catch (error) {        
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Gets all stored address for the given user as an array of objects.
Returns -1 if failed.
-Dan Tiberi
*/
function getAddresses(user_id){
    var res = -1;
    try{
        res = alasql("SELECT * FROM addresses WHERE user_id=" + user_id);
    } catch (error) {
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Gets address with given adr_id.
Returns -1 if failed.
-Dan Tiberi
*/
function getAddress(adr_id){
    var res = -1;
    try{
        res = alasql("SELECT * FROM addresses WHERE adr_id=" + adr_id)[0];
    } catch (error) {
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Removes the identified address.
Returns -1 if failed, else 1.
-Dan Tiberi
*/
function removeAddress(){
    var res = -1;
    try{
        alasql("DELETE FROM addresses WHERE adr_id=" + adr_id);
        res = 1;
    } catch (error) {
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Get an address id using a given address.
-Dan Tiberi
*/
function getAddressId(address){
    var res = -1;
    try{
        alasql("SELECT adr_id FROM addresses WHERE adress='" + address + "'");
        res = 1;
    } catch (error) {
        console.log("Alasql Error: ", error);
    }
    return res;
}