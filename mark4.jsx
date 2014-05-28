// CODE: Convert PSD file design into html and css code (MAC version)
// Version: 0.1(alpha)
// by Harsh Bhatia

// Included Files and libs
///@includepath "~/JSON Action Manager/"
//@include "JSON Action Manager/jamEngine.jsxinc"
//@include "JSON Action Manager/jamActions.jsxinc"
//@include "JSON Action Manager/jamHelpers.jsxinc"
//@include "JSON Action Manager/jamJSON.jsxinc"
//@include "JSON Action Manager/jamLayers.jsxinc"
//@include "JSON Action Manager/jamShapes.jsxinc"
//@include "JSON Action Manager/jamStyles.jsxinc"
//@include "JSON Action Manager/jamText.jsxinc"
//@include "JSON Action Manager/jamUtils.jsxinc"

var css_code = ""; //css code variable string
var html_code = ""; //html code variable string 
var total_layer_number = 0;
// file required variables
prefs = new Object();
prefs.fileType = "";
prefs.fileQuality = 12;
prefs.filePath = app.activeDocument.path;
prefs.count = 0;

// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------

function beautifyLayerName(layer_name, type, i, j) {
	// Replacing spaces with hyphens for css conventions
	layer_name = layer_name.split(' ').join('-');

	if (layer_name.length > 20) {
		// layer name is equal to type + layer number for layer name greater than 20
		layer_name = type + (total_layer_number - i + j);
	}
	return layer_name;
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
//CSS CODE FORMATION
function addCssBasicCode() {
	// adding body element to css_code
	css_code += "body\n{\nwidth:100%;" + "\n}\n";
}


function getGeneralCss(i, j) {
	// adding generall css to css_code string
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
	css_code += "position:absolute;\n"
	css_code += "left:" + boundstring[0].split(' ').join('') + ";\n";
	css_code += "top:" + boundstring[1].split(' ').join('') + ";\n";
	css_code += "opacity:" + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	css_code += "z-index:" + (i + j) + ";\n";
	addLayerStyle(i, j);
	css_code += "}\n";
}

function getTextCss(i, j) {
	// adding text styles to css_code
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

	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + "\n{\n";
	css_code += "margin:0;\n"

	var text_position = textitem.position;
	var text_pos_x = text_position[0].value.toFixed(0);
	var text_pos_y = text_position[1].value.toFixed(0);
	css_code += "position: absolute;\n" + "left:" + text_pos_x + "px;\ntop:" + text_pos_y + "px;\n";

	if (textitem.color.rgb.hexValue) {
		css_code += "color: #" + textitem.color.rgb.hexValue + ";\n";
	}
	css_code += "opacity: " + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";

	css_code += "text-align:  " + text_justification.toString().split(".")[1].toLowerCase() + ";\n";

	if (text_kind == "TextType.PARAGRAPHTEXT") {

		css_code += "height: " + textitem.height.as("pixel") + "px;\n";
		css_code += "width: " + textitem.width.as("pixel") + "px;\n";

	}

	if (textitem.font) {
		css_code += "font-family: " + textitem.font + ";\n"; //TODO: now else non-webfonts are still an issue.
	}

	if (textitem.size) {
		css_code += "font-size: " + textitem.size.as("pixel") + "px;\n"; //TODO:font size in pt to be converted into pixels	
		// css_code+="line-height:"+textitem.size.as("pixel")+"px\n";
	}
	css_code += "z-index:" + (total_layer_number - (i + j)) + ";\n";
	addLayerStyle(i, j);
	css_code += "}\n";
}

function addDivCss(div_name, i) {
	//adding div style to css_code
	if ((activeDocument.layerSets[i].opacity / 100).toFixed(1) != 1.0) {
		css_code += "." + beautifyLayerName(div_name, "div", i, 0) + "\n{\n";
		css_code += "opacity:" + (activeDocument.layerSets[i].opacity / 100).toFixed(1) + ";\n";
		// add div shadow
		css_code += "}\n";
	}


}

function addLayerStyle(i, j) {
	var layerStyleObj = jamStyles.getLayerStyle();
	if (layerStyleObj) {
		if ("layerEffects" in layerStyleObj) {
			var layerEffectsObj = layerStyleObj["layerEffects"];
			if ("dropShadow" in layerEffectsObj) {
				var dropShadowObj = layerEffectsObj["dropShadow"];
				var dropShadowDistance = dropShadowObj["distance"];
				var dropShadowBlur = dropShadowObj["blur"];
				var dropShadowOpacity = dropShadowObj["opacity"];
				var dropShadowAngle = dropShadowObj["localLightingAngle"];
				var dropShadowColor = dropShadowObj["color"];
				var dsColor = "rgba(" + dropShadowColor.red + "," + dropShadowColor.green + "," + dropShadowColor.blue + "," + dropShadowOpacity / 100 + ")";
				var dropShadowSpread = dropShadowObj["chokeMatte"];
				//Converting drop shadow to box-shadow  / text-shadow
				var angle = (180 - dropShadowAngle) * Math.PI / 180;
				var h_shadow = Math.round((Math.cos(angle) * dropShadowDistance));
				var v_shadow = Math.round((Math.sin(angle) * dropShadowDistance));
				var css_spread = dropShadowDistance * dropShadowSpread / 100;
				var css_blur = dropShadowDistance - css_spread;
				if (activeDocument.layerSets[i].layers[j].kind == LayerKind.TEXT) {
					css_code += "text-shadow:" + h_shadow + 'px ' + v_shadow + 'px ' + css_blur + 'px ' + dsColor + ";\n";
				} else {
					css_code += "box-shadow:" + h_shadow + 'px ' + v_shadow + 'px ' + css_blur + 'px ' + css_spread + 'px ' + dsColor + ";\n";
				}
			} else {}
		} else {}
	}
}
// ----------------------------------------------------------------------------------------------------------------------------------
function downloadImage(r, k) {
	// Downloading image from layer
	var layer_array = [];
	numoflayerset = activeDocument.layerSets.length;
	hideAllLayers();
	for (var i = 0; i < numoflayerset; i++) {
		div_name = activeDocument.layerSets[i].name;
		inside_layer_numbers = activeDocument.layerSets[i].layers.length;
		for (var j = 0; j < inside_layer_numbers; j++) {
			if (i == r && j == k) {
				activeDocument.layerSets[i].visible = true;
				activeDocument.layerSets[i].layers[j].visible = true;
				saveImage(activeDocument.layerSets[i].layers[j].name)
			}
		}
	}
}

function hideAllLayers() {
	// hide all layers to get one layer
	for (var i = 0; i < numoflayerset; i++) {
		activeDocument.layerSets[i].visible = false;
		inside_layer_numbers = activeDocument.layerSets[i].layers.length;
		for (var j = 0; j < inside_layer_numbers; j++) {
			activeDocument.layerSets[i].layers[j].visible = false;
		}
	}
}

function saveImage(layerName) {
	// Saving layer into image folder
	var fileName = layerName.replace(/[\\\*\/\?:"\|<> ]/g, '');
	if (fileName.length == 0) fileName = "autoname";
	var handle = getUniqueName(prefs.filePath + "/PS2WEB/images/" + fileName);
	prefs.count++;
	SavePNG24(handle);

}

function getUniqueName(fileroot) {
	// form a full file name
	// if the file name exists, a numeric suffix will be added to disambiguate
	var filename = fileroot;
	for (var i = 1; i < 100; i++) {
		var handle = File(filename + "." + prefs.fileType);
		if (handle.exists) {
			filename = fileroot + "-" + padder(i, 3);
		} else {
			return handle;
		}
	}
}

function padder(input, padLength) {
	// pad the input with zeroes up to indicated length
	var result = (new Array(padLength + 1 - input.toString().length)).join('0') + input;
	return result;
}


function SavePNG24(saveFile) {
	pngSaveOptions = new PNGSaveOptions();
	try {
		app.activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
	} catch (err) {
		txt = "There was an error on this page.\n\n";
		txt += "Error description: " + err.message + "\n\n";
		txt += "Click OK to continue.\n\n";
		alert(txt);
	}
}


// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// HTML CODE FORMATION
/*



	
	*/
function addBeforeBodyHtml() {
	html_code += "<!doctype html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'>\n";
	var Document_name = app.activeDocument.name;
	html_code += "<title>\n" + Document_name.substring(0, Document_name.length - 4) + '\n</title>\n<link rel="stylesheet" type="text/css" href="css/style.css">\n</head>';
	html_code += "<body>";
}

function addDivTag(div_name, i) {
	html_code += '<div class=" ' + beautifyLayerName(div_name, i, 0) + '">\n'; //layername
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
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
function layerSetsDivision() {
	// Layer division by type
	var layer_array = [];
	numoflayerset = activeDocument.layerSets.length;
	// var i=0;
	total_layer_number += numoflayerset;

	for (var i = 0; i < numoflayerset; i++) {
		layerSet_name = activeDocument.layerSets[i].name;

		if (layerSet_name == "nav" || layerSet_name == "navbar") {
			// html_code += '<nav class=" ' + layer_name + '">\n'; 
			// TODO: find a way to close this section and add css on basic html tag
		}

		addDivTag(layerSet_name, i);
		addDivCss(layerSet_name, i);

		inside_layer_numbers = activeDocument.layerSets[i].layers.length;
		total_layer_number += inside_layer_numbers;
		for (var j = 0; j < inside_layer_numbers; j++) {
			layer_name = activeDocument.layerSets[i].layers[j].name;
			layer_kind = activeDocument.layerSets[i].layers[j].kind;
			app.activeDocument.activeLayer = activeDocument.layerSets[i].layers[j];
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
// Specific Layer Type Code Generation
function addSoldfillLayerCode(i, j) {
	html_code += '<div class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "solid", i, j) + '">';
	getGeneralCss(i, j);

}

function addTextLayerCode(i, j) {
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	var hsize = textitem.size.as("pixel");
	if (text_kind == "TextType.PARAGRAPHTEXT") {
		html_code += '<p class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</p>\n";
	} else {
		// addHTag(hsize, i, j);
		// TODO: add htag
	}
	getTextCss(i, j);
}
/*

function addHTag(foo, i, j) {
	switch (true) { // invariant TRUE instead of variable foo
		case foo >= 0 && foo <= 12:
			alert('h6');
			break;
		case foo > 12 && foo <= 14:
			alert("h5");
			break;
		case foo > 14 && foo = < 16:
			alert("h4");
			break;
		case foo > 16 && foo = < 20:
			alert("h3");
			break;
		case foo > 20 && foo <= 24:
			alert("h2");
			break;
		case foo > 24 && foo <= 32:
			alert("h1");
			break;
		default:
			alert('no tag will be added due to unknown size');
	}
}
*/

function addNormalLayerCode(i, j) {
	html_code += '<img class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "normal", i, j) + '"/>\n';
	getGeneralCss(i, j);

	// getImageCss(i, j);
	// downloadImage(i, j);
}

function allFonts() {
	// fetch all fonts installed in the system
	var fontsInstalled = app.fonts;
	alert(fontsInstalled[0]);
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// File and Folder Creation Code
// Mac Specified Code 
function createFolders() {
	// creating all folders
	var folder_name = "PS2WEB";
	var main_folder = new Folder(prefs.filePath + "/" + folder_name);
	main_folder.create();
	var css_folder = new Folder(prefs.filePath + "/" + folder_name + "/css");
	var images_folder = new Folder(prefs.filePath + "/" + folder_name + "/images");
	css_folder.create();
	images_folder.create();
}

function createFile(file_name, content) {
	// Creating a file
	var g_file_path = prefs.filePath + "/PS2WEB/" + file_name;
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
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// Cleaning stuff

function endNotes() {
	alert("Thank you for using PS2WEB!! \
		Please check http://photoshopetiquette.com/ for better results with psw");

}

function faqs() {
	// alert("FAQ's");
	// write a text file about the faqs.
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------

function main() {
	// Main function 
	removeEmptyThings();
	docSizeAdjust();
	addBeforeBodyHtml();
	addCssBasicCode();
	layerSetsDivision();
	addPageCloseTag();
	faqs();
	alert(css_code);
	alert(html_code);
	// // allFonts(); // fetch all fonts installed in the system
	createFolders(); //create folders
	createFile("css/style.css", css_code); //Create css file
	createFile("index.html", html_code); //create html file
	endNotes(); //End alert notes and recommendation
}

function wrapper() {
	function showError(err) {
		alert(err + ': on line ' + err.line, 'Script Error', true);
	}

	try {
		// suspend history for CS3 + versions
		if (parseInt(version, 10) >= 10) {
			activeDocument.suspendHistory('Save Layers', 'main()');
		} else {
			main();
		}
	} catch (e) {
		// report errors unless the user cancelled
		if (e.number != 8007) showError(e);
	}
}
wrapper();

function okDocument() {
	// checking document validity
	if (!documents.length) return false;
	var thisDoc = app.activeDocument;
	var fileExt = decodeURI(thisDoc.name).replace(/^.*\./, '');
	return fileExt.toLowerCase() == 'psd'
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
function removeEmptyThings() {
	// clearing empty layer and layersets
	// TODO: Ask for clearing empty layer
	if (app.documents.length > 0) {
		var startRulerUnits = app.preferences.rulerUnits;
		app.preferences.rulerUnits = Units.PIXELS;
		removeAllEmptyArtLayers(app.activeDocument);
		removeAllEmptyLayerSets(app.activeDocument);
		app.preferences.rulerunits = startRulerUnits;
	}
}

function removeAllEmptyArtLayers(obj) {
	// clearing empty layers
	for (var i = obj.artLayers.length - 1; 0 <= i; i--) {
		try {
			if (obj.artLayers[i].kind == LayerKind.NORMAL && obj.artLayers[i].bounds[2] == 0 && obj.artLayers[i].bounds[3] == 0) {
				obj.artLayers[i].remove();
			}
		} catch (e) {}
	}
	for (var i = obj.layerSets.length - 1; 0 <= i; i--) {
		removeAllEmptyArtLayers(obj.layerSets[i]);
	}
}

function removeAllEmptyLayerSets(obj) {
	// clearing empty layersets
	var foundEmpty = true;
	for (var i = obj.layerSets.length - 1; 0 <= i; i--) {
		if (removeAllEmptyLayerSets(obj.layerSets[i])) {
			obj.layerSets[i].remove();
		} else {
			foundEmpty = false;
		}
	}
	if (obj.artLayers.length > 0) {
		foundEmpty = false;
	}
	return foundEmpty;
}


function docSizeAdjust() {
	// app.activeDocument.width=1024;

	doc = app.activeDocument;

	// change the color mode to RGB.  Important for resizing GIFs with indexed colors, to get better results
	doc.changeMode(ChangeMode.RGB);

	// these are our values for the end result width and height (in pixels) of our image
	var fWidth = 1024;
	app.preferences.rulerUnits = Units.PIXELS;
	app.preferences.typeUnits = TypeUnits.PIXELS;
	// do the resizing.  if height > width (portrait-mode) resize based on height.  otherwise, resize based on width
	// doc.resizeImage(null,UnitValue(fHeight,"px"),null,ResampleMethod.BICUBIC);
	doc.resizeImage(UnitValue(fWidth, "px"), null, null, ResampleMethod.BICUBIC);
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
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
}*/