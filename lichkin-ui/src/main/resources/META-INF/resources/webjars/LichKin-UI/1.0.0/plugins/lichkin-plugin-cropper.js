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
  },

  /**
   * 计算图片高度
   * @param maxWidth 最大宽度
   * @param maxHeight 最大高度
   * @param imgWidth 图片宽度
   * @param imgHeight 图片高度
   */
  calcImageSize : function(maxWidth, maxHeight, imgWidth, imgHeight) {
    var showWidth = 0, showHeight = 0;// 计算值

    if (imgWidth < maxWidth && imgHeight < maxHeight) {
      showWidth = imgWidth;
      showHeight = imgHeight;
    } else {
      if (imgWidth > imgHeight) {// 横向图
        showWidth = imgWidth < maxWidth ? imgWidth : maxWidth;
        showHeight = imgHeight * (showWidth / imgWidth);
        if (showHeight > maxHeight) {// 横向缩放后，高度仍然超出，补充计算。
          showHeight = maxHeight;
          showWidth = imgWidth * (showHeight / imgHeight);
        }
      } else {// 纵向图
        showHeight = imgHeight < maxHeight ? imgHeight : maxHeight;
        showWidth = imgWidth * (showHeight / imgHeight);
        if (showHeight > maxHeight) {// 纵向缩放后，宽度仍然超出，补充计算。
          showWidth = maxWidth;
          showHeight = imgHeight * (showWidth / imgWidth);
        }
      }
    }

    return {
      showWidth : showWidth,
      showHeight : showHeight
    };
  },

  /**
   * 将图片放入容器中
   * @param $container 容器对象
   * @param $img 图片对象
   * @param maxRatio [number] 最大可用范围。默认值0.9。
   */
  dropImageToContainer : function($container, $img, maxRatio) {
    maxRatio = isNumber(maxRatio) ? maxRatio : 0.9;
    var contentHeight = $container.height();// 图片最大可展示大小
    var size = LKImageUtils.calcImageSize($container.width() * maxRatio, contentHeight * maxRatio, $img.width(), $img.height());

    $container.css('text-align', 'center');// 图片水平居中展示
    // 设置计算值
    $img.css({
      'width' : size.showWidth,
      'height' : size.showHeight,
      'margin-top' : (contentHeight - size.showHeight) / 2
    });
  },

  /**
   * 获取base64图片格式
   * @param base64Data base64图片
   * @return 图片格式
   */
  getMimeType : function(base64Data) {
    var arr = base64Data.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    return mime;
  },

  /**
   * 压缩图片
   * @param base64Data base64图片
   * @param maxValue 压缩最大值
   * @param quality 压缩质量
   * @param imageType 图片类型
   * @return base64图片
   */
  compressImg : function(base64Data, maxValue, quality, imageType) {
    var newImage = new Image();
    var promise = new Promise(function(resolve) {
      newImage.onload = resolve;
    });
    newImage.src = base64Data;
    return promise.then(function() {
      var imgWidth = newImage.width;
      var imgHeight = newImage.height;
      if (Math.max(imgWidth, imgHeight) > maxValue) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (imgWidth > imgHeight) {
          canvas.width = maxValue;
          canvas.height = imgHeight * maxValue / imgWidth;
        } else {
          canvas.height = maxValue;
          canvas.width = imgWidth * maxValue / imgHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL(isString(imageType) ? imageType : getMimeType(base64Data), quality);
      }
      return base64Data;
    });
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

      if (typeof options.aspectRatio != 'undefined' && !isCreateEvent) {
        $img.attr('src', src);
        $img.show();
        $img.css({
          'display' : 'inline-block'
        });
      } else {
        var image = new Image();
        image.src = src;
        image.onload = function() {
          var maxRatio = 0.9;
          var contentHeight = $plugin.height();// 图片最大可展示大小
          var size = LKImageUtils.calcImageSize($plugin.width() * maxRatio, contentHeight * maxRatio, this.width, this.height);
          $plugin.css('text-align', 'center');// 图片水平居中展示
          // 设置计算值
          $img.css({
            'width' : size.showWidth,
            'height' : size.showHeight,
            'margin-top' : (contentHeight - size.showHeight) / 2
          });
          $img.attr('src', src);
          $img.show();
          $img.css({
            'display' : 'inline-block'
          });
        }
      }
    }

    if (!isCreateEvent) {
      $plugin.LKSetValues(values, isCreateEvent);
    }
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
              // 压缩图片
              var loadingId = LK.showLoading();
              setTimeout(function() {
                var $cropper = $dialog.find('img.lichkin-cropper-image');
                var value = $plugin.LKGetValue();
                if ((value != '' && $cropper.attr('src') != '' && ($cropper.attr('src') == value || $cropper.attr('src').replace('data:image/' + options.imageType + ';base64,', '') == value)) || $dialog.find("input[type=file]")[0].files[0]) {
                  if ($cropper.data('cropper')) {
                    var canvas = $cropper.cropper('getCroppedCanvas', {
                      imageSmoothingEnabled : false,
                      imageSmoothingQuality : 'high'
                    });

                    var base64url = canvas.toDataURL('image/' + options.imageType);
                    LKImageUtils.compressImg(base64url, options.maxValue, 1, options.imageType).then(function(dataURL) {
                      $plugin.LKInvokeSetValues(dataURL.replace('data:image/' + options.imageType + ';base64,', ''), false);
                      LK.closeLoading(loadingId);
                      $plugin.LKValidate();
                      $dialog.LKCloseDialog();
                    });
                    return;
                  } else {
                    LK.closeLoading(loadingId);
                  }
                } else {
                  LK.closeLoading(loadingId);
                }
                LK.alert('noSelectImage');
              }, 300);
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
  // 图片最大值
  maxValue : 1024,
  // 图像类型
  imageType : 'png'
}));