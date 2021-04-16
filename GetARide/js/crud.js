function addDummyUser(){
    alasql("INSERT INTO users (email, password, fname, lname, dob) \
    VALUES ('dtiberi@hawk.iit.edu', 'abc123', 'Dan', 'Tiberi', 1975-04-23)");
}

//isAvail, boolean, will denote if the driver will be entered as available.
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