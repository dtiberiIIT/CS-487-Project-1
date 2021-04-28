window.onload = function() {
    load(); //Load database from localstorage.
}

window.onload = function() {
    alasql("ATTACH localStorage DATABASE mdb AS mdb");
    alasql("USE mdb");
    console.log("!", alasql("SELECT * FROM users"));
};

