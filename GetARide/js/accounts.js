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
        var pass = inputs["password"].value;

        let user = getUser(getUserID(email));
        if(user != -1) {//If user exists with correct password
            //User exists, store info into local storage.
            window.localStorage.setItem('rider_email', user.email);
            window.localStorage.setItem('rider_pass', user.password);

            //Example of how to access info:
            //console.log(window.localStorage.getItem('rider_email'), window.localStorage.getItem('rider_pass'));

            //TODO: PROCEED TO NEXT PAGE
        }
        else {
            alert("User does not exist or the password is incorrect.");
            form.clear(); //Clears form fields.
        }
    }
}