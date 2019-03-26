package com.lichkin.baidu.ueditor.controllers.impl;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lichkin.framework.json.LKJsonUtils;
import com.lichkin.framework.utils.LKFileUtils;

import lombok.Cleanup;

/**
 * UEditor控制器类
 *
 * <pre>
 * UEditor内容栏中上传图片将保存到/opt/files/images/content/yyyy/yyyyMM/yyyyMMdd目录中。
 * 可以通过com.lichkin.file.save.path来修改/opt/files根目录。
 * 另外需要配置com.lichkin.file.server.rootUrl来指定图片访问地址。
 * </pre>
 *
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */
@RestController
@RequestMapping(value = "/webjars/ueditor/1.4.3.3/jsp")
public class UEditorController {

	/** 文件服务器URL根路径 */
	@Value("${com.lichkin.files.server.rootUrl:http://files.lichkin.com}")
	private String filesServerRootUrl;

	/** 文件服务器保存根路径 */
	@Value("${com.lichkin.files.save.path:/opt/files}")
	private String filesSaveRootPath;

	/** 内容中的图片保存子路径 */
	private static final String CONTENT_IMAGES_PAGE = "/images/content";


	@PostMapping(value = "/controller")
	public String toDo(HttpServletRequest request, String action, MultipartFile upfile) {
		Map<String, Object> state = new HashMap<>();
		switch (action) {
			case "uploadimage":
				try {
					String originalFilename = upfile.getOriginalFilename();
					String extName = originalFilename.substring(originalFilename.lastIndexOf("."));
					String filePath = LKFileUtils.createFilePath(filesSaveRootPath + CONTENT_IMAGES_PAGE, extName);
					@Cleanup
					FileOutputStream outputStream = new FileOutputStream(filePath);
					outputStream.write(upfile.getBytes());
					state.put("state", "SUCCESS");
					state.put("url", filesServerRootUrl + filePath.replace(filesSaveRootPath, ""));
					state.put("type", extName);
					state.put("original", originalFilename);
				} catch (Exception e) {
					e.printStackTrace();// ignore this
				}
			break;
			default:
			break;
		}
		return LKJsonUtils.toJson(state);
	}

}
