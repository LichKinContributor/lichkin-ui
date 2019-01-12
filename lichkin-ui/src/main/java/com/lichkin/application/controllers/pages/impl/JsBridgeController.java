package com.lichkin.application.controllers.pages.impl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lichkin.framework.defines.enums.impl.LKClientTypeEnum;
import com.lichkin.framework.web.annotations.WithoutLogin;
import com.lichkin.springframework.controllers.LKPagesController;
import com.lichkin.springframework.web.beans.LKPage;

/**
 * 交互控制器类
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */
@Controller
@RequestMapping(value = "/jsBridge")
public class JsBridgeController extends LKPagesController {

	@WithoutLogin
	@GetMapping(value = "/index" + MAPPING)
	public LKPage toIndex(

			String appKey,

			LKClientTypeEnum clientType,

			Byte versionX,

			Byte versionY,

			Short versionZ,

			String token,

			String compToken,

			String uuid,

			Short screenWidth,

			Short screenHeight

	) {
		if (clientType == null) {
			clientType = LKClientTypeEnum.JAVASCRIPT;
		}
		LKPage mv = new LKPage();
		mv.putAttribute("jsBridge", String.valueOf(!LKClientTypeEnum.JAVASCRIPT.equals(clientType)));
		mv.putServerData("appKey", appKey);
		mv.putServerData("clientType", clientType.toString());
		mv.putServerData("versionX", versionX);
		mv.putServerData("versionY", versionY);
		mv.putServerData("versionZ", versionZ);
		mv.putServerData("token", token);
		mv.putServerData("compToken", compToken);
		mv.putServerData("uuid", uuid);
		mv.putServerData("screenWidth", screenWidth);
		mv.putServerData("screenHeight", screenHeight);
		return mv;
	}

}
