;

// 扩展图标
$.LKExtendICON({
  'cut' : 'cut',
  'cropper-no-image' : 'image',
  'upload' : 'upload',
  'zoomIn' : 'search-plus',
  'zoomOut' : 'search-minus',
  'reverseX' : 'arrows-alt-h',
  'reverseY' : 'arrows-alt-v',
});

/**
 * 图片工具类
 * @author SuZhou LichKin Information Technology Co., Ltd.
 */
var LKImageUtils = {

  /**
   * 计算宽度
   * @param height 高度
   * @param aspectRatio 宽高比
   * @return 宽度
   */
  calcWidth : function(height, aspectRatio) {
    return height * aspectRatio;
  },

  /**
   * 计算高度
   * @param width 宽度
   * @param aspectRatio 宽高比
   * @return 高度
   */
  calcHeight : function(width, aspectRatio) {
    return width / aspectRatio;
  }

};

/**
 * 图片上传内部实现相关
 */
LK.UI._cropper = {

  /**
   * 设置值
   * @param $plugin 控件对象
   * @param $container 数据容器对象
   * @param values 值数组
   * @param isCreateEvent 是否为创建是调用
   */
  setValues : function($plugin, $container, values, isCreateEvent) {
    if (values == null) {
      values = '';
    }
    if (Array.isArray(values)) {
      values = values[0];
      if (typeof values == 'undefined') {
        values = '';
      }
    }

    var $img = $plugin.find('img');
    var $icon = $plugin.find('.lichkin-icon');

    if (values == '') {
      $img.hide();
      $icon.show();
    } else {
      var options = $plugin.data('LKOPTIONS');
      $icon.hide();
      var src = values.startsWith('http') || values.startsWith(_IMG) ? values : 'data:image/' + options.imageType + ';base64,' + values;
      $img.attr('src', src);
      $('#' + options.id + '_popup').find('img').attr('src', src);
      $img.show();
      $img.css({
        'display' : 'block'
      });
    }

    if (!isCreateEvent) {
      $plugin.LKSetValues(values, isCreateEvent);
    }
  },

  /**
   * 设置图片显示样式
   * @param $plugin 控件对象
   * @param $img 图片对象
   * @param $popup 弹框预览对象
   * @param cutWidth 图片裁剪高度
   * @param cutheight 图片裁剪宽度
   */
  setImgCss : function($plugin, $img, $popup, cutWidth, cutheight) {
    var width = $plugin.width();
    var height = $plugin.height();

    var imgAspectRatio = 1 / 1;
    if (cutWidth != null && cutheight != null) {
      imgAspectRatio = cutWidth / cutheight;
    }

    var maxShowWidth = width - LK.leftGap * 2, maxShowHeight = height - LK.topGap * 2;
    var aspectRatio = maxShowWidth / maxShowHeight;

    var showWidth = 0, showHeight = 0, marginLeft = 0, marginTop = 0;
    if (imgAspectRatio > aspectRatio) {// 横向图
      showWidth = maxShowWidth;
      showHeight = LKImageUtils.calcHeight(showWidth, imgAspectRatio);
      marginLeft = LK.leftGap;
      marginTop = (height - showHeight) / 2;
    } else {// 纵向图
      showHeight = maxShowHeight;
      showWidth = LKImageUtils.calcWidth(showHeight, imgAspectRatio);
      marginTop = LK.topGap;
      marginLeft = (width - showWidth) / 2;
    }

    $img.css({
      'width' : showWidth,
      'height' : showHeight,
      'margin-left' : marginLeft + 'px',
      'margin-top' : marginTop + 'px'
    });

    $popup.css({
      'width' : cutWidth,
      'height' : cutheight,
    });
    $popup.children('img').css({
      'width' : cutWidth,
      'height' : cutheight,
    });
  }

};

/**
 * 图片上传控件
 */
LK.UI('plugins', 'cropper', function(options) {
  // 控件类型
  var plugin = 'cropper';

  // 创建控件对象
  var $plugin = LK.UI.create({
    plugin : plugin,
    options : options
  });

  var width = $plugin.width();
  var height = $plugin.height();

  // 显示图片
  var iconSize = width;
  if (width > height) {
    iconSize = height;
  }
  var $icon = LK.UI.icon({
    icon : 'cropper-no-image',
    style : {
      'background-size' : iconSize + 'px',
      'width' : iconSize,
      'height' : iconSize,
      'left' : (width - iconSize) / 2 + 1 + 'px',
      'top' : (height - iconSize) / 2 + 1 + 'px'
    },
    iStyle : {
      'font-size' : iconSize * 0.75 + 'px',
      'width' : iconSize,
      'height' : iconSize,
      'line-height' : iconSize + 'px'
    }
  }).appendTo($plugin);

  // 显示图片
  var $img = $('<img>').appendTo($plugin);

  // 裁剪比例
  if (options.compressWidth != null && options.compressHeight != null) {
    options.aspectRatio = options.compressWidth / options.compressHeight;
  }

  var id = $plugin.attr('id');
  // 放大查看
  var $popup = $('<div id="' + id + '_popup"><img /></div>').appendTo('body').LKAddPluginClass(plugin, 'popup');
  $popup.data('plugin-id', id);
  $plugin.mouseover(function() {
    var value = $plugin.LKGetValue();
    if (value != '') {
      var offset = $plugin.offset();
      $popup.css({
        'top' : offset.top + $plugin.height() + 1,
        'left' : offset.left
      });
      $popup.show();
    }
  }).mouseout(function() {
    $popup.hide();
  });

  // 设置图片显示的宽高
  var value = $plugin.LKGetValue();
  if (value != '') {
    if (typeof options.aspectRatio == 'undefined') {
      var image = new Image();
      image.src = value;
      image.onload = function() {
        LK.UI._cropper.setImgCss($plugin, $img, $popup, this.width, this.height);
      }
    } else {
      LK.UI._cropper.setImgCss($plugin, $img, $popup, options.compressWidth, options.compressHeight);
    }
  } else {
    if (typeof options.aspectRatio != 'undefined') {
      LK.UI._cropper.setImgCss($plugin, $img, $popup, options.compressWidth, options.compressHeight);
    }
  }

  var dialogWidth = 800;
  var dialogHeight = 600;
  var wRatio = dialogWidth / options.compressWidth;
  var hRatio = dialogHeight / options.compressHeight;
  var ratio = wRatio < hRatio ? wRatio : hRatio;
  var cropperWidth = options.compressWidth * ratio;
  var cropperHeight = options.compressHeight * ratio;

  // 弹窗
  $plugin.click(function() {
    value = $plugin.LKGetValue();
    var clickable = !value.startsWith('http') || value.indexOf(window.location.origin) >= 0;
    
    if (options.readonly == true) {
      return;
    }
    var $bannerImgDlg = $.LKOpenDialog({
      title : 'cropper',
      icon : 'cut',
      size : {
        width : dialogWidth,
        height : dialogHeight
      },
      onAfterCreate : function($dialog, $contentBar) {
        $contentBar.css('overflow', 'hidden');
        // 默认图片对象
        var dialogIconSize = dialogHeight * 0.8;
        var $dialogIcon = LK.UI.icon({
          icon : 'cropper-no-image',
          style : {
            'background-size' : dialogIconSize + 'px',
            'width' : dialogIconSize,
            'height' : dialogIconSize,
            'left' : (dialogWidth - dialogIconSize) / 2 + 'px',
            'top' : (dialogHeight - dialogIconSize) / 2 + 'px',
            'cursor' : 'pointer'
          },
          iStyle : {
            'font-size' : dialogIconSize * 0.75 + 'px',
            'width' : dialogIconSize,
            'height' : dialogIconSize,
            'line-height' : dialogIconSize + 'px'
          }
        }).appendTo($contentBar);
        $dialogIcon.click(function() {
          $dialog.find('input[type=file]').trigger('click');
        });

        // 图片裁切对象
        var $cropper = $('<img class="lichkin-cropper-image">').appendTo($contentBar);
        var cropperOptions = {
          viewMode : 1,
          aspectRatio : options.aspectRatio,
          autoCrop : true,
          mouseWheelZoom : false,
          disable : true,
          guides : false
        };

        var value = $plugin.LKGetValue();
        if (value != '') {
          $dialogIcon.hide();
          $cropper.attr('src', value.startsWith('http') || value.startsWith(_IMG) ? value : 'data:image/' + options.imageType + ';base64,' + value);
          $cropper.cropper($.extend({}, cropperOptions, {
            autoCropArea : 1
          }));
        }

        // 上传图片对象
        var $file = $('<input type="file" style="display:none;" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">').appendTo($contentBar);
        $file.change(function() {
          var files = this.files;
          if (files && files.length) {
            var file = files[0];
            if (/^image\/\w+$/.test(file.type)) {
              $dialogIcon.hide();
              $cropper.show();
              var imageFileURL = URL.createObjectURL(file);
              if (!$cropper.data('cropper')) {
                $cropper.attr('src', imageFileURL).cropper(cropperOptions);
              } else {
                $cropper.cropper('destroy').attr('src', imageFileURL).cropper(cropperOptions);
              }

              $dialog.find('.lichkin-dialog-buttonsBar').find('.lichkin-button').each(function() {
                $(this).LKClickable();
              });
            } else {
              LK.alert('noSelectImage');
            }
          }
        });
      },
      buttons : [
          {
            icon : 'upload',
            text : 'upload',
            cls : 'primary',
            click : function($button, $dialog) {
              $dialog.find('input[type=file]').trigger('click');
            }
          }, {
            icon : 'reset',
            text : 'clear',
            clickable : clickable,
            cls : 'warning',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              if ($cropper.data('cropper')) {
                $cropper.cropper('destroy');
                $cropper.attr('src', '');
                $cropper.hide();
                $dialog.find('.lichkin-icon').show();
                $dialog.find("input[type=file]").val('');
              }
            }
          }, {
            icon : 'zoomIn',
            text : 'zoomIn',
            clickable : clickable,
            cls : 'info',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              if ($cropper.data('cropper')) {
                $cropper.cropper('zoom', 0.1);
              }
            }
          }, {
            icon : 'zoomOut',
            text : 'zoomOut',
            clickable : clickable,
            cls : 'info',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              if ($cropper.data('cropper')) {
                $cropper.cropper('zoom', -0.1);
              }
            }
          }, {
            icon : 'reverseX',
            text : 'reverseX',
            clickable : clickable,
            cls : 'info',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              var scaleX = $cropper.data('scaleX');
              scaleX = typeof scaleX == 'undefined' ? -1 : -scaleX;
              if ($cropper.data('cropper')) {
                $cropper.cropper('scaleX', scaleX);
                $cropper.data('scaleX', scaleX)
              }
            }
          }, {
            icon : 'reverseY',
            text : 'reverseY',
            clickable : clickable,
            cls : 'info',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              var scaleY = $cropper.data('scaleY');
              scaleY = typeof scaleY == 'undefined' ? -1 : -scaleY;
              if ($cropper.data('cropper')) {
                $cropper.cropper('scaleY', scaleY);
                $cropper.data('scaleY', scaleY)
              }
            }
          }, {
            icon : 'ok',
            text : 'ok',
            clickable : clickable,
            cls : 'success',
            click : function($button, $dialog) {
              var $cropper = $dialog.find('img.lichkin-cropper-image');
              var value = $plugin.LKGetValue();
              if ((value != '' && $cropper.attr('src') != '' && ($cropper.attr('src') == value || $cropper.attr('src').replace('data:image/' + options.imageType + ';base64,', '') == value)) || $dialog.find("input[type=file]")[0].files[0]) {
                if ($cropper.data('cropper')) {
                  if (typeof options.aspectRatio == 'undefined') {
                    var cropperData = $cropper.cropper('getData');
                    // 动态调整裁剪大小 动态设置图片显示的宽高
                    LK.UI._cropper.setImgCss($plugin, $img, $popup, cropperData.width, cropperData.height);
                  }
                  var canvas = $cropper.cropper('getCroppedCanvas', {
                    imageSmoothingEnabled : false,
                    imageSmoothingQuality : 'high'
                  });
                  var base64url = canvas.toDataURL('image/' + options.imageType);
                  $plugin.LKInvokeSetValues(base64url.replace('data:image/' + options.imageType + ';base64,', ''), false);
                  $plugin.LKValidate();
                  $dialog.LKCloseDialog();
                  return;
                }
              }
              LK.alert('noSelectImage');
            }
          }, {
            icon : 'cancel',
            text : 'cancel',
            cls : 'danger',
            click : function($button, $dialog) {
              $dialog.LKCloseDialog();
            }
          }
      ]
    });
  });

  $plugin.LKInvokeSetValues(options.value, true);

  $plugin.LKValidate();

  // 返回控件对象
  return $plugin;
}, $.extend({},
// @see LK.UI.create
LK.UI.createOptions,
// 控件特殊定义
{
  rows : 3,
},
// 控件特有参数
{
  // 压缩宽度
  compressWidth : null,
  // 压缩高度
  compressHeight : null,
  // 图像类型
  imageType : 'png'
}));
