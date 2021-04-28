/*
Creates dummy user for testing.
-Dan Tiberi
*/
function addDummyUser(){
    alasql("INSERT INTO users (email, password, fname, lname, dob) \
    VALUES ('dtiberi@hawk.iit.edu', 'abc123', 'Dan', 'Tiberi', 1975-04-23)");
}

/*
Creates dummy driver for testing.
isAvail, boolean, will denote if the driver will be entered as available. 
-Dan Tiberi
*/
function addDummyDriver(isAvail){
    alasql("INSERT INTO drivers \
    (email, password, fname, lname, is_avail, avg_rating, num_trips, routing_number, last_background_check) \
    VALUES ('aveillon@hawk.iit.edu', 'abc123' , 'Ange', 'Veillon', " + isAvail + " , 4.99, 3425, 'BanksAreFriendsNotFood', 2021-04-15)");
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
function newUser(email, password, fname, lname, dob){
    alasql("INSERT INTO users (email, password, fname, lname, dob) \
    VALUES ('" + email + "', '" + password + "', '" + fname + "', '" + lname + "', " + dob + ")");
}

/*
Create new driver using given params. Defaults rating to 5.0. Routing number and last background check are set to NULL.
-Dan Tiberi
*/
function newDriver(email, password, fname, lname){
    alasql("INSERT INTO drivers (email, password, fname, lname, is_avail, avg_rating, num_trips, routing_number, last_background_check)  \
    VALUES ('" + email + "', '" + password + "', '" + fname + "', '" + lname +"', false, 5.0, 0, NULL, NULL)");
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
Creates a new ride using given parameters.
-Dan Tiberi
*/
function newRide(passenger_id, driver_id, vehicle_id, fee, tax, origin, destination, start_time, end_time, user_rating, payment_card_id) {
    res = -2;
    try{
        alasql("INSERT INTO rides (passenger_id, driver_id, vehicle_id, fee, tax, origin, destination, start_time, end_time, user_rating, payment_card_id) VALUES (" + passenger_id+","+ driver_id+","+  vehicle_id+","+  fee+","+ tax + ",'" + origin +"','"+  destination+"',"+  start_time+","+  end_time+","+  user_rating+","+  payment_card_id+")");
        res = 1;
    } catch (error) {
        res = -1
        console.log("Alasql Error: ", error);
    }
    return res;
}

/*
Sets ride to given status. Returns 1 if successful
-Dan Tiberi
*/
function setRideStatus(id, status) {
    if(!typeof id == "number"){
        console.log("Invlaid ride_id: ", id);
        return -1;
    }
    else if(!typeof status == "boolean"){
        console.log("Invlaid ride status: " + status);
        return -1;
    }
    else{
        res = -2; 
        try{
            alasql("UPDATE rides set status = " + status + " WHERE ride_id = " + id)
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
Set all rides to a given status. Returns 1 if successful.
-Dan Tiberi
*/
function setAllRidesStatus(status){
    if(!typeof status == "boolean"){
        console.log("Invlaid ride status: " + status);
        return -1;
    }
    else{
        res = -2; 
        try{
            alasql("UPDATE rides set status = " + status)
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
Returns -1 if successful.
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
Returns -1 if failed.
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
            res = alasql("SELECT AVG(user_rating) AS DriverRating FROM rides WHERE driver_id =" + id)[0].DriverRating;
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