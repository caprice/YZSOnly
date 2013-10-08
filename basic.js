/*
 * JavaScript file
 */



function init()
{
	// TODO Add your code here
	attachAppTray();
	var starting = "audio/onstar_ready_apr_5.mp3";
	palyAudio(starting);
	startTTS('安吉星就绪');

}

var pageHistory = new Array('homepage');
var currentPage = 0;
var openRegion = 'gdes1';

function attachAppTray() {

	var topFrame = window.parent.window;
	var appTray = topFrame.document.getElementById("app_window_top_row");
	var bot = topFrame.document.getElementById("interaction_selectors");

	bot.style.visibility = "hidden";
	appTray.style.visibility = "hidden";

}

function toggle(id) {
	
	var ele = document.getElementById(id);
	if (ele.style.display == 'none')
		ele.style.display = 'block';
	else
		ele.style.display = 'none';
}

function reveal(id) {
	var page = document.getElementById(id);
	page.style.display = 'block';
}

function hide(id) {
	var page = document.getElementById(id);
	page.style.display = 'none';
}

function addToHistory(id) {
	if (id != pageHistory[currentPage]){
		pageHistory.push(id);
		currentPage = currentPage + 1;
	}
	
}

function backOne() {
	if (pageHistory.length > 1) {
		hide(pageHistory[currentPage]);
		currentPage = currentPage - 1;
		pageHistory.pop();
		reveal(pageHistory[currentPage]);
	}
}

function showAlert(id) {
	var alertMsg = document.getElementById(id);
	alertMsg.style.display = 'block';
	alertMsg.style.opacity = 1;
}

function hideAlert(id) {
	var alertMsg = document.getElementById(id);
	alertMsg.style.display = 'none';
	alertMsg.style.opacity = 0;
}



function hidePrev(id) {
	var catType = openRegion.substr(0,4);
	var catNum = openRegion.charAt(4);
	hide(openRegion);
	if (catType.search('gdes') >= 0) {
		reveal('title'.concat(catNum));
	}
	else if(catType.search('ydes') >= 0) {
		reveal('ytitle'.concat(catNum));
	}
	else if(catType.search('rdes') >= 0) {
		reveal('rtitle'.concat(catNum));
	}
	reveal(id);
	openRegion = id;
}

function enterVehicleStatus() {
	var str="audio/doing_diag_apr_9.mp3";
	palyAudio(str);
	console.log('Before TTS');
	startTTS('正在诊断车辆，请稍等');
	console.log('TTS Passed');
	setTimeout(function() {
		if (document.getElementById('carebtnalt').style.display == 'none') {
			str="audio/diag_overview_good_apr_9.mp3";
			palyAudio(str);
			startTTS('检测完毕，你的车辆系统正常');
			hide(pageHistory[currentPage]);
			displayVechileStatusData();
			reveal('vehiclestatus');
			addToHistory('vehiclestatus');
		} else {
			palyAudio('audio/diag_overview_apr_5.mp3');
			startTTS('发动机系统异常，剩余机油寿命百分之3.9，建议您联系4S店做进一步检查');
			hide(pageHistory[currentPage]);
			reveal('systemcheck');
			addToHistory('systemcheck');
			hidePrev('ydes1');
			hide('title1');
			hide('ytitle1');
		}
		}, 6000);
}

function callButtonPress() {
	reveal('dealerscreen');
	addToHistory('dealerscreen');
	stopAudio();
	startTTS('呼叫陈经理，您也可以选择其他联系人');
	palyAudio('audio/call_or_select_apr_5.mp3');
	setTimeout(function() {
		if (pageHistory[currentPage] == 'dealerscreen') {
			hide('dealerscreen');
			reveal('callscreen');
			addToHistory('callscreen');
			palyAudio('audio/busy_tone_may_3.wav');
		}
	}, 7000);
}

function goToNav() {
	palyAudio("audio/navigation_to_apr_5.mp3");
	startTTS('开始导航');
	setTimeout(function() {
		hide(pageHistory[currentPage]);
		reveal('navscreen');
		addToHistory('navscreen');
	}, 3000);
}

function displayVechileStatusData(){
	$$('tire_left_front').innerHTML = fetchVechileDataByParm('tire_left_front_pressure')+"kPa";
	$$('tire_left_rear').innerHTML = fetchVechileDataByParm('tire_left_rear_pressure')+"kPa";
	$$('tire_right_front').innerHTML = fetchVechileDataByParm('tire_right_front_pressure')+"kPa";
	$$('tire_right_rear').innerHTML = fetchVechileDataByParm('tire_right_rear_pressure')+"kPa";
}