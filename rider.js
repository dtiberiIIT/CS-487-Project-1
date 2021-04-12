console.log("hello");


mapboxgl.accessToken = 
    'pk.eyJ1IjoiNDg3Z3JvdXAxIiwiYSI6ImNrbjg1MnU5bjB1bDEyeHA5anRvenkwaHUifQ.mk3hzTJa6-jD7mxD8xxDPQ';
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy:true})

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
        profile: 'mapbox/cycling'
      });
      
      
    map.addControl(directions, 'top-left');
}



function myfunction()
{
    window.open("rider.html");   
    console.log("salam");
}