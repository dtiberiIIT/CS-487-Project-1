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
        console.log("Not a number");
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM users WHERE user_id=" + id+""))[0];
        } catch (error) {
            res = -1
            console.log("alasql Error");
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
        console.log("Not a number");
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM drivers WHERE driver_id=" + id+""))[0];
        } catch (error) {
            res = -1
            console.log("alasql Error");
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
        console.log("Not a number");
        return -1;
    }
    else{
        res = -2; //Should never reach this 
        try{
            res = Object.values(alasql("SELECT * FROM ride WHERE ride_id=" + id+""))[0];
        } catch (error) {
            res = -1
            console.log("alasql Error");
        }
            if(res == null || res == undefined){
            res = -1;
            console.log("Undefined ride.");
        }
        return res;
    }
}