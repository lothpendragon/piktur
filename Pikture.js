var Picture = function(name, height, width, date, location ){
this.name = name;
this.height = height;
this.width = width;
this.date = date;
this.location = location;
}
var pictures = [];
Picture.prototype.SetPik = function(){
    var name = document.getElementById("name");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var w = document.getElementById("Width").value;
    var h = document.getElementById("Height").value;
    var p =  new Picture(name, h, w);
    pictures.push(p);
    c.width = w;
    c.height = h;
    console.log("width", w);
    console.log("height", h);
};
var geo;
function initGoogle(){
    geo = new google.maps.Geocoder();
};
function getLocation(c){
    var d = document.getElementById("Piktures");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPos);
    }else{
      d.innerHTML = "Location is not supported by this browser.";
    }
};

function showPos(pos) {
   // d.innerHTML = "layitude: "+ pos.coords.latitude +"<br>Longitude: " + pos.coords.longitude;
    console.log("layitude: "+ pos.coords.latitude +"<br>Longitude: " + pos.coords.longitude);
};

function SetState(state) {
    var InsertName = document.getElementById("Name");
    var WidthBox = document.getElementById("Width");
    var HeightBox = document.getElementById("Height");
    var SaveAsButton = document.getElementById("new");
    var SaveButton = document.getElementById("save");
    var state;

    switch (state) {
        case 0:
            InsertName.style.visibility = "visible";
            WidthBox.style.visibility = "visible";
            HeightBox.style.visibility = "visible";
            SaveButton.style.visibility = "hidden";
            SaveAsButton.textContent ="Create";
            break;
        case 1:
            InsertName.style.visibility = "hidden";
            WidthBox.style.visibility = "hidden";
            HeightBox.style.visibility = "hidden";
            SaveButton.style.visibility = "visible";
            SaveAsButton.textContent ="Save as";
            break;

    }

};

window.onload = function() {
    initGoogle();
    console.log("loaded");
    var newButton = document.getElementById("new");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    c.style.visibility ="hidden";
    SetState(0);
    newButton.onclick = function(){
        c.width = document.getElementById("Width").value;
        c.height = document.getElementById("Height").value;
        c.style.visibility ="visible";
        ctx.fillStyle= "#FFFFFF";
        ctx.fillRect(0, 0, c.width, c.height);
        SetState(1);
        console.log ("button pressed", c.width, c.height);
        getLocation(c);
    };


};
