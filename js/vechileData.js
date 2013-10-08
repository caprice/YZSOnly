var xmlHttp;


function addExitButtonClickListener() {
  btnExit.addEventListener('click', function() {
    gm.system.closeApp(function() {
    });
  });
}


function startVechileDataFetch() {
  logger.appendLine('before first fetchVechileData');
  fetchVechileData();
  logger.appendLine('after first fetchVechileData <br>');
  setInterval(fetchVechileData, 2000);
}


function fetchVechileData() {
  gm.vehicle.getVehicleData(function(arg) {
    if (arg) {
      logger.appendLine (vechileToString(arg));
    }
  }, function() {
      logger.appendLine('fetch All vechile data failed!');
  });
}

function fetchVechileDataByParm(arg) {
	  var result = "";
	  logger.appendLine('fetch Verchile Data by parameter : ').append(arg);
	  gm.vehicle.getVehicleData(function(data) {
	    if (data) {
	  	  logger.appendLine(arg + ":" + data[arg]); 
	  	  result = data[arg];
	    }
	  }, function() {
		  logger.appendLine('fetch Verchile Data error by parameter : ').append(arg);

	  });
	  return result;
	}

function vechileToString(data) {
  if (!data)
    return null;
  var strData = '';
  var index = 0;
  for ( var item in data) {
    strData += ("<span style='width:300px; display:inline-block;'>" + item
        + ':' + data[item] + '</span>');
    index++;
    if (index % 2 == 0) {
      strData += '<br>';
    }
  }
  // if (strData) {
  // saveVehicleDataToLocal(strData);
  // }
  return strData;
}

function saveVehicleDataToLocal(content) {
  content += '\n';
  var fileName = 'data/tmp.txt';
  gm.io.writeFile(function(res) {
    logger.appendLine('saveVehicleDataToLocal success:' + res);
  }, function(res) {
	   logger.appendLine('saveVehicleDataToLocal failure:' + res);
  }, fileName, content, {
    isPrivate : false,
    overwrite : gm.io.constants.APPEND
  });
  uploadVehicleData();
}

function uploadVehicleData(data) {
  // var filePath = 'data/tmp.txt';
  // gm.io.readFile(function(res) {
  // console.log('content:' + res);
  // }, function(res) {
  //    
  // }, filePath);

  var method = 'POST';
  var url = '';
//  AjaxUtil.request({
//	  method : "POST",
//      url:url,
//      type:'json',
//      success:function(){
//    	  
//      },
//      error:function(){
//    	  
//      }
//  });
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      logDiv.innerHTML += xmlHttp.responseText;
    }
  };
  xmlHttp.open(method, url, true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.send("data=" + data);
}

function initXmlHttp() {
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXOject('Microsoft.XMLHTTP');
  }
}