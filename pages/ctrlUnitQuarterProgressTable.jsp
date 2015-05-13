<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="java.net.URLEncoder" %>
<%@include file="common/common.jsp" %>
<%
    String ctrlUnitId=request.getParameter("ctrlUnitId");
    String encodeCtrlUnitId = URLEncoder.encode(ctrlUnitId,"UTF-8");
%>

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
			    	<span class="totalNote" style="margin-left:0;">&emsp;</span>
			  		<div class="progress priceProgress" style="margin-bottom:10px;">
						<div class="progress-bar progress-bar-striped">
							<span></span>
						</div>
					</div>
		    	</div>
				
				<div class="text-right" style="margin-bottom:5px;">
					<span class="unitNote">单位：万元</span>
					<select name="areaSelect" id="areaSelect" class="areaSelect"></select>
					<button ontouchend="window.location.href='<%=basePath%>/ctrlUnitQuarterProgress/chart?ctrlUnitId=<%=encodeCtrlUnitId%>'" type="button" class="btn btn-primary btn-primary btn-xs" style="padding:4px 9px;">
						<span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
						柱状图
					</button>
				</div>

				<div>
					<div class="swipeWrapper" style="height:200px;">
						<div id="swipeTable">
							<table class="table-striped" style="font-size:0.8em;" id="sectionListTable" data-toggle="table" data-cache="false" data-url="<%=basePath%>/ctrlUnitQuarterProgress/getCtrlUnitQuarterBackProgress?ctrlUnitId=<%=encodeCtrlUnitId%>" data-response-handler="responseHandler">
							    <thead style="font-size:1em;">
							        <tr class="table-title">
							            <th data-field="quarter" data-align="center" id="ctrlUnitName">事业部</th>
							            <th data-field="backTargetAmount" data-align="right" data-formatter="tdFormat">回款指标</th>
							            <th data-field="backAmount" data-align="right" data-formatter="tdFormat">已回款额</th>
							            <th data-field="percent" data-align="right">回款率</th>
							        </tr>
							    </thead>
							</table>
						</div>
					</div>
					<span class="glyphicon glyphicon-chevron-left swipe-arrow" id="arrowPrevious"></span>
					<span class="glyphicon glyphicon-chevron-right swipe-arrow" id="arrowNext"></span>
				</div>
				
				<div style="padding-top: 10px;">
					<button ontouchend="window.location.href='<%=basePath%>/ctrlUnitBackProgress/table'" class="btn btn-block btn-primary">
						返&emsp;回
					</button>
				</div>

				<div style="padding-top:15px; display:none;">
					<a id="btnPrevious" class="pull-left btn btn-primary btn-sm" href="#"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 上一个</a>
					<a id="btnNext" class="pull-right btn btn-primary btn-sm" href="#">下一个 <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
				</div>
				
		    </div>

		  </div>

		</div>

	</div>

	<div class="finger-moving-tip-wrapper" id="fingerMovingTip">
		<div class="finger-moving-tip"></div>
	</div>
	
	<script>

		LoadingTip.show(); //显示加载提示

	    function responseHandler(res){

	    	var data = res;
	    	// 准备进度条数据
			var progressData = {
				yearTotal : formatNumber(data.total.yearTarget,true),
				yearDone : formatNumber(data.total.yearDone,true),
				yearDonePercent : data.total.percent
			}

			// 设置进度条
			setProgressBar(
				'progressBar', 
				data.ctrlUnitName + "年度回款指标:{{yearTotal}}万，已完成:{{yearDone}}万",
				progressData  // 设置进度条
			);

			//设置表格，表头名
			$('#sectionListTable>thead>tr>th:first').html(data.ctrlUnitName);

			// 设置下拉列表
			setAreatSelect(data.select, data.ctrlUnitId);

			// 设置导航 上一个，下一个的按钮
			setNavigator(data.navigator);


			LoadingTip.hide(); //隐藏加载提示

			// 左右滑动
			swipeElement('swipeTable');

			// 隐藏手滑提示
			new SwipeTip('fingerMovingTip', 'quarterTable'); 

	    	return res.datas;
	    }


	   	
	</script>
</body>
</html>