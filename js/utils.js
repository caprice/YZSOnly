// JavaScript Document
/*update by 2013.9.15*/

/*getElementById
 * @param {String} id ID值
 */
var $$ = function(id) {
	if (typeof id != "undefined" && typeof id === "string") {
		return document.getElementById(id);
	}
	return null;
};

/*
 * 添加事件 @param {Object} oTarget 对象 @param {String} sEventType 事件类型 @param
 * {Function} fnHandler 事件方法
 */
var addEventHandler = function(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

/*
 * 注销事件 @param {Object} oTarget 对象 @param {String} sEventType 事件类型 @param
 * {Function} fnHandler 事件方法
 */
var romoveEventHandler = function(oTarget, sEventType, fnHandler) {
	if (oTarget.removeEventListener) {
		oTarget.removeEventListener(sEventType, fnHandler, false);
	} else if (oTarget.detachEvent) {
		oTarget.detachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = "";
	}
};

/*
 * json扩展 @param {Object} target 目标json @param {Object} src 源json
 */
var extendJson = function(target, src) {
	for ( var para in src) {
		target[para] = src[para];
	}
	return target;
};

/*
 * 在目标元素之后插入新元素 js自带方法:
 * target.appendChild(newDoc);target.insertBefore(newDoc,existingChild); @param
 * {Document} newEl 新元素 @param {Document} targetEl 目标元素
 */
var insertAfter = function(newEl, targetEl) {
	var parentEl = targetEl.parentNode;
	if (parentEl.lastChild == targetEl) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, targetEl.nextSibling);
	}
};

/*
 * 动态加载CSS文件 @param {String} file css路径 @param {String} cssid css link ID
 */
var loadCSS = function(file, cssid) {
	var cssTag = cssid ? document.getElementById(cssid) : null;
	var head = document.getElementsByTagName('head').item(0);
	if (cssTag)
		head.removeChild(cssTag);
	css = document.createElement('link');
	css.href = file;
	css.rel = 'stylesheet';
	css.type = 'text/css';
	if (cssid) {
		css.id = cssid;
	}
	head.appendChild(css);
};

/*
*
*      AjaxUtil.request({
*            url:"servlet/UserJsonServlet",
*            params:{id:userid},
*            type:'json',
*            success:processResult,
*            failure:processError
*       });
*
*/
var AjaxUtil = {

	// 基础选项
	options : {
		method : "get", // 默认提交的方法,get post
		url : "", // 请求的路径 required
		params : {}, // 请求的参数
		type : 'text', // 返回的内容的类型,text,xml,json
		success : function() {
		},// 回调函数 required
		error : function() {
		}// 回调函数 required
	},

	// 创建XMLHttpRequest对象
	createRequest : function() {
		var xmlhttp;
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");// IE6以上版本
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");// IE6以下版本
			} catch (e) {
				try {
					xmlhttp = new XMLHttpRequest();
					if (xmlhttp.overrideMimeType) {
						xmlhttp.overrideMimeType("text/xml");
					}
				} catch (e) {
					alert("您的浏览器不支持Ajax");
				}
			}
		}
		return xmlhttp;
	},
	// 设置基础选项
	setOptions : function(newOptions) {
		for ( var pro in newOptions) {
			this.options[pro] = newOptions[pro];
		}
	},
	// 格式化请求参数
	formateParameters : function() {
		var paramsArray = [];
		var params = this.options.params;
		for ( var pro in params) {
			var paramValue = params[pro];
			/*if(this.options.method.toUpperCase() === "GET")
			{
			    paramValue = encodeURIComponent(params[pro]);
			}*/
			paramsArray.push(pro + "=" + paramValue);
		}
		return paramsArray.join("&");
	},

	// 状态改变的处理
	readystatechange : function(xmlhttp) {
		// 获取返回值
		var returnValue;
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				switch (this.options.type) {
				case "xml":
					returnValue = xmlhttp.responseXML;
					break;
				case "json":
					var jsonText = xmlhttp.responseText;
					if (jsonText) {
						returnValue = eval("(" + jsonText + ")");
					}
					break;
				default:
					returnValue = xmlhttp.responseText;
					break;
				}
				if (returnValue) {
					this.options.success.call(this, returnValue);
				} else {
					this.options.error.call();
				}
			}
		} else {
			this.options.error.call();
		}
	},

	// 发送Ajax请求
	request : function(options) {
		var ajaxObj = this;

		// 设置参数
		ajaxObj.setOptions.call(ajaxObj, options);

		// 创建XMLHttpRequest对象
		var xmlhttp = ajaxObj.createRequest.call(ajaxObj);

		// 设置回调函数
		xmlhttp.onreadystatechange = function() {
			ajaxObj.readystatechange.call(ajaxObj, xmlhttp);
		};

		// 格式化参数
		var formateParams = ajaxObj.formateParameters.call(ajaxObj);

		// 请求的方式
		var method = ajaxObj.options.method;
		var url = ajaxObj.options.url;

		if ("GET" === method.toUpperCase()) {
			url += "?" + formateParams;
		}

		// 建立连接
		xmlhttp.open(method, url, true);

		if ("GET" === method.toUpperCase()) {
			xmlhttp.send(null);
		} else if ("POST" === method.toUpperCase()) {
			// 如果是POST提交，设置请求头信息
			xmlhttp.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			xmlhttp.send(formateParams);
		}
	}
};

/*
 * $class 写类工具函数 @param {Function} constructor @param {Object} prototype
 */
var $class = function(constructor, prototype) {
	var c = constructor || function() {
	};
	var p = prototype || {};
	return function() {
		for ( var atr in p) {
			arguments.callee.prototype[atr] = p[atr];
		}
		c.apply(this, arguments);
	};
};

/**
 * 用於拼接字符串
 * 
 */
function StringBuffer() {
	this._strings_ = new Array();
}

StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
	return this;
};

StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
};

StringBuffer.prototype.getLenth = function() {
	return this._strings_.length;
};

StringBuffer.prototype.clearData = function() {
	this._strings_.length = 0;
	return this;
};

function Logger() {
	this.sbf = new StringBuffer();

	this.append = function(str) {
		this.sbf.append(str);
		return this;
	};
	this.appendLine = function(str) {
		if (this.sbf.getLenth() > 0) {
			this.sbf.append("<br>").append(str);
		} else {
			this.sbf.append(str);
		}
		return this;
	};
	this.getLog = function() {
		return this.sbf.toString();
	};
	this.clearLog = function() {
		this.sbf.clearData();
	};
};

var logger = new Logger();
function logControl() {
	var logDiv = $$('log_div');
	var btnLog = $$('btn_log');
	logDiv.innerHTML = logger.getLog();
	if (logDiv.style.display != 'block') {
		btnLog.innerText = 'Hide Log';
		logDiv.style.display = 'block';
	} else {
		btnLog.innerText = 'Show Log';
		logDiv.style.display = 'none';
	}
}

function showLogPanel() {
	var logDiv = $$('log_div');
	var btnLog = $$('btn_log');
	logDiv.innerHTML = logger.getLog();
	btnLog.innerText = 'Hide Log';
	logDiv.style.display = 'block';
}


function toggle(id) {
	
	var ele = $$(id);
	if (ele.style.display == 'none')
		ele.style.display = 'block';
	else
		ele.style.display = 'none';
}

function reveal(id) {
	var page = $$(id);
	page.style.display = 'block';
}

function hide(id) {
	var page = $$(id);
	page.style.display = 'none';
}
