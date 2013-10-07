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
//finding the background layer

function background_layer(length)
{
	for(var k=0;k<length;k++)
	{
		if(current_layer.isBackgroundLayer)
		{
			return layernumber;
		}
	}
}

//Listing all layers
var Layers = new Array();

for (var i=0;i<3;i++)
{
Layers[i] = activeDocument.layers[i].name;
// alert(Layers[i]);	
}

//finding ungrouped layers and sorting
for (var j=0; j<18;j++)
{
	if(activeDocument.layers[j].kind)
	{
		if (activeDocument.layers[j].kind=="LayerKind.TEXT")
		{
			post_text(j); //fucntion for processing if text layer is found.
			
		}
		
	}
	else
	{
		//alert("layerset");

	}
}

//function call for text processing
function post_text (layernumber) {
	var current_layer=activeDocument.layers[layernumber]
	
	var text_string = current_layer.textItem.contents; //get text contents
	var text_font = current_layer.textItem.font;
	var text_hyphenation = current_layer.textItem.hyphenation;
	
	var text_kind = current_layer.textItem.kind;
	if (text_kind == "TextType.PARAGRAPHTEXT")
	{
		var text_height = current_layer.textItem.height; //height of the text paragraph section
		var text_width = current_layer.textItem.width;
	}

	var text_color_hexcode = current_layer.textItem.color.rgb.hexValue;
	var text_direction = current_layer.textItem.direction;
	var text_indent_left = current_layer.textItem.leftIndent;
	var text_letterscalling = current_layer.textItem.maximumLetterScaling;
	var text_wordscalling = current_layer.textItem.maximumWordScaling;
	var text_parent = current_layer.textItem.parent;
	var text_position = current_layer.textItem.position;
	var text_indent_right = current_layer.textItem.rightIndent;
	var text_size = current_layer.textItem.size;
	var text_opacity = current_layer.opacity;
	// underline with vertical only

	alert(current_layer.grouped);
	// body...
}



function layer_property(layernumber)
{
	var current_layer = activeDocument.layers[layernumber];

	var layer_visiblitly = current_layer.visible;
	var layer_opacity = current_layer.opacity;
	var layer_kind = current_layer.kind;
	var layer_fillopacity = current_layer.fillOpacity;
	var layer_bounds = current_layer.bounds;
	var layer_mask_density = current_layer.layerMaskDensity;
	var layer_linkedto = current_layer.linkedLayers;
	var layer_typename = current_layer.typename;
	var layer_group_beneath = current_layer.grouped; // layer is grouped to beneath layer
}
//alert(Layers);
//alert(myLayer.name);
