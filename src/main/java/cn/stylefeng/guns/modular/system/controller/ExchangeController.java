package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.guns.modular.doctor_point.service.IDoctorPointService;
import cn.stylefeng.guns.modular.system.model.DoctorPoint;
import cn.stylefeng.roses.core.base.controller.BaseController;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

@Controller
@RequestMapping("/exchange")
public class ExchangeController extends BaseController {

    private String PREFIX = "/system/exchange/";

    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    @Autowired
    private IDoctorPointService doctorPointService;

    /**
     * 跳转到老人房间首页
     */
    @RequestMapping("")
    public String index() {
        Enumeration<String> attributeNames = super.getSession().getAttributeNames();
        System.out.println( "参数"+attributeNames);
        HttpServletRequest httpServletRequest = super.getHttpServletRequest();


        List<DoctorPoint> doctorPoints = doctorPointService.selectList(null);
        doctorPoints.forEach(
                f ->{
                    redisTemplate.opsForList().leftPushAll(f.getDoctorName()+"::"+f.getPatientName(),"开始对话");
                    redisTemplate.opsForList().leftPushAll(f.getPatientName()+"::"+f.getDoctorName(),"开始对话");
                }
        );

        return PREFIX + "exchange.html";
    }


    @RequestMapping("/ex/users/msg")
    @ResponseBody
    public List<DoctorPoint> getUsersEx(
            @RequestParam(required = false) String username
    ) {
        Wrapper<DoctorPoint> wrapper = new EntityWrapper<>();
        // 设置条件，例如根据名称进行模糊查询
        wrapper.like("patient_name", username);
        List<DoctorPoint> patientName = doctorPointService.selectList(wrapper);
        if (patientName.isEmpty()){
            Wrapper<DoctorPoint> wrapper1 = new EntityWrapper<>();
            Wrapper<DoctorPoint> doctorName = wrapper1.like("doctor_name", username);
            doctorName.like("doctor_name", username);
            patientName = doctorPointService.selectList(doctorName);
        }
        System.out.println("获取当前用户 正在沟通的用户" + patientName);
        return patientName;
    }

    @RequestMapping("/ex/msg")
    @ResponseBody
    public List<Object> getEx(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String name
    ) {
        List<Object> range = redisTemplate.opsForList().range(username+"::"+name, 0, -1);
        System.out.println("redis 获取当前的所有聊天记录" + range);
        return range;
    }

    @RequestMapping("/ex/msg/dangqian")
    @ResponseBody
    public String postEx(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String msg
    ) {
        redisTemplate.opsForList().rightPush(username+"::"+name, username+": "+msg +"\n");
        redisTemplate.opsForList().rightPush(name+"::"+username, username+": "+msg +"\n");
        return username;
    }
}
