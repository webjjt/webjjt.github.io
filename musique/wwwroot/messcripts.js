window.test = function () { alert("test de alert en cours"); };
window.saveAsFile = function(filename, bytesBase64) {
     window.alert("kkk");
     var link = document.createElement('a');
     link.download = filename;
     link.href = "data:application/octet-stream;" + bytesBase64;
     document.body.appendChild(link); // Needed for Firefox
     link.click();
     document.body.removeChild(link);
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
