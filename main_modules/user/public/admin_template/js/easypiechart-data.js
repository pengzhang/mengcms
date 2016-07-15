//$(function() {
//    $('#easypiechart-teal').easyPieChart({
//        scaleColor: false,
//        barColor: '#1ebfae'
//    });
//});
//
//$(function() {
//    $('#easypiechart-orange').easyPieChart({
//        scaleColor: false,
//        barColor: '#ffb53e'
//    });
//});
//
//$(function() {
//    $('#easypiechart-red').easyPieChart({
//        scaleColor: false,
//        barColor: '#f9243f'
//    });
//});
//
//$(function() {
//   $('#easypiechart-blue').easyPieChart({
//       scaleColor: false,
//       barColor: '#30a5ff'
//   });
//});


$(function(){
	//用户总数
	$.get('/user/admin/statistics/total', function(data){
		$('#total').html(data.total);
	});
	//今日新增和比例
	$.get('/user/admin/statistics/today', function(data){
		$('#today').html(data.today);
	});
	$.get('/user/admin/statistics/today/per', function(data){
		if(data.today == 0){
			$('#today_per').html(0+'%');
			$('#today_per').parent().attr("data-percent",0);
		}else{
			var today = $('#today').html();
			$('#today_per').html((today/data.today).toFixed(2)+'%');
			$('#today_per').parent().attr("data-percent",(today/data.today).toFixed(2));
		}
		$('#easypiechart-blue').easyPieChart({
			scaleColor: false,
			barColor: '#30a5ff'
		});
	});


	//昨日新增和比例
	$.get('/user/admin/statistics/yesterday', function(data){
		$('#yesterday').html(data.yesterday);
	});
	$.get('/user/admin/statistics/yesterday/per', function(data){
		if(data.yesterday == 0){
			$('#yesterday_per').html(0+'%');
			$('#yesterday_per').parent().attr("data-percent",0);
		}else{
			var yesterday = $('#yesterday').html();
			$('#yesterday_per').html((yesterday/data.yesterday).toFixed(2)+'%');
			$('#yesterday_per').parent().attr("data-percent",(yesterday/data.yesterday).toFixed(2));
		}
		$('#easypiechart-orange').easyPieChart({
			scaleColor: false,
			barColor: '#ffb53e'
		});
	});


	//本周新增和比例
	$.get('/user/admin/statistics/week', function(data){
		$('#week').html(data.week);
	});
	$.get('/user/admin/statistics/week/per', function(data){
		if(data.week == 0){
			$('#week_per').html(0+'%');
			$('#week_per').parent().attr("data-percent",0);
		}else{
			var week = $('#week').html();
			$('#week_per').html((week/data.week).toFixed(2)+'%');
			$('#week_per').parent().attr("data-percent",(week/data.week).toFixed(2));
		}
		$('#easypiechart-teal').easyPieChart({
			scaleColor: false,
			barColor: '#1ebfae'
		});
	});


	//本月新增和比例
	$.get('/user/admin/statistics/month', function(data){
		$('#month').html(data.month);
	});
	$.get('/user/admin/statistics/month/per', function(data){
		if(data.month == 0){
			$('#month_per').html(0+'%');
			$('#month_per').parent().attr("data-percent",0)
		}else{
			var month = $('#month').html();
			$('#month_per').html((month/data.month).toFixed(2)+'%');
			$('#month_per').parent().attr("data-percent",(month/data.month).toFixed(2));

		}
		$('#easypiechart-red').easyPieChart({
			scaleColor: false,
			barColor: '#f9243f'
		});
	});
})
$('#calendar').datepicker({
	});
