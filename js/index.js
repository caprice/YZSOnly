
var mp3 = 0; //1 for mp3, 0 for none

function pauseFirst(pop) {
	var str="audio/doing_diag_apr_9.wav";
	palyAudio(str);
	setTimeout("diagnosis(0,"+pop+")", 5000);
}
var playAudioHandle;
var currentAudio = null;

function playMP3(url){
	 stopAudio();
	 var audio = document.createElement('audio');  
	 audio.setAttribute('src',url);
	 currentAudio = audio;
	 try{
		 audio.play();
	 }
	 catch(e){
		 setProcessindictText('debug',e); 
	 }
	
	
}

function stopAudio() {
	if (currentAudio != null) {
		currentAudio.pause();
		currentAudio.currentTime = 0;
	}
	currentAudio = null;
}

function palyAudio(audioFile) {
	// TODO Change audio file name
//	 console.log(playAudioHandle);
//	 if (typeof (recordingHandle) != "undefined") {
//		 gm.media.stop(playAudioHandle);
//	 }
//playAudioHandle = gm.media.play(audioFile, 'exclusiveAudio',
//    function(statusCode) {
//        //console.log('Status Code: ' + statusCode);
//    }
//);
	// $('embed').remove(); 
	if ((audioFile == 'audio/busy_tone_may_3.wav') || (mp3 == 1)) {
		 stopAudio();
		 var audio = document.createElement('audio');  
		 audio.setAttribute('src', audioFile);
		 currentAudio = audio;
		 audio.play();
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
