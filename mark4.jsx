// HOIST: Js photoshop plugin
// CODE: Convert PSD file design into html and css code (MAC version)
// Version: 0.1(Beta)
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
	layer_name = layer_name.split(' ').join('-').toLowerCase();

	if (layer_name.length > 20) {
		// layer name is equal to type + layer number for layer name greater than 20
		layer_name = type + i.toString() + j.toString();
	}
	return layer_name;
}

function beautifyLayerSetName(layerSet_name, type, i) {
	// Replacing spaces with hyphens for css conventions
	layerSet_name = layerSet_name.split(' ').join('-').toLowerCase();

	if (layerSet_name.length > 20) {
		// layer name is equal to type + layer number for layer name greater than 20
		layerSet_name = type + i.toString();
	}
	if (type = 'button') {
		alert("button");
	}
	return layerSet_name;
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
//CSS CODE FORMATION
function addCssBasicCode() {
	// adding body element to css_code
	css_code += "body\n{\nwidth:100%;\nmargin: 0;\npadding:0;" + "\n}\n";
}

function getButtonTextCss(i,j){
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	var text_font = textitem.font
	var text_contents = textitem.contents;
	var text_justification = textitem.justification;
	//adding css style

	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + "\n{\n";
	css_code += "margin:0;\n";

	if (textitem.color.rgb.hexValue) {
		if (textitem.color.rgb.hexValue != 000000) {
			css_code += "color: #" + textitem.color.rgb.hexValue + ";\n";
		}
	}
	if ((activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) != 1.0) {
		css_code += "opacity: " + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	}

	if (text_justification.toString().split(".")[1].toLowerCase() != "left") {
		css_code += "text-align:  " + text_justification.toString().split(".")[1].toLowerCase() + ";\n";
	}

	if (text_kind == "TextType.PARAGRAPHTEXT") {

		css_code += "height: " + textitem.height.as("pixel") + "px;\n";
		css_code += "width: " + textitem.width.as("pixel") + "px;\n";
		css_code += "word-wrap:break-word;\n";
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

function getGeneralCss(i, j, typeo) {
	// adding generall css to css_code string
	var layer = activeDocument.layerSets[i].layers[j]
	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, typeo, i, j) + "\n{\n";
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
	if ((activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) != 1.0) {
		css_code += "opacity:" + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	}
	css_code += "z-index:" + (i + j) + ";\n";
	addLayerStyle(i, j);
	css_code += "}\n";
}


function getTextCss(i, j) {
	// adding text styles to css_code
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	var text_font = textitem.font
	var text_contents = textitem.contents;
	var text_justification = textitem.justification;
	//adding css style

	css_code += "." + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + "\n{\n";
	css_code += "margin:0;\n"

	var text_position = textitem.position;
	var text_pos_x = text_position[0].value.toFixed(0);
	var text_pos_y = text_position[1].value.toFixed(0);
	css_code += "position: absolute;\n" + "left:" + text_pos_x + "px;\ntop:" + text_pos_y + "px;\n";

	if (textitem.color.rgb.hexValue) {
		if (textitem.color.rgb.hexValue != 000000) {
			css_code += "color: #" + textitem.color.rgb.hexValue + ";\n";
		}
	}
	if ((activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) != 1.0) {
		css_code += "opacity: " + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	}

	if (text_justification.toString().split(".")[1].toLowerCase() != "left") {
		css_code += "text-align:  " + text_justification.toString().split(".")[1].toLowerCase() + ";\n";
	}

	if (text_kind == "TextType.PARAGRAPHTEXT") {

		css_code += "height: " + textitem.height.as("pixel") + "px;\n";
		css_code += "width: " + textitem.width.as("pixel") + "px;\n";
		css_code += "word-wrap:break-word;\n";
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
		css_code += "." + beautifyLayerSetName(div_name, "div", i) + "\n{\n";
		css_code += "opacity:" + (activeDocument.layerSets[i].opacity / 100).toFixed(1) + ";\n";
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

function addButtonCss(i, j) {
	css_code += "." + beautifyLayerSetName(activeDocument.layerSets[i].name, "button", i) + "\n{\n";
	css_code += "margin:0;\n";
	var layer = activeDocument.layerSets[i].layers[j]
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
	if ((activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) != 1.0) {
		css_code += "opacity:" + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	}
	css_code += "z-index:" + (i + j) + ";\n";
	addLayerStyle(i, j);
	css_code += "}\n";
	getFillColor();
}

function getFillColor() {
	var ref = new ActionReference();
	ref.putEnumerated(stringIDToTypeID("contentLayer"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
	var ref1 = executeActionGet(ref);
	var list = ref1.getList(charIDToTypeID("Adjs"));
	var solidColorLayer = list.getObjectValue(0);
	var color = solidColorLayer.getObjectValue(charIDToTypeID('Clr '));
	var fillcolor = new SolidColor;
	fillcolor.rgb.red = color.getDouble(charIDToTypeID('Rd  '));
	fillcolor.rgb.green = color.getDouble(charIDToTypeID('Grn '));
	fillcolor.rgb.blue = color.getDouble(charIDToTypeID('Bl  '));
	css_code = css_code.substring(0, css_code.length - 2);
	css_code += "background: #" + fillcolor.rgb.hexValue + ";\n}\n";
	Radius = roundRect();
	if (Radius != 0) {
		css_code = css_code.substring(0, css_code.length - 2);
		css_code += "border-radius:" + Radius + "px;\n}\n";

	}
	return fillcolor;
};

function roundRect() {

	try {
		var Paths, Path;
		var SubPaths, Item;
		var Points, Point;
		X = new Array;
		Paths = app.activeDocument.pathItems;
		for (var i = 0; i < Paths.length; i++) {
			Path = Paths[i];
			SubPaths = Path.subPathItems;
			for (var j = 0; j < SubPaths.length; j++) {
				Item = SubPaths[j];
				Points = Item.pathPoints;

				for (var k = 1; k < 3; k++) {
					Point = Points[k];
					X[k] = Point.anchor[0];
				}
			}
			X[1] = parseInt(X[1]);
			X[2] = parseInt(X[2]);
		}
		var Radius = X[2] - X[1];

	} catch (e) {}
	return Radius;

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
	var handle = getUniqueName(prefs.filePath + "/HOIST/images/" + fileName);
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
	html_code += "<!doctype html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'><link rel='icon' type='image/png' href=''>\n";
	var Document_name = app.activeDocument.name;
	html_code += "<title>\n" + Document_name.substring(0, Document_name.length - 4) + '\n</title>\n<link rel="stylesheet" type="text/css" href="css/style.css">\n</head>';
	html_code += "<body>";
}

function addDivTag(div_name, i) {
	html_code += '<div class=" ' + beautifyLayerSetName(div_name, "div", i) + '">\n';
	divideLayerIntoType(i);
	addDivCss(layerSet_name, i);
	html_code += "</div>";

	//layername
}

function addImageTag(image_source, layername) {
	html_code += '<img src="' + image_source + '"class="' + layername + '/>\n';
}


function addDivCloseTag() {
	html_code += "</div>";
}

function addPageCloseTag() {
	html_code += "<script type='text/javascript'>\
	 function downloadJSAtOnload() {\
	var element = document.createElement('script');\
	element.src = '';\
	document.body.appendChild(element);\
	}\
	if (window.addEventListener)\
	window.addEventListener('load', downloadJSAtOnload, false);\
	else if (window.attachEvent)\
	window.attachEvent('onload', downloadJSAtOnload);\
	else window.onload = downloadJSAtOnload;\
	</script></body></html>";
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
function layerSetsDivision() {
	// Layer division by type
	var layer_array = [];
	numoflayerset = activeDocument.layerSets.length;
	// var i=0;
	total_layer_number += numoflayerset;

	for (var i = 0; i < numoflayerset; i++) {
		layerSet_name = activeDocument.layerSets[i].name.toLowerCase();
		if (layerSet_name.indexOf("button") > -1) {
			addButtonTagCode(i);
		} else {
			switch (layerSet_name) {
				case "nav":
				case "navbar":
					// alert(layerSet_name);
					addNavbarTagCode(i);
					break;
					// alert(layer_kind);
				default:
					addDivTag(layerSet_name, i);
					break;
			}
		}
	}

}

function divideLayerIntoType(i) {
	var j = 0;
	inside_layer_numbers = activeDocument.layerSets[i].layers.length;
	total_layer_number += inside_layer_numbers;
	for (var j = 0; j < inside_layer_numbers; j++) {

		layer_name = activeDocument.layerSets[i].layers[j].name;
		layer_kind = activeDocument.layerSets[i].layers[j].kind;
		app.activeDocument.activeLayer = activeDocument.layerSets[i].layers[j];
		// alert(layer_name);
		// alert(layerSet_name);

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
			default:
				alert(layer_kind);
				break;
		}

	}
}
// ------------------------------------------------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------
// Specific Layer Type Code Generation
function addSoldfillLayerCode(i, j) {
	html_code += '<div class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "solid", i, j) + '">';
	getGeneralCss(i, j, "solid");
	getFillColor();
	addDivCloseTag();

}


function addTextLayerCode(i, j) {
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	var hsize = textitem.size.as("pixel");
	if (text_kind == "TextType.PARAGRAPHTEXT") {
		html_code += '<p class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</p>\n";
	} else {
		addHTag(hsize, i, j);
	}
	getTextCss(i, j);
}


function addHTag(foo, i, j) {
	switch (true) { // invariant TRUE instead of variable foo
		case foo >= 0 && foo <= 12:
			html_code += '<h6 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h6>\n";
			break;
		case foo > 12 && foo <= 14:
			html_code += '<h5 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h5>\n";
			break;
		case foo > 14 && foo < 16:
			html_code += '<h4 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h4>\n";
			break;
		case foo > 16 && foo <= 20:
			html_code += '<h3 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h3>\n";
			break;
		case foo > 20 && foo <= 24:
			html_code += '<h2 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h2>\n";
			break;
		case foo > 24:
			html_code += '<h1 class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</h1>\n";
			break;
		default:
			alert('no tag will be added due to unknown size');
	}
}



function addNormalLayerCode(i, j) {
	html_code += '<img class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "normal", i, j) + '"/>\n';
	getGeneralCss(i, j, "image");
	getImageCss(i, j);
	// downloadImage(i, j);
}

function addButtonTagCode(i) {
	html_code += '<button class="' + beautifyLayerSetName(activeDocument.layerSets[i].name.toLowerCase(), i, "button") + '">\n';
	if ((activeDocument.layerSets[i].opacity / 100).toFixed(1) != 1.0) {
		css_code += "." + beautifyLayerSetName(activeDocument.layerSets[i].name.toLowerCase(), i, "button") + "\n{\n";
		css_code += "opacity:" + (activeDocument.layerSets[i].opacity / 100).toFixed(1) + ";\n";
		css_code += "}\n";
	}
	inside_layer_numbers = activeDocument.layerSets[i].layers.length;
	total_layer_number += inside_layer_numbers;
	for (var j = 0; j < inside_layer_numbers; j++) {
		layer_name = activeDocument.layerSets[i].layers[j].name;
		layer_kind = activeDocument.layerSets[i].layers[j].kind;
		app.activeDocument.activeLayer = activeDocument.layerSets[i].layers[j];

		switch (layer_kind) {
			case LayerKind.TEXT:
				html_code += '<span class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "text", i, j) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</span>\n";
				getButtonTextCss(i,j);
				break;

			case LayerKind.SOLIDFILL:
				// html_code += '<i class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "solid", i, j) +'"> </i>\n';
				addButtonCss(i, j);
				break;

			case LayerKind.NORMAL:
				// addNormalLayerCode(i, j);
				html_code += '<i class="' + beautifyLayerName(activeDocument.layerSets[i].layers[j].name, "solid", i, j) + '"> </i>\n';
				break;
			default:
				break;
		}

	}
	html_code += "</button>";
}

function addNavbarTagCode(i) {
	// NavBar Addition Code
	html_code += "<nav>\n";
	divideLayerIntoType(i);
	// add navcss
	if ((activeDocument.layerSets[i].opacity / 100).toFixed(1) != 1.0) {
		css_code += "." + beautifyLayerSetName(activeDocument.layerSets[i].name.toLowerCase(), "nav", i) + "\n{\n";
		css_code += "opacity:" + (activeDocument.layerSets[i].opacity / 100).toFixed(1) + ";\n";
		css_code += "}\n";
	}
	html_code += "</nav>";
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
	var folder_name = "HOIST";
	var main_folder = new Folder(prefs.filePath + "/" + folder_name);
	main_folder.create();
	var css_folder = new Folder(prefs.filePath + "/" + folder_name + "/css");
	var images_folder = new Folder(prefs.filePath + "/" + folder_name + "/images");
	css_folder.create();
	images_folder.create();
}

function createFile(file_name, content) {
	// Creating a file
	var g_file_path = prefs.filePath + "/HOIST/" + file_name;
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
	alert("Thank you for using HOIST \nPlease check 'http://photoshopetiquette.com' for better results with Hoist \nIf you Find this project interesting please contribute.");
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