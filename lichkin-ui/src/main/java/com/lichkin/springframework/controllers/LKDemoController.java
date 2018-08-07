package com.lichkin.springframework.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lichkin.framework.web.annotations.WithoutLogin;
import com.lichkin.springframework.web.beans.LKPage;

@Controller
@RequestMapping("/demo")
public class LKDemoController extends LKPagesController {

	@WithoutLogin
	@GetMapping(value = "/{subUrl}" + MAPPING)
	public LKPage toGo() {
		return null;
	}

}
