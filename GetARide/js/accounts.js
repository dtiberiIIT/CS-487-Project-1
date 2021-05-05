window.onload = function() {
    load(); //Load database from localstorage.
}

/*
Performs rider login. 
If login is successful, the email and password will be entered in localStorage as rider_email and rider_pass
TODO: Proceed to next page in app.
-Dan Tiberi
*/
function riderLogin(){
    var form = document.getElementById('loginForm');

    //Check if required fields are filled
    requiredFieldsFilled = true;
    for(var i=0; i < form.elements.length; i++) {
        if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            requiredFieldsFilled = false;
        }
    }

    if(requiredFieldsFilled){
        //Check credentials.
        var inputs = form.elements;   
        var email = inputs["email"].value;
        email = email.toLowerCase();
        var pass = inputs["password"].value;

        let user = getUser(getUserID(email));
        if(user != -1 && getUser(getUserID(email)).password == pass) {//If user exists with correct password
            //User exists, store info into local storage.
            window.localStorage.setItem('rider_email', user.email);
            window.localStorage.setItem('rider_pass', user.password);

            //Example of how to access info:
            //console.log(window.localStorage.getItem('rider_email'), window.localStorage.getItem('rider_pass'));

            //TODO: PROCEED TO NEXT PAGE
            window.open("RiderMainPage.html");
        }
        else {
            alert("User does not exist or the password is incorrect.");
            //form.clear(); //Clears form fields.
        }
    }
}

/*
Performs driver login. 
If login is successful, the email and password will be entered in localStorage as driver_email and driver_pass
TODO: Proceed to next page in app.
-Dan Tiberi
*/
function DriverLogin(){
    var form = document.getElementById('loginForm');

    //Check if required fields are filled
    requiredFieldsFilled = true;
    for(var i=0; i < form.elements.length; i++) {
        if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            requiredFieldsFilled = false;
        }
    }

    if(requiredFieldsFilled){
        //Check credentials.
        var inputs = form.elements;   
        var email = inputs["email"].value;
        var pass = inputs["password"].value;

        email = email.toLowerCase();

        let user = getDriver(getDriverID(email));
        if(user != -1 && getDriver(getDriverID(email)).password == pass) {//If user exists with correct password
            //User exists, store info into local storage.
            window.localStorage.setItem('driver_email', user.email);
            window.localStorage.setItem('driver_pass', user.password);

            //console.log(window.localStorage.getItem('driver_email'), window.localStorage.getItem('driver_pass'));

            //TODO: PROCEED TO NEXT PAGE
            window.open("DriverMainPage.html");
        }
        else {
            alert("User does not exist or the password is incorrect.");
        }
    }
}

/*
Captures changes in settings from RiderProfile.html and stores them in the DB.
-Dan Tiberi
*/
function captureRiderProfileSettings(){
    var form = document.getElementById('riderSettings');
    var inputs = form.elements;   
    var email = inputs["rs_email"].value;
    var phone = inputs["rs_phone"].value;
    var fname = inputs["rs_fname"].value;
    var lname = inputs["rs_lname"].value;

    let id = getUserID(window.localStorage.getItem('rider_email'))
    email = email.toLowerCase();
    let user = getUser(id);

    if(user != -1 && getUser(id).password == window.localStorage.getItem('rider_pass')) {//If user exists with correct password

        if(email.length!=0 && String(email).includes("@") && String(email).includes(".")){
            set("users", "email", email, id);
            window.localStorage.setItem('rider_email', email);
        }

        if(phone.length!=0){
            set("users", "phone_number", phone, id);

        }
        
        if(fname.length!=0){
            set("users", "fname", fname, id);
        }

        if(lname.length!=0){
            set("users", "lname", lname, id);
        }
        
        window.open("RiderMainPage.html","_self");
        return false;
    }
    else {
        alert("Unauthorized Access");
    }
}

/*
Generates alert to inform user of invalid input. Meant for general purpose.
-Dan Tiberi
*/
function alertInvalid(s){
    alert("Invalid Input: " + s);
}