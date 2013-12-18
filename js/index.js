
var mp3 = 0; //1 for mp3, 0 for none

function pauseFirst(pop) {
	var str="audio/doing_diag_apr_9.wav";
	palyAudio(str);
	setTimeout("diagnosis(0,"+pop+")", 5000);
}
var playAudioHandle;
var currentAudio;

function playMP3(url){
	 stopAudio();
	 console.log("playing url", url);
	 currentAudio = document.createElement("audio");
	 if (currentAudio != null && currentAudio.canPlayType && currentAudio.canPlayType("audio/mpeg"))
	 {
		 currentAudio.src = url;
		 currentAudio.play();
	 }
}

function stopAudio() {
	try {
		if (currentAudio != null) {
			console.log("stopAudio", currentAudio);
			currentAudio.currentTime = 0;
			currentAudio.pause();
		}
	} catch (error) {
		console.log("error occurs when try to stop audio: " + error);
	}

}

function palyAudio(audioFile) {
	// TODO Change audio file name
//	 console.log("playAudioHandle", playAudioHandle);
//	 if (typeof (playAudioHandle) != "undefined") {
//		 gm.media.stop(playAudioHandle);
//	 }
//	 playAudioHandle = gm.media.play(audioFile, '',
//			 function(statusCode) {
//        console.log('Status Code: ' + statusCode);
//    }
//);
	 playMP3(audioFile);
	console.log("palyAudio(file)");
	if ((audioFile == 'audio/busy_tone_may_3.wav') || (mp3 == 1)) {
		 stopAudio();
		 currentAudio = new Audio(audioFile);
		 currentAudio.play();
	    // $('body').append('<audio src="'+audioFile+'" autostart="true" hidden="true" loop="false">');
	     console.log(audioFile);
	}
}



var dealer1=function(){
	console.log("nodealer");
	   $("#nodealer").hide();
	   $("#dealerDiv").show();
	   var href = window.location.href;
	   var appRootUrl = href.substr(0,  href.lastIndexOf("/"));
	   console.log($("#dealerFrame"));
	   $("#rightFrame").attr("src", appRootUrl + "/dealer.html");
}
