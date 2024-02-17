var aud
var inputcomp
var inputcompmasque
var inputcolor
var coloredelement

window.test = function () {
    alert("test de alert en cours");
}
window.preparejscode = function () {
   
    aud = document.getElementById('videoplayer');
    aud.addEventListener("timeupdate", myFunction);
   
    
    
    inputcomp = document.getElementById('inputfile');
    inputcomp.addEventListener("change", handleFiles, false);

    inputcompmasque = document.getElementById('masquechoice');
    

    window.addEventListener("resize", resizing);

   

}


window.getoffsetheight = function (id) {
    var e = document.getElementById(id);
    let result;
    if (e) { result = e.offsetHeight; }
    else { result = 0; }
    return result;
}
window.inputcolorinit = function ( c) {
    coloredelement = c;
    inputcolor = document.getElementById('colorpicker');
    inputcolor.addEventListener("change", inputcolorchanged, true);
    inputcolor.click();
}
window.changesource = function (qsrc) {
    //alert("dans change source");
   
    aud.src = qsrc;
    console.log(aud.clientWidth);
    
}


window.clickinputfile = function () {
    inputcomp.click();
}

window.clickinputfilemasque = function () {
    inputcompmasque.click();
}
window.videowidth = function () {
    return aud.videoWidth;
}
window.videoheight = function () {
    return aud.videoHeight;
}

window.getinnerWidth = function () {
    return window.innerWidth;
}
window.getinnerHeight = function () {
    return window.innerHeight;
}

window.getscreenWidth = function () {
    return screen.width;;
}
window.getscreenHeight = function () {
    return screen.height;
}
window.downloadFileFromStream = async (fileName, contentStreamReference) => {
   
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;

    if (fileName) {
        anchorElement.download = fileName;
    }

    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
}

function myFunction() {
    
    DotNet.invokeMethodAsync('jwkaraoke', 'statictimechanged', aud.currentTime);
    
    
}



function handleFiles() {
    
    const fileList = this.files; /* now you can work with the file list */

    var url = window.URL.createObjectURL(fileList[0]);
    
    

    DotNet.invokeMethod('jwkaraoke', 'xxx', url, fileList[0].name);
}

function resizing() {
    DotNet.invokeMethod('jwkaraoke', 'resizevideo');
  
}

window.resizeplayer = function() {
    resizing();
}
window.playerclientwidth = function () {

    return aud.clientWidth;
    
}

window.playerclientheight = function () {

    return aud.clientHeight;

}

window.playersetcurrenttime = function (d) {
    aud.currentTime = d;
}

window.playergetcurrenttime = function () {
    return aud.currentTime;
}

window.play = function () {
    aud.play();
}

window.pause = function () {
    aud.pause();
}

window.paused = function () {
    return aud.paused;
}

window.triggerClick = function (elt) {
   elt.click();
}

window.setwidth = function (e,w) {
    e.width = w;
}

window.setheight = function (e, h) {
    e.height = h;
}

function inputcolorchanged(event) {
    DotNet.invokeMethod("jwkaraoke", "inputcolorchanged", event.target.value, coloredelement);

}