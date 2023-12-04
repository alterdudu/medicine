/**
 * 老人房间管理初始化
 */
var Room = {
    id: "RoomTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Room.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '身份证号', field: 'patientIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '房间名字', field: 'roomName', visible: true, align: 'center', valign: 'middle'},
            {title: '房间床号', field: 'comment', visible: true, align: 'center', valign: 'middle'},
            {title: '预计时间', field: 'pointDate', visible: true, align: 'center', valign: 'middle'},
            {title: '开始时间', field: 'pointPlace', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Room.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Room.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加老人房间
 */
Room.openAddRoom = function () {
    var index = layer.open({
        type: 2,
        title: '添加老人房间',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/room/room_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看老人房间详情
 */
Room.openRoomDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '老人房间详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/room/room_update/' + Room.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除老人房间
 */
Room.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/room/delete", function (data) {
            Feng.success("删除成功!");
            Room.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("roomId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询老人房间列表
 */
Room.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Room.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Room.initColumn();
    var table = new BSTable(Room.id, "/room/list", defaultColunms);
    table.setPaginationType("client");
    Room.table = table.init();
});
