console.log("hello");


mapboxgl.accessToken = 
    'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ';

function run() {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy:true})
}
function successLocation(position){
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}   
function errorLocation(){
    setupMap([-87.62,41.88])
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

    var form = document.getElementById("rideform");
    var orig = form["orig"].value;
    var dest = form["dest"].value;
    console.log(orig); 
    directions.setOrigin(orig);
    directions.setDestination(dest);
    console.log(directions.getOrigin.value);
    console.log("oula");
}


