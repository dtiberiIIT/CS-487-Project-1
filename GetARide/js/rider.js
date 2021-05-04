console.log("hello");


mapboxgl.accessToken = 
    'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ';

function run() {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy:true})
}
function successLocation(position){
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
    long = position.coords.longitude;
    lat = position.coords.latitude;
}   
function errorLocation(){
    setupMap([-87.62,41.88])
}

function successLocation2(position){
    console.log(position)
    long = position.coords.longitude;
    lat = position.coords.latitude;
}   
function errorLocation2(){
    console.log("error");
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 14
    })

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    var directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ',
        unit: 'metric',
        profile: 'mapbox/driving'
      });
      
      
    map.addControl(directions, 'top-left');

    var geocoder = new MapboxGeocoder({ accessToken: 'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ', types: 'address',  mapboxgl: mapboxgl });



    var form = document.getElementById("rideform");
    var orig = form["orig"].value;
    var dest = form["dest"].value;
    var pu_time = form["pickup_time"].value;
    directions.setOrigin(orig);
    directions.setDestination(dest);
    var curloc= form["ownloc"];
    if (curloc.checked == true){
        navigator.geolocation.getCurrentPosition(function(position) {
        orig_first=position.coords.longitude.toString();
        orig_sec=position.coords.latitude.toString();
        directions.setOrigin([orig_first,orig_sec]);
        const Http2 = new XMLHttpRequest();
        const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/"+dest+".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
        Http2.open("GET", url2);
        Http2.send();
        var ans2;
        Http2.onreadystatechange = (e) => {
            ans2 = JSON.parse(Http2.responseText);
            dest_first=ans2.features[0].center[0].toString();
            dest_sec=ans2.features[0].center[1].toString();
            const Http = new XMLHttpRequest();
            const url="https://api.mapbox.com/directions/v5/mapbox/driving/"+orig_first+","+orig_sec+";"+dest_first+","+dest_sec+"?access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
            Http.open("GET", url);
            Http.send();
    
            Http.onreadystatechange = (e) => {
                var ans = JSON.parse(Http.responseText);
                console.log(ans.routes[0].duration);
                console.log(ans.routes[0].distance);
                var price = ans.routes[0].distance / 1000;
                var tax = price * 0.2;
                console.log(tax);
                newRide(getUserID(window.localStorage.getItem('rider_email')),'-1','-1',price,tax,orig,dest,pu_time,ans.routes[0].duration,'-1','-1');
            }
        }
        }
        ,errorLocation2, { enableHighAccuracy:true});       
    }
    else{
        const Http1 = new XMLHttpRequest();
        const url1="https://api.mapbox.com/geocoding/v5/mapbox.places/"+orig+".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
        Http1.open("GET", url1);
        Http1.send();
        var ans1;
        Http1.onreadystatechange = (e) => {
           ans1 = JSON.parse(Http1.responseText);
           orig_first=ans1.features[0].center[0].toString();
           orig_sec=ans1.features[0].center[1].toString();
       
       
           const Http2 = new XMLHttpRequest();
           const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/"+dest+".json?types=address&access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
           Http2.open("GET", url2);
           Http2.send();
           var ans2;
           Http2.onreadystatechange = (e) => {
               ans2 = JSON.parse(Http2.responseText);
               dest_first=ans2.features[0].center[0].toString();
                dest_sec=ans2.features[0].center[1].toString();
                const Http = new XMLHttpRequest();
                const url="https://api.mapbox.com/directions/v5/mapbox/driving/"+orig_first+","+orig_sec+";"+dest_first+","+dest_sec+"?access_token=pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ";
                Http.open("GET", url);
                Http.send();
    
                Http.onreadystatechange = (e) => {
                    var ans = JSON.parse(Http.responseText);
                    console.log(ans.routes[0].duration);
                    console.log(ans.routes[0].distance);
                    var price = ans.routes[0].distance / 1000;
                    var tax = price * 0.2;
                    console.log(tax);
                    newRide(getUserID(window.localStorage.getItem('rider_email')),'-1','-1',price,tax,orig,dest,pu_time,ans.routes[0].duration,'-1','-1');
                }
         }
           
        }
    }



    
}


