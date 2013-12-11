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

function find_no_of_layersets(){
	layerset_array = new Array();
	numoflayerset=activeDocument.layerSets.length;
	div_name=activeDocument.layerSets[0].name;
	add_div(div_name);
	return numoflayerset;
}

function code_chain_begin()
{
add_html();
add_head();
add_title();
add_body();
no=find_no_of_layersets();
html_code+=no;
alert(html_code);
add_page_close();
}

code_chain_begin();