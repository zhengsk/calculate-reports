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
				
				<div class="text-right" style="margin:0 0 5px 4px;">
					<span class="unitNote">单位：万元</span>
					<button ontouchend="window.location.href='<%=basePath%>/ctrlUnitBackProgress/chart'" type="button" class="btn btn-primary btn-primary btn-xs" style="padding:4px 9px;">
						<span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
						柱状图
					</button>
				</div>

				<table class="table-striped clickAble" style="font-size:0.8em;" id="sectionListTable" data-toggle="table" data-cache="false" data-url="<%=basePath%>/ctrlUnitBackProgress/getCtrlUnitBackProgress" data-response-handler="responseHandler">
				    <thead style="font-size:1em;">
				        <tr class="table-title">
				            <th data-field="ctrlUnitName" data-align="center">事业部</th>
				            <th data-field="backTargetAmount" data-align="right" data-formatter="tdFormat">年度回<br/>款指标</th>
				            <th data-field="backTargetQuarterAmount" data-align="right" data-formatter="tdFormat">累计季度<br/>回款指标</th>
				            <th data-field="backAmount" data-align="right" data-formatter="tdFormat">年度累计<br/>已回款额</th>
				            <th data-field="percent" data-align="right">累计季度<br/>回款率</th>
				        </tr>
				    </thead>
				</table>
				
		    </div>

		  </div>

		</div>

	</div>
	
	<script>

		    function responseHandler(res){
		    	var data = res;
		    	// 准备进度条数据
				var progressData = {
					yearTotal : formatNumber(data.total.yearTarget,true,2),
					yearDone : formatNumber(data.total.yearDone,true,2),
					yearDonePercent : data.total.percent,
					groupUnitPage : "<%=basePath%>/ctrlUnitQuarterProgress/table?ctrlUnitId=" + encodeURIComponent(data.total.groupUnitId)
				}
				// 设置进度条
				setProgressBar(
					'progressBar', 
					"年度回款指标:{{yearTotal}}亿，已完成:{{yearDone}}亿",
					progressData  // 设置进度条
				);

		    	return res.datas;
		    }

		    // 点击行 显示详情
		    $(function(){
		    	$('#sectionListTable').on('click-row.bs.table',function(e, row, $element){
		    		if(row.ctrlUnitId){
		    			window.location.href = "<%=basePath%>/ctrlUnitQuarterProgress/table?ctrlUnitId=" + encodeURIComponent(row.ctrlUnitId);
		    		}
		    	});

		    });
		
	</script>
</body>
</html>