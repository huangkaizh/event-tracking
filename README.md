# web-event-tracking

> 中琛魔方 web 埋点

### 引入方法：

##### script 标签

[下载 index.min.js](https://github.com/huangkaizh/event-tracking/blob/master/dist/index.min.js)

```
<script src="./lib/web-event-tracking/index.min.js"></script>
```

##### es6

```
npm i web-event-tracking -S
import 'web-event-tracking/dist/index.min'
```

### 修改默认配置：

```
window.tracking.setConfig({
  trackingServerUrl: 'http://pushdata.zcmorefun.com/', // 埋点服务器接口url
  appid: 'e1a51f2257934e99',
  token: 'MzExNTg4NjkzNjMwNzc3\u003d',
  distinctIdKey: 'distinctId', // cookie中用来存区分用户的key
  sourceKey: 'source', // url中用来标记来源渠道的key
  defaultSource: 'message', // 默认来源渠道
  interval: 5000 // 发送间隔
})
```

### 方法说明：

##### 1、点击事件

```
window.tracking.click(e)
```

##### 2、跳转至第三方支付平台

```
window.tracking.toThirdPartyPayment('alipay')
```

##### 3、跳转至家乐淘

```
window.tracking.toJLT()
```

##### 4、设置手机号

```
window.tracking.setPhone('13512347852')
```

##### 5、验证码输入正确

```
window.tracking.submitRightCaptcha()
```

##### 6、验证码输入错误

```
window.tracking.submitWrongCaptcha()
```

##### 7、切换验证码

```
window.tracking.switchCaptcha()
```

##### 8、添加自定义事件

```
window.tracking.addEvent({
    event: 'customEvent', // 自定义事件名称
    ... // 其他自定义属性
})
```

##### 9、手动触发向服务器发送埋点数据（默认 5 秒发送一次，页面关闭时发送一次）

```
window.trackingPost()
```

### 后台推送数据接口

```
url: http://172.16.5.125:5140/pushdata
method:Post
dataFormat(数据格式):
{
    "appid": "e1a51f2257934e99",
    "token": "MzExNTg4NjkzNjMwNzc3\u003d",
    "events": [
        `{
            event: "pushState",
            currentUrl: "http://www.abc.com#pageA", //从哪个页面（当前页面）跳转过去
            targetUrl: "http://www.abc.com#pageB", //跳到哪个页面
            distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid,存放在 cookie 中
            phone: "18812345236", //用户手机号
            source: "message", //渠道来源，message:短信, 自媒体: weMedia
            time: 12345678921, //点击事件客户端发生时间，long 型时间戳
            "env": {
                "browser": {
                    "name": "chrome",
                    "chrome": "80.0.3987.132",
                    "type": "chrome"
                }, //浏览器信息
                "system": {
                    "name": "win",
                    "win": "10"
                }, //系统信息
                "string": "win10|chrome80.0.3987.132"
            } //环境信息
        }`,
        ...
    ]
}
```

### 各事件 json 格式

##### 1、点击事件：

```
{
    event: "click",
    pageWidth: 1080,
    pageHeight: 2590,
    position: [100, 200], //页面中的 xy 坐标
    targetEle: {
        nodeName: "DIV", //目标元素类型
        id: "submit", //目标元素 ID
        className: "submit-btn red", //目标元素 class
    },
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    currentUrl: "http://www.baidu.com?word=abc", //当前页面 url
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 2、页面跳转：

```
{
    event: "pushState",
    currentUrl: "http://www.abc.com#pageA", //从哪个页面（当前页面）跳转过去
    targetUrl: "http://www.abc.com#pageB", //跳到哪个页面
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid,存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 3、页面切换：

```
{
    event: "replaceState",
    currentUrl: "http://www.abc.com#pageA", //从哪个页面（当前页面）跳转过去
    targetUrl: "http://www.abc.com#pageB", //跳到哪个页面
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 4、前进后退:

```
{
    event: "popstate",
    currentUrl: "http://www.abc.com#pageA", //当前页面 url
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 5、hash 切换：

```
{
    event: "hashChange",
    sourceUrl: "http://www.abc.com#pageA", //从哪个页面跳转过来
    currentUrl: "http://www.abc.com#pageB", //跳到哪个页面（当前页面）
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 6、页面关闭后：

```
{
    event: "unload",
    currentUrl: "http://www.abc.com#pageA", //当前页面 url
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 7、页面关闭前：

```
{
    event: "beforeunload",
    currentUrl: "http://www.abc.com#pageB", //当前页面 url
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 8、页面加载:

```
{
    event: "load",
    currentUrl: "http://www.abc.com#pageB", //当前页面 url
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 9、跳转至第三方支付

```
{
    event: "toThirdPartyPayment",
    thirdPartyPayment: "alipay", //第三方支付类别（微信、支付宝等）
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 10、跳转至家乐淘

```
{
    event: "toJLT",
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 11、验证码输入正确

```
{
    event: "submitRightCaptcha",
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 12、验证码输入错误

```
{
    event: "submitWrongCaptcha",
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```

##### 13、切换验证码

```
{
    event: "switchCaptcha",
    distinctId: "1123", //区分用户的 ID,第一次打开页面时新建 uuid，存放在 cookie 中
    phone: "18812345236", //用户手机号
    source: "message", //渠道来源，message:短信, 自媒体: weMedia
    time: 12345678921, //点击事件客户端发生时间，long 型时间戳
    "env": {
        "browser": {
            "name": "chrome",
            "chrome": "80.0.3987.132",
            "type": "chrome"
        }, //浏览器信息
        "system": {
            "name": "win",
            "win": "10"
        }, //系统信息
        "string": "win10|chrome80.0.3987.132"
    } //环境信息
}
```
