window.onload = function(){
	$.get('/user/admin/statistics/chart', function(data){
		var chart1 = document.getElementById("line-chart").getContext("2d");
		window.myLine = new Chart(chart1).Line({
			labels : data.date,
			datasets : [
				{
					label: "用户数据分析",
					fillColor : "rgba(48, 164, 255, 0.2)",
					strokeColor : "rgba(48, 164, 255, 1)",
					pointColor : "rgba(48, 164, 255, 1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(48, 164, 255, 1)",
					data : data.num
				}
			]
		}, {
			responsive: true
		});
	});

};