# LKUI说明

------

WEB端常用方法以及UI控件

> #### 使用的技术
> * JavaScript
> * HTML
> * CSS
> * JQuery
> * FontAwesome


# 1 在window对象上添加的常用方法
> ## 1.1 isJSON(json)
> #### 描述
>> 判断是否为JSON对象
> #### 参数
>> json JSON对象
> #### 返回值
>> json参数是JSON格式时返回true，否则返回false。
> #### 示例
> ```javascript
> isJSON({}) -> true;
> isJSON(1) -> false;
> isJSON('1') -> false;
> isJSON([]) -> false;
> isJSON(document) -> false;
> ```

> ## 1.2 isEmptyJSON(json)
> #### 描述
>> 判断是否为空JSON

> #### 参数
>> json JSON对象

> #### 返回值
>> json参数是JSON格式且无参数时返回true，否则返回false。

> #### 示例
```javascript
isEmptyJSON({}) -> true;
isEmptyJSON({a:1}) -> false;
```

------

最后更新于
2018年06月03日
