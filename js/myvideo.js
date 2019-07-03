var volume=20;
var playing=false;
var like=true;
var unlike=true;
localStorage.setItem("like",88);
localStorage.setItem("unlike",12);

$(document).ready(function() {
	$("#btn_up").text(localStorage.like);
	$("#btn_down").text(localStorage.unlike);
	$("#btn_pause").attr("disabled",true);
});

function play() {
	if(!playing) {
	  playing=true;
	  $("#videoPlayer")[0].play();
	  $("#btn_pause").attr("disabled",false);
	  $("#btn_play").attr("disabled",true);
	  getvideoprogress();
	}
}

function pause() {
	if(playing) {
	  playing=false;
	  $("#videoPlayer")[0].pause();
	  $("#btn_pause").attr("disabled",true);
	  $("#btn_play").attr("disabled",false);
	}
}

function plus() {
	if(volume<100) {
	  volume=volume+10;
	  $("#videoPlayer")[0].volume=volume/100;
	  console.log($("#videoPlayer")[0].volume);
	  $("#btn_minus").attr("disabled",false);
	  if(volume==100) {
		$("#btn_plus").attr("disabled",true);
	  }
	}
}

function minus() {
	if(volume>0) {
	  volume=volume-10;
	  $("#videoPlayer")[0].volume=volume/100;
	  console.log($("#videoPlayer")[0].volume);
	  $("#btn_plus").attr("disabled",false);
	  if(volume==0) {
		$("#btn_minus").attr("disabled",true);
	  }
	}
}

function mute() {
	if($("#videoPlayer")[0].muted) {
	  $("#videoPlayer")[0].muted=false;
	} else {
	  $("#videoPlayer")[0].muted=true;
	}
}

function stop() {
	$("#videoPlayer")[0].pause();
	$("#videoPlayer")[0].currentTime=0;
	$("#btn_play").attr("disabled",false);
	$("#btn_pause").attr("disabled",true);
	$("#progress").val(0);
	playing=false;
}

function getvideoprogress() {
	setTimeout(function () {
		var video = $("#videoPlayer")[0];
		var max = video.duration;
		var currentTime=video.currentTime;
		var pg=currentTime/max*100;
		//console.log(pg);
		$("#progress-bar").css("width",pg+"%");
		if(currentTime==max){
			playing=false;
			$("#btn_play").attr("disabled",false);
			$("#btn_pause").attr("disabled",true);
			return false;
		}
		getvideoprogress();
	}, 200);
}

function clickLike() {
	if(like) {
	  localStorage.setItem("like", Number(localStorage.like) + 1);
	  like=false;
	  $("#btn_up").removeClass("fa-thumbs-o-up");
	  $("#btn_up").addClass("fa-thumbs-up");
	} else {
	  if(localStorage.like>0) {
		localStorage.setItem("like", Number(localStorage.like) - 1);
		like=true;
		$("#btn_up").removeClass("fa-thumbs-up");
		$("#btn_up").addClass("fa-thumbs-o-up");
	  }
	}
	$("#btn_up").text(localStorage.like);
}

function clickUnLike() {
	if(unlike) {
	  localStorage.setItem("unlike", Number(localStorage.unlike) + 1);
	  unlike=false;
	  $("#btn_down").removeClass("fa-thumbs-o-down");
	  $("#btn_down").addClass("fa-thumbs-down");
	} else {
	  if(localStorage.unlike>0) {
		localStorage.setItem("unlike", Number(localStorage.unlike) - 1);
		unlike=true;
		$("#btn_down").removeClass("fa-thumbs-down");
		$("#btn_down").addClass("fa-thumbs-o-down");
	  }
	}
	$("#btn_down").text(localStorage.unlike);
}

function playVideo(name,title) {
	var before = $("#videoPlayer")[0].currentTime;
	$("#videoPlayer")[0].src="./movie/"+name;
	$("#videoPlayer").children("track")[0].src="./movie/"+title;
	var duration = $("#videoPlayer")[0].duration;
	if(before >= duration) {
		$("#videoPlayer")[0].currentTime = 0;
	} else {
		$("#videoPlayer")[0].currentTime = before;
	}
	console.log("before:" + before);
	console.log("duration:" + $("#videoPlayer")[0].duration);
	console.log("now:" + $("#videoPlayer")[0].currentTime);
	$("#btn_pause").attr("disabled",true);
	$("#btn_play").attr("disabled",false);
	playing=false;
	play();
}