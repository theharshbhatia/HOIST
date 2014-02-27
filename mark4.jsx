/**
 CODE: Convert PSD file design into html and css code and save it to desktop for Mac.
 Version: 0.1(alpha)
 Developer : Hash113 (Harsh Bhatia)
*/

var html_code = "";
var css_code = "";
var g_file_path = "~/Desktop/";
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// Naming Convention for Layers
function beautifyLayerName(layer_name, type, i, j) {
	layer_name = layer_name.split(' ').join('-');

	if (layer_name.length > 20) {
		layer_name = type + i + j;
		// similar layer nomenclature
	}
	return layer_name;
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
//CSS CODE FORMATION

function addCssBasicCode() {
	css_code += "body\n{" + "\n}\n";
	// alert(app.foregroundColor.rgb.hexValue);
}


function getGeneralCss(i, j) {
	var layer = activeDocument.layerSets[i].layers[j]
	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + "\n{\n";
	var boundstring = layer.bounds.toString().split(",");
	var width = boundstring[0] - boundstring[2];
	var height = boundstring[1] - boundstring[3];
	if (width < 0) {
		width = width * (-1);
	}
	if (height < 0) {
		height = height * (-1);
	}
	css_code += "height:" + height + "px;\n";
	css_code += "width:" + width + "px;\n";
	// turning of rectangle not allowed
	css_code += "position:absolute;\n"
	css_code += "left:" + boundstring[0] + ";\n";
	css_code += "top:" + boundstring[1] + "\n";
	css_code += "opacity:" + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	css_code += "}\n";
}

function getTextCss(i, j) {
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	// var text_direction = textitem.direction; 
	// var text_autoLeadingAmount = textitem.autoLeadingAmount;
	// var text_antiAliasMethod = textitem.antiAliasMethod;
	// var text_desiredGlyphScaling = textitem.desiredGlyphScaling;
	// var text_desiredLetterScaling = textitem.desiredLetterScaling;
	// var text_desiredWordScaling = textitem.desiredWordScaling;
	// var text_firstLineIndent = textitem.firstLineIndent;
	// var text_hangingPunctuation = textitem.hangingPunctuation;
	// var text_hyphenateAfterFirst = textitem.hyphenateAfterFirst;
	// var text_hyphenateBeforeLast = textitem.hyphenateBeforeLast;
	// var text_hyphenateCapitalWords = textitem.hyphenateCapitalWords;
	// var text_hyphenateWordsLongerThan = textitem.hyphenateWordsLongerThan;
	// var text_hyphenation = textitem.hyphenation;
	// var text_hyphenationZone = textitem.hyphenationZone;
	// var text_hyphenLimit = textitem.hyphenLimit;
	// var text_leftIndent = textitem.leftIndent;
	// var text_maximumGlyphScaling = textitem.maximumGlyphScaling;
	// var text_maximumLetterScaling = textitem.maximumLetterScaling;
	// var text_maximumWordScaling = textitem.maximumWordScaling;
	// var text_minimumGlyphScaling = textitem.minimumGlyphScaling;
	// var text_minimumLetterScaling = textitem.minimumLetterScaling;
	// var text_minimumWordScaling = textitem.minimumWordScaling;
	// var text_parent = textitem.parent;
	// var text_rightIndent = textitem.rightIndent;
	// alert(text_rightIndent);
	// var text_spaceAfter = textitem.spaceAfter;
	// var text_spaceBefore = textitem.spaceBefore;
	// var text_typename = textitem.typename;
	// var text_textComposer = textitem.textComposer;
	// var text_warpBend = textitem.warpBend;
	// var text_warpDirection = textitem.warpDirection;
	// var text_warpHorizontalDistortion = textitem.warpHorizontalDistortion;
	// var text_warpStyle = textitem.warpStyle;
	// var text_warpVerticalDistortion = textitem.warpVerticalDistortion;

	var text_font = textitem.font
	var text_contents = textitem.contents;
	var text_justification = textitem.justification;
	// alert(text_leftIndent); both are zero so no addition.
	//adding css style
	// alert(textitem.size);
	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + "\n{\n";
	css_code += "margin:0;\n"

	var text_position = textitem.position;
	var text_pos_x = text_position[0].value.toFixed(0);
	var text_pos_y = text_position[1].value.toFixed(0);
	css_code += "position: absolute;\n" + "left:" + text_pos_x + "px;\ntop: " + text_pos_y + "px;\n";

	if (textitem.color.rgb.hexValue) {
		css_code += "color: #" + textitem.color.rgb.hexValue + ";\n";
	}
	css_code += "opacity: " + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";

	css_code += "text-align: " + text_justification.toString().split(".")[1] + ";\n";


	if (text_kind = "TextType.PARAGRAPHTEXT") {
		css_code += "height: " + textitem.height.as("pixel") + "px;\n"
		css_code += "width: " + textitem.width.as("pixel") + "px;\n"
		// alert(textitem.height);
	}

	if (textitem.font) {
		css_code += "font-family:" + textitem.font + ";\n"; //for now else non-webfonts are still an issue.
	}

	if (textitem.size) {
		css_code += "font-size:" + textitem.size.as("pixel") + "px;\n"; //font size in pt to be converted into pixels	
		// css_code+="line-height:"+textitem.size.as("pixel")+"px\n";
	}

	css_code += "}\n";
}

// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// HTML CODE FORMATION
function addBeforeBodyHtml() {
	html_code += "<html>\n<head>";
	var Document_name = app.activeDocument.name;
	html_code += "<title>\n" + Document_name.substring(0, Document_name.length - 4) + '\n</title>\n<link rel="stylesheet" type="text/css" href="css/style.css">\n</head>';
	html_code += "<body>";
}

function addDivTag(div_name) {
	html_code += '<div class=" ' + div_name + '">\n'; //layername
}

function addImageTag(image_source, layername) {
	html_code += '<img src="' + image_source + '"class="' + layername + '/>\n';
}


function addDivCloseTag() {
	html_code += "</div>"
}

function addPageCloseTag() {
	html_code += "</body></html>";
}

function layerSetsDivision() {
	var layer_array = [];
	numoflayerset = activeDocument.layerSets.length;
	// var i=0;
	for (var i = 0; i < numoflayerset; i++) {
		div_name = activeDocument.layerSets[i].name;
		addDivTag(div_name);
		inside_layer_numbers = activeDocument.layerSets[i].layers.length;
		// alert(inside_layer);
		for (var j = 0; j < inside_layer_numbers; j++) {
			layer_name = activeDocument.layerSets[i].layers[j].name;
			layer_kind = activeDocument.layerSets[i].layers[j].kind;
			switch (layer_kind) {
				case LayerKind.TEXT:
					addTextLayerCode(i, j);
					break;

				case LayerKind.SOLIDFILL:
					addSoldfillLayerCode(i, j);
					break;

				case LayerKind.NORMAL:
					addNormalLayerCode(i, j);
					break;
					}
		}
		addDivCloseTag();
	}
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------

function addSoldfillLayerCode(i, j) {
	html_code += '<div class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "solid", i, j) + '">';
	getGeneralCss(i, j);

}

function addTextLayerCode(i, j) {
	html_code += '<p class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</p>\n";
	getTextCss(i, j);
	// alert(activeDocument.layerSets[i].layers[j].textItem.font);
	//alert(j);
}

function addNormalLayerCode(i, j) {
	html_code += '<img class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "normal", i, j) + '"/>\n';
	getImageCss(i, j);
}
//
/*
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


/*
LayerSet_properties(0);

function LayerSet_properties(Layer_Number)
{
	var LayerSet = activeDocument.layerSets[Layer_Number];

	var LayerSet_allLocked = LayerSet.allLocked;
	var LayerSet_artLayers = LayerSet.artLayers;
	var LayerSet_blendMode = LayerSet.blendMode; 
	var LayerSet_bounds = LayerSet.bounds ;
	var LayerSet_enabledChannels = LayerSet.enabledChannels;
	var LayerSet_layers = LayerSet.layers;
	var LayerSet_layerSets = LayerSet.layerSets;
	var LayerSet_linkedLayers = LayerSet.linkedLayers ;
	var LayerSet_name = LayerSet.name;
	var LayerSet_opacity = LayerSet.opacity; 
	var LayerSet_parent = LayerSet.parent;
	var LayerSet_tyename = LayerSet.typename;
	var LayerSet_visible = LayerSet.visible;
}
*/

/*----------------------function call for LayerSets property fetching --------------------------*/
/*
LayerSet_properties();
function LayerSet_properties()
{
	var LayerSets = activeDocument.layerSets;
	var LayerSets_lenght = LayerSets.length; //No of layer groups present in the ps document
	var LayerSets_typename = LayerSets.typename;
	var LayerSets_parent = LayerSets.parent;
}
*/

// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// Main Function 
function main() {
	addBeforeBodyHtml();
	addCssBasicCode();
	layerSetsDivision();
	addPageCloseTag();
	// alert("thanking you for using PS2WEB!!");
	alert(css_code);
	alert(html_code);
	
	//Complete file creation code
	createFolders();
	createFile("css/style.css", css_code);
	createFile("index.html", html_code);

}

main();

// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// File and Folder Creation Code
// Mac Specified Code 
function createFolders() {
	var folder_name = "PS2WEB";
	var main_folder = new Folder("~/Desktop/" + folder_name);
	main_folder.create();
	var css_folder = new Folder("~/Desktop/" + folder_name + "/css");
	var images_folder = new Folder("~/Desktop/" + folder_name + "/images");
	css_folder.create();
	images_folder.create();
}


function createFile(file_name, content) {
	var g_file_path = "~/Desktop/PS2WEB/" + file_name;
	var write_file = File(g_file_path);

	if (!write_file.exists) {
		write_file = new File(g_file_path);
	} else {
		var res = confirm("File with same name already exists. overwrite it", true, "TITLE");
		if (res !== true) {
			return;
		}
	}

	if (write_file !== '') {
		var out = write_file.open('w', undefined, undefined);
		write_file.encoding = "UTF-8";
		write_file.lineFeed = "Unix";
		// txtFile.lineFeed = "Windows";
		// txtFile.lineFeed = "Macintosh";
	}
	if (out !== false) {
		write_file.write(content);
		write_file.close();
	}


}