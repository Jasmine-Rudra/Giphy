var animal=['dog','cat','hamster','frog','ferret','skunk'];
var apikey="dc6zaTOxFJmzC";

$(document).ready(loadanimal());

function loadanimal(){
	$("#button-container").empty();
	for(var i=0;i<animal.length;i++){
		$("#button-container").append('<button class="animal-click btn btn-primary" value='+animal[i]+'>'+animal[i]+'</button>');
	}
};

$("#addAnimal").click(function(){
	animal.push($("#new-animal").val());
	loadanimal();

});

$(document).on('click','.animal-click',function(){
	var a=$(this)[0].value;
	callapi(a);

});

function callapi(x){
	$.ajax({
		url: "http://api.giphy.com/v1/gifs/search?q="+x+"&api_key="+apikey+"&limit=10",
		method:"get"
	}).done(function(data) { 
		displayGif(data.data);
	});
};

function displayGif(data){
	console.log("hetre",data);
	$(".gif-image").empty();
	for(var i=0;i<data.length;i++){
		p=data[i].rating;
		img=data[i].images.fixed_height_still.url;
		$(".gif-image").append("<div class='img-display'> <p>rating: "+p+"</p><img class='gif' data_still="+data[i].images.fixed_height_still.url+" data_animate="+data[i].images.fixed_height.url+" src="+img+" data_state='still' height='200px' onclick='change(this)' ></div>");
	}		
};

function change(x) {
	var state= x.getAttribute("data_state");
	if(state=="still"){
		x.setAttribute("src",x.getAttribute("data_animate"));
		x.setAttribute("data_state","animate");
	}
	else{
		x.setAttribute("src",x.getAttribute("data_still"));
		x.setAttribute("data_state","still");
	}
};