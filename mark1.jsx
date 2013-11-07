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


/*------------------- Finding background layer type-------------------*/
/*
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
*/

/*------------------- Finding layer type and assignment(incomeplete)-------------------*/
/*
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
*/

/*----------------------function call for applicatoin property fetching --------------------------*/
Application_properties();

function Application_properties()
{
// alert(app.backgroundColor);
activeDocument.............................................................................................................................................................45
backgroundColor...........................................................................................................................................................45
build....................................................................................................................................................................................45
colorSettings ...................................................................................................................................................................45
displayDialogs.................................................................................................................................................................45
documents.......................................................................................................................................................................45
fonts....................................................................................................................................................................................45
foregroundColor............................................................................................................................................................45
freeMemory .....................................................................................................................................................................45
locale ..................................................................................................................................................................................46
macintoshFileTypes......................................................................................................................................................46
measurementLog ..........................................................................................................................................................46
name...................................................................................................................................................................................46
notifiers .............................................................................................................................................................................46
notifiersEnabled.............................................................................................................................................................46
path.....................................................................................................................................................................................46
playbackDisplayDialogs ..............................................................................................................................................46
playbackParameters .....................................................................................................................................................46
preferences ......................................................................................................................................................................46
preferencesFolder .........................................................................................................................................................46
recentFiles ........................................................................................................................................................................46
scriptingBuildDate ........................................................................................................................................................46
scriptingVersion .............................................................................................................................................................46
systemInformation........................................................................................................................................................46
typename .........................................................................................................................................................................46
version ...............................................................................................................................................................................47
windowsFileTypes
}




/*------------------- function call for text property fetching -------------------*/
function post_text (layernumber) {

	var current_layer=activeDocument.layers[layernumber]
	/* completed zone
	if (text_kind == "TextType.PARAGRAPHTEXT")
	{
		var text_height = current_layer.textItem.height; //height of the text paragraph section
		var text_width = current_layer.textItem.width;
	}
	var text_autoLeadingAmount = current_layer.textItem.autoLeadingAmount;
	var text_antiAliasMethod = current_layer.textItem.antiAliasMethod;
	var text_color_hexcode = current_layer.textItem.color.rgb.hexValue;
	var text_contents = current_layer.textItem.contents;
	var text_desiredGlyphScaling = current_layer.textItem.desiredGlyphScaling;
	var text_desiredLetterScaling = current_layer.textItem.desiredLetterScaling;
	var text_desiredWordScaling = current_layer.textItem.desiredWordScaling;
	var text_direction = current_layer.textItem.direction;
	var text_firstLineIndent = current_layer.textItem.firstLineIndent;
	var text_font = current_layer.textItem.font;
	var text_hangingPunctuation = current_layer.textItem.hangingPunctuation;
	var text_hyphenateAfterFirst = current_layer.textItem.hyphenateAfterFirst;
	var text_hyphenateBeforeLast = current_layer.textItem.hyphenateBeforeLast;
	var text_hyphenateCapitalWords = current_layer.textItem.hyphenateCapitalWords;
	var text_hyphenateWordsLongerThan = current_layer.textItem.hyphenateWordsLongerThan;
	var text_hyphenation = current_layer.textItem.hyphenation;
	var text_hyphenationZone = current_layer.textItem.hyphenationZone;
	var text_hyphenLimit = current_layer.textItem.hyphenLimit;
	var text_justification = current_layer.textItem.justification;
	var text_kind = current_layer.textItem.kind;
	var text_leftIndent = current_layer.textItem.leftIndent;
	var text_maximumGlyphScaling = current_layer.textItem.maximumGlyphScaling;
	var text_maximumLetterScaling = current_layer.textItem.maximumLetterScaling;
	var text_maximumWordScaling = current_layer.textItem.maximumWordScaling;
	var text_minimumGlyphScaling = current_layer.textItem.minimumGlyphScaling;
	var text_minimumLetterScaling = current_layer.textItem.minimumLetterScaling;
	var text_minimumWordScaling = current_layer.textItem.minimumWordScaling;
	var text_parent = current_layer.textItem.parent;
	var text_position = current_layer.textItem.position;
	var text_rightIndent = current_layer.textItem.rightIndent;
	var text_size = current_layer.textItem.size;
	var text_spaceAfter = current_layer.textItem.spaceAfter;
	var text_spaceBefore = current_layer.textItem.spaceBefore;
	var text_typename = current_layer.textItem.typename;
	var text_textComposer = current_layer.textItem.textComposer;
	var text_warpBend = current_layer.textItem.warpBend;
	var text_warpDirection = current_layer.textItem.warpDirection;
	var text_warpHorizontalDistortion = current_layer.textItem.warpHorizontalDistortion;
	var text_warpStyle = current_layer.textItem.warpStyle;
	var text_warpVerticalDistortion = current_layer.textItem.warpVerticalDistortion;
	*/
	
	/* error zone
		// alert(current_layer.textItem.alternateLigatures);
		// alert(current_layer.textItem.autoKerning);
		// alert(current_layer.textItem.baselineShift);
		// alert(current_layer.textItem.capitalization);
		// alert(current_layer.textItem.fauxItalic);
		// alert(current_layer.textItem.height);
		// alert(current_layer.textItem.horizontalScale);
		// alert(current_layer.textItem.language);
		// alert(current_layer.textItem.leading);
		// alert(current_layer.textItem.ligatures);
		// alert(current_layer.textItem.noBreak);
		// alert(current_layer.textItem.oldStyle);
		// alert(current_layer.textItem.strikeThru);
		// alert(current_layer.textItem.tracking);
		// alert(current_layer.textItem.underline);
		// alert(current_layer.textItem.useAutoLeading);
		// alert(current_layer.textItem.verticalScale);
		// alert(current_layer.textItem.width);
	*/

}

/*------------------- function call for layer property fetching(incomplete) -------------------*/
function layer_property(layernumber)
{
	
	/* incomplete
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
	*/
}
//alert(Layers);
//alert(myLayer.name);