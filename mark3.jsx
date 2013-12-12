var html_code="";
var css_code="";
//CSS CODE FORMATION
function get_text_css(i,j)
{
	var textitem = activeDocument.layerSets[i].layers[j].textItem;

	var text_autoLeadingAmount = textitem.autoLeadingAmount;
	var text_antiAliasMethod = textitem.antiAliasMethod;
	// var text_color_hexcode = textitem.color.rgb.hexValue;
	var text_contents = textitem.contents;
	var text_desiredGlyphScaling = textitem.desiredGlyphScaling;
	var text_desiredLetterScaling = textitem.desiredLetterScaling;
	var text_desiredWordScaling = textitem.desiredWordScaling;
	var text_direction = textitem.direction;
	var text_firstLineIndent = textitem.firstLineIndent;
	var text_font = textitem.font;
	var text_hangingPunctuation = textitem.hangingPunctuation;
	var text_hyphenateAfterFirst = textitem.hyphenateAfterFirst;
	var text_hyphenateBeforeLast = textitem.hyphenateBeforeLast;
	var text_hyphenateCapitalWords = textitem.hyphenateCapitalWords;
	var text_hyphenateWordsLongerThan = textitem.hyphenateWordsLongerThan;
	var text_hyphenation = textitem.hyphenation;
	var text_hyphenationZone = textitem.hyphenationZone;
	var text_hyphenLimit = textitem.hyphenLimit;
	var text_justification = textitem.justification;
	var text_kind = textitem.kind;
	var text_leftIndent = textitem.leftIndent;
	var text_maximumGlyphScaling = textitem.maximumGlyphScaling;
	var text_maximumLetterScaling = textitem.maximumLetterScaling;
	var text_maximumWordScaling = textitem.maximumWordScaling;
	var text_minimumGlyphScaling = textitem.minimumGlyphScaling;
	var text_minimumLetterScaling = textitem.minimumLetterScaling;
	var text_minimumWordScaling = textitem.minimumWordScaling;
	var text_parent = textitem.parent;
	var text_position = textitem.position;
	var text_rightIndent = textitem.rightIndent;
	var text_size = textitem.size;
	var text_spaceAfter = textitem.spaceAfter;
	var text_spaceBefore = textitem.spaceBefore;
	var text_typename = textitem.typename;
	var text_textComposer = textitem.textComposer;
	var text_warpBend = textitem.warpBend;
	var text_warpDirection = textitem.warpDirection;
	var text_warpHorizontalDistortion = textitem.warpHorizontalDistortion;
	var text_warpStyle = textitem.warpStyle;
	var text_warpVerticalDistortion = textitem.warpVerticalDistortion;
	alert(textitem.contents + text_font);
}


// HTML CODE FORMATION HERE
function add_html()
{
	html_code+="<html>";
}

function add_head()
{
	html_code+="<head>"
}
function add_title()
{
	var Document_name = app.documents[0].name;;
	html_code+="<title>"+ Document_name.substring(0,Document_name.length-4)+"</title></head>";
	
}

function add_body(){
	html_code += "<body>";
}

function add_div(div_name){
	html_code+="<div class="+div_name+'">'; //layername
}
function add_header(){
	html_code+='<header class="header">';
}

function add_img(image_source,layername){
	html_code+='<img src="'+image_source+'"class="'+layername+'/>';
}

function add_button(layername){
	html_code+='<button class='+layername+'>';
}

function add_div_close()
{
	html_code+="</div>"
}
function add_page_close(){
	html_code+="</body></html>";
}

function layersets(){
	layer_array = new Array();
	numoflayerset=activeDocument.layerSets.length;
	// var i=0;
	for(var i=0;i<numoflayerset;i++)
	{
		div_name=activeDocument.layerSets[i].name;
		add_div(div_name);
		inside_layer_numbers=activeDocument.layerSets[i].layers.length;
		// alert(inside_layer);
		for(var j=0;j<inside_layer_numbers;j++)
		{
			layer_name=activeDocument.layerSets[i].layers[j].name;
			layer_kind=activeDocument.layerSets[i].layers[j].kind;
			layer_post_kind(layer_kind,i,j);
		}
		add_div_close();
	}
}

function layer_post_kind(layer_kind,i,j)
{
	if(layer_kind=="LayerKind.NORMAL")
	{
	  	// normal_layer_addition(i,j); 

	}
	else if (layer_kind=="LayerKind.TEXT") 
	{
		// working
		text_layer_addition(i,j); 
	}

}

function text_layer_addition(i,j){
	html_code+='<p>'+activeDocument.layerSets[i].layers[j].textItem.contents+"</p>";
	get_text_css(i,j);
	// alert(activeDocument.layerSets[i].layers[j].textItem.font);
	//alert(j);
}
function normal_layer_addition(i,j){
	html_code += '<img class="'+ activeDocument.layerSets[i].layers[j].name +'"/>';
}

function code_chain_begin()
{
add_html();
add_head();
add_title();
add_body();
layersets();
add_page_close();
// alert(html_code);

}

code_chain_begin();