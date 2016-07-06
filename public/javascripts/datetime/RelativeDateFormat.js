var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var month = day * 30;
function getDateDiff(dateTimeStamp) {
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		// 若日期不符则弹出窗口告之
		// alert("结束日期不能小于开始日期！");
	}
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var yearC = diffValue / (365 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (yearC >= 1) {
		result = parseInt(yearC) + "年前";
	} else if (monthC >= 1) {
		result = parseInt(monthC) + "月前";
	} else if (dayC >= 1) {
		result = parseInt(dayC) + "天前";
	} else if (hourC >= 24 && hourC < 48) {
		result = "昨天";
	} else if (hourC >= 1 && hourC < 24) {
		result = parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		result = parseInt(minC) + "分钟前";
	} else
		result = (diffValue / 1000) + "秒前";
	return result;
}