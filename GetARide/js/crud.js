function addDummyUser(){
    alasql("INSERT INTO users (email, password, fname, lname, dob) VALUES ('dtiberi@hawk.iit.edu', 'abc123', 'Dan', 'Tiberi', 1975-04-23)");
}

//isAvail, boolean, will denote if the driver will be entered as available.
function addDummyDriver(isAvail){
    alasql("INSERT INTO drivers (email, password, fname, lname, is_avail, avg_rating, num_trips, routing_number, last_background_check) VALUES ('aveillon@hawk.iit.edu', 'Ange', 'Veillon', " + isAvail + ", 4.99, 3425, 'BanksAreFriendsNotFood', 2021-04-15)")
}
