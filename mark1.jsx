//Photoshop information retrival code

//Document information
var Document_Name = app.documents[0]; //later the title tag of webpage
var Document_Length=app.activeDocument.height;
var Document_Width=app.activeDocument.width;

// Layergroup Information
var LayerSets_Numbers =activeDocument.layerSets.length; //No of layer groups present in the ps document
//alert(activeDocument.layerSets[0].artLayers.length);//length of a particular layerset

//Layer Information
var Layer_Numbers = app.activeDocument.layers.length // No of layers in document

//var myLayer = activeDocument.layerSets[0].artLayers[0]; //first layer of first group
// alert(activeDocument.layers[0]); //Name of first layer in the document

//Listing all layers

for (var i=0;i<Layer_Numbers;i++)
{
var myLayer = activeDocument.layers[i];
alert(myLayer.name);	
}

//alert(myLayer.name);
