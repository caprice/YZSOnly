	/*
 *  KeyWords processing javascript
 */
var KeyWds01=new Array(4 );
var KeyWds02=new Array(1);
var KeyWds03=new Array(1);
var KeyWds04=new Array(1);
var KeyWds05=new Array(1);
var KeyWds06=new Array(1);
var KeyWds07=new Array(1);
var KeyWds08=new Array(1);
var KeyWds09=new Array(1);
var KeyWds10=new Array(2);
var KeyWds11=new Array(2);
var KeyWds12=new Array(1);
var KeyWds13=new Array(1);
var KeyWds14=new Array(1);
var KeyWds15=new Array(1);
var KeyWds16=new Array(1);
var KeyWds17=new Array(1);
var KeyWds18=new Array(1);
var KeyWds19=new Array(1);
var KeyWds20=new Array(1);
var KeyWds21=new Array(1);
var KeyWds22=new Array(1);
var KeyWds23=new Array(1);
var KeyWds24=new Array(1);
var KeyWds25=new Array(2);
var KeyWds26=new Array(1);
var KeyWds27=new Array(1);
var KeyWds28=new Array(1);
var KeyWds29=new Array(1);
var KeyWds30=new Array(1);
var KeyWds31=new Array(1);
var KeyWds32=new Array(1);
var KeyWds33=new Array(2);
var KeyWds34=new Array(2);
var KeyWds35=new Array(1);
var KeyWds36=new Array(1);
var KeyWds37=new Array(1);
var KeyWds38=new Array(1);
var KeyWds39=new Array(2);
var KeyWds40=new Array(1);

var MenuTypeEnum = 
{ 
		eTagKeyWds01: "01",
		eTagKeyWds02: "02",
		eTagKeyWds03: "03",
		eTagKeyWds04: "04",
		eTagKeyWds05: "05",
		eTagKeyWds06: "06",
		eTagKeyWds07: "07",
		eTagKeyWds08: "08",
		eTagKeyWds09: "09",
		eTagKeyWds10: "10",
		eTagKeyWds11: "11",
		eTagKeyWds12: "12",
		eTagKeyWds13: "13",
		eTagKeyWds14: "14",
		eTagKeyWds15: "15",
		eTagKeyWds16: "16",
		eTagKeyWds17: "17",
		eTagKeyWds18: "18",
		eTagKeyWds19: "19",
		eTagKeyWds20: "20",
		eTagKeyWds21: "21",
		eTagKeyWds22: "22",
		eTagKeyWds23: "23",
		eTagKeyWds24: "24",
		eTagKeyWds25: "25",
		eTagKeyWds26: "26",
		eTagKeyWds27: "27",
		eTagKeyWds28: "28",
		eTagKeyWds29: "29",
		eTagKeyWds30: "30",
		eTagKeyWds31: "31",
		eTagKeyWds32: "32",
		eTagKeyWds33: "33",
		eTagKeyWds34: "34",
		eTagKeyWds35: "35",
		eTagKeyWds36: "36",
		eTagKeyWds37: "37",
		eTagKeyWds38: "38",
		eTagKeyWds39: "39",
		eTagKeyWds40: "40",

		
};

function KeywdInit()
{
	KeyWds01[0]="电话";
	KeyWds01[1]="拨号";
	KeyWds01[2]="通话";
	KeyWds01[3]="拨打";
	KeyWds02[0]="导航";
	KeyWds03[0]="诊断与保养";
	KeyWds04[0]="电子书";
	KeyWds05[0]="短信";
	KeyWds06[0]="邮件";
	KeyWds07[0]="诊断";
	KeyWds08[0]="保养";
	KeyWds09[0]="系统提醒";
	KeyWds10[0]="其他系统";
	KeyWds10[1]="正常系统";
	KeyWds11[0]="发动机";
	KeyWds11[1]="变速箱";
	KeyWds12[0]="制动";
	KeyWds13[0]="排放";
	KeyWds14[0]="气囊";
	KeyWds15[0]="稳定性";
	KeyWds16[0]="防抱死";
	KeyWds17[0]="安吉星系统";
	KeyWds18[0]="油耗";
	KeyWds19[0]="机油";
	KeyWds20[0]="胎压";
	KeyWds21[0]="滤清器";
	KeyWds22[0]="油液";
	KeyWds23[0]="喷油器";
	KeyWds24[0]="刹车片";
	KeyWds25[0]="4S";
	KeyWds25[1]="4s";
	KeyWds26[0]="客服";
	KeyWds27[0]="指定";
	KeyWds28[0]="附近经销商";
	KeyWds29[0]="贴士";
	KeyWds30[0]="查看地图";
	KeyWds31[0]="保存";
	KeyWds32[0]="编辑";
	KeyWds33[0]="主菜单";
	KeyWds33[1]="主页";
	KeyWds34[0]="返回";
	KeyWds34[1]="后退";	
	KeyWds35[0]="退出";
	KeyWds36[0]="第一个";
	KeyWds37[0]="第二个";
	KeyWds38[0]="第三个";
	KeyWds39[0]="立即";
	KeyWds39[1]="马上";
	KeyWds40[0]="稍后";
	
};

var MenuSel=function(strInMenu,txt)
{
	var strMenu=" ";
	var c=0;
	var e=strInMenu.length;
	var h;
    while(c<e &&strMenu == " ")
    {
    	h=strInMenu.charAt(c++);
    	h+=strInMenu.charAt(c++);
    	//console.log(h);
        switch(h)
        {
        case MenuTypeEnum.eTagKeyWds01:
        	if(funcKeyWds(txt,KeyWds01)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds01;
        	break;
        case MenuTypeEnum.eTagKeyWds02:
        	if(funcKeyWds(txt,KeyWds02)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds02;
        	break;
        case MenuTypeEnum.eTagKeyWds03:
        	if(funcKeyWds(txt,KeyWds03)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds03;
        	break;
        case MenuTypeEnum.eTagKeyWds04:
        	if(funcKeyWds(txt,KeyWds04)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds04;
        	break;
        case MenuTypeEnum.eTagKeyWds05:
        	if(funcKeyWds(txt,KeyWds05)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds05;
        	break;
        case MenuTypeEnum.eTagKeyWds06:
        	if(funcKeyWds(txt,KeyWds06)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds06;
        	break;
        case MenuTypeEnum.eTagKeyWds07:
        	if(funcKeyWds(txt,KeyWds07)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds07;
        	break;
        case MenuTypeEnum.eTagKeyWds08:
        	if(funcKeyWds(txt,KeyWds08)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds08;
        	break;
        case MenuTypeEnum.eTagKeyWds09:
        	if(funcKeyWds(txt,KeyWds09)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds09;
        	break;
        case MenuTypeEnum.eTagKeyWds10:
        	if(funcKeyWds(txt,KeyWds10)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds10;
        	break;
        case MenuTypeEnum.eTagKeyWds11:
        	if(funcKeyWds(txt,KeyWds11)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds11;
        	break;
        case MenuTypeEnum.eTagKeyWds12:
        	if(funcKeyWds(txt,KeyWds12)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds12;
        	break;
        case MenuTypeEnum.eTagKeyWds13:
        	if(funcKeyWds(txt,KeyWds13)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds13;
        	break;
        case MenuTypeEnum.eTagKeyWds14:
        	if(funcKeyWds(txt,KeyWds14)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds14;
        	break;
        case MenuTypeEnum.eTagKeyWds15:
        	if(funcKeyWds(txt,KeyWds15)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds15;
        	break;
        case MenuTypeEnum.eTagKeyWds16:
        	if(funcKeyWds(txt,KeyWds16)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds16;
        	break;
        case MenuTypeEnum.eTagKeyWds17:
        	if(funcKeyWds(txt,KeyWds17)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds17;
        	break;
        case MenuTypeEnum.eTagKeyWds18:
        	if(funcKeyWds(txt,KeyWds18)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds18;
        	break;
        case MenuTypeEnum.eTagKeyWds19:
        	if(funcKeyWds(txt,KeyWds19)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds19;
        	break;
        case MenuTypeEnum.eTagKeyWds20:
        	if(funcKeyWds(txt,KeyWds20)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds20;
        	break;
        case MenuTypeEnum.eTagKeyWds21:
        	if(funcKeyWds(txt,KeyWds21)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds21;
        	break;
        case MenuTypeEnum.eTagKeyWds22:
        	if(funcKeyWds(txt,KeyWds22)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds22;
        	break;
        case MenuTypeEnum.eTagKeyWds23:
        	if(funcKeyWds(txt,KeyWds23)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds23;
        	break;
        case MenuTypeEnum.eTagKeyWds24:
        	if(funcKeyWds(txt,KeyWds24)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds24;
        	break;
        case MenuTypeEnum.eTagKeyWds25:
        	if(funcKeyWds(txt,KeyWds25)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds25;
        	break;
        case MenuTypeEnum.eTagKeyWds26:
        	if(funcKeyWds(txt,KeyWds26)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds26;
        	break;
        case MenuTypeEnum.eTagKeyWds27:
        	if(funcKeyWds(txt,KeyWds27)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds27;
        	break;
        case MenuTypeEnum.eTagKeyWds28:
        	if(funcKeyWds(txt,KeyWds28)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds28;
        	break;
        case MenuTypeEnum.eTagKeyWds29:
        	if(funcKeyWds(txt,KeyWds29)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds29;
        	break;
        case MenuTypeEnum.eTagKeyWds30:
        	if(funcKeyWds(txt,KeyWds30)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds30;
        	break;
        case MenuTypeEnum.eTagKeyWds31:
        	if(funcKeyWds(txt,KeyWds31)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds31;
        	break;
        case MenuTypeEnum.eTagKeyWds32:
        	if(funcKeyWds(txt,KeyWds32)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds32;
        	break;
        case MenuTypeEnum.eTagKeyWds33:
        	if(funcKeyWds(txt,KeyWds33)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds33;
        	break;
        case MenuTypeEnum.eTagKeyWds34:
        	if(funcKeyWds(txt,KeyWds34)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds34;
        	break;
        case MenuTypeEnum.eTagKeyWds35:
        	if(funcKeyWds(txt,KeyWds35)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds35;
        	break;
        case MenuTypeEnum.eTagKeyWds36:
        	if(funcKeyWds(txt,KeyWds36)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds36;
        	break;
        case MenuTypeEnum.eTagKeyWds37:
        	if(funcKeyWds(txt,KeyWds37)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds37;
        	break;
        case MenuTypeEnum.eTagKeyWds38:
        	if(funcKeyWds(txt,KeyWds38)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds38;
        	break;
        case MenuTypeEnum.eTagKeyWds39:
        	if(funcKeyWds(txt,KeyWds39)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds39;
        	break;
        case MenuTypeEnum.eTagKeyWds40:
        	if(funcKeyWds(txt,KeyWds40)==0)
        	strMenu=MenuTypeEnum.eTagKeyWds40;
        	break;
        }
    }
	return strMenu;
};

var funcKeyWds=function(txt, KeyWdsArray)
{
	var i=0;
	bKeyWds=-1;
	
	while(bKeyWds==-1 && i<KeyWdsArray.length)
	{
		bKeyWds=txt.indexOf(KeyWdsArray[i]);
		i++;
	}
	if(bKeyWds !=-1)
		bKeyWds=0;
	return bKeyWds;
};
