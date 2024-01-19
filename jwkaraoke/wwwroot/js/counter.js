var aud
var inputcomp

window.test = function () {
    alert("test de alert en cours");
}
window.preparejscode = function () {
   
    aud = document.getElementById('videoplayer');
    aud.addEventListener("timeupdate", myFunction);
   
    
    
    inputcomp = document.getElementById('inputfile');
    inputcomp.addEventListener("change", handleFiles, false);
    
}
window.changesource = function (qsrc) {
    //alert("dans change source");
   
    aud.src = qsrc;
    console.log(aud.clientWidth);
    
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
    
    DotNet.invokeMethod('jwkaraoke', 'statictimechanged', aud.currentTime);
    
    
}



function handleFiles() {
    
    const fileList = this.files; /* now you can work with the file list */

    var url = window.URL.createObjectURL(fileList[0]);
    
    

    DotNet.invokeMethod('jwkaraoke', 'xxx', url, fileList[0].name);
}


window.playerclientwidth = function () {

    return aud.clientWidth;
    
}

window.playerclientheight = function () {

    return aud.clientHeight;

}

window.currenttime = function (d) {
    aud.currentTime = d;
}

window.play = function () {
    aud.play();
}

window.pause = function () {
    aud.pause();
}


