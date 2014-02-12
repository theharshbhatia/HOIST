var html_code = "";
var css_code = "";
var file_path = "~/Desktop/";
//CSS CODE FORMATION
function css_basic_code() {
	css_code += "body\n{" + "\n}\n";
	// alert(app.foregroundColor.rgb.hexValue);
}

function beautify_layer_name(layer_name){
	layer_name = layer_name.split(' ').join('-');
	// convert every other nameinto something different
	// if (layer_name.length > 20){
		// layer_name=layer_name.substring(0,20);
		//similar layer nomenclature
	// }
	return layer_name;
}
function get_solid_css(i, j) {
	var layer = activeDocument.layerSets[i].layers[j]
	css_code += "." +beautify_layer_name( activeDocument.layerSets[i].layers[j].name )+ "\n{\n";
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

function get_text_css(i, j) {
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;
	
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
	// var text_spaceAfter = textitem.spaceAfter;
	// var text_spaceBefore = textitem.spaceBefore;
	// var text_typename = textitem.typename;
	// var text_textComposer = textitem.textComposer;
	// var text_warpBend = textitem.warpBend;
	// var text_warpDirection = textitem.warpDirection;
	// var text_warpHorizontalDistortion = textitem.warpHorizontalDistortion;
	// var text_warpStyle = textitem.warpStyle;
	// var text_warpVerticalDistortion = textitem.warpVerticalDistortion;

	
	var text_position = textitem.position;
	var pos = text_position.toString().split(",");

	var text_font = textitem.font
	var text_contents = textitem.contents;
	var text_direction = textitem.direction;
	var text_justification = textitem.justification;
	// alert(text_leftIndent); both are zero so no addition.
	//adding css style
	// alert(textitem.size);
	// css_code+="line-height:";
	
	css_code += "." + beautify_layer_name( activeDocument.layerSets[i].layers[j].name )+ "\n{\n";
	css_code+= "margin:0;\n"

	// css_code += "position:absolute;\n" + "left:" + pos[0].split(".")[0] + ";\ntop:" + pos[1].split(".")[0] + ";\n";

	if (textitem.color.rgb.hexValue) {
		css_code += "color: #" + textitem.color.rgb.hexValue + ";\n";
	}
	css_code += "opacity:" + (activeDocument.layerSets[i].layers[j].opacity / 100).toFixed(1) + ";\n";
	
	css_code += "text-align:" + text_justification.toString().split(".")[1] + ";\n";


	if (text_kind = "TextType.PARAGRAPHTEXT") {
		css_code+= "height:"+textitem.height.as("pixel")+"px;\n"
		css_code+= "width:"+textitem.width.as("pixel")+"px;\n"
	}

	if(textitem.font)
		{
		css_code+="font-family:"+textitem.font+";\n";	//for now else non-webfonts are still an issue.
		}

	if (textitem.size)
		{
		css_code+="font-size:"+textitem.size.as("pixel")+"px;\n" //font size in pt to be converted into pixels	
		}

	css_code += "}\n";
}

// HTML CODE FORMATION HERE
function add_html() {
	html_code += "<html>\n<head>";
}


function add_title() {
	var Document_name = app.activeDocument.name;
	html_code += "<title>\n" + Document_name.substring(0, Document_name.length - 4) + '\n</title>\n<link rel="stylesheet" type="text/css" href="css/style.css">\n</head>';

}

function add_body() {
	html_code += "<body>";
}

function add_div(div_name) {
	html_code += '<div class=" '+ div_name + '">\n'; //layername
}

function add_header() {
	html_code += '<header class="header">\n';
}

function add_img(image_source, layername) {
	html_code += '<img src="' + image_source + '"class="' + layername + '/>\n';
}

function add_button(layername) {
	html_code += '<button class=' + layername + '>';
}

function add_div_close() {
	html_code += "</div>"
}

function add_page_close() {
	html_code += "</body></html>";
}

function layersets() {
	layer_array = new Array();
	numoflayerset = activeDocument.layerSets.length;
	// var i=0;
	for (var i = 0; i < numoflayerset; i++) {
		div_name = activeDocument.layerSets[i].name;
		add_div(div_name);
		inside_layer_numbers = activeDocument.layerSets[i].layers.length;
		// alert(inside_layer);
		for (var j = 0; j < inside_layer_numbers; j++) {
			layer_name = activeDocument.layerSets[i].layers[j].name;
			layer_kind = activeDocument.layerSets[i].layers[j].kind;
			layer_post_kind(layer_kind, i, j);
		}
		add_div_close();
	}
}

function layer_post_kind(layer_kind, i, j) {
	// alert(layer_kind);
	switch (layer_kind) {
		case LayerKind.TEXT:
			text_layer_addition(i, j);
			break;

		case LayerKind.SOLIDFILL:
			solidfill_layer_addition(i, j);
			break;

		case LayerKind.NORMAL:
			solidfill_layer_addition(i, j);
			break;


	}
}

function solidfill_layer_addition(i, j) {
	html_code += '<div class="' + beautify_layer_name(activeDocument.layerSets[i].layers[j].name) + '">';
	get_solid_css(i, j);

}

function text_layer_addition(i, j) {
	html_code += '<p class="' +beautify_layer_name(activeDocument.layerSets[i].layers[j].name) + '">' + activeDocument.layerSets[i].layers[j].textItem.contents + "</p>\n";
	get_text_css(i, j);
	// alert(activeDocument.layerSets[i].layers[j].textItem.font);
	//alert(j);
}

function normal_layer_addition(i, j) {
	html_code += '<img class="' +beautify_layer_name(activeDocument.layerSets[i].layers[j].name) + '"/>\n';
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


function code_chain_begin() {
	add_html();
	add_title();
	add_body();
	css_basic_code();
	layersets();
	add_page_close();
	// alert("thanking you for using PS2WEB!!");
	alert(css_code);
	alert(html_code);

	//Complete file creation code
	create_folders();
	create_file("css/style.css",css_code);
	create_file("index.html",html_code);
	
}

code_chain_begin();


// Mac Specified Code 
function create_folders() {
	var foldername="PS2WEB";
	var main_folder = new Folder("~/Desktop/"+foldername);
	main_folder.create();
	var css_folder = new Folder("~/Desktop/"+foldername+"/css");
	var images_folder = new Folder("~/Desktop/"+foldername+"/images");
	css_folder.create();
	images_folder.create();
}


function create_file(file_name,content) {

	var file_path = "~/Desktop/PS2WEB/" + file_name;
	var write_file = File(file_path);

	if (!write_file.exists) {
		write_file = new File(file_path);
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

