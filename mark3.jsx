var html_code="";

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
	//normal layer fucntions 

	}
	else if (layer_kind=="LayerKind.TEXT") 
	{
		 text_layer_addition(i,j);
	}

}

function text_layer_addition(i,j){
	html_code+='<p>'+activeDocument.layerSets[i].layers[j].textItem.contents+"</p>";
	// alert(activeDocument.layerSets[i].layers[j].textItem.font);
	//alert(j);
}

function code_chain_begin()
{
add_html();
add_head();
add_title();
add_body();

layersets();

add_page_close();
alert(html_code);

}

code_chain_begin();