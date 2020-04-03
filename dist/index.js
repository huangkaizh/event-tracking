"use strict";

/* eslint-disable no-cond-assign */

/* eslint-disable no-unused-expressions */
(function () {
  var packageName = "brw";

  if (!window[packageName]) {
    window[packageName] = {};
    window[packageName]["browserInfo"] = {};
  }

  var MAX_360_CHROME_VERSION = 69; // 以360极速浏览器的最大内核版本为准

  function getIOSVersion(ua) {
    if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua)) {
      return parseFloat(RegExp.$1.replace("_", "."));
    } else {
      return 2;
    }
  }

  var browser360 = {
    result: "Chrome",
    details: {
      Chrome: 5,
      Chromium: 0,
      _360SE: 0,
      _360EE: 0
    },
    sorted: ["Chrome", "360SE", "360EE", "Chromium"],
    check: function check() {
      var init = {
        Chrome: 5,
        Chromium: 0,
        _360SE: 0,
        _360EE: 0
      };
      var plugins = window.navigator.plugins;
      var webstore = window.chrome.webstore;
      var webstoreLen = Object.keys(webstore).length;
      var pluginsLen = plugins.length;

      if (window.clientInformation.languages || (init._360SE += 8), /zh/i.test(navigator.language) && (init._360SE += 3, init._360EE += 3), window.clientInformation.languages) {
        var lanLen = window.clientInformation.languages.length;

        if (lanLen >= 3) {
          init.Chrome += 10;
          init.Chromium += 6;
        } else if (lanLen === 2) {
          init.Chrome += 3;
          init.Chromium += 6;
          init._360EE += 6;
        } else if (lanLen === 1) {
          init.Chrome += 4;
          init.Chromium += 4;
        }
      }

      var pluginFrom;
      var maybe360 = 0;

      for (var r in plugins) {
        if (pluginFrom = /^(.+) PDF Viewer$/.exec(plugins[r].name)) {
          if (pluginFrom[1] === "Chrome") {
            init.Chrome += 6;
            init._360SE += 6;
            maybe360 = 1;
          } else if (pluginFrom[1] === "Chromium") {
            init.Chromium += 10;
            init._360EE += 6;
            maybe360 = 1;
          }
        } else if (plugins[r].filename === "np-mswmp.dll") {
          init._360SE += 20;
          init._360EE += 20;
        }
      }

      maybe360 || (init.Chromium += 9);

      if (webstoreLen <= 1) {
        init._360SE += 7;
      } else {
        init._360SE += 4;
        init.Chromium += 3;

        if (pluginsLen >= 30) {
          init._360EE += 7;
          init._360SE += 7;
          init.Chrome += 7;
        } else if (pluginsLen < 30 && pluginsLen > 10) {
          init._360EE += 3;
          init._360SE += 3;
          init.Chrome += 3;
        } else {
          init.Chromium += 6;
        }
      }

      var m = {};
      m.Chrome = init.Chrome;
      m.Chromium = init.Chromium;
      m["360SE"] = init._360SE;
      m["360EE"] = init._360EE;
      var s = [];

      for (var u in m) {
        s.push([u, m[u]]);
      }

      s.sort(function (e, i) {
        return i[1] - e[1];
      });
      this.sorted = s;
      this.details = init;
      this.result = s[0][0] || "";
      return this.result.toLowerCase();
    }
  };
  /**
   * 获取国内加壳浏览器类型
   */

  function _getShellerType() {
    var brwType = "";
    var appVersion = window.navigator.appVersion;
    var external = window.external;

    if (external && "SEVersion" in external) {
      // 搜狗浏览器
      brwType = "sougou";
    } else if (external && "LiebaoGetVersion" in external) {
      // 猎豹浏览器
      brwType = "liebao";
    } else if (/QQBrowser/.test(appVersion)) {
      // qq浏览器
      brwType = "qq";
    } else if (/Maxthon/.test(appVersion)) {
      // 遨游浏览器
      brwType = "maxthon";
    } else if (/TaoBrowser/.test(appVersion)) {
      // 淘宝浏览器
      brwType = "taobao";
    } else if (/BIDUBrowser/.test(appVersion)) {
      // 百度浏览器
      brwType = "baidu";
    } else if (/UBrowser/.test(appVersion)) {
      // UC浏览器
      brwType = "uc";
    }

    return brwType;
  }
  /**
   * 获取 Chromium 内核浏览器类型
   * @link http://www.adtchrome.com/js/help.js
   * @link https://ext.chrome.360.cn/webstore
   * @link https://ext.se.360.cn
   * @return {String}
   *         360ee 360极速浏览器
   *         360se 360安全浏览器
   *         sougou 搜狗浏览器
   *         liebao 猎豹浏览器
   *         chrome 谷歌浏览器
   *         ''    无法判断
   */


  function _getChromiumType(version) {
    if (window.scrollMaxX !== undefined) return "";

    var chromeBrowserType = _getShellerType();

    if (chromeBrowserType !== "") {
      return chromeBrowserType;
    }

    if (window.navigator.vendor && window.navigator.vendor.indexOf("Opera") === 0) {
      return "opera";
    }

    var p = navigator.platform.toLowerCase();

    if (p.indexOf("mac") === 0 || p.indexOf("linux") === 0) {
      return "chrome";
    }

    if (parseInt(version) > MAX_360_CHROME_VERSION) {
      return "chrome";
    }

    return browser360.check();
  }

  var client = function () {
    var browser = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;

    if (s = ua.match(/rv:([\d.]+)/)) {
      browser.name = "ie";
      browser["ie"] = s[1];

      if (ua.indexOf("wow") > -1) {
        browser["type"] = _getShellerType() ? _getShellerType() : "360";
      } else {
        browser["type"] = "IE";
      }
    } else if (s = ua.match(/msie ([\d.]+)/)) {
      browser.name = "ie";
      browser["ie"] = s[1];

      if (ua.indexOf("wow") > -1) {
        browser["type"] = _getShellerType() ? _getShellerType() : "360";
      } else {
        browser["type"] = "IE";
      }
    } else if (s = ua.match(/edge\/([\d.]+)/)) {
      browser.name = "edge";
      browser["edge"] = s[1];
      browser["type"] = "edge";
    } else if (s = ua.match(/firefox\/([\d.]+)/)) {
      browser.name = "firefox";
      browser["firefox"] = s[1];
      browser["type"] = "firefox";
    } else if (s = ua.match(/chrome\/([\d.]+)/)) {
      browser.name = "chrome";
      browser["chrome"] = s[1];

      var type = _getChromiumType(browser["chrome"]);

      if (type) {
        browser["type"] = type;
      }
    } else if (s = ua.match(/opera.([\d.]+)/)) {
      browser.name = "opera";
      browser["opera"] = s[1];
      browser["type"] = "opera";
    } else if (s = ua.match(/version\/([\d.]+).*safari/)) {
      browser.name = "safari";
      browser["safari"] = s[1];
      browser["type"] = "safari";
    } else {
      browser.name = "unknown";
      browser["unknow"] = 0;
    }

    var system = {};

    if (ua.indexOf("iphone") > -1) {
      system.name = "iphone";
      system.iphone = getIOSVersion(ua);
    } else if (ua.indexOf("ipod") > -1) {
      system.name = "ipod";
      system.ipod = getIOSVersion(ua);
    } else if (ua.indexOf("ipad") > -1) {
      system.name = "ipad";
      system.ipad = getIOSVersion(ua);
    } else if (ua.indexOf("nokia") > -1) {
      system.name = "nokia";
      system.nokia = true;
    } else if (/android (\d+(\.\d+)?)/.test(ua)) {
      system.name = "android";
      system.android = parseFloat(RegExp.$1);
    } else if (ua.indexOf("win") > -1) {
      system.name = "win";

      if (/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] === "nt") {
          switch (RegExp["$2"]) {
            case "5.0":
              system.win = "2000";
              break;

            case "5.1":
              system.win = "XP";
              break;

            case "6.0":
              system.win = "Vista";
              break;

            case "6.1":
              system.win = "7";
              break;

            case "6.2":
              system.win = "8";
              break;

            case "6.3":
              system.win = "8.1";
              break;

            case "10.0":
              system.win = "10";
              break;

            default:
              system.win = "NT";
              break;
          }
        } else if (RegExp["$1"] === "9x") {
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    } else if (ua.indexOf("mac") > -1) {
      system.name = "mac";
    } else if (ua.indexOf("linux") > -1) {
      system.name = "linux";
    }

    var str = system.name + (system[system.name] || "") + "|" + browser.name + browser[browser.name];
    var isMobile = system.android || system.iphone || system.ios || system.ipad || system.ipod || system.nokia;
    return {
      browser: browser,
      system: system,
      isMobile: isMobile,
      string: str
    };
  }();

  window[packageName]["browserInfo"] = client;
})();

var tracking = {
  trackingServerUrl: 'http://tracking.abc.com/',
  // 埋点服务器接口url
  appid: 'b1651f4562174c06',
  token: "kgfk8i987kgfkjhwer\u1234",
  distinctIdKey: "distinctId",
  // cookie中用来存用户ID的key
  sourceKey: "source",
  // url中用来标记来源渠道的key
  defaultSource: "message",
  // 默认来源渠道
  interval: null,
  // 发送间隔, 单位毫秒
  intervalId: null,
  phone: null,
  events: [],
  setConfig: function setConfig(config) {
    Object.assign(this, config);
  },
  click: function click(e) {
    var position = [e.pageX, e.pageY];
    var id = e.target.id;
    var className = e.target.className;
    var nodeName = e.target.nodeName;
    var targetEle = {
      nodeName: nodeName,
      id: id,
      className: className
    };
    var pageWidth = document.documentElement.offsetWidth;
    var pageHeight = document.documentElement.offsetHeight;
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var screenAvailWidth = window.screen.availWidth;
    var screenAvailHeight = window.screen.availHeight;
    var windowInnerWidth = window.innerWidth;
    var windowInnerHeight = window.innerHeight;
    var currentUrl = window.location.href;
    tracking.addEvent({
      event: "click",
      pageWidth: pageWidth,
      pageHeight: pageHeight,
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      screenAvailWidth: screenAvailWidth,
      screenAvailHeight: screenAvailHeight,
      windowInnerWidth: windowInnerWidth,
      windowInnerHeight: windowInnerHeight,
      position: position,
      targetEle: targetEle,
      currentUrl: currentUrl
    });
  },
  toThirdPartyPayment: function toThirdPartyPayment(thirdPartyPayment) {
    this.addEvent({
      event: "toThirdPartyPayment",
      thirdPartyPayment: thirdPartyPayment // 第三方支付类别（微信、支付宝等）

    });
  },
  toExternalUrl: function toExternalUrl() {
    this.addEvent({
      event: "toExternalUrl",
      // 跳转至某外链
      externalUrl: "http://www.bcd.com" // 某外链

    });
  },
  setPhone: function setPhone(phone) {
    this.phone = phone;
  },
  // 设置手机号
  submitRightCaptcha: function submitRightCaptcha() {
    this.addEvent({
      event: "submitRightCaptcha"
    });
  },
  // 验证码输入正确
  submitWrongCaptcha: function submitWrongCaptcha() {
    this.addEvent({
      event: "submitWrongCaptcha"
    });
  },
  // 验证码输入错误
  switchCaptcha: function switchCaptcha() {
    this.addEvent({
      event: "switchCaptcha"
    });
  },
  // 切换验证码
  getEnv: function getEnv() {
    return window.brw.browserInfo || {};
  },
  // 获取环境信息（系统及浏览器信息）

  /**
   * [通过参数名获取url中的参数值]
   * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
   * @param  {[string]} queryName [参数名]
   * @return {[string]}           [参数值]
   */
  getQueryValue: function getQueryValue(queryName) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");

      if (pair[0] === queryName) {
        return pair[1];
      }
    }

    return null;
  },
  getSource: function getSource() {
    var source = this.getQueryValue(this.SOURCE);
    if (!source) return this.defaultSource;
    return source;
  },
  getTime: function getTime() {
    return new Date().getTime();
  },
  getDistinctId: function getDistinctId() {
    var distinctId = this.getCookie(tracking.distinctIdKey);
    if (distinctId) return distinctId;
    distinctId = this.uuid();
    this.setCookie(tracking.distinctIdKey, distinctId);
    return distinctId;
  },
  uuid: function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },
  setCookie: function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + document.cookie;
  },
  getCookie: function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  },
  getCommonParams: function getCommonParams() {
    var distinctId = this.getDistinctId();
    var env = this.getEnv();
    var time = this.getTime();
    var source = this.getSource();
    var commonParams = {
      distinctId: distinctId,
      source: source,
      time: time,
      env: env
    };
    if (tracking.phone) commonParams.phone = tracking.phone;
    return commonParams;
  },
  addEvent: function addEvent(eventParams) {
    var commonParams = this.getCommonParams();
    var event = Object.assign(commonParams, eventParams);
    this.events.push(JSON.stringify(event));
  },
  trackingPost: function trackingPost() {
    if (!tracking.events || tracking.events.length === 0) return;
    var params = {
      appid: tracking.appid,
      token: tracking.token,
      events: JSON.parse(JSON.stringify(tracking.events))
    };
    tracking.post(tracking.trackingServerUrl, {
      "Content-Type": "application/json" // 'Access-Control-Allow-Origin': '*'

    }, JSON.stringify(params));
    tracking.events = [];
  },
  post: function post(url, headers, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var responseText = xhr.responseText; // 返回结果

          if (!responseText) return;
          var res = JSON.parse(responseText);

          if (res.code === "200") {
            if (callback) callback(res);
          } else {
            console.log(res.msg);
          }
        } else {
          console.log(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.log(xhr.statusText);
    };

    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(params);
  }
};

(function (history) {
  var pushState = history.pushState;

  history.pushState = function () {
    if (typeof history.onpushstate === "function") {
      history.onpushstate(arguments);
    }

    return pushState.apply(history, arguments);
  };

  var replaceState = history.replaceState;

  history.replaceState = function () {
    if (typeof history.onreplacestate === "function") {
      history.onreplacestate(arguments);
    }

    return replaceState.apply(history, arguments);
  };
})(window.history);

window.history.onpushstate = function (args) {
  var currentUrl = window.location.href;
  var targetUrl = args[2];
  tracking.addEvent({
    event: "pushState",
    currentUrl: currentUrl,
    targetUrl: targetUrl
  });
};

window.history.onreplacestate = function (args) {
  var currentUrl = window.location.href;
  var targetUrl = args[2];
  tracking.addEvent({
    event: "replaceState",
    currentUrl: currentUrl,
    targetUrl: targetUrl
  });
};

function onhashchange(e) {
  var currentUrl = e.newUrl;
  var sourceUrl = e.oldUrl;
  tracking.addEvent({
    event: "hashChange",
    sourceUrl: sourceUrl,
    currentUrl: currentUrl
  });
}

function onpopstate(e) {
  var currentUrl = e.target.location.href;
  tracking.addEvent({
    event: "popState",
    currentUrl: currentUrl
  });
}

function onunload(e) {
  var currentUrl = e.target.location.href;
  tracking.addEvent({
    event: "unload",
    currentUrl: currentUrl
  });
  clearInterval(tracking.intervalId);
  tracking.intervalId = null;
  tracking.trackingPost();
  window.history.onpushstate = null;
  window.history.onreplacestate = null;
  window.removeEventListener("load", onload, false);
  window.removeEventListener("beforeunload", onbeforeunload, false);
  window.removeEventListener("unload", onunload, false);
  window.removeEventListener("popstate", onpopstate, false);
  window.removeEventListener("hashchange", onhashchange, false);
  window.removeEventListener("click", tracking.click, false);
  window.tracking = null;
  tracking = null;
}

function onbeforeunload(e) {
  var currentUrl = e.target.location.href;
  tracking.addEvent({
    event: "beforeUnload",
    currentUrl: currentUrl
  });
}

function onload(e) {
  var currentUrl = e.target.location.href;
  tracking.addEvent({
    event: "load",
    currentUrl: currentUrl
  });
  tracking.intervalId = setInterval(tracking.trackingPost, tracking.interval);
}

window.addEventListener("load", onload, false);
window.addEventListener("beforeunload", onbeforeunload, false);
window.addEventListener("unload", onunload, false);
window.addEventListener("popstate", onpopstate, false);
window.addEventListener("hashchange", onhashchange, false);
window.addEventListener("click", tracking.click, false); // window.onclick = tracking.click

window.tracking = tracking;