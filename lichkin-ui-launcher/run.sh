ps -ef | grep LichKin-UI | grep -v grep | cut -c 9-15 | xargs kill -s 9

cd /opt/runnings/ui/
nohup java org.springframework.boot.loader.JarLauncher --spring.profiles.active=ui,localhost --server.servlet.context-path=/ui --server.port=33333 --log.tag=LichKin-UI --log.level.system=debug --log.level.org=info --log.level.net=info --lichkin.locale.default=zh_CN --lichkin.locale.implemented=zh_CN --lichkin.system.tag=LichKin-UI --lichkin.system.name=UI平台 --lichkin.system.debug=false --lichkin.web.debug=false --lichkin.web.admin.debug=false --lichkin.web.compress=true >/dev/null 2>&1 &

tail -f /lichkin-logs/LichKin-UI.debug.log
