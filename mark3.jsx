var html_code="";
var css_code="";
//CSS CODE FORMATION
function css_basic_code()
{
	css_code+="body\n{"+"\n}\n";
	// alert(app.foregroundColor.rgb.hexValue);

}

function get_solid_css(i,j)
{
	var layer = activeDocument.layerSets[i].layers[j]	
	css_code+="."+activeDocument.layerSets[i].layers[j].name+"\n{\n";
	var boundstring=layer.bounds.toString().split(",");
	var width = boundstring[0]-boundstring[2];
	var height = boundstring[1]-boundstring[3];
	if (width<0)
		{width=width*(-1); }
	if (height<0)
		{ height=height*(-1);}
	css_code+="height:"+height+"px;\n";
	css_code+="width:"+width+"px;\n";
	// turn of rectangel not allowed
	css_code+="position:absolute;\n"
	css_code+="left:"+boundstring[0]+";\n";
	css_code+="top:"+boundstring[1]+"\n";
	css_code+="opacity:"+(activeDocument.layerSets[i].layers[j].opacity/100).toFixed(1)+";\n";
	css_code+="}\n";
}

function get_text_css(i,j)
{
	var textitem = activeDocument.layerSets[i].layers[j].textItem;
	var text_kind = textitem.kind;

	if (text_kind="TextItem.POINTTEXT")
	{
		// alert(text_kind);//does not wrap in a rectangle.
	}
	else{
		// alert("paragraph text"); //does wrap in a rectangle.
		var text_height = current_layer.textItem.height; //height of the text paragraph section
		var text_width = current_layer.textItem.width;
	}

	var text_autoLeadingAmount = textitem.autoLeadingAmount;
	var text_antiAliasMethod = textitem.antiAliasMethod;
	
	var text_contents = textitem.contents;
	var text_desiredGlyphScaling = textitem.desiredGlyphScaling;
	var text_desiredLetterScaling = textitem.desiredLetterScaling;
	var text_desiredWordScaling = textitem.desiredWordScaling;
	var text_direction = textitem.direction;
	var text_firstLineIndent = textitem.firstLineIndent;
	var text_hangingPunctuation = textitem.hangingPunctuation;
	var text_hyphenateAfterFirst = textitem.hyphenateAfterFirst;
	var text_hyphenateBeforeLast = textitem.hyphenateBeforeLast;
	var text_hyphenateCapitalWords = textitem.hyphenateCapitalWords;
	var text_hyphenateWordsLongerThan = textitem.hyphenateWordsLongerThan;
	var text_hyphenation = textitem.hyphenation;
	var text_hyphenationZone = textitem.hyphenationZone;
	var text_hyphenLimit = textitem.hyphenLimit;
	var text_leftIndent = textitem.leftIndent;
	var text_maximumGlyphScaling = textitem.maximumGlyphScaling;
	var text_maximumLetterScaling = textitem.maximumLetterScaling;
	var text_maximumWordScaling = textitem.maximumWordScaling;
	var text_minimumGlyphScaling = textitem.minimumGlyphScaling;
	var text_minimumLetterScaling = textitem.minimumLetterScaling;
	var text_minimumWordScaling = textitem.minimumWordScaling;
	var text_parent = textitem.parent;
	var text_rightIndent = textitem.rightIndent;
	var text_spaceAfter = textitem.spaceAfter;
	var text_spaceBefore = textitem.spaceBefore;
	var text_typename = textitem.typename;
	var text_textComposer = textitem.textComposer;
	var text_warpBend = textitem.warpBend;
	var text_warpDirection = textitem.warpDirection;
	var text_warpHorizontalDistortion = textitem.warpHorizontalDistortion;
	var text_warpStyle = textitem.warpStyle;
	var text_warpVerticalDistortion = textitem.warpVerticalDistortion;
	
	var text_justification = textitem.justification;
	var text_position = textitem.position;
	var pos=text_position.toString().split(",");
	
	// alert(text_leftIndent); both are zero so no addition.
	//adding css style
	css_code+="."+activeDocument.layerSets[i].layers[j].name+"\n{\n";

	// if (textitem.size)
	// {
	// css_code+="font-size:"+textitem.size+";\n"	
	// }

	// if(textitem.font)
	// {
	// css_code+="font-family:"+textitem.font+";\n";	
	// }
	
	if(textitem.color.rgb.hexValue)
	{
		css_code+="color: #"+textitem.color.rgb.hexValue+"\n";
	}
	css_code+="opacity:"+(activeDocument.layerSets[i].layers[j].opacity/100).toFixed(1)+";\n";
	css_code+="position:absolute;\n"+"left:"+pos[0].split(".")[0]+";\ntop:"+pos[1].split(".")[0]+";\n";
	css_code+="text-align:"+text_justification.toString().split(".")[1]+";\n";
	// css_code+="line-height:";
	css_code+="}\n";
}

// HTML CODE FORMATION HERE
function add_html()
{
	html_code+="<html>\n<head>";
}


function add_title()
{
	var Document_name = app.activeDocument.name;
	html_code+="<title>"+ Document_name.substring(0,Document_name.length-4)+"\n</title>\n</head>";
	
}

function add_body(){
	html_code += "<body>";
}

function add_div(div_name){
	html_code+="<div class="+div_name+'">\n'; //layername
}
function add_header(){
	html_code+='<header class="header">\n';
}

function add_img(image_source,layername){
	html_code+='<img src="'+image_source+'"class="'+layername+'/>\n';
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
alert(layer_kind);
	switch (layer_kind)
	{
	case LayerKind.TEXT:
		text_layer_addition(i,j);
		break;

	case LayerKind.SOLIDFILL:
	  	solidfill_layer_addition(i,j);
	  	break;

	case LayerKind.NORMAL:
		solidfill_layer_addition(i,j);
		break;

	
	}
}

function solidfill_layer_addition(i,j)
{
html_code+='<div class="'+activeDocument.layerSets[i].layers[j].name+'">';
get_solid_css(i,j);

}

function text_layer_addition(i,j)
{
	html_code+='<p class="'+activeDocument.layerSets[i].layers[j].name+'">'+activeDocument.layerSets[i].layers[j].textItem.contents+"</p>\n";
	get_text_css(i,j);
	// alert(activeDocument.layerSets[i].layers[j].textItem.font);
	//alert(j);
}
function normal_layer_addition(i,j){
	html_code += '<img class="'+ activeDocument.layerSets[i].layers[j].name +'"/>\n';
}


function code_chain_begin()
{
add_html();
add_title();
add_body();
css_basic_code();
layersets();
add_page_close();
// alert("thanking you for using PS2WEB!!");
alert(css_code);
// alert(html_code);
}

code_chain_begin();