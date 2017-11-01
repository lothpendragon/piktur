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
    var ctx = c.getContext("2d");
    var w = document.getElementById("Width").value;
    var h = document.getElementById("Height").value;
    var p =  new Picture(name, h, w);
    pictures.push(p);
    getCanvas().width = w;
    getCanvas().height = h;
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
function getCanvas(){
    var c = document.getElementById("canvas");
    return c;
}
function showPos(pos) {
   // d.innerHTML = "layitude: "+ pos.coords.latitude +"<br>Longitude: " + pos.coords.longitude;
    console.log("layitude: "+ pos.coords.latitude +"<br>Longitude: " + pos.coords.longitude);
};

function SetState(state) {
    var WidthBox = document.getElementById("Width");
    var HeightBox = document.getElementById("Height");
    var SaveAsButton = document.getElementById("new");
    var SaveButton = document.getElementById("save");
    var name = document.getElementById("name");
    var picName = document.getElementById("picName");
    var state;

    switch (state) {
        case 0:
            WidthBox.style.visibility = "visible";
            HeightBox.style.visibility = "visible";
            SaveButton.style.visibility = "hidden";
            name.style.visibility ="hidden";
            SaveAsButton.textContent ="Create";
            break;
        case 1:
            WidthBox.style.visibility = "hidden";
            HeightBox.style.visibility = "hidden";
            SaveButton.style.visibility = "visible";
            name.style.visibility ="visible";
            SaveAsButton.textContent ="Save as";
            break;
    }

    SaveAsButton.onclick = function(){
        SaveAsImg(getImgType(),picName);
        console.log("img saved as png");
    }
};
function SaveAsImg(imageType, name){
    var pic= document.createElement('a');
    var c = getCanvas();
    switch(imageType){
        case 0:
            pic.download = name.innerHTML.toString() +".png";
            pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
            pic.click();
           break;
        case 1:
            pic.download = name.innerHTML.toString() +".jpeg";
            pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
            pic.click();
           break;
        case 2:
            pic.download = name.innerHTML.toString() +".tiff";
            pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
            pic.click();
            break;
        case 3:
            pic.download = name.innerHTML.toString() +".gif";
            pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
            pic.click();
            break;
        case 4:
            pic.download = name.innerHTML.toString() +".bmp";
            pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
            pic.click();
            break;
        default:
            alert("invalid, please use selection list");
    }
}
function getImgType(){
    var pic = document.getElementById("SaveAsInput").value;
    switch(pic.toString()){
        case "PNG":
            return 0;
            break;
        case "JEPG":
            return 1;
            break;
        case "TIFF":
            return 2;
            break;
        case "GIF":
            return 3;
        case "BMP":
            return 4;
            break;
    }
}
function Save(name){
    var pic = document.createElement('a');
    pic.download = name.innerHTML.toString() +".png";
    pic.href = getCanvas().toDataURL("image/png").replace("image/png", "image/octet-stream");
    pic.click();
}
window.onload = function() {
    initGoogle();
    console.log("loaded");
    var name = "untitled";
    var nameOfFile = document.getElementById ("picName").innerHTML = name;
    var newButton = document.getElementById("new");
    var c = getCanvas();
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
        getLocation(getCanvas());
    };


};
