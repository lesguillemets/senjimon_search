var senjimon_text = "";
var last_query = "";
var last_match_index = -1; // 0 index
var last_match_page = -1; // 0 index: ignores initpage
var last_match_loc_in_page = -1; // 0 index
var chars_per_page = 1;
var initial_page = 1;


function main(){
	fetch("./source/senjimon.txt")
		.then( (response) =>  {return response.text(); } )
		.then( (txt) => { senjimon_text = txt; })
		.then( init );
}

function format_page_index(ind) {
	if (ind < 0 ) {
		return ind;
	} else {
		return ind + initial_page;
	}
}

function format_index(ind) {
	if (ind < 0 ) {
		return ind;
	} else {
		return ind + 1;
	}
}

function search_char() {
	let the_char = document.getElementById('qchar').value[0];
	last_query = the_char;
	initial_page = parseInt(document.getElementById('initpage').value, 10);
	chars_per_page = parseInt(document.getElementById('charpage').value, 10);
	last_match_index  = senjimon_text.indexOf(the_char);
	if (last_match_index >= 0) {
		last_match_page = Math.floor(last_match_index / chars_per_page);
		last_match_loc_in_page = last_match_index % chars_per_page;
	} else {
		last_match_page = -1;
		last_match_loc_in_page = -1;
	}
}

function update_view() {
	document.getElementById("query").textContent = last_query;
	document.getElementById("match-index").textContent = format_index(last_match_index);
	document.getElementById("page").textContent = format_page_index(last_match_page);
	document.getElementById("chars").textContent = format_index(last_match_loc_in_page);
	if (last_match_index >= 0) {
		let page_head = chars_per_page*last_match_page;
		document.getElementById("the-page").textContent =
			senjimon_text.substring(page_head, page_head + chars_per_page);
	} else {
		document.getElementById("the-page").textContent = "(見つかりませんでした)";
	}
}

function init() {
	document.getElementById("execute").onclick = function() { search_char(); update_view(); return false; };
}

window.onload = main;

// vim:set noexpandtab ts=2 sts=2 sw=2:
