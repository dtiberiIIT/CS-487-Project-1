//Test Code
// alasql("CREATE TABLE test (language INT, hello STRING)");
// alasql("INSERT INTO test VALUES (1,'Hello!')");
// alasql("INSERT INTO test VALUES (2,'Aloha!')");
// alasql("INSERT INTO test VALUES (3,'Bonjour!')");
// console.log( alasql("SELECT * FROM test WHERE language > 1") );

//Init DB file
// NOTE! start and end changed to start_time and end_time
window.onload = function() {
    localStorage.clear();//Clear localstorage

    //Init database and save in local storage.
    alasql("SET AUTOCOMMIT ON");
    alasql("CREATE localStorage DATABASE IF NOT EXISTS mdb");
    alasql("ATTACH localStorage DATABASE mdb AS mdb");
    alasql("USE mdb");

    //Create tables
    alasql("DROP TABLE IF EXISTS users, drivers, ride, payment_info, vehicles"); //Remove existing tables. 
    alasql("CREATE TABLE IF NOT EXISTS users (user_id INT NOT NULL AUTO_INCREMENT, email VARCHAR(50), password VARCHAR(50), fname VARCHAR(30), lname VARCHAR(30), phone_number VARCHAR(20), PRIMARY KEY (user_id))");
    alasql("CREATE TABLE IF NOT EXISTS drivers (driver_id INT NOT NULL AUTO_INCREMENT, email VARCHAR(50), password VARCHAR(50), fname VARCHAR(30), lname VARCHAR(30), is_avail BOOLEAN, avg_rating DOUBLE, num_trips INT, routing_number VARCHAR(30), last_background_check DATETIME, status BOOLEAN, phone_number VARCHAR(20), PRIMARY KEY (driver_id))");
    alasql("CREATE TABLE IF NOT EXISTS rides (ride_id INT NOT NULL AUTO_INCREMENT, passenger_id INT, driver_id INT, vehicle_id INT, fee DOUBLE, tax DOUBLE, origin VARCHAR(50), destination VARCHAR(50), start_time DATETIME, duration TIME, user_rating INT, payment_card_id INT, status ENUM(requested, taken, complete), PRIMARY KEY (ride_id))");
    alasql("CREATE TABLE IF NOT EXISTS payment_info (card_id INT NOT NULL AUTO_INCREMENT, user_id INT, card_number VARCHAR(20), card_cvv INT, card_type VARCHAR(20), PRIMARY KEY (card_id))");
    alasql("CREATE TABLE IF NOT EXISTS vehicles (vehicle_id INT NOT NULL AUTO_INCREMENT, driver_id INT, lplate_num VARCHAR(20), model_year YEAR, vehicle_make VARCHAR(20), vehicle_model VARCHAR(20), passed_qa BOOLEAN, pas_capacity INT, quality_rating INT, PRIMARY KEY (vehicle_id))");
    alasql("CREATE TABLE IF NOT EXISTS addresses (adr_id INT NOT NULL AUTO_INCREMENT, user_id INT, address VARCHAR(50), PRIMARY KEY (adr_id))");
    populate(true); //If true, will populate databse with dummy information for demo or testing purposes. 
};

//Populate the database with dummy accounts.
function populate(tog){
    if(tog){
        addDummyUser();
        addDummyDriver(true);

        newUser("dt@gmail.com", "abc123", "Bob", "Bobbyson", "1947-2-15", "222-222-2222");

        newVehicle(1,"OutATime", 2015, "Toyota", "Prius", true, 3, 5);
        newVehicle(2,"Got2GoFast", 2019, "Ford", "Fusion", true, 3, 5);
        newVehicle(2,"2Fast4U", 2017, "Honda", "Civic", true, 3, 5);

        newRide(1,-1,3,15.00, 0.75, "empire state building", "chrysler building", 1,1,5,0);
        newRide(1,-1,3,12.00, 0.75, "8 rue alcide delapierre", "15 rue theodore maillart", 1,1,4,0);
        newRide(1,-1,3,18.00, 0.75, "ABC 123", "XYZ 123", 1,1,2,0);
        newRide(1,-1,3,11.00, 0.75, "ABC 123", "XYZ 123", 1,1,2,0);

        newRide(1,1,3,15.00, 0.75, "ABC 123", "XYZ 123", 1,1,5,0);
        newRide(1,3,3,15.00, 0.75, "ABC 123", "XYZ 123", 1,1,5,0);

        newPaymentMethod(4, "1234 5678 9101", 223, "Visa")

        //console.log(getRideStatus(2));
        //setRideStatus(2, "taken")
        //console.log(getRideStatus(2));

        //console.log(getActiveRide(2));

        //setDriverStatus(2, false)

        //setRideStatus(1, true);
        //set("users", "fname", "Obama", 1);

        //console.log(alasql("SELECT * FROM drivers"));

        //console.log("AVG Rating driver 2: " + getDriverRating(2));
        //console.log(retrieve("users", "fname", 1));
        //newDriver("NormalManDan@aol.com", "abc123", "Dan", "Notmehehe");

        //console.log("!", alasql("SELECT * FROM drivers"));
        //console.log("!", alasql("SELECT * FROM users"));
        //console.log(getDriverID("aveillon@hawk.iit.edu"));
        //console.log(getUser(getUserID("Dt@gmail.com")));
        //console.log(getDriver(1));
    }
}