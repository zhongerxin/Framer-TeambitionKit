require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"circleModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Circle = (function(superClass) {
  extend(Circle, superClass);

  Circle.prototype.currentValue = null;

  function Circle(options) {
    var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, counter, numberDuration, numberEnd, numberInterval, numberNow, numberStart, self, style;
    this.options = options != null ? options : {};
    if ((base = this.options).circleSize == null) {
      base.circleSize = 300;
    }
    if ((base1 = this.options).strokeWidth == null) {
      base1.strokeWidth = 24;
    }
    if ((base2 = this.options).strokeColor == null) {
      base2.strokeColor = "#fc245c";
    }
    if ((base3 = this.options).topColor == null) {
      base3.topColor = null;
    }
    if ((base4 = this.options).bottomColor == null) {
      base4.bottomColor = null;
    }
    if ((base5 = this.options).dropShadow == null) {
      base5.dropShadow = null;
    }
    if ((base6 = this.options).hasCounter == null) {
      base6.hasCounter = false;
    }
    if ((base7 = this.options).counterColor == null) {
      base7.counterColor = "#fff";
    }
    if ((base8 = this.options).counterFontSize == null) {
      base8.counterFontSize = 60;
    }
    if ((base9 = this.options).hasLinearEasing == null) {
      base9.hasLinearEasing = false;
    }
    if ((base10 = this.options).counterWeight == null) {
      base10.counterWeight = 0;
    }
    if ((base11 = this.options).hasPercentage == null) {
      base11.hasPercentage = false;
    }
    this.options.value = 2;
    this.options.viewBox = this.options.circleSize + this.options.strokeWidth;
    Circle.__super__.constructor.call(this, this.options);
    this.backgroundColor = "";
    this.height = this.options.viewBox;
    this.width = this.options.viewBox;
    this.rotation = -90;
    this.pathLength = Math.PI * this.options.circleSize;
    this.circleID = "circle" + Math.floor(Math.random() * 1000);
    this.gradientID = "circle" + Math.floor(Math.random() * 1000);
    if (this.options.hasCounter !== null) {
      counter = new Layer({
        parent: this,
        html: "",
        width: this.width,
        height: this.height,
        backgroundColor: "",
        rotation: 90,
        color: this.options.counterColor
      });
      style = {
        textAlign: "center",
        fontSize: this.options.counterFontSize + "px",
        lineHeight: this.height + "px",
        fontWeight: "" + this.options.counterWeight,
        fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
        boxSizing: "border-box",
        height: this.height
      };
      counter.style = style;
      numberStart = 0;
      numberEnd = 100;
      numberDuration = 2;
      numberNow = numberStart;
      numberInterval = numberEnd - numberStart;
    }
    this.html = "<svg viewBox='-" + (this.options.strokeWidth / 2) + " -" + (this.options.strokeWidth / 2) + " " + this.options.viewBox + " " + this.options.viewBox + "' -webkit-filter='" + this.options.dropShadow + "' filter='" + this.options.dropShadow + "' >\n	<defs>\n	    <linearGradient id='" + this.gradientID + "' >\n	        <stop offset=\"0%\" stop-color='" + (this.options.topColor !== null ? this.options.bottomColor : this.options.strokeColor) + "'/>\n	        <stop offset=\"100%\" stop-color='" + (this.options.topColor !== null ? this.options.topColor : this.options.strokeColor) + "' stop-opacity=\"1\" />\n	    </linearGradient>\n	</defs>\n	<circle id='" + this.circleID + "'\n			fill='none'\n			stroke-linecap='round'\n			stroke-width      = '" + this.options.strokeWidth + "'\n			stroke-dasharray  = '" + this.pathLength + "'\n			stroke-dashoffset = '0'\n			stroke=\"url(#" + this.gradientID + ")\"\n			stroke-width=\"10\"\n			cx = '" + (this.options.circleSize / 2) + "'\n			cy = '" + (this.options.circleSize / 2) + "'\n			r  = '" + (this.options.circleSize / 2) + "'>\n</svg>";
    self = this;
    Utils.domComplete(function() {
      return self.path = document.querySelector("#" + self.circleID);
    });
    this.proxy = new Layer({
      opacity: 0
    });
    this.proxy.on(Events.AnimationEnd, function(animation, layer) {
      return self.onFinished();
    });
    this.proxy.on('change:x', function() {
      var offset;
      offset = Utils.modulate(this.x, [0, 500], [self.pathLength, 0]);
      self.path.setAttribute('stroke-dashoffset', offset);
      if (self.options.hasCounter !== false) {
        numberNow = Utils.round(self.proxy.x / 5);
        counter.html = numberNow;
        if (self.options.hasPercentage !== false) {
          return counter.html = numberNow + "%";
        }
      }
    });
    Utils.domComplete(function() {
      return self.proxy.x = 0.1;
    });
  }

  Circle.prototype.changeTo = function(value, time) {
    var customCurve;
    if (time === void 0) {
      time = 2;
    }
    if (this.options.hasCounter === true && this.options.hasLinearEasing === false) {
      customCurve = "linear";
    } else {
      customCurve = "ease-in-out";
    }
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: time,
      curve: customCurve
    });
    return this.currentValue = value;
  };

  Circle.prototype.startAt = function(value) {
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: 0.001
    });
    return this.currentValue = value;
  };

  Circle.prototype.hide = function() {
    return this.opacity = 0;
  };

  Circle.prototype.show = function() {
    return this.opacity = 1;
  };

  Circle.prototype.onFinished = function() {};

  return Circle;

})(Layer);


},{}],"iconModule":[function(require,module,exports){
var Icon, arrow_left, cancel, date_default, map_okr, menu, opacityColor, plus_bold, plus_border, plus_fill, setting,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

menu = '<path d="M15.8331,6.4248 L4.1661,6.4248 C3.8351,6.4248 3.5661,6.1558 3.5661,5.8248 C3.5661,5.4928 3.8351,5.2248 4.1661,5.2248 L15.8331,5.2248 C16.1651,5.2248 16.4331,5.4928 16.4331,5.8248 C16.4331,6.1558 16.1651,6.4248 15.8331,6.4248 L15.8331,6.4248 Z" id="fill"  mask="url(#mask-2)"></path><path d="M15.8331,10.5913 L4.1661,10.5913 C3.8351,10.5913 3.5661,10.3223 3.5661,9.9913 C3.5661,9.6593 3.8351,9.3913 4.1661,9.3913 L15.8331,9.3913 C16.1651,9.3913 16.4331,9.6593 16.4331,9.9913 C16.4331,10.3223 16.1651,10.5913 15.8331,10.5913" id="fill" mask="url(#mask-2)"></path><path d="M15.8331,14.7754 L4.1661,14.7754 C3.8351,14.7754 3.5661,14.5064 3.5661,14.1754 C3.5661,13.8444 3.8351,13.5764 4.1661,13.5764 L15.8331,13.5764 C16.1651,13.5764 16.4331,13.8444 16.4331,14.1754 C16.4331,14.5064 16.1651,14.7754 15.8331,14.7754" id="fill" mask="url(#mask-2)"></path>';

cancel = '<path d="M10.8485,10 L15.4245,5.424 C15.6585,5.19 15.6585,4.81 15.4245,4.576 C15.1905,4.341 14.8105,4.341 14.5755,4.576 L10.0005,9.152 L5.4245,4.576 C5.1905,4.341 4.8105,4.341 4.5755,4.576 C4.3415,4.81 4.3415,5.19 4.5755,5.424 L9.1515,10 L4.5755,14.576 C4.3415,14.81 4.3415,15.19 4.5755,15.424 C4.6925,15.541 4.8465,15.6 5.0005,15.6 C5.1535,15.6 5.3075,15.541 5.4245,15.424 L10.0005,10.848 L14.5755,15.424 C14.6925,15.541 14.8465,15.6 15.0005,15.6 C15.1535,15.6 15.3075,15.541 15.4245,15.424 C15.6585,15.19 15.6585,14.81 15.4245,14.576 L10.8485,10 L10.8485,10 Z" id="fill" mask="url(#mask-2)"></path>';

plus_bold = '<path d="M9,9 L5.00247329,9 C4.45576096,9 4,9.44771525 4,10 C4,10.5561352 4.44882258,11 5.00247329,11 L9,11 L9,14.9975267 C9,15.544239 9.44771525,16 10,16 C10.5561352,16 11,15.5511774 11,14.9975267 L11,11 L14.9975267,11 C15.544239,11 16,10.5522847 16,10 C16,9.44386482 15.5511774,9 14.9975267,9 L11,9 L11,5.00247329 C11,4.45576096 10.5522847,4 10,4 C9.44386482,4 9,4.44882258 9,5.00247329 L9,9 Z" id="Combined-Shape"></path>';

arrow_left = '<path d="M13.361712,18 C13.1990164,18 13.0352574,17.9403373 12.9108431,17.8220232 L6.18715316,11.4290151 C6.06805569,11.3157572 6,11.1610387 6,11.0002528 C6,10.8394669 6.06805569,10.6857597 6.18715316,10.5714905 L12.9108431,4.1774712 C13.1596717,3.94084293 13.5637524,3.94084293 13.812581,4.1774712 C14.062473,4.41409946 14.062473,4.79836758 13.812581,5.03600708 L7.54082345,11.0002528 L13.812581,16.9655098 C14.062473,17.2011268 14.062473,17.5853949 13.812581,17.8220232 C13.6881667,17.9403373 13.5244077,18 13.361712,18 L13.361712,18 Z" id="fill" transform="translate(9.761625, 10.922250) rotate(-180.000000) translate(-9.761625, -10.922250) "></path>';

map_okr = '<path d="M14.8242,16.8008 C14.1132,16.8008 13.5342,16.2218 13.5342,15.5108 C13.5342,14.7998 14.1132,14.2208 14.8242,14.2208 C15.5352,14.2208 16.1142,14.7998 16.1142,15.5108 C16.1142,16.2218 15.5352,16.8008 14.8242,16.8008 L14.8242,16.8008 Z M5.1752,11.4588 C4.4642,11.4588 3.8862,10.8808 3.8862,10.1698 C3.8862,9.4588 4.4642,8.8798 5.1752,8.8798 C5.8862,8.8798 6.4652,9.4588 6.4652,10.1698 C6.4652,10.8808 5.8862,11.4588 5.1752,11.4588 L5.1752,11.4588 Z M14.8242,3.1998 C15.5352,3.1998 16.1142,3.7788 16.1142,4.4888 C16.1142,5.1998 15.5352,5.7788 14.8242,5.7788 C14.1132,5.7788 13.5342,5.1998 13.5342,4.4888 C13.5342,3.7788 14.1132,3.1998 14.8242,3.1998 L14.8242,3.1998 Z M14.8242,13.0218 C14.0232,13.0218 13.3172,13.4078 12.8612,13.9968 L7.6022,10.7098 C7.6412,10.5358 7.6652,10.3558 7.6652,10.1698 C7.6652,9.9828 7.6412,9.8038 7.6022,9.6288 L13.0462,6.2258 C13.4982,6.6898 14.1272,6.9788 14.8242,6.9788 C16.1972,6.9788 17.3142,5.8618 17.3142,4.4888 C17.3142,3.1168 16.1972,1.9998 14.8242,1.9998 C13.4512,1.9998 12.3342,3.1168 12.3342,4.4888 C12.3342,4.7328 12.3802,4.9638 12.4462,5.1858 L7.0552,8.5558 C6.5982,8.0238 5.9292,7.6798 5.1752,7.6798 C3.8032,7.6798 2.6862,8.7968 2.6862,10.1698 C2.6862,11.5418 3.8032,12.6588 5.1752,12.6588 C5.9292,12.6588 6.5982,12.3148 7.0552,11.7838 L12.3752,15.1078 C12.3532,15.2398 12.3342,15.3728 12.3342,15.5108 C12.3342,16.8838 13.4512,17.9998 14.8242,17.9998 C16.1972,17.9998 17.3142,16.8838 17.3142,15.5108 C17.3142,14.1378 16.1972,13.0218 14.8242,13.0218 L14.8242,13.0218 Z" id="fill" transform="translate(10.000200, 9.999800) rotate(-270.000000) translate(-10.000200, -9.999800) "></path>';

setting = '<path d="M10.0001,8.2002 C9.0071,8.2002 8.2001,9.0072 8.2001,10.0002 C8.2001,10.9922 9.0071,11.8002 10.0001,11.8002 C10.9931,11.8002 11.8001,10.9922 11.8001,10.0002 C11.8001,9.0072 10.9931,8.2002 10.0001,8.2002 L10.0001,8.2002 Z M10.0001,13.0002 C8.3461,13.0002 7.0001,11.6542 7.0001,10.0002 C7.0001,8.3462 8.3461,7.0002 10.0001,7.0002 C11.6541,7.0002 13.0001,8.3462 13.0001,10.0002 C13.0001,11.6542 11.6541,13.0002 10.0001,13.0002 L10.0001,13.0002 Z" id="fill"></path><path d="M9.2584,16.8008 L10.7414,16.8008 L11.5064,15.0668 C11.5704,14.9208 11.6894,14.8068 11.8384,14.7488 C12.3324,14.5578 12.7894,14.2948 13.1964,13.9668 C13.3204,13.8668 13.4794,13.8228 13.6364,13.8378 L15.5184,14.0418 L16.2594,12.7578 L15.1384,11.2268 C15.0444,11.0978 15.0054,10.9378 15.0294,10.7808 C15.0694,10.5258 15.0964,10.2658 15.0964,9.9998 C15.0964,9.7338 15.0694,9.4748 15.0294,9.2188 C15.0054,9.0618 15.0444,8.9018 15.1384,8.7738 L16.2594,7.2418 L15.5184,5.9578 L13.6374,6.1628 C13.4794,6.1748 13.3194,6.1338 13.1964,6.0328 C12.7904,5.7058 12.3334,5.4428 11.8384,5.2518 C11.6894,5.1938 11.5704,5.0798 11.5064,4.9338 L10.7414,3.1998 L9.2584,3.1998 L8.4934,4.9338 C8.4294,5.0798 8.3104,5.1938 8.1614,5.2518 C7.6654,5.4438 7.2094,5.7068 6.8044,6.0328 C6.6804,6.1328 6.5204,6.1748 6.3624,6.1628 L4.4824,5.9578 L3.7404,7.2418 L4.8614,8.7738 C4.9554,8.9018 4.9944,9.0618 4.9694,9.2188 C4.9304,9.4748 4.9034,9.7338 4.9034,9.9998 C4.9034,10.2658 4.9304,10.5258 4.9694,10.7808 C4.9944,10.9378 4.9554,11.0978 4.8614,11.2268 L3.7404,12.7578 L4.4824,14.0418 L6.3634,13.8378 C6.5184,13.8228 6.6804,13.8668 6.8044,13.9678 C7.2104,14.2948 7.6664,14.5578 8.1614,14.7488 C8.3104,14.8068 8.4294,14.9208 8.4934,15.0668 L9.2584,16.8008 Z M11.1334,17.9998 L8.8674,17.9998 C8.6294,17.9998 8.4144,17.8608 8.3184,17.6428 L7.4934,15.7718 C7.0514,15.5798 6.6354,15.3408 6.2524,15.0568 L4.2224,15.2778 C3.9824,15.2988 3.7574,15.1868 3.6384,14.9808 L2.5054,13.0198 C2.3864,12.8138 2.4004,12.5568 2.5404,12.3648 L3.7494,10.7138 C3.7184,10.4598 3.7034,10.2238 3.7034,9.9998 C3.7034,9.7758 3.7184,9.5408 3.7494,9.2858 L2.5404,7.6348 C2.4004,7.4438 2.3864,7.1868 2.5054,6.9808 L3.6384,5.0188 C3.7574,4.8138 3.9874,4.7028 4.2224,4.7218 L6.2524,4.9438 C6.6344,4.6598 7.0504,4.4208 7.4934,4.2288 L8.3184,2.3578 C8.4144,2.1408 8.6294,1.9998 8.8674,1.9998 L11.1324,1.9998 C11.3704,1.9998 11.5854,2.1408 11.6814,2.3578 L12.5064,4.2288 C12.9484,4.4208 13.3644,4.6598 13.7474,4.9438 L15.7774,4.7218 C16.0154,4.6978 16.2424,4.8128 16.3624,5.0188 L17.4944,6.9808 C17.6134,7.1868 17.5994,7.4438 17.4594,7.6348 L16.2504,9.2858 C16.2814,9.5408 16.2964,9.7758 16.2964,9.9998 C16.2964,10.2238 16.2814,10.4598 16.2504,10.7138 L17.4594,12.3648 C17.5994,12.5568 17.6134,12.8138 17.4944,13.0198 L16.3624,14.9808 C16.2434,15.1878 16.0154,15.3028 15.7784,15.2778 L13.7474,15.0568 C13.3634,15.3408 12.9474,15.5798 12.5064,15.7718 L11.6814,17.6428 C11.5864,17.8608 11.3704,17.9998 11.1334,17.9998 L11.1334,17.9998 Z" id="fill"></path>';

plus_fill = '<path d="M10.6000935,13.3332398 C10.6000935,13.6641657 10.3313929,13.9328663 9.99975983,13.9335734 C9.83429685,13.9335734 9.68439021,13.8656912 9.57620287,13.7575038 C9.46730843,13.6486094 9.40013328,13.4994098 9.39942618,13.3332398 L9.40013328,10.600272 L6.66645847,10.600272 C6.50099548,10.600272 6.35108884,10.5323898 6.24290151,10.4242025 C6.13400706,10.315308 6.06683192,10.1661085 6.06683192,10.0006455 C6.06683192,9.66830531 6.33553249,9.39960473 6.66716558,9.40031184 L9.40013328,9.39960473 L9.40013328,6.66734413 C9.40013328,6.33500394 9.66812675,6.06701047 10.0004669,6.06701047 C10.3313929,6.06701047 10.6000935,6.33571105 10.6000935,6.66663702 L10.6000935,9.40031184 L13.3330612,9.39960473 C13.6646943,9.40031184 13.9333949,9.66901241 13.9333949,9.99993839 C13.9326878,10.3315715 13.6646943,10.5995649 13.3330612,10.600272 L10.6000935,10.5995649 L10.6000935,13.3332398 L10.6000935,13.3332398 Z M10.0004,1.9996 C5.5814,1.9996 2.0004,5.5816 2.0004,9.9996 C2.0004,14.4186 5.5814,17.9996 10.0004,17.9996 C14.4184,17.9996 18.0004,14.4186 18.0004,9.9996 C18.0004,5.5816 14.4184,1.9996 10.0004,1.9996 L10.0004,1.9996 Z" id="iconAdd"></path>';

plus_border = '<path d="M10,2 C5.582,2 2,5.582 2,10 C2,14.418 5.582,18 10,18 C14.418,18 18,14.418 18,10 C18,5.582 14.418,2 10,2 L10,2 Z M10,3.2 C13.75,3.2 16.8,6.25 16.8,10 C16.8,13.75 13.75,16.8 10,16.8 C6.25,16.8 3.2,13.75 3.2,10 C3.2,6.25 6.25,3.2 10,3.2 L10,3.2 Z" id="fill"></path><path d="M13.3331,10.6001 L6.6661,10.6001 C6.3351,10.6001 6.0661,10.3311 6.0661,10.0001 C6.0661,9.6681 6.3351,9.4001 6.6661,9.4001 L13.3331,9.4001 C13.6651,9.4001 13.9331,9.6681 13.9331,10.0001 C13.9331,10.3311 13.6651,10.6001 13.3331,10.6001" id="fill"></path><path d="M10.0001,13.9326 C9.6681,13.9326 9.4001,13.6636 9.4001,13.3326 L9.4001,6.6666 C9.4001,6.3346 9.6681,6.0666 10.0001,6.0666 C10.3321,6.0666 10.6001,6.3346 10.6001,6.6666 L10.6001,13.3326 C10.6001,13.6636 10.3321,13.9326 10.0001,13.9326" id="fill"></path>';

date_default = '<path d="M15.294,16.8 L4.706,16.8 C4.272,16.8 3.906,16.434 3.906,16 L3.906,8.282 L16.094,8.282 L16.094,16 C16.094,16.434 15.728,16.8 15.294,16.8 L15.294,16.8 Z M4.706,4.612 L6.146,4.612 L6.146,5.038 C6.146,5.369 6.415,5.638 6.746,5.638 C7.078,5.638 7.346,5.369 7.346,5.038 L7.346,4.612 L12.654,4.612 L12.654,5.038 C12.654,5.369 12.922,5.638 13.254,5.638 C13.586,5.638 13.854,5.369 13.854,5.038 L13.854,4.612 L15.294,4.612 C15.728,4.612 16.094,4.978 16.094,5.412 L16.094,7.082 L3.906,7.082 L3.906,5.412 C3.906,4.978 4.272,4.612 4.706,4.612 L4.706,4.612 Z M15.294,3.412 L13.854,3.412 L13.854,2.6 C13.854,2.269 13.586,2 13.254,2 C12.922,2 12.654,2.269 12.654,2.6 L12.654,3.412 L7.346,3.412 L7.346,2.6 C7.346,2.269 7.078,2 6.746,2 C6.415,2 6.146,2.269 6.146,2.6 L6.146,3.412 L4.706,3.412 C3.606,3.412 2.706,4.312 2.706,5.412 L2.706,16 C2.706,17.1 3.606,18 4.706,18 L15.294,18 C16.394,18 17.294,17.1 17.294,16 L17.294,5.412 C17.294,4.312 16.394,3.412 15.294,3.412 L15.294,3.412 Z" id="fill"></path>';

opacityColor = new Color("#ffffff").alpha(.0);

Icon = (function(superClass) {
  extend(Icon, superClass);

  function Icon(options) {
    var base, base1, base2, base3, base4, base5;
    this.options = options != null ? options : {};
    if ((base = this.options).width == null) {
      base.width = 20;
    }
    if ((base1 = this.options).height == null) {
      base1.height = 20;
    }
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = opacityColor;
    }
    if ((base3 = this.options).icon == null) {
      base3.icon = menu;
    }
    if ((base4 = this.options).color == null) {
      base4.color = "#808080";
    }
    if ((base5 = this.options).viewBox == null) {
      base5.viewBox = "0 0 40 40";
    }
    Icon.__super__.constructor.call(this, this.options);
  }

  Icon.define("icon", {
    get: function() {
      return this.options.icon;
    },
    set: function(value) {
      this.options.icon = value;
      return this.html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg fill=\"" + this.options.color + "\" width=\"40px\" height=\"40px\" viewBox=\"" + this.options.viewBox + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" + this.options.icon + "\n</svg>";
    }
  });

  Icon.define("color", {
    get: function() {
      return this.options.color;
    },
    set: function(value) {
      this.options.color = value;
      return this.html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg fill=\"" + this.options.color + "\" width=\"40px\" height=\"40px\" viewBox=\"" + this.options.viewBox + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" + this.options.icon + "\n</svg>";
    }
  });

  return Icon;

})(Layer);

exports.Icon = Icon;

exports.cancel = cancel;

exports.menu = menu;

exports.plus_bold = plus_bold;

exports.arrow_left = arrow_left;

exports.map_okr = map_okr;

exports.setting = setting;

exports.plus_fill = plus_fill;

exports.plus_border = plus_border;

exports.date_default = date_default;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"okrKit":[function(require,module,exports){
var CardBg, CardStack, Tag, cursorAuto, cursorPointer, defaultAnimation, opacityColor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaultAnimation = {
  time: 0.2,
  curve: Bezier.easeInOut
};

opacityColor = new Color("#ffffff").alpha(.0);

cursorAuto = function() {
  return document.body.style.cursor = "auto";
};

cursorPointer = function() {
  return document.body.style.cursor = "pointer";
};

CardBg = (function(superClass) {
  extend(CardBg, superClass);

  function CardBg(options1) {
    var base, base1, base2, base3;
    this.options = options1 != null ? options1 : {};
    this.options.borderRadius = 4;
    if ((base = this.options).backgroundColor == null) {
      base.backgroundColor = "#ffffff";
    }
    if ((base1 = this.options).shadowY == null) {
      base1.shadowY = 2;
    }
    if ((base2 = this.options).shadowColor == null) {
      base2.shadowColor = "rgba(0,0,0,0.05)";
    }
    if ((base3 = this.options).shadowBlur == null) {
      base3.shadowBlur = 3;
    }
    CardBg.__super__.constructor.call(this, this.options);
  }

  return CardBg;

})(Layer);

Tag = (function(superClass) {
  extend(Tag, superClass);

  function Tag(options1) {
    var base, base1, base2;
    this.options = options1 != null ? options1 : {};
    if ((base = this.options).text == null) {
      base.text = "标签";
    }
    this.options.fontSize = 14;
    this.options.lineHeight = 20 / 14;
    if ((base1 = this.options).color == null) {
      base1.color = "#ffffff";
    }
    this.options.borderRadius = 4;
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = "#383838";
    }
    this.options.shadowSpread = 0;
    this.options.shadowY = 2;
    this.options.shadowColor = "rgba(0,0,0,0.05)";
    this.options.shadowBlur = 3;
    this.options.padding = {
      left: 12,
      right: 12,
      top: 8,
      bottom: 8
    };
    this.arrow = new Layer({
      width: 8,
      height: 8,
      backgroundColor: "#383838",
      rotation: 45
    });
    Tag.__super__.constructor.call(this, this.options);
    this.arrow.parent = this;
    this.arrow.midX = this.width / 2;
    this.arrow.midY = this.height;
  }

  return Tag;

})(TextLayer);

CardStack = (function(superClass) {
  extend(CardStack, superClass);

  function CardStack(options) {
    CardStack.__super__.constructor.call(this, _.defaults(options, {
      backgroundColor: opacityColor,
      width: 370,
      height: 197,
      tagLabel: ""
    }));
    this.init();
  }

  CardStack.prototype.refresh = function() {
    var i, j;
    for (i = j = 0; j < 3; i = ++j) {
      this.cards[i].width = this.width - i * 8;
    }
    this.tag.x = this.width / 2 - 51;
    return this.tag.tag_label.text = this.tagLabel;
  };

  CardStack.prototype.init = function() {
    var i, j;
    this.cards = [];
    for (i = j = 0; j < 3; i = ++j) {
      this.card_cover = new CardBg({
        width: this.width - i * 8,
        height: 120,
        index: 3 - i,
        midX: this.width / 2,
        y: i * 3,
        parent: this
      });
      this.card_cover.states["default"] = {
        y: this.card_cover.y,
        animationOptions: defaultAnimation
      };
      this.card_cover.states.stretch = {
        y: this.card_cover.y + 3 * (i + 1),
        animationOptions: defaultAnimation
      };
      this.cards.push(this.card_cover);
    }
    this.mask = new Layer({
      parent: this.cards[0],
      backgroundColor: "#3DA5F8",
      height: 120,
      style: {
        "borderRadius": "3px 0 0 3px"
      },
      width: 0
    });
    this.mask.states["default"] = {
      width: this.mask.width,
      animationOptions: defaultAnimation
    };
    this.mask.states.stretch = {
      width: this.mask.width + 8,
      animationOptions: defaultAnimation
    };
    this.tag = new Tag({
      parent: this,
      x: this.width / 2 - 51,
      y: this.cards[0].height + 16,
      opacity: 0
    });
    this.tag.states["default"] = {
      y: this.tag.y,
      opacity: this.tag.opacity,
      animationOptions: defaultAnimation
    };
    this.tag.states.stretch = {
      y: this.tag.y + 3 * this.cards.length,
      opacity: 1,
      animationOptions: defaultAnimation
    };
    this.on("mouseenter", function() {
      var k, len, ref, results;
      cursorPointer();
      this.mask.animate("stretch");
      this.tag.animate("stretch");
      ref = this.cards;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        results.push(i.animate("stretch"));
      }
      return results;
    });
    return this.on("mouseleave", function() {
      var k, len, ref, results;
      cursorAuto();
      this.mask.animate("default");
      this.tag.animate("default");
      ref = this.cards;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        results.push(i.animate("default"));
      }
      return results;
    });
  };

  return CardStack;

})(Layer);

exports.CardStack = CardStack;

exports.CardBg = CardBg;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0ZyYW1lci1UZWFtYml0aW9uS2l0L09LUi5mcmFtZXIvbW9kdWxlcy9va3JLaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vRnJhbWVyLVRlYW1iaXRpb25LaXQvT0tSLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL0ZyYW1lci1UZWFtYml0aW9uS2l0L09LUi5mcmFtZXIvbW9kdWxlcy9pY29uTW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL0ZyYW1lci1UZWFtYml0aW9uS2l0L09LUi5mcmFtZXIvbW9kdWxlcy9jaXJjbGVNb2R1bGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkZWZhdWx0QW5pbWF0aW9uID1cblx0dGltZTogMC4yXG5cdGN1cnZlOiBCZXppZXIuZWFzZUluT3V0XG5vcGFjaXR5Q29sb3IgPSBuZXcgQ29sb3IoXCIjZmZmZmZmXCIpLmFscGhhKC4wKVxuY3Vyc29yQXV0byA9IC0+XG5cdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcbmN1cnNvclBvaW50ZXIgPSAtPlxuXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiXG5cbmNsYXNzIENhcmRCZyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuYm9yZGVyUmFkaXVzID0gNFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIiNmZmZmZmZcIlxuXHRcdEBvcHRpb25zLnNoYWRvd1kgPz0gMlxuXHRcdEBvcHRpb25zLnNoYWRvd0NvbG9yID89IFwicmdiYSgwLDAsMCwwLjA1KVwiXG5cdFx0QG9wdGlvbnMuc2hhZG93Qmx1ciA/PSAzXG5cdFx0c3VwZXIgQG9wdGlvbnNcdFx0XG5jbGFzcyBUYWcgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy50ZXh0ID89IFwi5qCH562+XCJcblx0XHRAb3B0aW9ucy5mb250U2l6ZSA9IDE0XG5cdFx0QG9wdGlvbnMubGluZUhlaWdodCA9IDIwLzE0XG5cdFx0QG9wdGlvbnMuY29sb3IgPz0gXCIjZmZmZmZmXCJcblx0XHRAb3B0aW9ucy5ib3JkZXJSYWRpdXMgPSA0XG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwiIzM4MzgzOFwiXG5cdFx0QG9wdGlvbnMuc2hhZG93U3ByZWFkID0gMFxuXHRcdEBvcHRpb25zLnNoYWRvd1kgPSAyXG5cdFx0QG9wdGlvbnMuc2hhZG93Q29sb3IgPSBcInJnYmEoMCwwLDAsMC4wNSlcIlxuXHRcdEBvcHRpb25zLnNoYWRvd0JsdXIgPSAzXG5cdFx0QG9wdGlvbnMucGFkZGluZyA9XG5cdFx0XHRsZWZ0OiAxMlxuXHRcdFx0cmlnaHQ6IDEyXG5cdFx0XHR0b3A6IDhcblx0XHRcdGJvdHRvbTogOFxuXHRcdEBhcnJvdyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6OFxuXHRcdFx0aGVpZ2h0Ojhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMzgzODM4XCJcblx0XHRcdHJvdGF0aW9uOiA0NVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QGFycm93LnBhcmVudCA9IEBcblx0XHRAYXJyb3cubWlkWCA9IEB3aWR0aC8yXG5cdFx0QGFycm93Lm1pZFkgPSBAaGVpZ2h0XG5cdFx0XHRcdFxuY2xhc3MgQ2FyZFN0YWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvciA6IG9wYWNpdHlDb2xvclxuXHRcdFx0d2lkdGggOiAzNzBcblx0XHRcdGhlaWdodCA6IDE5N1xuXHRcdFx0dGFnTGFiZWw6XCJcIlxuXHRcdEBpbml0KClcblx0cmVmcmVzaDogLT5cblx0XHRmb3IgaSBpbiBbMC4uLjNdXG5cdFx0XHRAY2FyZHNbaV0ud2lkdGggPSAgQHdpZHRoIC0gaSo4XG5cdFx0QHRhZy54ID0gICBAd2lkdGgvMiAtIDUxXG5cdFx0QHRhZy50YWdfbGFiZWwudGV4dCA9IEB0YWdMYWJlbFxuXHRpbml0OiAtPlxuXHRcdEBjYXJkcyA9IFtdXG5cdFx0Zm9yIGkgaW4gWzAuLi4zXVxuXHRcdFx0QGNhcmRfY292ZXIgPSBuZXcgQ2FyZEJnXG5cdFx0XHRcdHdpZHRoOiBAd2lkdGggLSBpKjhcblx0XHRcdFx0aGVpZ2h0OiAxMjBcblx0XHRcdFx0aW5kZXg6IDMgLSBpXG5cdFx0XHRcdG1pZFg6QC53aWR0aC8yXG5cdFx0XHRcdHk6IGkqM1xuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdEBjYXJkX2NvdmVyLnN0YXRlcy5kZWZhdWx0ID0gXG5cdFx0XHRcdHk6QGNhcmRfY292ZXIueVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiBkZWZhdWx0QW5pbWF0aW9uXG5cdFx0XHRAY2FyZF9jb3Zlci5zdGF0ZXMuc3RyZXRjaCA9IFxuXHRcdFx0XHR5OkBjYXJkX2NvdmVyLnkgKyAzKihpKzEpXG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IGRlZmF1bHRBbmltYXRpb25cblx0XHRcdEBjYXJkcy5wdXNoKEBjYXJkX2NvdmVyKVxuXHRcdFxuXHRcdEBtYXNrID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6QGNhcmRzWzBdXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzNEQTVGOFwiXG5cdFx0XHRoZWlnaHQ6IDEyMFxuXHRcdFx0c3R5bGU6IHtcImJvcmRlclJhZGl1c1wiOiBcIjNweCAwIDAgM3B4XCJ9XG5cdFx0XHR3aWR0aDowXG5cdFx0QG1hc2suc3RhdGVzLmRlZmF1bHQgPSBcblx0XHRcdHdpZHRoOkBtYXNrLndpZHRoXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOmRlZmF1bHRBbmltYXRpb25cblx0XHRAbWFzay5zdGF0ZXMuc3RyZXRjaCA9IFxuXHRcdFx0d2lkdGg6QG1hc2sud2lkdGggKyA4XG5cdFx0XHRhbmltYXRpb25PcHRpb25zOmRlZmF1bHRBbmltYXRpb25cblxuXHRcdEB0YWcgPSBuZXcgVGFnXG5cdFx0XHRwYXJlbnQ6QFxuXHRcdFx0eDogQHdpZHRoLzIgLSA1MVxuXHRcdFx0eTogQGNhcmRzWzBdLmhlaWdodCArIDE2XG5cdFx0XHRvcGFjaXR5OjBcblx0XHRcdFx0XG5cdFx0QHRhZy5zdGF0ZXMuZGVmYXVsdCA9IFxuXHRcdFx0eTogQHRhZy55XG5cdFx0XHRvcGFjaXR5OkB0YWcub3BhY2l0eVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpkZWZhdWx0QW5pbWF0aW9uXG5cdFx0QHRhZy5zdGF0ZXMuc3RyZXRjaCA9IFxuXHRcdFx0eTogQHRhZy55ICsgMypAY2FyZHMubGVuZ3RoXG5cdFx0XHRvcGFjaXR5OjFcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6ZGVmYXVsdEFuaW1hdGlvblxuXHRcdFx0XG5cdFx0QG9uIFwibW91c2VlbnRlclwiLCAtPlxuXHRcdFx0Y3Vyc29yUG9pbnRlcigpXG5cdFx0XHRAbWFzay5hbmltYXRlKFwic3RyZXRjaFwiKVxuXHRcdFx0QHRhZy5hbmltYXRlKFwic3RyZXRjaFwiKVxuXHRcdFx0Zm9yIGkgaW4gQGNhcmRzXG5cdFx0XHRcdGkuYW5pbWF0ZShcInN0cmV0Y2hcIilcblx0XHRAb24gXCJtb3VzZWxlYXZlXCIsIC0+XG5cdFx0XHRjdXJzb3JBdXRvKClcblx0XHRcdEBtYXNrLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRAdGFnLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cdFx0XHRmb3IgaSBpbiBAY2FyZHNcblx0XHRcdFx0aS5hbmltYXRlKFwiZGVmYXVsdFwiKVxuZXhwb3J0cy5DYXJkU3RhY2sgPSBDYXJkU3RhY2tcbmV4cG9ydHMuQ2FyZEJnID0gQ2FyZEJnIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiNJQ09OU1xubWVudSA9ICc8cGF0aCBkPVwiTTE1LjgzMzEsNi40MjQ4IEw0LjE2NjEsNi40MjQ4IEMzLjgzNTEsNi40MjQ4IDMuNTY2MSw2LjE1NTggMy41NjYxLDUuODI0OCBDMy41NjYxLDUuNDkyOCAzLjgzNTEsNS4yMjQ4IDQuMTY2MSw1LjIyNDggTDE1LjgzMzEsNS4yMjQ4IEMxNi4xNjUxLDUuMjI0OCAxNi40MzMxLDUuNDkyOCAxNi40MzMxLDUuODI0OCBDMTYuNDMzMSw2LjE1NTggMTYuMTY1MSw2LjQyNDggMTUuODMzMSw2LjQyNDggTDE1LjgzMzEsNi40MjQ4IFpcIiBpZD1cImZpbGxcIiAgbWFzaz1cInVybCgjbWFzay0yKVwiPjwvcGF0aD48cGF0aCBkPVwiTTE1LjgzMzEsMTAuNTkxMyBMNC4xNjYxLDEwLjU5MTMgQzMuODM1MSwxMC41OTEzIDMuNTY2MSwxMC4zMjIzIDMuNTY2MSw5Ljk5MTMgQzMuNTY2MSw5LjY1OTMgMy44MzUxLDkuMzkxMyA0LjE2NjEsOS4zOTEzIEwxNS44MzMxLDkuMzkxMyBDMTYuMTY1MSw5LjM5MTMgMTYuNDMzMSw5LjY1OTMgMTYuNDMzMSw5Ljk5MTMgQzE2LjQzMzEsMTAuMzIyMyAxNi4xNjUxLDEwLjU5MTMgMTUuODMzMSwxMC41OTEzXCIgaWQ9XCJmaWxsXCIgbWFzaz1cInVybCgjbWFzay0yKVwiPjwvcGF0aD48cGF0aCBkPVwiTTE1LjgzMzEsMTQuNzc1NCBMNC4xNjYxLDE0Ljc3NTQgQzMuODM1MSwxNC43NzU0IDMuNTY2MSwxNC41MDY0IDMuNTY2MSwxNC4xNzU0IEMzLjU2NjEsMTMuODQ0NCAzLjgzNTEsMTMuNTc2NCA0LjE2NjEsMTMuNTc2NCBMMTUuODMzMSwxMy41NzY0IEMxNi4xNjUxLDEzLjU3NjQgMTYuNDMzMSwxMy44NDQ0IDE2LjQzMzEsMTQuMTc1NCBDMTYuNDMzMSwxNC41MDY0IDE2LjE2NTEsMTQuNzc1NCAxNS44MzMxLDE0Ljc3NTRcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcbmNhbmNlbCA9ICc8cGF0aCBkPVwiTTEwLjg0ODUsMTAgTDE1LjQyNDUsNS40MjQgQzE1LjY1ODUsNS4xOSAxNS42NTg1LDQuODEgMTUuNDI0NSw0LjU3NiBDMTUuMTkwNSw0LjM0MSAxNC44MTA1LDQuMzQxIDE0LjU3NTUsNC41NzYgTDEwLjAwMDUsOS4xNTIgTDUuNDI0NSw0LjU3NiBDNS4xOTA1LDQuMzQxIDQuODEwNSw0LjM0MSA0LjU3NTUsNC41NzYgQzQuMzQxNSw0LjgxIDQuMzQxNSw1LjE5IDQuNTc1NSw1LjQyNCBMOS4xNTE1LDEwIEw0LjU3NTUsMTQuNTc2IEM0LjM0MTUsMTQuODEgNC4zNDE1LDE1LjE5IDQuNTc1NSwxNS40MjQgQzQuNjkyNSwxNS41NDEgNC44NDY1LDE1LjYgNS4wMDA1LDE1LjYgQzUuMTUzNSwxNS42IDUuMzA3NSwxNS41NDEgNS40MjQ1LDE1LjQyNCBMMTAuMDAwNSwxMC44NDggTDE0LjU3NTUsMTUuNDI0IEMxNC42OTI1LDE1LjU0MSAxNC44NDY1LDE1LjYgMTUuMDAwNSwxNS42IEMxNS4xNTM1LDE1LjYgMTUuMzA3NSwxNS41NDEgMTUuNDI0NSwxNS40MjQgQzE1LjY1ODUsMTUuMTkgMTUuNjU4NSwxNC44MSAxNS40MjQ1LDE0LjU3NiBMMTAuODQ4NSwxMCBMMTAuODQ4NSwxMCBaXCIgaWQ9XCJmaWxsXCIgbWFzaz1cInVybCgjbWFzay0yKVwiPjwvcGF0aD4nXG5wbHVzX2JvbGQgPSAnPHBhdGggZD1cIk05LDkgTDUuMDAyNDczMjksOSBDNC40NTU3NjA5Niw5IDQsOS40NDc3MTUyNSA0LDEwIEM0LDEwLjU1NjEzNTIgNC40NDg4MjI1OCwxMSA1LjAwMjQ3MzI5LDExIEw5LDExIEw5LDE0Ljk5NzUyNjcgQzksMTUuNTQ0MjM5IDkuNDQ3NzE1MjUsMTYgMTAsMTYgQzEwLjU1NjEzNTIsMTYgMTEsMTUuNTUxMTc3NCAxMSwxNC45OTc1MjY3IEwxMSwxMSBMMTQuOTk3NTI2NywxMSBDMTUuNTQ0MjM5LDExIDE2LDEwLjU1MjI4NDcgMTYsMTAgQzE2LDkuNDQzODY0ODIgMTUuNTUxMTc3NCw5IDE0Ljk5NzUyNjcsOSBMMTEsOSBMMTEsNS4wMDI0NzMyOSBDMTEsNC40NTU3NjA5NiAxMC41NTIyODQ3LDQgMTAsNCBDOS40NDM4NjQ4Miw0IDksNC40NDg4MjI1OCA5LDUuMDAyNDczMjkgTDksOSBaXCIgaWQ9XCJDb21iaW5lZC1TaGFwZVwiPjwvcGF0aD4nXG5hcnJvd19sZWZ0ID0nPHBhdGggZD1cIk0xMy4zNjE3MTIsMTggQzEzLjE5OTAxNjQsMTggMTMuMDM1MjU3NCwxNy45NDAzMzczIDEyLjkxMDg0MzEsMTcuODIyMDIzMiBMNi4xODcxNTMxNiwxMS40MjkwMTUxIEM2LjA2ODA1NTY5LDExLjMxNTc1NzIgNiwxMS4xNjEwMzg3IDYsMTEuMDAwMjUyOCBDNiwxMC44Mzk0NjY5IDYuMDY4MDU1NjksMTAuNjg1NzU5NyA2LjE4NzE1MzE2LDEwLjU3MTQ5MDUgTDEyLjkxMDg0MzEsNC4xNzc0NzEyIEMxMy4xNTk2NzE3LDMuOTQwODQyOTMgMTMuNTYzNzUyNCwzLjk0MDg0MjkzIDEzLjgxMjU4MSw0LjE3NzQ3MTIgQzE0LjA2MjQ3Myw0LjQxNDA5OTQ2IDE0LjA2MjQ3Myw0Ljc5ODM2NzU4IDEzLjgxMjU4MSw1LjAzNjAwNzA4IEw3LjU0MDgyMzQ1LDExLjAwMDI1MjggTDEzLjgxMjU4MSwxNi45NjU1MDk4IEMxNC4wNjI0NzMsMTcuMjAxMTI2OCAxNC4wNjI0NzMsMTcuNTg1Mzk0OSAxMy44MTI1ODEsMTcuODIyMDIzMiBDMTMuNjg4MTY2NywxNy45NDAzMzczIDEzLjUyNDQwNzcsMTggMTMuMzYxNzEyLDE4IEwxMy4zNjE3MTIsMTggWlwiIGlkPVwiZmlsbFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg5Ljc2MTYyNSwgMTAuOTIyMjUwKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtOS43NjE2MjUsIC0xMC45MjIyNTApIFwiPjwvcGF0aD4nXG5tYXBfb2tyID0gJzxwYXRoIGQ9XCJNMTQuODI0MiwxNi44MDA4IEMxNC4xMTMyLDE2LjgwMDggMTMuNTM0MiwxNi4yMjE4IDEzLjUzNDIsMTUuNTEwOCBDMTMuNTM0MiwxNC43OTk4IDE0LjExMzIsMTQuMjIwOCAxNC44MjQyLDE0LjIyMDggQzE1LjUzNTIsMTQuMjIwOCAxNi4xMTQyLDE0Ljc5OTggMTYuMTE0MiwxNS41MTA4IEMxNi4xMTQyLDE2LjIyMTggMTUuNTM1MiwxNi44MDA4IDE0LjgyNDIsMTYuODAwOCBMMTQuODI0MiwxNi44MDA4IFogTTUuMTc1MiwxMS40NTg4IEM0LjQ2NDIsMTEuNDU4OCAzLjg4NjIsMTAuODgwOCAzLjg4NjIsMTAuMTY5OCBDMy44ODYyLDkuNDU4OCA0LjQ2NDIsOC44Nzk4IDUuMTc1Miw4Ljg3OTggQzUuODg2Miw4Ljg3OTggNi40NjUyLDkuNDU4OCA2LjQ2NTIsMTAuMTY5OCBDNi40NjUyLDEwLjg4MDggNS44ODYyLDExLjQ1ODggNS4xNzUyLDExLjQ1ODggTDUuMTc1MiwxMS40NTg4IFogTTE0LjgyNDIsMy4xOTk4IEMxNS41MzUyLDMuMTk5OCAxNi4xMTQyLDMuNzc4OCAxNi4xMTQyLDQuNDg4OCBDMTYuMTE0Miw1LjE5OTggMTUuNTM1Miw1Ljc3ODggMTQuODI0Miw1Ljc3ODggQzE0LjExMzIsNS43Nzg4IDEzLjUzNDIsNS4xOTk4IDEzLjUzNDIsNC40ODg4IEMxMy41MzQyLDMuNzc4OCAxNC4xMTMyLDMuMTk5OCAxNC44MjQyLDMuMTk5OCBMMTQuODI0MiwzLjE5OTggWiBNMTQuODI0MiwxMy4wMjE4IEMxNC4wMjMyLDEzLjAyMTggMTMuMzE3MiwxMy40MDc4IDEyLjg2MTIsMTMuOTk2OCBMNy42MDIyLDEwLjcwOTggQzcuNjQxMiwxMC41MzU4IDcuNjY1MiwxMC4zNTU4IDcuNjY1MiwxMC4xNjk4IEM3LjY2NTIsOS45ODI4IDcuNjQxMiw5LjgwMzggNy42MDIyLDkuNjI4OCBMMTMuMDQ2Miw2LjIyNTggQzEzLjQ5ODIsNi42ODk4IDE0LjEyNzIsNi45Nzg4IDE0LjgyNDIsNi45Nzg4IEMxNi4xOTcyLDYuOTc4OCAxNy4zMTQyLDUuODYxOCAxNy4zMTQyLDQuNDg4OCBDMTcuMzE0MiwzLjExNjggMTYuMTk3MiwxLjk5OTggMTQuODI0MiwxLjk5OTggQzEzLjQ1MTIsMS45OTk4IDEyLjMzNDIsMy4xMTY4IDEyLjMzNDIsNC40ODg4IEMxMi4zMzQyLDQuNzMyOCAxMi4zODAyLDQuOTYzOCAxMi40NDYyLDUuMTg1OCBMNy4wNTUyLDguNTU1OCBDNi41OTgyLDguMDIzOCA1LjkyOTIsNy42Nzk4IDUuMTc1Miw3LjY3OTggQzMuODAzMiw3LjY3OTggMi42ODYyLDguNzk2OCAyLjY4NjIsMTAuMTY5OCBDMi42ODYyLDExLjU0MTggMy44MDMyLDEyLjY1ODggNS4xNzUyLDEyLjY1ODggQzUuOTI5MiwxMi42NTg4IDYuNTk4MiwxMi4zMTQ4IDcuMDU1MiwxMS43ODM4IEwxMi4zNzUyLDE1LjEwNzggQzEyLjM1MzIsMTUuMjM5OCAxMi4zMzQyLDE1LjM3MjggMTIuMzM0MiwxNS41MTA4IEMxMi4zMzQyLDE2Ljg4MzggMTMuNDUxMiwxNy45OTk4IDE0LjgyNDIsMTcuOTk5OCBDMTYuMTk3MiwxNy45OTk4IDE3LjMxNDIsMTYuODgzOCAxNy4zMTQyLDE1LjUxMDggQzE3LjMxNDIsMTQuMTM3OCAxNi4xOTcyLDEzLjAyMTggMTQuODI0MiwxMy4wMjE4IEwxNC44MjQyLDEzLjAyMTggWlwiIGlkPVwiZmlsbFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgxMC4wMDAyMDAsIDkuOTk5ODAwKSByb3RhdGUoLTI3MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTAuMDAwMjAwLCAtOS45OTk4MDApIFwiPjwvcGF0aD4nXG5zZXR0aW5nID0gJzxwYXRoIGQ9XCJNMTAuMDAwMSw4LjIwMDIgQzkuMDA3MSw4LjIwMDIgOC4yMDAxLDkuMDA3MiA4LjIwMDEsMTAuMDAwMiBDOC4yMDAxLDEwLjk5MjIgOS4wMDcxLDExLjgwMDIgMTAuMDAwMSwxMS44MDAyIEMxMC45OTMxLDExLjgwMDIgMTEuODAwMSwxMC45OTIyIDExLjgwMDEsMTAuMDAwMiBDMTEuODAwMSw5LjAwNzIgMTAuOTkzMSw4LjIwMDIgMTAuMDAwMSw4LjIwMDIgTDEwLjAwMDEsOC4yMDAyIFogTTEwLjAwMDEsMTMuMDAwMiBDOC4zNDYxLDEzLjAwMDIgNy4wMDAxLDExLjY1NDIgNy4wMDAxLDEwLjAwMDIgQzcuMDAwMSw4LjM0NjIgOC4zNDYxLDcuMDAwMiAxMC4wMDAxLDcuMDAwMiBDMTEuNjU0MSw3LjAwMDIgMTMuMDAwMSw4LjM0NjIgMTMuMDAwMSwxMC4wMDAyIEMxMy4wMDAxLDExLjY1NDIgMTEuNjU0MSwxMy4wMDAyIDEwLjAwMDEsMTMuMDAwMiBMMTAuMDAwMSwxMy4wMDAyIFpcIiBpZD1cImZpbGxcIj48L3BhdGg+PHBhdGggZD1cIk05LjI1ODQsMTYuODAwOCBMMTAuNzQxNCwxNi44MDA4IEwxMS41MDY0LDE1LjA2NjggQzExLjU3MDQsMTQuOTIwOCAxMS42ODk0LDE0LjgwNjggMTEuODM4NCwxNC43NDg4IEMxMi4zMzI0LDE0LjU1NzggMTIuNzg5NCwxNC4yOTQ4IDEzLjE5NjQsMTMuOTY2OCBDMTMuMzIwNCwxMy44NjY4IDEzLjQ3OTQsMTMuODIyOCAxMy42MzY0LDEzLjgzNzggTDE1LjUxODQsMTQuMDQxOCBMMTYuMjU5NCwxMi43NTc4IEwxNS4xMzg0LDExLjIyNjggQzE1LjA0NDQsMTEuMDk3OCAxNS4wMDU0LDEwLjkzNzggMTUuMDI5NCwxMC43ODA4IEMxNS4wNjk0LDEwLjUyNTggMTUuMDk2NCwxMC4yNjU4IDE1LjA5NjQsOS45OTk4IEMxNS4wOTY0LDkuNzMzOCAxNS4wNjk0LDkuNDc0OCAxNS4wMjk0LDkuMjE4OCBDMTUuMDA1NCw5LjA2MTggMTUuMDQ0NCw4LjkwMTggMTUuMTM4NCw4Ljc3MzggTDE2LjI1OTQsNy4yNDE4IEwxNS41MTg0LDUuOTU3OCBMMTMuNjM3NCw2LjE2MjggQzEzLjQ3OTQsNi4xNzQ4IDEzLjMxOTQsNi4xMzM4IDEzLjE5NjQsNi4wMzI4IEMxMi43OTA0LDUuNzA1OCAxMi4zMzM0LDUuNDQyOCAxMS44Mzg0LDUuMjUxOCBDMTEuNjg5NCw1LjE5MzggMTEuNTcwNCw1LjA3OTggMTEuNTA2NCw0LjkzMzggTDEwLjc0MTQsMy4xOTk4IEw5LjI1ODQsMy4xOTk4IEw4LjQ5MzQsNC45MzM4IEM4LjQyOTQsNS4wNzk4IDguMzEwNCw1LjE5MzggOC4xNjE0LDUuMjUxOCBDNy42NjU0LDUuNDQzOCA3LjIwOTQsNS43MDY4IDYuODA0NCw2LjAzMjggQzYuNjgwNCw2LjEzMjggNi41MjA0LDYuMTc0OCA2LjM2MjQsNi4xNjI4IEw0LjQ4MjQsNS45NTc4IEwzLjc0MDQsNy4yNDE4IEw0Ljg2MTQsOC43NzM4IEM0Ljk1NTQsOC45MDE4IDQuOTk0NCw5LjA2MTggNC45Njk0LDkuMjE4OCBDNC45MzA0LDkuNDc0OCA0LjkwMzQsOS43MzM4IDQuOTAzNCw5Ljk5OTggQzQuOTAzNCwxMC4yNjU4IDQuOTMwNCwxMC41MjU4IDQuOTY5NCwxMC43ODA4IEM0Ljk5NDQsMTAuOTM3OCA0Ljk1NTQsMTEuMDk3OCA0Ljg2MTQsMTEuMjI2OCBMMy43NDA0LDEyLjc1NzggTDQuNDgyNCwxNC4wNDE4IEw2LjM2MzQsMTMuODM3OCBDNi41MTg0LDEzLjgyMjggNi42ODA0LDEzLjg2NjggNi44MDQ0LDEzLjk2NzggQzcuMjEwNCwxNC4yOTQ4IDcuNjY2NCwxNC41NTc4IDguMTYxNCwxNC43NDg4IEM4LjMxMDQsMTQuODA2OCA4LjQyOTQsMTQuOTIwOCA4LjQ5MzQsMTUuMDY2OCBMOS4yNTg0LDE2LjgwMDggWiBNMTEuMTMzNCwxNy45OTk4IEw4Ljg2NzQsMTcuOTk5OCBDOC42Mjk0LDE3Ljk5OTggOC40MTQ0LDE3Ljg2MDggOC4zMTg0LDE3LjY0MjggTDcuNDkzNCwxNS43NzE4IEM3LjA1MTQsMTUuNTc5OCA2LjYzNTQsMTUuMzQwOCA2LjI1MjQsMTUuMDU2OCBMNC4yMjI0LDE1LjI3NzggQzMuOTgyNCwxNS4yOTg4IDMuNzU3NCwxNS4xODY4IDMuNjM4NCwxNC45ODA4IEwyLjUwNTQsMTMuMDE5OCBDMi4zODY0LDEyLjgxMzggMi40MDA0LDEyLjU1NjggMi41NDA0LDEyLjM2NDggTDMuNzQ5NCwxMC43MTM4IEMzLjcxODQsMTAuNDU5OCAzLjcwMzQsMTAuMjIzOCAzLjcwMzQsOS45OTk4IEMzLjcwMzQsOS43NzU4IDMuNzE4NCw5LjU0MDggMy43NDk0LDkuMjg1OCBMMi41NDA0LDcuNjM0OCBDMi40MDA0LDcuNDQzOCAyLjM4NjQsNy4xODY4IDIuNTA1NCw2Ljk4MDggTDMuNjM4NCw1LjAxODggQzMuNzU3NCw0LjgxMzggMy45ODc0LDQuNzAyOCA0LjIyMjQsNC43MjE4IEw2LjI1MjQsNC45NDM4IEM2LjYzNDQsNC42NTk4IDcuMDUwNCw0LjQyMDggNy40OTM0LDQuMjI4OCBMOC4zMTg0LDIuMzU3OCBDOC40MTQ0LDIuMTQwOCA4LjYyOTQsMS45OTk4IDguODY3NCwxLjk5OTggTDExLjEzMjQsMS45OTk4IEMxMS4zNzA0LDEuOTk5OCAxMS41ODU0LDIuMTQwOCAxMS42ODE0LDIuMzU3OCBMMTIuNTA2NCw0LjIyODggQzEyLjk0ODQsNC40MjA4IDEzLjM2NDQsNC42NTk4IDEzLjc0NzQsNC45NDM4IEwxNS43Nzc0LDQuNzIxOCBDMTYuMDE1NCw0LjY5NzggMTYuMjQyNCw0LjgxMjggMTYuMzYyNCw1LjAxODggTDE3LjQ5NDQsNi45ODA4IEMxNy42MTM0LDcuMTg2OCAxNy41OTk0LDcuNDQzOCAxNy40NTk0LDcuNjM0OCBMMTYuMjUwNCw5LjI4NTggQzE2LjI4MTQsOS41NDA4IDE2LjI5NjQsOS43NzU4IDE2LjI5NjQsOS45OTk4IEMxNi4yOTY0LDEwLjIyMzggMTYuMjgxNCwxMC40NTk4IDE2LjI1MDQsMTAuNzEzOCBMMTcuNDU5NCwxMi4zNjQ4IEMxNy41OTk0LDEyLjU1NjggMTcuNjEzNCwxMi44MTM4IDE3LjQ5NDQsMTMuMDE5OCBMMTYuMzYyNCwxNC45ODA4IEMxNi4yNDM0LDE1LjE4NzggMTYuMDE1NCwxNS4zMDI4IDE1Ljc3ODQsMTUuMjc3OCBMMTMuNzQ3NCwxNS4wNTY4IEMxMy4zNjM0LDE1LjM0MDggMTIuOTQ3NCwxNS41Nzk4IDEyLjUwNjQsMTUuNzcxOCBMMTEuNjgxNCwxNy42NDI4IEMxMS41ODY0LDE3Ljg2MDggMTEuMzcwNCwxNy45OTk4IDExLjEzMzQsMTcuOTk5OCBMMTEuMTMzNCwxNy45OTk4IFpcIiBpZD1cImZpbGxcIj48L3BhdGg+J1xucGx1c19maWxsID0gJzxwYXRoIGQ9XCJNMTAuNjAwMDkzNSwxMy4zMzMyMzk4IEMxMC42MDAwOTM1LDEzLjY2NDE2NTcgMTAuMzMxMzkyOSwxMy45MzI4NjYzIDkuOTk5NzU5ODMsMTMuOTMzNTczNCBDOS44MzQyOTY4NSwxMy45MzM1NzM0IDkuNjg0MzkwMjEsMTMuODY1NjkxMiA5LjU3NjIwMjg3LDEzLjc1NzUwMzggQzkuNDY3MzA4NDMsMTMuNjQ4NjA5NCA5LjQwMDEzMzI4LDEzLjQ5OTQwOTggOS4zOTk0MjYxOCwxMy4zMzMyMzk4IEw5LjQwMDEzMzI4LDEwLjYwMDI3MiBMNi42NjY0NTg0NywxMC42MDAyNzIgQzYuNTAwOTk1NDgsMTAuNjAwMjcyIDYuMzUxMDg4ODQsMTAuNTMyMzg5OCA2LjI0MjkwMTUxLDEwLjQyNDIwMjUgQzYuMTM0MDA3MDYsMTAuMzE1MzA4IDYuMDY2ODMxOTIsMTAuMTY2MTA4NSA2LjA2NjgzMTkyLDEwLjAwMDY0NTUgQzYuMDY2ODMxOTIsOS42NjgzMDUzMSA2LjMzNTUzMjQ5LDkuMzk5NjA0NzMgNi42NjcxNjU1OCw5LjQwMDMxMTg0IEw5LjQwMDEzMzI4LDkuMzk5NjA0NzMgTDkuNDAwMTMzMjgsNi42NjczNDQxMyBDOS40MDAxMzMyOCw2LjMzNTAwMzk0IDkuNjY4MTI2NzUsNi4wNjcwMTA0NyAxMC4wMDA0NjY5LDYuMDY3MDEwNDcgQzEwLjMzMTM5MjksNi4wNjcwMTA0NyAxMC42MDAwOTM1LDYuMzM1NzExMDUgMTAuNjAwMDkzNSw2LjY2NjYzNzAyIEwxMC42MDAwOTM1LDkuNDAwMzExODQgTDEzLjMzMzA2MTIsOS4zOTk2MDQ3MyBDMTMuNjY0Njk0Myw5LjQwMDMxMTg0IDEzLjkzMzM5NDksOS42NjkwMTI0MSAxMy45MzMzOTQ5LDkuOTk5OTM4MzkgQzEzLjkzMjY4NzgsMTAuMzMxNTcxNSAxMy42NjQ2OTQzLDEwLjU5OTU2NDkgMTMuMzMzMDYxMiwxMC42MDAyNzIgTDEwLjYwMDA5MzUsMTAuNTk5NTY0OSBMMTAuNjAwMDkzNSwxMy4zMzMyMzk4IEwxMC42MDAwOTM1LDEzLjMzMzIzOTggWiBNMTAuMDAwNCwxLjk5OTYgQzUuNTgxNCwxLjk5OTYgMi4wMDA0LDUuNTgxNiAyLjAwMDQsOS45OTk2IEMyLjAwMDQsMTQuNDE4NiA1LjU4MTQsMTcuOTk5NiAxMC4wMDA0LDE3Ljk5OTYgQzE0LjQxODQsMTcuOTk5NiAxOC4wMDA0LDE0LjQxODYgMTguMDAwNCw5Ljk5OTYgQzE4LjAwMDQsNS41ODE2IDE0LjQxODQsMS45OTk2IDEwLjAwMDQsMS45OTk2IEwxMC4wMDA0LDEuOTk5NiBaXCIgaWQ9XCJpY29uQWRkXCI+PC9wYXRoPidcbnBsdXNfYm9yZGVyID0gJzxwYXRoIGQ9XCJNMTAsMiBDNS41ODIsMiAyLDUuNTgyIDIsMTAgQzIsMTQuNDE4IDUuNTgyLDE4IDEwLDE4IEMxNC40MTgsMTggMTgsMTQuNDE4IDE4LDEwIEMxOCw1LjU4MiAxNC40MTgsMiAxMCwyIEwxMCwyIFogTTEwLDMuMiBDMTMuNzUsMy4yIDE2LjgsNi4yNSAxNi44LDEwIEMxNi44LDEzLjc1IDEzLjc1LDE2LjggMTAsMTYuOCBDNi4yNSwxNi44IDMuMiwxMy43NSAzLjIsMTAgQzMuMiw2LjI1IDYuMjUsMy4yIDEwLDMuMiBMMTAsMy4yIFpcIiBpZD1cImZpbGxcIj48L3BhdGg+PHBhdGggZD1cIk0xMy4zMzMxLDEwLjYwMDEgTDYuNjY2MSwxMC42MDAxIEM2LjMzNTEsMTAuNjAwMSA2LjA2NjEsMTAuMzMxMSA2LjA2NjEsMTAuMDAwMSBDNi4wNjYxLDkuNjY4MSA2LjMzNTEsOS40MDAxIDYuNjY2MSw5LjQwMDEgTDEzLjMzMzEsOS40MDAxIEMxMy42NjUxLDkuNDAwMSAxMy45MzMxLDkuNjY4MSAxMy45MzMxLDEwLjAwMDEgQzEzLjkzMzEsMTAuMzMxMSAxMy42NjUxLDEwLjYwMDEgMTMuMzMzMSwxMC42MDAxXCIgaWQ9XCJmaWxsXCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTAuMDAwMSwxMy45MzI2IEM5LjY2ODEsMTMuOTMyNiA5LjQwMDEsMTMuNjYzNiA5LjQwMDEsMTMuMzMyNiBMOS40MDAxLDYuNjY2NiBDOS40MDAxLDYuMzM0NiA5LjY2ODEsNi4wNjY2IDEwLjAwMDEsNi4wNjY2IEMxMC4zMzIxLDYuMDY2NiAxMC42MDAxLDYuMzM0NiAxMC42MDAxLDYuNjY2NiBMMTAuNjAwMSwxMy4zMzI2IEMxMC42MDAxLDEzLjY2MzYgMTAuMzMyMSwxMy45MzI2IDEwLjAwMDEsMTMuOTMyNlwiIGlkPVwiZmlsbFwiPjwvcGF0aD4nXG5kYXRlX2RlZmF1bHQgPSAnPHBhdGggZD1cIk0xNS4yOTQsMTYuOCBMNC43MDYsMTYuOCBDNC4yNzIsMTYuOCAzLjkwNiwxNi40MzQgMy45MDYsMTYgTDMuOTA2LDguMjgyIEwxNi4wOTQsOC4yODIgTDE2LjA5NCwxNiBDMTYuMDk0LDE2LjQzNCAxNS43MjgsMTYuOCAxNS4yOTQsMTYuOCBMMTUuMjk0LDE2LjggWiBNNC43MDYsNC42MTIgTDYuMTQ2LDQuNjEyIEw2LjE0Niw1LjAzOCBDNi4xNDYsNS4zNjkgNi40MTUsNS42MzggNi43NDYsNS42MzggQzcuMDc4LDUuNjM4IDcuMzQ2LDUuMzY5IDcuMzQ2LDUuMDM4IEw3LjM0Niw0LjYxMiBMMTIuNjU0LDQuNjEyIEwxMi42NTQsNS4wMzggQzEyLjY1NCw1LjM2OSAxMi45MjIsNS42MzggMTMuMjU0LDUuNjM4IEMxMy41ODYsNS42MzggMTMuODU0LDUuMzY5IDEzLjg1NCw1LjAzOCBMMTMuODU0LDQuNjEyIEwxNS4yOTQsNC42MTIgQzE1LjcyOCw0LjYxMiAxNi4wOTQsNC45NzggMTYuMDk0LDUuNDEyIEwxNi4wOTQsNy4wODIgTDMuOTA2LDcuMDgyIEwzLjkwNiw1LjQxMiBDMy45MDYsNC45NzggNC4yNzIsNC42MTIgNC43MDYsNC42MTIgTDQuNzA2LDQuNjEyIFogTTE1LjI5NCwzLjQxMiBMMTMuODU0LDMuNDEyIEwxMy44NTQsMi42IEMxMy44NTQsMi4yNjkgMTMuNTg2LDIgMTMuMjU0LDIgQzEyLjkyMiwyIDEyLjY1NCwyLjI2OSAxMi42NTQsMi42IEwxMi42NTQsMy40MTIgTDcuMzQ2LDMuNDEyIEw3LjM0NiwyLjYgQzcuMzQ2LDIuMjY5IDcuMDc4LDIgNi43NDYsMiBDNi40MTUsMiA2LjE0NiwyLjI2OSA2LjE0NiwyLjYgTDYuMTQ2LDMuNDEyIEw0LjcwNiwzLjQxMiBDMy42MDYsMy40MTIgMi43MDYsNC4zMTIgMi43MDYsNS40MTIgTDIuNzA2LDE2IEMyLjcwNiwxNy4xIDMuNjA2LDE4IDQuNzA2LDE4IEwxNS4yOTQsMTggQzE2LjM5NCwxOCAxNy4yOTQsMTcuMSAxNy4yOTQsMTYgTDE3LjI5NCw1LjQxMiBDMTcuMjk0LDQuMzEyIDE2LjM5NCwzLjQxMiAxNS4yOTQsMy40MTIgTDE1LjI5NCwzLjQxMiBaXCIgaWQ9XCJmaWxsXCI+PC9wYXRoPidcbiNEZWZhdWx0SHRtbFxuXG4jQ2xhc3Ncbm9wYWNpdHlDb2xvciA9IG5ldyBDb2xvcihcIiNmZmZmZmZcIikuYWxwaGEoLjApXG5jbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy53aWR0aCA/PSAyMFxuXHRcdEBvcHRpb25zLmhlaWdodCA/PSAyMFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBvcGFjaXR5Q29sb3Jcblx0XHRAb3B0aW9ucy5pY29uID89IG1lbnVcblx0XHRAb3B0aW9ucy5jb2xvciA/PSBcIiM4MDgwODBcIlxuXHRcdEBvcHRpb25zLnZpZXdCb3ggPz0gXCIwIDAgNDAgNDBcIlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdEBkZWZpbmUgXCJpY29uXCIgLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaWNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuaWNvbiA9IHZhbHVlXG5cdFx0XHRAaHRtbCA9IFwiXCJcIjw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuPHN2ZyBmaWxsPVwiI3tAb3B0aW9ucy5jb2xvcn1cIiB3aWR0aD1cIjQwcHhcIiBoZWlnaHQ9XCI0MHB4XCIgdmlld0JveD1cIiN7QG9wdGlvbnMudmlld0JveH1cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuI3tAb3B0aW9ucy5pY29ufVxuPC9zdmc+XCJcIlwiXG5cdEBkZWZpbmUgXCJjb2xvclwiICxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5jb2xvciA9IHZhbHVlXG5cdFx0XHRAaHRtbCA9IFwiXCJcIjw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuPHN2ZyBmaWxsPVwiI3tAb3B0aW9ucy5jb2xvcn1cIiB3aWR0aD1cIjQwcHhcIiBoZWlnaHQ9XCI0MHB4XCIgdmlld0JveD1cIiN7QG9wdGlvbnMudmlld0JveH1cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuI3tAb3B0aW9ucy5pY29ufVxuPC9zdmc+XCJcIlwiXG5cblxuZXhwb3J0cy5JY29uID0gSWNvblxuZXhwb3J0cy5jYW5jZWwgPSBjYW5jZWxcbmV4cG9ydHMubWVudSA9IG1lbnVcbmV4cG9ydHMucGx1c19ib2xkID0gcGx1c19ib2xkXG5leHBvcnRzLmFycm93X2xlZnQgPSBhcnJvd19sZWZ0XG5leHBvcnRzLm1hcF9va3IgPSBtYXBfb2tyXG5leHBvcnRzLnNldHRpbmcgPSBzZXR0aW5nXG5leHBvcnRzLnBsdXNfZmlsbCA9IHBsdXNfZmlsbFxuZXhwb3J0cy5wbHVzX2JvcmRlciA9IHBsdXNfYm9yZGVyXG5leHBvcnRzLmRhdGVfZGVmYXVsdCA9IGRhdGVfZGVmYXVsdCIsImNsYXNzIGV4cG9ydHMuQ2lyY2xlIGV4dGVuZHMgTGF5ZXJcblx0Y3VycmVudFZhbHVlOiBudWxsXG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBvcHRpb25zLmNpcmNsZVNpemUgPz0gMzAwXG5cdFx0QG9wdGlvbnMuc3Ryb2tlV2lkdGggPz0gMjRcblxuXHRcdEBvcHRpb25zLnN0cm9rZUNvbG9yID89IFwiI2ZjMjQ1Y1wiXG5cdFx0QG9wdGlvbnMudG9wQ29sb3IgPz0gbnVsbFxuXHRcdEBvcHRpb25zLmJvdHRvbUNvbG9yID89IG51bGxcblx0XHRAb3B0aW9ucy5kcm9wU2hhZG93ID89IG51bGxcblxuXHRcdEBvcHRpb25zLmhhc0NvdW50ZXIgPz0gZmFsc2Vcblx0XHRAb3B0aW9ucy5jb3VudGVyQ29sb3IgPz0gXCIjZmZmXCJcblx0XHRAb3B0aW9ucy5jb3VudGVyRm9udFNpemUgPz0gNjBcblx0XHRAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgPz0gZmFsc2Vcblx0XHRAb3B0aW9ucy5jb3VudGVyV2VpZ2h0ID89IDBcblx0XHRAb3B0aW9ucy5oYXNQZXJjZW50YWdlID89IGZhbHNlXG5cblx0XHRAb3B0aW9ucy52YWx1ZSA9IDJcblxuXHRcdEBvcHRpb25zLnZpZXdCb3ggPSAoQG9wdGlvbnMuY2lyY2xlU2l6ZSkgKyBAb3B0aW9ucy5zdHJva2VXaWR0aFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJcIlxuXHRcdEAuaGVpZ2h0ID0gQG9wdGlvbnMudmlld0JveFxuXHRcdEAud2lkdGggPSBAb3B0aW9ucy52aWV3Qm94XG5cdFx0QC5yb3RhdGlvbiA9IC05MFxuXG5cblx0XHRALnBhdGhMZW5ndGggPSBNYXRoLlBJICogQG9wdGlvbnMuY2lyY2xlU2l6ZVxuXG5cdFx0QC5jaXJjbGVJRCA9IFwiY2lyY2xlXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcblx0XHRALmdyYWRpZW50SUQgPSBcImNpcmNsZVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDApXG5cblx0XHQjIFB1dCB0aGlzIGluc2lkZSBsaW5lYXJncmFkaWVudFxuXHRcdCMgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcblx0XHQjICAgIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCI1MCVcIiB5Mj1cIjAlXCIgZ3JhZGllbnRUcmFuc2Zvcm09XCJyb3RhdGUoMTIwKVwiXG5cblxuXHRcdGlmIEBvcHRpb25zLmhhc0NvdW50ZXIgaXNudCBudWxsXG5cdFx0XHRjb3VudGVyID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRcdHdpZHRoOiBALndpZHRoXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdHJvdGF0aW9uOiA5MFxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMuY291bnRlckNvbG9yXG5cblx0XHRcdHN0eWxlID0ge1xuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFx0Zm9udFNpemU6IFwiI3tAb3B0aW9ucy5jb3VudGVyRm9udFNpemV9cHhcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIiN7QC5oZWlnaHR9cHhcIlxuXHRcdFx0XHRmb250V2VpZ2h0OiBcIiN7QG9wdGlvbnMuY291bnRlcldlaWdodH1cIlxuXHRcdFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIlxuXHRcdFx0XHRib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHRcblx0XHRcdH1cblxuXHRcdFx0Y291bnRlci5zdHlsZSA9IHN0eWxlXG5cblx0XHRcdG51bWJlclN0YXJ0ID0gMFxuXHRcdFx0bnVtYmVyRW5kID0gMTAwXG5cdFx0XHRudW1iZXJEdXJhdGlvbiA9IDJcblxuXHRcdFx0bnVtYmVyTm93ID0gbnVtYmVyU3RhcnRcblx0XHRcdG51bWJlckludGVydmFsID0gbnVtYmVyRW5kIC0gbnVtYmVyU3RhcnRcblxuXG5cdFx0QC5odG1sID0gXCJcIlwiXG5cdFx0XHQ8c3ZnIHZpZXdCb3g9Jy0je0BvcHRpb25zLnN0cm9rZVdpZHRoLzJ9IC0je0BvcHRpb25zLnN0cm9rZVdpZHRoLzJ9ICN7QG9wdGlvbnMudmlld0JveH0gI3tAb3B0aW9ucy52aWV3Qm94fScgLXdlYmtpdC1maWx0ZXI9JyN7QG9wdGlvbnMuZHJvcFNoYWRvd30nIGZpbHRlcj0nI3tAb3B0aW9ucy5kcm9wU2hhZG93fScgPlxuXHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0ICAgIDxsaW5lYXJHcmFkaWVudCBpZD0nI3tAZ3JhZGllbnRJRH0nID5cblx0XHRcdFx0ICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMuYm90dG9tQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nLz5cblx0XHRcdFx0ICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcC1jb2xvcj0nI3tpZiBAb3B0aW9ucy50b3BDb2xvciBpc250IG51bGwgdGhlbiBAb3B0aW9ucy50b3BDb2xvciBlbHNlIEBvcHRpb25zLnN0cm9rZUNvbG9yfScgc3RvcC1vcGFjaXR5PVwiMVwiIC8+XG5cdFx0XHRcdCAgICA8L2xpbmVhckdyYWRpZW50PlxuXHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdDxjaXJjbGUgaWQ9JyN7QGNpcmNsZUlEfSdcblx0XHRcdFx0XHRcdGZpbGw9J25vbmUnXG5cdFx0XHRcdFx0XHRzdHJva2UtbGluZWNhcD0ncm91bmQnXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGggICAgICA9ICcje0BvcHRpb25zLnN0cm9rZVdpZHRofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNoYXJyYXkgID0gJyN7QC5wYXRoTGVuZ3RofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNob2Zmc2V0ID0gJzAnXG5cdFx0XHRcdFx0XHRzdHJva2U9XCJ1cmwoIyN7QGdyYWRpZW50SUR9KVwiXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGg9XCIxMFwiXG5cdFx0XHRcdFx0XHRjeCA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRjeSA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRyICA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nPlxuXHRcdFx0PC9zdmc+XCJcIlwiXG5cblx0XHRzZWxmID0gQFxuXHRcdFV0aWxzLmRvbUNvbXBsZXRlIC0+XG5cdFx0XHRzZWxmLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiIyN7c2VsZi5jaXJjbGVJRH1cIilcblxuXHRcdEBwcm94eSA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0QHByb3h5Lm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIChhbmltYXRpb24sIGxheWVyKSAtPlxuXHRcdFx0c2VsZi5vbkZpbmlzaGVkKClcblxuXHRcdEBwcm94eS5vbiAnY2hhbmdlOngnLCAtPlxuXG5cdFx0XHRvZmZzZXQgPSBVdGlscy5tb2R1bGF0ZShALngsIFswLCA1MDBdLCBbc2VsZi5wYXRoTGVuZ3RoLCAwXSlcblxuXHRcdFx0c2VsZi5wYXRoLnNldEF0dHJpYnV0ZSAnc3Ryb2tlLWRhc2hvZmZzZXQnLCBvZmZzZXRcblxuXHRcdFx0aWYgc2VsZi5vcHRpb25zLmhhc0NvdW50ZXIgaXNudCBmYWxzZVxuXHRcdFx0XHRudW1iZXJOb3cgPSBVdGlscy5yb3VuZChzZWxmLnByb3h5LnggLyA1KVxuXHRcdFx0XHRjb3VudGVyLmh0bWwgPSBudW1iZXJOb3dcblx0XHRcdFx0aWYgc2VsZi5vcHRpb25zLmhhc1BlcmNlbnRhZ2UgaXNudCBmYWxzZVxuXHRcdFx0XHRcdGNvdW50ZXIuaHRtbCA9IG51bWJlck5vdyArIFwiJVwiXG5cblx0XHRVdGlscy5kb21Db21wbGV0ZSAtPlxuXHRcdFx0c2VsZi5wcm94eS54ID0gMC4xXG5cblx0Y2hhbmdlVG86ICh2YWx1ZSwgdGltZSkgLT5cblx0XHRpZiB0aW1lIGlzIHVuZGVmaW5lZFxuXHRcdFx0dGltZSA9IDJcblxuXHRcdGlmIEBvcHRpb25zLmhhc0NvdW50ZXIgaXMgdHJ1ZSBhbmQgQG9wdGlvbnMuaGFzTGluZWFyRWFzaW5nIGlzIGZhbHNlICMgb3ZlcnJpZGUgZGVmYXVsdCBcImVhc2UtaW4tb3V0XCIgd2hlbiBjb3VudGVyIGlzIHVzZWRcblx0XHRcdGN1c3RvbUN1cnZlID0gXCJsaW5lYXJcIlxuXHRcdGVsc2Vcblx0XHRcdGN1c3RvbUN1cnZlID0gXCJlYXNlLWluLW91dFwiXG5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogdGltZVxuXHRcdFx0Y3VydmU6IGN1c3RvbUN1cnZlXG5cblxuXG5cdFx0QGN1cnJlbnRWYWx1ZSA9IHZhbHVlXG5cblx0c3RhcnRBdDogKHZhbHVlKSAtPlxuXHRcdEBwcm94eS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHR4OiA1MDAgKiAodmFsdWUgLyAxMDApXG5cdFx0XHR0aW1lOiAwLjAwMVxuXG5cdFx0QGN1cnJlbnRWYWx1ZSA9IHZhbHVlXG5cblxuXG5cdGhpZGU6IC0+XG5cdFx0QC5vcGFjaXR5ID0gMFxuXG5cdHNob3c6IC0+XG5cdFx0QC5vcGFjaXR5ID0gMVxuXG5cdG9uRmluaXNoZWQ6IC0+XG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBSUFBO0FEQUEsSUFBQTs7O0FBQU0sT0FBTyxDQUFDOzs7bUJBQ2IsWUFBQSxHQUFjOztFQUVELGdCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O1VBRWQsQ0FBQyxhQUFjOzs7V0FDZixDQUFDLGNBQWU7OztXQUVoQixDQUFDLGNBQWU7OztXQUNoQixDQUFDLFdBQVk7OztXQUNiLENBQUMsY0FBZTs7O1dBQ2hCLENBQUMsYUFBYzs7O1dBRWYsQ0FBQyxhQUFjOzs7V0FDZixDQUFDLGVBQWdCOzs7V0FDakIsQ0FBQyxrQkFBbUI7OztXQUNwQixDQUFDLGtCQUFtQjs7O1lBQ3BCLENBQUMsZ0JBQWlCOzs7WUFDbEIsQ0FBQyxnQkFBaUI7O0lBRTFCLElB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
