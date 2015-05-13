<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="common/common.jsp" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>集团销售及回款情况</title>

	<link rel="stylesheet" href="<%=basePath %>/assets/bootstrap/css/bootstrap.min.css?v=<%=version%>">
	<link rel="stylesheet" href="<%=basePath %>/assets/bootstrap-table/bootstrap-table.min.css?v=<%=version%>">
	<link rel="stylesheet" href="<%=basePath %>/assets/css/common.css?v=<%=version%>">
	
	<script src="<%=basePath %>/assets/js/jquery.min.js?v=<%=version%>"></script>
	<script src="<%=basePath %>/assets/echarts-2.2.0/echarts-all.js?v=<%=version%>"></script>

	<script src="<%=basePath %>/assets/bootstrap/js/bootstrap.min.js?v=<%=version%>"></script>
	<script src="<%=basePath %>/assets/bootstrap-table/bootstrap-table.min.js?v=<%=version%>"></script>
	<script src="<%=basePath %>/assets/bootstrap-table/locale/bootstrap-table-zh-CN.min.js?v=<%=version%>"></script>
	
	<script src="<%=basePath %>/assets/js/common.js?v=<%=version%>"></script>
	
</head>
<body>
	<div class="container-fluid">
		<!-- <h4 class="text-center">集团全年认购情况</h4> -->

		<div role="tabpanel">

		  <!-- Nav tabs -->
		  <ul class="nav nav-tabs" role="tablist">
		    <li role="presentation"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" ontouchend="window.location.href='<%=basePath%>/ctrlUnitProgress/chart'">认购情况</a></li>
		    <li role="presentation" class="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" ontouchend="window.location.href='<%=basePath%>/ctrlUnitBackProgress/chart'">回款情况</a></li>
		  </ul>

		  <!-- Tab panes -->
		  <div class="tab-content">
		    <div role="tabpanel" class="tab-pane active" id="home">

		    	<div id="progressBar">
			    	<span class="totalNote">&emsp;</span>
			    	<div>
	    		    	<a class="group-label">集团:</a>
	    		  		<div class="progress priceProgress" style="margin-bottom:10px; margin-left:40px;">
	    					<div class="progress-bar progress-bar-striped">
	    						<span></span>
	    					</div>
	    				</div>
			    	</div>
		    	</div>
				
				<div class="text-right" style="margin-left:4px;">
					<span class="unitNote">单位：万元</span>
					<button ontouchend="window.location.href='<%=basePath%>/ctrlUnitBackProgress/table'" type="button" class="btn btn-primary btn-primary btn-xs" style="padding:4px 9px;">
						<span class="glyphicon glyphicon-th" aria-hidden="true"></span>
						表格
					</button>
				</div>

				<div style="width:100%;">
					<div id="chartCanvasDone" style="height:900px;"></div>
				</div>
				
		    </div>
		    
		  </div>

		</div>

	</div>
	
	<script>
		var BASE_PATH = "<%=basePath%>";

		;(function(){// 集团全年认购情况

			var getChartUrl = "<%=basePath%>/ctrlUnitBackProgress/getCtrlUnitBackProgressHist";

			jQuery.ajax({
				url: getChartUrl,
				type: 'get',
				cache: false,
				dataType: 'json'
			})
			.done(function(data) {

				// 准备进度条数据
				var progressData = {
					yearTotal : formatNumber(data.total.yearTarget,true,2),
					yearDone : formatNumber(data.total.yearDone,true,2),
					yearDonePercent : data.total.percent,
					groupUnitPage : "<%=basePath%>/ctrlUnitQuarterProgress/chart?ctrlUnitId=" + encodeURIComponent(data.total.groupUnitId)	// 跳转集团季度 链接地址
				}
				// 设置进度条
				setProgressBar(
					'progressBar', 
					"年度回款指标:{{yearTotal}}亿，已完成:{{yearDone}}亿",
					progressData  // 设置进度条
				);

				// 条形图
				var itemStyle = [ //柱状样式
					chartDataStyle.year,
					chartDataStyle.season,
					chartDataStyle.done
				];

				// 渲染echart
				var myChart = renderChart(
					'chartCanvasDone', 
					data, 
					itemStyle, 
					[0,1,2,2],
					{
						grid: {x:35,y:70,x2:30,y2:40},
						axisLabelClickable: true
					}
				);

				// label点击事件
				var ids = (data.ids).reverse();
				var areas = data.area;
				myChart.on('click', function(param) {
					var id = "";
				    if(param.seriesIndex == -1 && param.name){
				    	for(var i = 0, j = ids.length; i < j; i++){
				    		if(param.name === areas[i]){
				    			id = ids[i];
				    			break;
				    		}
				    	};
				    	window.location = "<%=basePath%>/ctrlUnitQuarterProgress/chart?ctrlUnitId=" + encodeURIComponent(id);
				    }
				});
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

   		})();

	</script>
</body>
</html>