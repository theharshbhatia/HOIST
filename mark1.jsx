//Photoshop information retrival code

//Document information
var Document_Name = app.documents[0]; //later the title tag of webpage
var Document_Length=app.activeDocument.height;
var Document_Width=app.activeDocument.width;
var Document_Path=app.activeDocument.fullName; //full path of the ps document
//alert(activeDocument.info.author)
//---------------------------------------------------------

// Layergroup Information
var LayerSets_Numbers =activeDocument.layerSets.length; //No of layer groups present in the ps document
//alert(activeDocument.layerSets[0].artLayers.length); //length of a particular layerset

//---------------------------------------------------------
//Layer Information
var Independent_Layer_Numbers = app.activeDocument.layers.length // No of layers independent in document (including numbers of free layers n groups)

//var myLayer = activeDocument.layerSets[0].artLayers[0]; //first layer of first group
// alert(activeDocument.layers[0]); //Name of first layer in the document


//alert(layerRef = app.activeDocument.artLayers[0].kind); //property of a layer

//Listing all layers
var Layers = new Array();

for (var i=0;i<3;i++)
{
Layers[i] = activeDocument.layers[i].name;
// alert(Layers[i]);	
}


for (var j=0; j<18;j++)
{
	if(activeDocument.layers[j].kind)
	{
		if (activeDocument.layers[j].kind=="LayerKind.TEXT")
		{
			alert("yaa i got a text field");

		}
		
	}
	else
	{
		alert("layerset");
		
	}
}

//alert(Layers);
//alert(myLayer.name);
