/*
 * Code-samples JavaScript
 */
$unit.ns('gm.ngi.yzs.asrtts');
var speechRecSessionID;
var debugDiv;
var filePath;
var uploadComponet;
var ttsUrl = 'http://tts.hivoice.cn/tts/tts';
var asrUrl = 'http://api.hivoice.cn:80/USCService/WebApi';
var asrAppId = 'uf6tdl24igd5micxxdylhrhd5r7jd6dfzhji63ii';
var asrUserId = 'dancindream';
var dataType = 'audio/x-wav;codec=pcm;bit=16;rate=16000';
var deviceId = '57349abd2390';
var startTime = 0;
var endTime = 0;
var ttsChoice = 0; //0 for iFlyTek, 1 for yunzhisheng, anything else for mp3
var commandRecognizeLoadingDialog;

function init() {

}

// GM API CALLS
// *************Recording************************/

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for ( var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = (str.charCodeAt(i)) & 0xFF;
  }
  return buf;
}
var SR_ParesString = function(args) {
	hide('mic_listen');
	var finalResult = args.replace(/<\/s>/g,",");
	finalResult = finalResult.replace(/<s>/g,"");
	console.log(finalResult);
//	startTTS(finalResult);
	startTest(finalResult.substr(0, finalResult.length - 1));
	console.log("cut: " + finalResult.substr(0, finalResult.length - 1));
};

function fnCallback1  (objBinaryFile) {
  if (objBinaryFile) {
    var data = str2ab(objBinaryFile['Content']);
    console.log('upload data:' + (typeof data));
    var audioLength = objBinaryFile['ContentLength'];
    var method = 'POST';
    var url = sprintf('%s?appkey=%s&userid=%s&id=%s', asrUrl , asrAppId, asrUserId, deviceId);
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
    	commandRecognizeLoadingDialog.close();
        var result = http.responseText;
        logger.appendLine('received message from ASR:' + result);
        SR_ParesString(result);
      } else {
    	  logger.appendLine('识别中，请稍后.');
      }
    };
    http.open(method, url, true);
    http.setRequestHeader("Accept-Language", "zh_CN");
    http.setRequestHeader("Accept-Topic", "general");
    http.send(data);
  } else {
	  logger.appendLine('识别中，请稍后.');
  }

}

function uploadFile() {
  commandRecognizeLoadingDialog = gm.ngi.msgbox.showLoad("语音指令识别中...");
  var href = window.location.href;
  var appRootUrl = href.substr(0, href.lastIndexOf("index"));
  var file = appRootUrl +  filePath;
  GetBinaryFile(file, fnCallback1, debugDiv);
}

function uploadFile1() {
	  commandRecognizeLoadingDialog = gm.ngi.msgbox.showLoad("语音指令识别中...");
	  var href = window.location.href;
	  var appRootUrl = href.substr(0, href.lastIndexOf("index"));
	  var file = appRootUrl +  filePath;
	  console.log("uploadFile1");
		hide('mic_listen');
	  GetBinaryFile(file, fnCallback, debugDiv);
	}

function startSpeechSession1() {
  speechRecSessionID = gm.voice.startSpeechRecSession(
    function() {
      console.log('Success: startSpeechRecSession.');
    },
    function() {
      console.log('Failure: startSpeechRecSession.');
    }
);
}

function stopSpeechSession1() {
  gm.voice.stopSpeechRecSession(speechRecSessionID);
  hide('mic_listen');
}

function startRecording1() {
  gm.voice.startRecording(
    function(responseObj) {
      playSuccessSound();
      logger.appendLine('start to record... ');
      var index = responseObj.indexOf('data');
      if (index >= 0) {
        filePath = responseObj.substring(index);
      } else {
        filePath = 'data/' + responseObj;
      }
      console.log("record filePath: "+ filePath);
      if(ttsChoice == 0){
    	  setTimeout(uploadFile1, 200);
      }else if(ttsChoice ==1){
    	  setTimeout(uploadFile, 200);
      }
      console.log('Success: startRecording1.');
    },
    function() {
      logger.appendLine('Failure: startRecording. ');
      console.log('Failure: startRecording1.');
    },
    {
      intro : 0,
      silenceDetection : true,
      silenceLength : 1000,
      maxRecordingWindow : 5000,
      noiseSuppression : 'Standard'
    }
);
}

function stopRecording1() {
  gm.voice.stopRecording(
    function(dataPath) {
      console.log('Success: stopRecording. Path: ' + dataPath);
    },
    function() {
      console.log('Failure: stopRecording.');
    }, speechRecSessionID
);
  stopSpeechSession1();
}

function playFile() {
  if (!filePath) {
    return;
  }
  var audio = document.createElement('audio');
  audio.setAttribute('src', filePath);
  audio.play();
}

function playStartSound() {
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'voicestart.wav');
  audio.play();
  setTimeout(startRecording1, 1000);
}

function playSuccessSound() {
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'audio/success.wav');
  audio.play();
}

function doExit() {
  gm.system.closeApp(function() {
      
    });
}
var startTTS = function(args){
	startTime = new Date().getTime();
	console.log('StartTime: ' + startTime);
	console.log('ttsChoice: ' + ttsChoice);
	if (ttsChoice == 1) {
		startHttpTTS1(args); //云知声
	}
	else if (ttsChoice == 0) {
		startTTS2(args); //iFlyTek
	}
};
var startHttpTTS1 = function(text){ //云知声
	var deviceId = '57349abd2390';
	var url = sprintf('%s?appkey=%s&userid=%s&id=%s',ttsUrl,asrAppId,asrUserId,deviceId);
	var enStr =  sprintf('&type=0&speed=1.0&message=%s',encodeURIComponent(text));
	url = url+ enStr;
	playMP3(url);
	endTime = new Date().getTime();
	console.log('EndTime: ' + endTime);
	console.log('TimeElapsed: ' + (endTime - startTime));
	return;
};

var startTTS2 = function(args) { //iflytek
	console.log("startTTS2", "you came into this logic!");
	  //input1.innerHTML = '';
	  //var text = args;
	  var str = args;// + new Date().getTime();
//	  text.innerHTML = str;
	  var method = 'POST';
	//  var url = "http://114.80.245.190/NGIServer/ttsUpload";
	//  var url = "http://192.168.1.101:80/NGIServer/ttsUpload";
	  var url = "http://180.168.173.133:80/NGIServer/ttsUpload";
	//  var url = "http://114.80.245.191:80/NGIServer/ttsUpload";
	//  var url = "http://192.168.11.108:80/NGIServer/ttsUpload";
	  var IflyClient = new XMLHttpRequest();
	  IflyClient.onload = function(e) {
	    if (this.status == 200) {
	      var responseText = IflyClient['responseText'];
		  logger.appendLine("responseText from Iflyserver: "+responseText);
	      var response = eval("(" + responseText + ")");
	      var playUrl = response['responseUrl'];
//	      var audioContainer = document.getElementById('audio_container2');
//	      var audio = document.createElement('audio');
//	      audio.autoplay = true;
//	      var source = document.createElement('source');
//	      audio.appendChild(source);
//	      source.type = 'audio/mpeg';
//	      source.src = playUrl;
//	      console.log("Audio", audio);
//	      audioContainer.appendChild(audio);
	      palyAudio(playUrl);
	      return false;
	    } else {
	      console.log("response failed");
	    }
	  };
	  console.log('url:' + url);
	  IflyClient.open(method, url, true);
	  IflyClient.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	  IflyClient.send('ttsContent=' + str);
	  endTime = new Date().getTime();
	  console.log('EndTime: ' + endTime);
	  console.log('TimeElapsed: ' + (endTime - startTime));
	};
