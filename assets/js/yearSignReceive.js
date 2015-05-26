
// 列默认值
var DEFAULT_VALUE = {
	align: "center",
	formatter: unitTextFormatter,
	cellStyle: unitClassFormatter
}

var FOOTERDATA = undefined;

// 加载表格数据
function loadTableList(url, datas, offsetHeight) {
	
	datas = $.extend({
		UserID: ''
		// ,RptDate: '2015-5-10'
	}, datas);

	doAjax({
		url: url
		,data: datas
	}, function(data) {

		FOOTERDATA = data.pop();

		// 渲染
		$('#unitsListTable').bootstrapTable('destroy').bootstrapTable({
			height: getHeight(offsetHeight),
			columns: setColumns(TABLE_COLUMNS, DEFAULT_VALUE),
			data: data,
			headerHeight: 55, // zsk extend
			showFooter: true,
			showHeader: true
		}).on('click-row.bs.table', function (e, row, $element) {
			if(URL_LIST.gotoPageUrl){
				var params = {};
				if(URL_LIST.gotoPageParam){
					if($.type(URL_LIST.gotoPageParam)  === "object"){
						URL_LIST.gotoPageParam = [URL_LIST.gotoPageParam];
					}
					$.each(URL_LIST.gotoPageParam, function(i, item){
						if(item.source === 'row'){
							params[item.name] = row[item.value];
						}else{
							params[item.name] = item.value;
						}
					});
				}
				gotoPage(URL_LIST.gotoPageUrl, params);
			}
	    })

	});
}

// 重新加载表格数据
function reloadTableList(url, datas, offsetHeight){
	
	loadTableList(url, datas, offsetHeight);
}

// setColumns
function setColumns(columns, options) {
	for (var i = 0, j = columns.length; i < j; i++) {
		columns[i].footerFormatter = footerFormatter;
	};
	return columns;
}

function footerFormatter(data, column){
	return FOOTERDATA[column.field]
};

// 格式化单元格内容文本
function unitTextFormatter(value, row, index) {
	return value && value[0] || ""
}

// 格式化单元格样式
function unitClassFormatter(value, row, index, defaultValue) {
	if (defaultValue && defaultValue[1] == 1) { // 认购
		++FOOTER_DATA[0].num;
		return {classes: FOOTER_DATA[0].className}
	}

	if (defaultValue && defaultValue[1] == 2) { // 签约
		++FOOTER_DATA[1].num;
		return {classes:  FOOTER_DATA[1].className}
	}

	defaultValue && ++FOOTER_DATA[2].num;
	return {};	// 其他
}

// 表格的高度
function getHeight(offsetHeight) {
	return $(window).height() + (offsetHeight || -142);
}


// 合并单元格
function combindTableRow(){
	var rows = $('#unitsListTable').find('tbody>tr');

	var columnValue = "";
	var len = 0;
	var rowspanLen = [];
	for(var i = 0, j = rows.length; i < j; i++){
		if(columnValue != "" && columnValue != rows.eq(i).find('td').html()){
			rowspanLen.push(len);
			len = 1;
		}else{
			++len;
		}
		columnValue = rows.eq(i).find('td').html()
	}

	// var currentRow = 0;
	// for(var i = 0, j = rowspanLen; i < j; i++){
	// 	if(rowsspanLen[i] > 1){
	// 		row.eq(i).find('td').eq(0).att('rowspan', rowsspanLen[i]);
	// 		currentRow++;
			
	// 	}
	// }
	

}

// 时间快捷切换 上一个， 下一个 日期、月份、年份
function dateSwitchBar(strInterval, minDate, maxDate){
	var rptDateInput = $('#rptDate');

	var rptDatePrevBtn = $('#rptDatePrev');
	if(rptDatePrevBtn.length){
		touchEndFun(rptDatePrevBtn, function(){
			var currentDate = new Date(rptDateInput.val());
			var newDate = currentDate.DateAdd(strInterval,-1);
			rptDateInput.val(newDate.Format("yyyy-MM-dd")).change();
		});
	}
	
	var rptDateNextBtn = $('#rptDateNext');
	if(rptDateNextBtn.length){	
		touchEndFun(rptDateNextBtn, function(){
			var currentDate = new Date(rptDateInput.val());
			var newDate = currentDate.DateAdd(strInterval,1);
			rptDateInput.val(newDate.Format("yyyy-MM-dd")).change();
		});
	}
}






