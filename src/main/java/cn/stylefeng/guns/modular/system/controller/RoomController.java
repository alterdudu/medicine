package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import cn.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import cn.stylefeng.guns.modular.system.model.Room;
import cn.stylefeng.guns.modular.system.service.IRoomService;

/**
 * 老人房间控制器
 *
 * @author fengshuonan
 * @Date 2023-11-27 16:21:03
 */
@Controller
@RequestMapping("/room")
public class RoomController extends BaseController {

    private String PREFIX = "/system/room/";

    @Autowired
    private IRoomService roomService;

    /**
     * 跳转到老人房间首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "room.html";
    }

    /**
     * 跳转到添加老人房间
     */
    @RequestMapping("/room_add")
    public String roomAdd() {
        return PREFIX + "room_add.html";
    }

    /**
     * 跳转到修改老人房间
     */
    @RequestMapping("/room_update/{roomId}")
    public String roomUpdate(@PathVariable Integer roomId, Model model) {
        Room room = roomService.selectById(roomId);
        model.addAttribute("item",room);
        LogObjectHolder.me().set(room);
        return PREFIX + "room_edit.html";
    }

    /**
     * 获取老人房间列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return roomService.selectList(null);
    }

    /**
     * 新增老人房间
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Room room) {
        roomService.insert(room);
        return SUCCESS_TIP;
    }

    /**
     * 删除老人房间
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer roomId) {
        roomService.deleteById(roomId);
        return SUCCESS_TIP;
    }

    /**
     * 修改老人房间
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Room room) {
        roomService.updateById(room);
        return SUCCESS_TIP;
    }

    /**
     * 老人房间详情
     */
    @RequestMapping(value = "/detail/{roomId}")
    @ResponseBody
    public Object detail(@PathVariable("roomId") Integer roomId) {
        return roomService.selectById(roomId);
    }
}
