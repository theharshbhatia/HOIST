//Photoshop information retrival code

//Document information


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









/*----------------------function call for Document property fetching --------------------------*/

Document_properties(0);

function Document_properties(number)
{
	var Document = app.documents[number]; 
	/*
	var Document_activeHistoryBrushSource = Document.activeHistoryBrushSource ;
	var Document_activeHistoryState = Document.activeHistoryState ;
	var Document_activeLayer = Document.activeLayer ;
	var Document_artLayers = Document.artLayers;
	var Document_bitsPerChannel = Document.bitsPerChannel ;
	var Document_channels = Document.channels;
	var Document_colorProfileName = Document.colorProfileName;
	var Document_colorProfileType = Document.colorProfileType;
	var Document_colorSamplers = Document.colorSamplers ;
	var Document_componentChannels = Document.componentChannels;
	var Document_countItems = Document.countItems;
	var Document_fullName = Document.fullName;
	var Document_guides = Document.guides ;
	var Document_height = Document.height;
	var Document_historyStates = Document.historyStates;

	var Document_info = Document.info ;
		var Document_info_author = Document.info.author ;
		var Document_info_authorPosition = Document.info.authorPosition ;
		var Document_info_caption = Document.info.caption;
		var Document_info_captionWriter = Document.info.captionWriter ;
		var Document_info_category = Document.info.category ;
		var Document_info_city = Document.info.city;
		var Document_info_copyrighted = Document.info.copyrighted;
		var Document_info_copyrightNotice = Document.info.copyrightNotice;
		var Document_info_country = Document.info.country ;
		var Document_info_creationDate = Document.info.creationDate;
		var Document_info_credit = Document.info.credit; 
		var Document_info_exif = Document.info.exif;
		var Document_info_headline = Document.info.headline ;
		var Document_info_instructions = Document.info.instructions ;
		var Document_info_jobName = Document.info.jobName;
		var Document_info_keywords = Document.info.keywords;
		var Document_info_ownerUrl = Document.info.ownerUrl;
		var Document_info_parent = Document.info.parent ;
		var Document_info_provinceState = Document.info.provinceState;
		var Document_info_source = Document.info.source;
		var Document_info_supplementalCategories = Document.info.supplementalCategories ;
		var Document_info_title = Document.info.title;
		var Document_info_transmissionReference = Document.info.transmissionReference;
		var Document_info_typename = Document.info.typename;  
		var Document_info_urgency = Document.info.urgency;
		
	var Document_layerComps = Document.layerComps;
	var Document_layers = Document.layers ;
	var Document_layerSets = Document.layerSets;
	var Document_managed = Document.managed;
	var Document_measurementScale = Document.measurementScale ;
	var Document_mode = Document.mode;
	var Document_name = Document.name;
	var Document_parent = Document.parent;
	var Document_path = Document.path;
	var Document_pathItems = Document.pathItems ;
	var Document_pixelAspectRatio = Document.pixelAspectRatio ;
	var Document_printSettings = Document.printSettings;
	var Document_quickMaskMode = Document.quickMaskMode;
	var Document_resolution = Document.resolution;
	var Document_saved = Document.saved ;
	var Document_selection = Document.selection;
	var Document_typename = Document.typename ;
	var Document_width = Document.width ;
	var Document_xmpMetadata = Document.xmpMetadata;
	
	*/
	



	 // error states
	// var Document_ = Document.activeChannels;
	// var Document_ = Document.backgroundLayer;
	// var Document_ = Document.histogram; 
	
	
}


/*----------------------function call for Channels property fetching --------------------------*/
/*
Channel_properties(2);

function Channel_properties(Layer_Number)
{
	var Channel = app.activeDocument.channels[Layer_Number];

	var Channel_histogram = Channel.histogram;
	var Channel_kind = Channel.kind;
	var Channel_name = Channel.name;
	var Channel_parent = Channel.parent;
	var Channel_typename = Channel.typename;
	var Channel_visible = Channel.visible;
	// var Channel_opacity = Channel.opacity; (not when type= component)
	// var Channel_color = Channel.color;

}
*/

/*----------------------function call for ArtLayers property fetching --------------------------*/
/*
ArtLayers_properties(2)

function ArtLayers_properties(Layer_Number)
{
	var ArtLayers = app.activeDocument.artLayers[2];
var ArtLayers_parent= ArtLayers.parent;
var ArtLayers_ = ArtLayers.length; //only if parent is other than doc
var ArtLayers_ = ArtLayers.typename;
}
*/

/*----------------------function call for ArtLayer property fetching --------------------------*/
/*
ArtLayer_properties(2)

function ArtLayer_properties(Layer_Number)
{
	var ArtLayer=app.activeDocument.artLayers[Layer_Number]

	var ArtLayer_allLocked = ArtLayer.allLocked;
	var ArtLayer_blendMode = ArtLayer.blendMode;
	var ArtLayer_bounds = ArtLayer.bounds;
	var ArtLayer_fillOpacity = ArtLayer.fillOpacity;
	var ArtLayer_grouped = ArtLayer.grouped;
	var ArtLayer_isBackgroundLayer = ArtLayer.isBackgroundLayer;
	var ArtLayer_kind = ArtLayer.kind;
	var ArtLayer_layerMaskDensity = ArtLayer.layerMaskDensity;
	var ArtLayer_layerMaskFeather = ArtLayer.layerMaskFeather;
	var ArtLayer_linkedLayers = ArtLayer.linkedLayers;
	var ArtLayer_name = ArtLayer.name;
	var ArtLayer_opacity = ArtLayer.opacity; 
	var ArtLayer_parent = ArtLayer.parent;
	var ArtLayer_pixelsLocked = ArtLayer.pixelsLocked;
	var ArtLayer_positionLocked = ArtLayer.positionLocked;
	var ArtLayer_transparentPixelsLocked = ArtLayer.transparentPixelsLocked;
	var ArtLayer_typename = ArtLayer.typename;
	var ArtLayer_vectorMaskDensity = ArtLayer.vectorMaskDensity;
	var ArtLayer_vectorMaskFeather = ArtLayer.vectorMaskFeather;
	var ArtLayer_visible = ArtLayer.visible;
	var ArtLayer_xmpMetadata = ArtLayer.xmpMetadata;


// alert(ArtLayer.filterMaskDensity );
// alert(ArtLayer.filterMaskFeather);
// alert(ArtLayer.textItem);


}
*/

/*----------------------function call for applicatoin property fetching --------------------------*/
/*
Application_properties();

function Application_properties()
{
var app_activeDocument = app.activeDocument;
var app_backgroundColor = app.backgroundColor;
var app_build = app.build;
var app_colorSettings = app.colorSettings;
var app_displayDialogs = app.displayDialogs;
var app_documents = app.documents;
var app_fonts = app.fonts;
var app_foregroundColor = app.foregroundColor;
var app_freeMemory = app.freeMemory;
var app_locale = app.locale;
var app_macintoshFileTypes = app.macintoshFileTypes;
var app_measurementLog = app.measurementLog ;
var app_name = app.name;
var app_notifiers = app.notifiers;
var app_notifiersEnabled = app.notifiersEnabled;
var app_path = app.path;
var app_playbackDisplayDialogs = app.playbackDisplayDialogs;
var app_playbackParameters = app.playbackParameters ;
var app_preferences = app.preferences ;
var app_preferencesFolder = app.preferencesFolder;
var app_recentFiles = app.recentFiles ;
var app_scriptingBuildDate = app.scriptingBuildDate;
var app_scriptingVersion = app.scriptingVersion ;
var app_systemInformation = app.systemInformation;
var app_typename = app.typename ;
var app_version = app.version ;
var app_windowsFileTypes = app.windowsFileTypes;
}
*/

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
