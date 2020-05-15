package com.ft.feathertrade.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ft.feathertrade.entity.OpenIdJson;
import com.ft.feathertrade.utils.HttpUtil;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController

public class LoginHandler {

    private String appID = "wx68262e135382e8cf";
    private String appSecret = "dc964b039ddda7acf2dc42984101bc93";

    @RequestMapping("/user/login")
    public String userLogin(@RequestParam( value = "code",required = false) String code) throws IOException {
        String result = "";
        try{//请求微信服务器，用code换取openid。HttpUtil是工具类，后面会给出实现，Configure类是小程序配置信息，后面会给出代码
            result = HttpUtil.doGet(
                    "https://api.weixin.qq.com/sns/jscode2session?appid="
                            + this.appID + "&secret="
                            + this.appSecret + "&js_code="
                            + code
                            + "&grant_type=authorization_code", null);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        ObjectMapper mapper = new ObjectMapper();
        OpenIdJson openIdJson = mapper.readValue(result,OpenIdJson.class);
        System.out.println(result.toString());
        System.out.println(openIdJson.getOpenid());
        return result;
    }

}