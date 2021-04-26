//Test Code
// alasql("CREATE TABLE test (language INT, hello STRING)");
// alasql("INSERT INTO test VALUES (1,'Hello!')");
// alasql("INSERT INTO test VALUES (2,'Aloha!')");
// alasql("INSERT INTO test VALUES (3,'Bonjour!')");
// console.log( alasql("SELECT * FROM test WHERE language > 1") );

//Init DB file
// NOTE! start and end changed to start_time and end_time
window.onload = function() {
    // alasql("SET AUTOCOMMIT ON");
    // alasql("CREATE localStorage DATABASE IF NOT EXISTS mdb");
    // alasql("ATTACH localStorage DATABASE mdb AS mdb");
    // alasql("USE mdb");
    // alasql("CREATE TABLE users (user_id INT NOT NULL AUTO_INCREMENT, fname VARCHAR(30), lname VARCHAR(30), dob DATE, PRIMARY KEY (user_id))");
    // alasql("INSERT INTO users (fname, lname) VALUES ('dan', 'tiberi')");
    // console.log("!", alasql("SELECT * FROM users"));

    //Init database and save in local storage.
    alasql("SET AUTOCOMMIT ON");
    alasql("CREATE localStorage DATABASE IF NOT EXISTS mdb");
    alasql("ATTACH localStorage DATABASE mdb AS mdb");
    alasql("USE mdb");

    //Create tables
    alasql("DROP TABLE IF EXISTS users, drivers, ride, payment_info, vehicles"); //Remove existing tables. 
    alasql("CREATE TABLE IF NOT EXISTS users (user_id INT NOT NULL AUTO_INCREMENT, email VARCHAR(50), password VARCHAR(50), fname VARCHAR(30), lname VARCHAR(30), dob Date, PRIMARY KEY (user_id))");
    alasql("CREATE TABLE IF NOT EXISTS drivers (driver_id INT NOT NULL AUTO_INCREMENT, email VARCHAR(50), password VARCHAR(50), fname VARCHAR(30), lname VARCHAR(30), is_avail BOOLEAN, avg_rating DOUBLE, num_trips INT, routing_number VARCHAR(30), last_background_check DATETIME, PRIMARY KEY (driver_id))");
    alasql("CREATE TABLE IF NOT EXISTS rides (ride_id INT NOT NULL AUTO_INCREMENT, passenger_id INT, driver_id INT, vehicle_id INT, fee DOUBLE, tax DOUBLE, origin VARCHAR(50), destination VARCHAR(50), distance DOUBLE, start_time DATETIME, end_time DATETIME, user_rating INT, payment_card_id INT, status BOOLEAN, PRIMARY KEY (ride_id))");
    alasql("CREATE TABLE IF NOT EXISTS payment_info (card_id INT NOT NULL AUTO_INCREMENT, user_id INT, card_number VARCHAR(20), card_cvv INT, card_type VARCHAR(20), PRIMARY KEY (card_id))");
    alasql("CREATE TABLE IF NOT EXISTS vehicles (vehicle_id INT NOT NULL AUTO_INCREMENT, driver_id INT, lplate_num VARCHAR(20), model_year YEAR, vehicle_make VARCHAR(20), vehicle_model VARCHAR(20), passed_qa BOOLEAN, pas_capacity INT, quality_rating INT, PRIMARY KEY (vehicle_id))");
    populate(true); //If true, will populate databse with dummy information for demo or testing purposes. 
};

//Populate the database with dummy accounts.
function populate(tog){
    if(tog){
        addDummyUser();
        addDummyUser();
        addDummyUser();
        addDummyDriver(true);
        newUser("Dt@gmail.com", "abc123", "Bob", "Bobbyson", "1947-2-15");

        //set("users", "fname", "Obama", 1);

        console.log(alasql("SELECT * FROM users"));
        //console.log(retrieve("users", "fname", 1));
        //newDriver("NormalManDan@aol.com", "abc123", "Dan", "Notmehehe");

        //console.log("!", alasql("SELECT * FROM drivers"));
        //console.log("!", alasql("SELECT * FROM users"));
        //console.log(getDriverID("aveillon@hawk.iit.edu"));
        //console.log(getUser(getUserID("Dt@gmail.com")));
        //console.log(getDriver(1));
    }
}