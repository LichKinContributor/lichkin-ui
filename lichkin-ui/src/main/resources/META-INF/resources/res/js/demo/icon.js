// 扩展图标
var extendIcons = {
  'loginName' : 'user',
  'pwd' : 'key',

  'starter' : 'chevron-circle-down',
  'starter-closed' : 'chevron-circle-up',
  'starter-back' : 'chevron-circle-left',
  'menu-next' : 'caret-right',

  'UNKNOWN' : 'question',
  'SECRECY' : 'user-secret',
  'ALIEN' : 'bug',
  'FEMALE' : 'female',
  'MALE' : 'male',

  'sysMgmt' : 'cog',
  'roleMgmt' : 'user-secret',
  'adminMgmt' : 'user-tie',
  'userMgmt' : 'users',
  'dictMgmt' : 'book',
  'loginLog' : 'address-book',
  'operLog' : 'book-open',
  'errorLog' : 'times',
  'appMgmt' : 'mobile-alt',
  'appVersionMgmt' : 'code-branch',
  'appBannerMgmt' : 'film',
  'appNewsMgmt' : 'newspaper',
  'appFeedbackMgmt' : 'comment',
  'appScoreMgmt' : 'star',
  'websiteMgmt' : 'desktop',
  'websiteBannerMgmt' : 'film',
  'websiteNewsMgmt' : 'newspaper',
  'orgMgmt' : 'sitemap',
  'compMgmt' : 'building',
  'deptMgmt' : 'suitcase',
  'employeeMgmt' : 'user-friends',
  'workflowMgmt' : 'project-diagram',
  'dictTimeMgmt' : 'clock',
  'employeeAttendance' : 'calendar-check',
};

for ( var key in extendIcons) {
  LK.UI.bindIcon({
    icon : key,
    fontAwesome : extendIcons[key]
  });
}

for (var i = 16; i <= 128; i += 8) {
  LK.UI.icon({
    $appendTo : $('#demo1'),
    size : i,
    icon : 'loading',
    type : false
  });
}

for (var i = 16; i <= 128; i += 8) {
  LK.UI.icon({
    $appendTo : $('#demo2'),
    size : i,
    icon : 'loading',
    type : true
  });
}

for ( var key in LK.UI._icon.mappings) {
  LK.UI.icon({
    $appendTo : $('#demo3'),
    icon : key,
    type : true
  });
  LK.UI.icon({
    $appendTo : $('#demo3'),
    icon : key,
    type : false
  });
  $('<br>').appendTo('#demo3');
}

for ( var key in LK.UI._icon.originalMappings) {
  LK.UI.icon({
    $appendTo : $('#demo3'),
    icon : key,
    type : true
  });
  LK.UI.icon({
    $appendTo : $('#demo3'),
    icon : key,
    type : false
  });
  $('<br>').appendTo('#demo3');
}