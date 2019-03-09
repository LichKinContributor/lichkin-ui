cd target\lichkin-ui-launcher-1.0.0.RELEASE
java org.springframework.boot.loader.JarLauncher --spring.profiles.active=ui,localhost --server.servlet.context-path=/ui --server.port=33333 --log.tag=LichKin-UI --lichkin.system.tag=LichKin-UI --lichkin.system.name=UI平台 --lichkin.system.debug=false --lichkin.web.debug=false --lichkin.web.admin.debug=false --lichkin.web.compress=true
