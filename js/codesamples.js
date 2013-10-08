/*
 * Code-samples JavaScript
 */

var file;
var href = window.location.href;
var appRootUrl = href.substr(0, href.lastIndexOf("/"));
var flag = 0;
var pop=0;

var asr = 1; //0 for iFlyTek, 1 for 云知声


/*function init() {
	//diagnosisMaintain(pop);
	//var str = "audio/onstar_ready_apr_5.mp3";
	//palyAudio(str);
	attachAppTray();
	//initSpeech();
	
	
}
function attachAppTray() {

	var topFrame = window.parent.window;
	var appTray = topFrame.document.getElementById("app_window_top_row");
	var bot = topFrame.document.getElementById("interaction_selectors");

	bot.style.visibility = "hidden";
	appTray.style.visibility = "hidden";

}*/
var recordingHandle;


function init() {
	addEventListener();
	// startVechileDataFetch();
}

function addEventListener() {
	addEventHandler($$('showVechileData'), 'click', function() {
		showLogPanel();
		logger.clearLog();
		fetchVechileData();
	});

	addEventHandler($$('cls_log'), 'click', function() {
		logger.clearLog();
		$$('log_div').innerHTML = logger.getLog();
	});
}

function initSpeech() {
	console.log(pageHistory[currentPage]);
	if (typeof (recordingHandle) != "undefined") {
		runspeeh();
		console.log("undefined");
	} else {
		var str = "audio/onstar_ready_apr_5.mp3";
		palyAudio(str);
		startTTS('安吉星就绪');
		setTimeout("speech()", 2000);
		console.log("init speech completed");
	}
}

function listening() {
	
}

var speech = function() { 
	if (asr == 0) { //iFlyTek
		if (typeof (recordingHandle) != "undefined") {
			startRecording();
			logger.appendLine("recordingHandle=").append(recordingHandle);
			console.log("recordingHandle:    "+recordingHandle);
			//console.log(123456);
		} else {
			startSpeechSession();
			startRecording();
			//console.log(789);
		}
		KeywdInit();
	}
	else { //云知声
		if (typeof (recordingHandle) != "undefined") {
			logger.appendLine("start recordingHandle=").append(recordingHandle);
			startRecording1();
			console.log("end recordingHandle:    "+recordingHandle);
		} else {
			logger.appendLine("recordingHandle:    "+recordingHandle);
			startSpeechSession1();
			startRecording1();
		}
		KeywdInit();
	}
};

//var speech = function() { //云知声 
//	if (typeof (recordingHandle) != "undefined") {
//		startRecording1();
//		console.log("recordingHandle:    "+recordingHandle);
//		//console.log(123456);
//	} else {
//		startSpeechSession1();
//		startRecording1();
//		//console.log(789);
//	}
//	KeywdInit();
//};

function startSpeechSession() {
	
	gm.voice.startSpeechRecSession(function(args) {
		recordingHandle = args;
		console.log(args);
	});

};

function stopRecording() {

	gm.voice.stopRecording(function(file) {
		console.log('Success: stopRecording. Path: ' + dataPath);
	}, function() {
		console.log('Failure: stopRecording.');
	});
};

function startRecording() {
	//var date = new Date();
	//var record_start_time = date.getTime();
	gm.voice.startRecording(function(args) {
		var endDate = new Date();
		var record_end_time = endDate.getTime();
		console.log("recording end: " + record_end_time);
		setTimeout("iflyIat()", 100);
	}, function(str) {
		console.log(str);
	}, {
		intro : 0,
		silenceDetection : true,
		silenceLength : 500,
		maxRecordingWindow : 3000,
		noiseSuppression : "Low"
	});
};

var startRec = function() {
	console.log(123456);
};

var fnCallback = function(objBinaryFile) {

	var filecontents;
	if (objBinaryFile) {
		filecontents = objBinaryFile.Content;
		console.log("filecontents: " + objBinaryFile.ContentLength);
		var contentLength = 0;
		var audioLength = 0;
		var params = new String();
		var method = 'post';
		var url = "http://60.166.12.146:80/index.htm";
		audioLength = parseInt(objBinaryFile.ContentLength);
		params = "----\r\nCL:237\r\nCT:text/plain\r\n\r\nver=MSSP+0%2E9&sub=iat&rse=utf%2D8&auf=audio%2FL16%3Brate%3D16000&ent=sms16k&ssm=0&rst=plain&aue=raw&cver=3%2E0%2E0%2E1034&key=0fX^b8bT6WPH290001DjlUQz^tHMpkdle26RAoRCdFSPM^HBywnTxKrV7zqvWcfoIVp9yUqE9fS92yqmxI^jzj9Rmhs5T9hkChsqpsSPo84/U=\r\n----";
		params += "\r\nCL:" + audioLength
				+ "\r\nCT:audio/L16;rate=16000\r\nCE:raw\r\n\r\n";
		contentLength = audioLength + params.length + 8;
		console.log("contents-len: " + contentLength);
		var file_buff = str2ab(filecontents);
		var IflyClient = new XMLHttpRequest();
		IflyClient.onreadystatechange = function() {
			if (IflyClient.readyState == 4)
				if (IflyClient.status == 200) {
					var retVal = IflyClient.response;
					iflyParesString(retVal);
					var endDate = new Date();
					var record_end_time = endDate.getTime();
					console.log("get data end: " + record_end_time);
				} else
					console.log("get file failed");
		}, IflyClient.open(method, url, !0), IflyClient.setRequestHeader(
				"Content-Type", "multipart/mixed;boundary=--");
		var bb = new Blob([ params, file_buff, "\r\n------" ], {
			type : 'application/wav'
		});

		IflyClient.send(bb);

		var endDate = new Date();
		var record_end_time = endDate.getTime();
		console.log("send data begin: " + record_end_time);

	} else {
		alert('There was some error while trying to fetch the binary file!');
	}
};
var iflyIat = function(filecontents) {
	hide('mic_listen');
	try {
		// var filename = '../temp/speech.pcm';
		// var filecontents = gm.io.readFile(filename);
		// var href = window.location.href;
		// var appRootUrl = href.substr(0, href.indexOf("index"));
		file = appRootUrl + '/data/temp/speech.pcm';
		GetBinaryFile(file, fnCallback);
	} catch (e) {
		// TODO: handle exception
		console.log(e);
	}
};

var runspeeh = function() {
	var str = "audio/beep_speech_on.mp3";
	palyAudio(str);
	setTimeout("speech()", 500);
};

var count = 0;
var isTag = true;
var isDealer = false;
var startTest = function(args) {

	var menu = MenuTypeEnum.eTagKeyWds01 + MenuTypeEnum.eTagKeyWds02
			+ MenuTypeEnum.eTagKeyWds03 + MenuTypeEnum.eTagKeyWds04
			+ MenuTypeEnum.eTagKeyWds05 + MenuTypeEnum.eTagKeyWds06
			+ MenuTypeEnum.eTagKeyWds07 + MenuTypeEnum.eTagKeyWds08
			+ MenuTypeEnum.eTagKeyWds09 + MenuTypeEnum.eTagKeyWds10
			+ MenuTypeEnum.eTagKeyWds11 + MenuTypeEnum.eTagKeyWds12
			+ MenuTypeEnum.eTagKeyWds13 + MenuTypeEnum.eTagKeyWds14
			+ MenuTypeEnum.eTagKeyWds15 + MenuTypeEnum.eTagKeyWds16
			+ MenuTypeEnum.eTagKeyWds17 + MenuTypeEnum.eTagKeyWds18
			+ MenuTypeEnum.eTagKeyWds19 + MenuTypeEnum.eTagKeyWds20
			+ MenuTypeEnum.eTagKeyWds21 + MenuTypeEnum.eTagKeyWds22
			+ MenuTypeEnum.eTagKeyWds23 + MenuTypeEnum.eTagKeyWds24
			+ MenuTypeEnum.eTagKeyWds25 + MenuTypeEnum.eTagKeyWds26
			+ MenuTypeEnum.eTagKeyWds27 + MenuTypeEnum.eTagKeyWds28
			+ MenuTypeEnum.eTagKeyWds29 + MenuTypeEnum.eTagKeyWds30
			+ MenuTypeEnum.eTagKeyWds31 + MenuTypeEnum.eTagKeyWds32
			+ MenuTypeEnum.eTagKeyWds33 + MenuTypeEnum.eTagKeyWds34
			+ MenuTypeEnum.eTagKeyWds35 + MenuTypeEnum.eTagKeyWds36
			+ MenuTypeEnum.eTagKeyWds37 + MenuTypeEnum.eTagKeyWds38
			+ MenuTypeEnum.eTagKeyWds39 + MenuTypeEnum.eTagKeyWds40;
	console.log("input text:  " + args);
	// args="4s";
	var strOutMenu = MenuSel(menu, args);
	var strOutput = "none";

	if (strOutMenu != " ") {
		hide('mic_listen');
		switch (strOutMenu) {
		case MenuTypeEnum.eTagKeyWds01:
			strOutput = "电话";
			/*var str = "audio/calling_contact_apr_5.mp3";
			palyAudio(str);
			onCallVoice();*/
			hide(pageHistory[currentPage]);
			reveal('callscreen');
			addToHistory('callscreen');
			palyAudio("audio/busy_tone_may_3.wav");
			reveal('altend');
			break;
		case MenuTypeEnum.eTagKeyWds02:
			strOutput = "导航";
			//navigationVoice();
			//palyAudio("audio/navigation_to_apr_5.mp3");
			startTTS('开始导航');
			palyAudio("audio/navigation_to_apr_5.mp3");
			setTimeout(function() {
				hide(pageHistory[currentPage]);
				reveal('navscreen');
				addToHistory('navscreen');
			}, 3000);
			break;
		case MenuTypeEnum.eTagKeyWds03:
			strOutput = "诊断与保养";
			enterVehicleStatus();
			//setTimeout("diagnosis(0,"+pop+")", 6000);
			//diagnosis(0,pop);
			//var str = "eng_detail_msg_apr_2_2013.mp3";
			///palyAudio(str);
			break;
		case MenuTypeEnum.eTagKeyWds04:
			strOutput = "电子书";
			break;
		case MenuTypeEnum.eTagKeyWds05:
			strOutput = "短信";
			break;
		case MenuTypeEnum.eTagKeyWds06:
			strOutput = "邮件";
			break;
		case MenuTypeEnum.eTagKeyWds07:
			strOutput = "诊断";
			enterVehicleStatus();
			//setTimeout("diagnosis(0,"+pop+")", 6000);
			//diagnosis(0,pop);
			//var str = "eng_detail_msg_apr_2_2013.mp3";
			///palyAudio(str);
			break;
		case MenuTypeEnum.eTagKeyWds08:
			strOutput = "保养";
			//diagnosis(2,pop);
			hide(pageHistory[currentPage]);
			reveal('maintenance');
			addToHistory('maintenance');
			/*var str = "audio/fuel_filter_detail_apr_2_2013.mp3";
			palyAudio(str);*/
			break;
		case MenuTypeEnum.eTagKeyWds09:
			strOutput = "系统提醒";
			hide(pageHistory[currentPage]);
			reveal('systemcheck');
			addToHistory('systemcheck');
			break;
		case MenuTypeEnum.eTagKeyWds10:
			strOutput = "其他系统";
			break;
		case MenuTypeEnum.eTagKeyWds11:
			strOutput = "发动机";
			//diagnosis(1,pop);
			if (document.getElementById('carebtnalt').style.display == 'none') {
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes1');
				hide('title1');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes1');
				hide('title1');
			}
			var str = "audio/detail_engine_apr_9.mp3";
			palyAudio(str);
			startTTS('此系统的功能主要为把能量转化为车轮前进的动力并同时传给车轮');
			} else { //If there is a warning in progress
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				hidePrev('ydes1');
				hide('title1');
				hide('ytitle1');
				addToHistory('systemcheck');
				palyAudio('audio/eng_detail_msg_apr_2_2013.mp3');
			}
			break;
		case MenuTypeEnum.eTagKeyWds12:
			strOutput = "制动";
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes5');
				hide('title5');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes5');
				hide('title5');
			}
			var str = "audio/detail_brake_apr_27.mp3";
			palyAudio(str);
			startTTS('监控防抱死刹车系统，从而减少在光滑的路面上所需的制动距离。同时还可以监控牵引控制和稳定系统，帮助车辆在不利的教师情况下依旧保持受控制状态。');
			break;
		case MenuTypeEnum.eTagKeyWds13:
			strOutput = "排放";
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes2');
				hide('title2');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes2');
				hide('title2');
			}
			var str = "audio/detail_emission_apr_27.mp3";
			palyAudio(str);
			startTTS('限制车辆的废气系统，包括在排气管内保存燃油和蒸汽和通过提高发动机运转效率限制排气管的废气排放');
			break;
		case MenuTypeEnum.eTagKeyWds14:
			strOutput = "气囊";
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes3');
				hide('title3');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes3');
				hide('title3');
			}
			var str = "audio/detail_airbag_apr_9.mp3";
			palyAudio(str);
			startTTS('控制盒打开车辆的安全气囊系统');
			break;
		case MenuTypeEnum.eTagKeyWds15:
			strOutput = "稳定性";
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes4');
				hide('title4');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes4');
				hide('title4');
			}
			var str = "audio/detail_stability_apr_27.mp3";
			palyAudio(str);
			startTTS('是一个高级的计算机控制系统，它能在复杂的教师情况下帮助司机稳定地控制方向，它主要运用车辆的动能传感器和方向定位系统的输入数据来有选择的应用在车辆刹车系统并必要时减少发动机能量。');
			break;
		case MenuTypeEnum.eTagKeyWds16:
			strOutput = "防抱死";
			break;
		case MenuTypeEnum.eTagKeyWds17:
			strOutput = "安吉星系统";
			if (pageHistory[currentPage] == 'systemcheck') {
				hidePrev('gdes6');
				hide('title6');
			}
			else {
				hide(pageHistory[currentPage]);
				reveal('systemcheck');
				addToHistory('systemcheck');
				hidePrev('gdes6');
				hide('title6');
			}
			var str = "audio/detail_onstar_apr_27.mp3";
			palyAudio(str);
			startTTS('维护您的车辆的安吉星系统的正常运作');
			break;
		case MenuTypeEnum.eTagKeyWds18:
			strOutput = "油耗";
			break;
		case MenuTypeEnum.eTagKeyWds19:
			strOutput = "机油";
			break;
		case MenuTypeEnum.eTagKeyWds20:
			strOutput = "胎压";
			break;
		case MenuTypeEnum.eTagKeyWds21:
			strOutput = "滤清器";
			break;
		case MenuTypeEnum.eTagKeyWds22:
			strOutput = "油液";
			break;
		case MenuTypeEnum.eTagKeyWds23:
			strOutput = "喷油器";
			break;
		case MenuTypeEnum.eTagKeyWds24:
			strOutput = "刹车片";
			break;
		case MenuTypeEnum.eTagKeyWds25:
			strOutput = "呼叫4S店";
			/*switch (flag) {
			case 3:

				time = 13000;
				break;
			case 4:
				time = 4000;
				break;
			}
			var str = "audio/call_or_select_apr_5.mp3";
			if (str != "")
				palyAudio(str);
			diagnosis(3,pop);
			if (isDealer) {
				diagnosis(flag,pop);
				setTimeout("runspeeh()", time);
			}*/
			hide(pageHistory[currentPage]);
			reveal('dealerscreen');
			addToHistory('dealerscreen');
			palyAudio('audio/call_or_select_apr_5.mp3');
			setTimeout(function() {
				if (pageHistory[currentPage] == 'dealerscreen') {
					hide('dealerscreen');
					reveal('callscreen');
					addToHistory('callscreen');
					palyAudio('audio/busy_tone_may_3.wav');
				}
			}, 5000);

			console.log(strOutput);
			break;
		case MenuTypeEnum.eTagKeyWds26:
			strOutput = "客服";
			break;
		case MenuTypeEnum.eTagKeyWds27:
			strOutput = "指定";
			break;
		case MenuTypeEnum.eTagKeyWds28:
			strOutput = "附近经销商";
			break;
		case MenuTypeEnum.eTagKeyWds29:
			strOutput = "贴士";
			break;
		case MenuTypeEnum.eTagKeyWds30:
			strOutput = "查看地图";
			navigationVoice();
			break;
		case MenuTypeEnum.eTagKeyWds31:
			strOutput = "保存";
			break;
		case MenuTypeEnum.eTagKeyWds32:
			strOutput = "编辑";
			break;
		case MenuTypeEnum.eTagKeyWds33:
			strOutput = "主菜单";
			break;
		case MenuTypeEnum.eTagKeyWds34:
			strOutput = "返回";
			backOne();
			break;
		case MenuTypeEnum.eTagKeyWds35:
			strOutput = "退出";
			break;
		case MenuTypeEnum.eTagKeyWds36:
			strOutput = "第一个";
			break;
		case MenuTypeEnum.eTagKeyWds37:
			strOutput = "第二个";
			break;
		case MenuTypeEnum.eTagKeyWds38:
			strOutput = "第三个";
			break;popup
		case MenuTypeEnum.eTagKeyWds39:
			strOutput = "立即";
			console.log(789);
			indexInput(2);
			diagnosis(flag,pop);
			var str = "";
			var time = 4000;
			switch (flag) {
			case 1:
				str = "audio/eng_detail_msg_apr_2_2013.mp3";
				time = 13000;
				flag = 3;
				break;
			case 2:
				str = "audio/fuel_filter_detail_apr_2_2013.mp3";
				time = 4000;
				flag = 4;
				break;
			}
			if (str != "")
				palyAudio(str);
			// setTimeout("speech()", time);
			isDealer = true;
			setTimeout("runspeeh()", time);
			break;
		case MenuTypeEnum.eTagKeyWds40:
			strOutput = "稍后";
//			if (flag == 2) {
//				var str = "audio/maintain_delay_action_apr_2_2013.mp3";
//				palyAudio(str);
//			}
			indexInput(2);
			// diagnosis(1);
			break;
		}
		count = 0;
		//$('#nonvoice').show();
		//$('#voice').hide();

	} else if (isTag) {
		console.log("**********9999999");
		count++;
		if (count > 2) {
			var str = "audio/error_use_screen_apr_6.mp3";
			palyAudio(str);
			startTTS('您可以选用触摸屏操作');
			count = 0;
			setTimeout(2000);
			hide('mic_listen');
		} else {
			var str = "audio/error_say_it_again_apr_6.mp3";
			palyAudio(str);
			startTTS('识别错误,请再说一次');
			setTimeout("runspeeh()", 3000);
		}

	}

	// runcmd();

	// alert(strOutput);

	console.log(args);
};

var iflyParesString = function(args) {
	console.log(args);
	var result = args;
	var reg = /(.*)。?/g;
	var r_result = result.match(reg);
	var html_str = new String();
	if (r_result == null) {
		html_str = "无法获得识别结果";
	} else {
		html_str = r_result;
	}

	var str = html_str.toString();
	 console.log("raw_str:" + str);
	 console.log("html_str: " + str.substr(0, str.length - 1));
	startTest(str.substr(0, str.length - 1));
	// document.getElementById("result").innerHTML = html_str;
};

//function str2ab(str) {
//	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
//	var bufView = new Uint8Array(buf);
//	for ( var i = 0, strLen = str.length; i < strLen; i++) {
//		bufView[i] = (str.charCodeAt(i)) & 0xFF;
//	}
//	return buf;
//}

function popUp(rand) {
	var time = 4000;
	var str = "";
	switch (rand) {
	case 1:
		$('#modal1').hide();
		$('#modal0').show();
		str = "audio/system_warning_apr_5.mp3";
		flag = 1;
		pop=1;
		break;
	case 2:
		$('#modal0').hide();
		$('#modal1').show();
		str = "audio/maintain_warning_apr_5.mp3";
		time = 5000;
		flag = 2;
		pop=2;
		break;
	case 4:
		$('#modal1').hide();
		$('#modal0').show();
		//str = "system_warning_apr_5.mp3";
		flag = 1;
		pop=4;
		break;
	}
	if(rand!=3){
		$('#waringId').show();
		$("#openModal").removeClass('nonDialog').addClass('modalDialog');
		window.location.href = "index.html#openModal";
		if (str != "") {
			palyAudio(str);
		}
	}else{
		pop=3;
		$('#waringId').show();
	}
	setTimeout("speech()", time);
}

function name() {

}

function indexInput(index) {
	if (index == 1) {

	} else {

		$("#openModal").removeClass('modalDialog').addClass('nonDialog');
	}
}
function cancelModal(index) {
	isTag = false;
	if (index == 0) {
		indexInput(2);
	} else {
		diagnosis(index,pop);
	}
}

function showHomeBtn() {
	$('#sys_exit').hide();
	$('#home').show();
	$('#waringId').hide();
}

function backHome() {
	location.href = "index.html";
}
function diagnosisMaintain() {
	
		//var str = "err_main_msg_mar_28_2013.mp3";
		//palyAudio(str);
		setTimeout("pauseFirst("+pop+")", 1000);
	
}

function onStarReady() {
	var str = "audio/onstar_ready_apr_5.mp3";
	palyAudio(str);
}

function closeApp() {
	

}
var pageArray = new Array();
var pageSize=0;
function addPage(size,page){
	
	
	pageSize=size;
	//console.log(pageSize);
}

function backPage() {
	switch (pageSize) {
	case 0:
		console.log("pageArray:  "+pageArray[0]);
		break;
	case 1:
		console.log("pageArray:  "+pageArray[1]);
		break;
	case 2:
		console.log("pageArray:  "+pageArray[2]);
		break;
	case 3:
		console.log("pageArray:  "+pageArray[3]);
		break;

	default:
		break;
	}

	
	//$("#rightFrame").attr("src", appRootUrl + "/diagnosisMaintain.html?name="+name+"&pop="+pop);
	pageSize--;
}
var add=new addPage();
function diagnosis(index,pop) {
	var name;
	switch (index) {
	case 0:
		name='index';
		break;
	case 1:
		name='error';
		indexInput(2);
		break;
	case 2:
		name='exception';
		indexInput(2);
		break;
	case 3:
		name="dealer";
		break;
	case 4:
		name="maintain";
		break;
	}
	if(pop==2){
	   name='exception';
	}else if(pop==3){
		name='error';
	}else if(pop==4){
		pop=3;
		name='error';
	}
	var href = window.location.href;
	var appRootUrl = href.substr(0, href.lastIndexOf("/"));
	$('#nonrightView').hide();
	$('#rightView').show();
	showHomeBtn();
	//console.log("rightView");
	//addPage(0,href.substr(href.lastIndexOf("/")));
	if(index==0){
		$("#rightFrame").attr("src", appRootUrl + "/diagnosisMaintain.html?name="+name+"&pop="+pop);
		var str="";
		if(pop=='0')
		{
			str = "audio/diag_overview_good_apr_9.mp3";
		}else{
			str = "audio/eng_detail_msg_apr_2_2013.mp3";
		}
		palyAudio(str);
	}else{
	$("#rightFrame").attr("src", appRootUrl + "/diagnosisMaintain.html?name="+name+"&pop="+pop);
	//var input=inputHtml();
	}
	//$(window.frames["rightFrame"].document).contents().find("fault").html(input);

}

var href = window.location.href;
var appRootUrl = href.substr(0, href.lastIndexOf("/"));
function jumpDealer(parm,call) {
	console.log("call:  "+call);
	if(parm=='maintain'){
		$("#diagnosis").removeClass('selected');
		$("#offId").addClass('selected');
		$("#jquery").hide();
		$("#official").show();
		$("#divprog").hide();
		$("#nondivprog").show();
		addPage(1,href.substr(href.lastIndexOf("/")));
		$("#divprogFrame").attr("src", appRootUrl + "/dealer.html");
	}else if(parm=='dealer'){
		$("#offId").removeClass('selected');
		$("#diagnosis").addClass('selected');
		$("#official").hide();
		$("#jquery").show();
		$("#detail").show();
		$("#nondetail").hide();
		addPage(1,href.substr(href.lastIndexOf("/")));
		$("#detailFrame").attr("src", appRootUrl + "/dealer.html?call="+call);
	}
}

function callDealer() {
	$("#nondetail").hide();
	$("#detail").show();
	var href = window.location.href;
	var appRootUrl = href.substr(0,  href.lastIndexOf("/"));
	addPage(1,href.substr(href.lastIndexOf("/")));
	$("#detailFrame").attr("src", appRootUrl + "/dealer.html");
	var str = "audio/call_or_select_apr_5.mp3";
	palyAudio(str);
	setTimeout("onCall()", 4000);
	
}

function onCall() {
	var href = window.location.href;
	var appRootUrl = href.substr(0, href.lastIndexOf("/"));
	var name="qw";
	$('#nonCall').hide();
	addPage(2,href.substr(href.lastIndexOf("/")));
	window.location.href = appRootUrl + "/call.html?name=" + name;
}
function navigation() {
	
	var href = window.location.href;
	var appRootUrl = href.substr(0, href.lastIndexOf("/"));
	var name="qw";
	$('#nonCall').hide();
	addPage(2,href.substr(href.lastIndexOf("/")));
	parent.location.href = appRootUrl + "/navigation.html?name=" + name;
}

function backDealer() {
	var str="audio/busy_tone_may_3.wav";
	palyAudio(str);
}

function backPage() {
	window.location.href= appRootUrl+"/diagnosisMaintain.html?name=dealer&pop="+pop+"&call=call";
	
}