require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayerModule = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"circleModule":[function(require,module,exports){
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
var Icon, arrow_down, arrow_left, cancel, date_default, map_okr, menu, opacityColor, plus_bold, plus_border, plus_fill, setting, star_fill,
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

arrow_down = '<path d="M8.55923045,15 C8.41668608,15 8.27321004,14.9381113 8.16420552,14.815383 C7.94526483,14.5709753 7.94526483,14.1723704 8.16420552,13.9269137 L11.6504868,9.99960664 L8.16420552,6.0743975 C7.94526483,5.82894081 7.94526483,5.43033593 8.16420552,5.18487924 C8.38221456,4.93837359 8.73624633,4.93837359 8.95425537,5.18487924 L12.8364932,9.55484751 C13.0545023,9.8003042 13.0545023,10.1989091 12.8364932,10.4454147 L8.95425537,14.815383 C8.84525085,14.9381113 8.70177482,15 8.55923045,15 L8.55923045,15 Z" id="fill" mask="url(#mask-2)"></path>';

star_fill = '<path d="M17.9708,8.1528 C17.8998,7.9358 17.7128,7.7778 17.4868,7.7448 L12.6848,7.0478 L10.5378,2.6968 C10.3358,2.2878 9.6638,2.2878 9.4618,2.6968 L7.3148,7.0478 L2.5138,7.7448 C2.2878,7.7778 2.0998,7.9358 2.0298,8.1528 C1.9588,8.3698 2.0178,8.6088 2.1808,8.7678 L5.6558,12.1548 L4.8348,16.9368 C4.7968,17.1618 4.8888,17.3898 5.0738,17.5238 C5.1788,17.5998 5.3018,17.6378 5.4268,17.6378 C5.5218,17.6378 5.6178,17.6148 5.7058,17.5698 L9.9998,15.3118 L14.2938,17.5698 C14.4968,17.6758 14.7418,17.6588 14.9258,17.5238 C15.1108,17.3898 15.2028,17.1618 15.1648,16.9368 L14.3448,12.1548 L17.8188,8.7678 C17.9828,8.6088 18.0408,8.3698 17.9708,8.1528 L17.9708,8.1528 Z" id="fill" mask="url(#mask-2)"></path>';

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

exports.arrow_down = arrow_down;

exports.map_okr = map_okr;

exports.setting = setting;

exports.plus_fill = plus_fill;

exports.plus_border = plus_border;

exports.date_default = date_default;

exports.star_fill = star_fill;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvb2tyS2l0LmNvZmZlZSIsIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pY29uTW9kdWxlLmNvZmZlZSIsIi4uL21vZHVsZXMvY2lyY2xlTW9kdWxlLmNvZmZlZSIsIi4uL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmYXVsdEFuaW1hdGlvbiA9XG5cdHRpbWU6IDAuMlxuXHRjdXJ2ZTogQmV6aWVyLmVhc2VJbk91dFxub3BhY2l0eUNvbG9yID0gbmV3IENvbG9yKFwiI2ZmZmZmZlwiKS5hbHBoYSguMClcbmN1cnNvckF1dG8gPSAtPlxuXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5jdXJzb3JQb2ludGVyID0gLT5cblx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIlxuXG5jbGFzcyBDYXJkQmcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmJvcmRlclJhZGl1cyA9IDRcblx0XHRAb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gXCIjZmZmZmZmXCJcblx0XHRAb3B0aW9ucy5zaGFkb3dZID89IDJcblx0XHRAb3B0aW9ucy5zaGFkb3dDb2xvciA/PSBcInJnYmEoMCwwLDAsMC4wNSlcIlxuXHRcdEBvcHRpb25zLnNoYWRvd0JsdXIgPz0gM1xuXHRcdHN1cGVyIEBvcHRpb25zXHRcdFxuY2xhc3MgVGFnIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMudGV4dCA/PSBcIuagh+etvlwiXG5cdFx0QG9wdGlvbnMuZm9udFNpemUgPSAxNFxuXHRcdEBvcHRpb25zLmxpbmVIZWlnaHQgPSAyMC8xNFxuXHRcdEBvcHRpb25zLmNvbG9yID89IFwiI2ZmZmZmZlwiXG5cdFx0QG9wdGlvbnMuYm9yZGVyUmFkaXVzID0gNFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIiMzODM4MzhcIlxuXHRcdEBvcHRpb25zLnNoYWRvd1NwcmVhZCA9IDBcblx0XHRAb3B0aW9ucy5zaGFkb3dZID0gMlxuXHRcdEBvcHRpb25zLnNoYWRvd0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMDUpXCJcblx0XHRAb3B0aW9ucy5zaGFkb3dCbHVyID0gM1xuXHRcdEBvcHRpb25zLnBhZGRpbmcgPVxuXHRcdFx0bGVmdDogMTJcblx0XHRcdHJpZ2h0OiAxMlxuXHRcdFx0dG9wOiA4XG5cdFx0XHRib3R0b206IDhcblx0XHRAYXJyb3cgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOjhcblx0XHRcdGhlaWdodDo4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzM4MzgzOFwiXG5cdFx0XHRyb3RhdGlvbjogNDVcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBhcnJvdy5wYXJlbnQgPSBAXG5cdFx0QGFycm93Lm1pZFggPSBAd2lkdGgvMlxuXHRcdEBhcnJvdy5taWRZID0gQGhlaWdodFxuXHRcdFx0XHRcbmNsYXNzIENhcmRTdGFjayBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgOiBvcGFjaXR5Q29sb3Jcblx0XHRcdHdpZHRoIDogMzcwXG5cdFx0XHRoZWlnaHQgOiAxOTdcblx0XHRcdHRhZ0xhYmVsOlwiXCJcblx0XHRAaW5pdCgpXG5cdHJlZnJlc2g6IC0+XG5cdFx0Zm9yIGkgaW4gWzAuLi4zXVxuXHRcdFx0QGNhcmRzW2ldLndpZHRoID0gIEB3aWR0aCAtIGkqOFxuXHRcdEB0YWcueCA9ICAgQHdpZHRoLzIgLSA1MVxuXHRcdEB0YWcudGFnX2xhYmVsLnRleHQgPSBAdGFnTGFiZWxcblx0aW5pdDogLT5cblx0XHRAY2FyZHMgPSBbXVxuXHRcdGZvciBpIGluIFswLi4uM11cblx0XHRcdEBjYXJkX2NvdmVyID0gbmV3IENhcmRCZ1xuXHRcdFx0XHR3aWR0aDogQHdpZHRoIC0gaSo4XG5cdFx0XHRcdGhlaWdodDogMTIwXG5cdFx0XHRcdGluZGV4OiAzIC0gaVxuXHRcdFx0XHRtaWRYOkAud2lkdGgvMlxuXHRcdFx0XHR5OiBpKjNcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRAY2FyZF9jb3Zlci5zdGF0ZXMuZGVmYXVsdCA9IFxuXHRcdFx0XHR5OkBjYXJkX2NvdmVyLnlcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczogZGVmYXVsdEFuaW1hdGlvblxuXHRcdFx0QGNhcmRfY292ZXIuc3RhdGVzLnN0cmV0Y2ggPSBcblx0XHRcdFx0eTpAY2FyZF9jb3Zlci55ICsgMyooaSsxKVxuXHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiBkZWZhdWx0QW5pbWF0aW9uXG5cdFx0XHRAY2FyZHMucHVzaChAY2FyZF9jb3Zlcilcblx0XHRcblx0XHRAbWFzayA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OkBjYXJkc1swXVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMzREE1RjhcIlxuXHRcdFx0aGVpZ2h0OiAxMjBcblx0XHRcdHN0eWxlOiB7XCJib3JkZXJSYWRpdXNcIjogXCIzcHggMCAwIDNweFwifVxuXHRcdFx0d2lkdGg6MFxuXHRcdEBtYXNrLnN0YXRlcy5kZWZhdWx0ID0gXG5cdFx0XHR3aWR0aDpAbWFzay53aWR0aFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpkZWZhdWx0QW5pbWF0aW9uXG5cdFx0QG1hc2suc3RhdGVzLnN0cmV0Y2ggPSBcblx0XHRcdHdpZHRoOkBtYXNrLndpZHRoICsgOFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpkZWZhdWx0QW5pbWF0aW9uXG5cblx0XHRAdGFnID0gbmV3IFRhZ1xuXHRcdFx0cGFyZW50OkBcblx0XHRcdHg6IEB3aWR0aC8yIC0gNTFcblx0XHRcdHk6IEBjYXJkc1swXS5oZWlnaHQgKyAxNlxuXHRcdFx0b3BhY2l0eTowXG5cdFx0XHRcdFxuXHRcdEB0YWcuc3RhdGVzLmRlZmF1bHQgPSBcblx0XHRcdHk6IEB0YWcueVxuXHRcdFx0b3BhY2l0eTpAdGFnLm9wYWNpdHlcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6ZGVmYXVsdEFuaW1hdGlvblxuXHRcdEB0YWcuc3RhdGVzLnN0cmV0Y2ggPSBcblx0XHRcdHk6IEB0YWcueSArIDMqQGNhcmRzLmxlbmd0aFxuXHRcdFx0b3BhY2l0eToxXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOmRlZmF1bHRBbmltYXRpb25cblx0XHRcdFxuXHRcdEBvbiBcIm1vdXNlZW50ZXJcIiwgLT5cblx0XHRcdGN1cnNvclBvaW50ZXIoKVxuXHRcdFx0QG1hc2suYW5pbWF0ZShcInN0cmV0Y2hcIilcblx0XHRcdEB0YWcuYW5pbWF0ZShcInN0cmV0Y2hcIilcblx0XHRcdGZvciBpIGluIEBjYXJkc1xuXHRcdFx0XHRpLmFuaW1hdGUoXCJzdHJldGNoXCIpXG5cdFx0QG9uIFwibW91c2VsZWF2ZVwiLCAtPlxuXHRcdFx0Y3Vyc29yQXV0bygpXG5cdFx0XHRAbWFzay5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0QHRhZy5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXHRcdFx0Zm9yIGkgaW4gQGNhcmRzXG5cdFx0XHRcdGkuYW5pbWF0ZShcImRlZmF1bHRcIilcbmV4cG9ydHMuQ2FyZFN0YWNrID0gQ2FyZFN0YWNrXG5leHBvcnRzLkNhcmRCZyA9IENhcmRCZyIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjSUNPTlNcbm1lbnUgPSAnPHBhdGggZD1cIk0xNS44MzMxLDYuNDI0OCBMNC4xNjYxLDYuNDI0OCBDMy44MzUxLDYuNDI0OCAzLjU2NjEsNi4xNTU4IDMuNTY2MSw1LjgyNDggQzMuNTY2MSw1LjQ5MjggMy44MzUxLDUuMjI0OCA0LjE2NjEsNS4yMjQ4IEwxNS44MzMxLDUuMjI0OCBDMTYuMTY1MSw1LjIyNDggMTYuNDMzMSw1LjQ5MjggMTYuNDMzMSw1LjgyNDggQzE2LjQzMzEsNi4xNTU4IDE2LjE2NTEsNi40MjQ4IDE1LjgzMzEsNi40MjQ4IEwxNS44MzMxLDYuNDI0OCBaXCIgaWQ9XCJmaWxsXCIgIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+PHBhdGggZD1cIk0xNS44MzMxLDEwLjU5MTMgTDQuMTY2MSwxMC41OTEzIEMzLjgzNTEsMTAuNTkxMyAzLjU2NjEsMTAuMzIyMyAzLjU2NjEsOS45OTEzIEMzLjU2NjEsOS42NTkzIDMuODM1MSw5LjM5MTMgNC4xNjYxLDkuMzkxMyBMMTUuODMzMSw5LjM5MTMgQzE2LjE2NTEsOS4zOTEzIDE2LjQzMzEsOS42NTkzIDE2LjQzMzEsOS45OTEzIEMxNi40MzMxLDEwLjMyMjMgMTYuMTY1MSwxMC41OTEzIDE1LjgzMzEsMTAuNTkxM1wiIGlkPVwiZmlsbFwiIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+PHBhdGggZD1cIk0xNS44MzMxLDE0Ljc3NTQgTDQuMTY2MSwxNC43NzU0IEMzLjgzNTEsMTQuNzc1NCAzLjU2NjEsMTQuNTA2NCAzLjU2NjEsMTQuMTc1NCBDMy41NjYxLDEzLjg0NDQgMy44MzUxLDEzLjU3NjQgNC4xNjYxLDEzLjU3NjQgTDE1LjgzMzEsMTMuNTc2NCBDMTYuMTY1MSwxMy41NzY0IDE2LjQzMzEsMTMuODQ0NCAxNi40MzMxLDE0LjE3NTQgQzE2LjQzMzEsMTQuNTA2NCAxNi4xNjUxLDE0Ljc3NTQgMTUuODMzMSwxNC43NzU0XCIgaWQ9XCJmaWxsXCIgbWFzaz1cInVybCgjbWFzay0yKVwiPjwvcGF0aD4nXG5jYW5jZWwgPSAnPHBhdGggZD1cIk0xMC44NDg1LDEwIEwxNS40MjQ1LDUuNDI0IEMxNS42NTg1LDUuMTkgMTUuNjU4NSw0LjgxIDE1LjQyNDUsNC41NzYgQzE1LjE5MDUsNC4zNDEgMTQuODEwNSw0LjM0MSAxNC41NzU1LDQuNTc2IEwxMC4wMDA1LDkuMTUyIEw1LjQyNDUsNC41NzYgQzUuMTkwNSw0LjM0MSA0LjgxMDUsNC4zNDEgNC41NzU1LDQuNTc2IEM0LjM0MTUsNC44MSA0LjM0MTUsNS4xOSA0LjU3NTUsNS40MjQgTDkuMTUxNSwxMCBMNC41NzU1LDE0LjU3NiBDNC4zNDE1LDE0LjgxIDQuMzQxNSwxNS4xOSA0LjU3NTUsMTUuNDI0IEM0LjY5MjUsMTUuNTQxIDQuODQ2NSwxNS42IDUuMDAwNSwxNS42IEM1LjE1MzUsMTUuNiA1LjMwNzUsMTUuNTQxIDUuNDI0NSwxNS40MjQgTDEwLjAwMDUsMTAuODQ4IEwxNC41NzU1LDE1LjQyNCBDMTQuNjkyNSwxNS41NDEgMTQuODQ2NSwxNS42IDE1LjAwMDUsMTUuNiBDMTUuMTUzNSwxNS42IDE1LjMwNzUsMTUuNTQxIDE1LjQyNDUsMTUuNDI0IEMxNS42NTg1LDE1LjE5IDE1LjY1ODUsMTQuODEgMTUuNDI0NSwxNC41NzYgTDEwLjg0ODUsMTAgTDEwLjg0ODUsMTAgWlwiIGlkPVwiZmlsbFwiIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+J1xucGx1c19ib2xkID0gJzxwYXRoIGQ9XCJNOSw5IEw1LjAwMjQ3MzI5LDkgQzQuNDU1NzYwOTYsOSA0LDkuNDQ3NzE1MjUgNCwxMCBDNCwxMC41NTYxMzUyIDQuNDQ4ODIyNTgsMTEgNS4wMDI0NzMyOSwxMSBMOSwxMSBMOSwxNC45OTc1MjY3IEM5LDE1LjU0NDIzOSA5LjQ0NzcxNTI1LDE2IDEwLDE2IEMxMC41NTYxMzUyLDE2IDExLDE1LjU1MTE3NzQgMTEsMTQuOTk3NTI2NyBMMTEsMTEgTDE0Ljk5NzUyNjcsMTEgQzE1LjU0NDIzOSwxMSAxNiwxMC41NTIyODQ3IDE2LDEwIEMxNiw5LjQ0Mzg2NDgyIDE1LjU1MTE3NzQsOSAxNC45OTc1MjY3LDkgTDExLDkgTDExLDUuMDAyNDczMjkgQzExLDQuNDU1NzYwOTYgMTAuNTUyMjg0Nyw0IDEwLDQgQzkuNDQzODY0ODIsNCA5LDQuNDQ4ODIyNTggOSw1LjAwMjQ3MzI5IEw5LDkgWlwiIGlkPVwiQ29tYmluZWQtU2hhcGVcIj48L3BhdGg+J1xuYXJyb3dfbGVmdCA9JzxwYXRoIGQ9XCJNMTMuMzYxNzEyLDE4IEMxMy4xOTkwMTY0LDE4IDEzLjAzNTI1NzQsMTcuOTQwMzM3MyAxMi45MTA4NDMxLDE3LjgyMjAyMzIgTDYuMTg3MTUzMTYsMTEuNDI5MDE1MSBDNi4wNjgwNTU2OSwxMS4zMTU3NTcyIDYsMTEuMTYxMDM4NyA2LDExLjAwMDI1MjggQzYsMTAuODM5NDY2OSA2LjA2ODA1NTY5LDEwLjY4NTc1OTcgNi4xODcxNTMxNiwxMC41NzE0OTA1IEwxMi45MTA4NDMxLDQuMTc3NDcxMiBDMTMuMTU5NjcxNywzLjk0MDg0MjkzIDEzLjU2Mzc1MjQsMy45NDA4NDI5MyAxMy44MTI1ODEsNC4xNzc0NzEyIEMxNC4wNjI0NzMsNC40MTQwOTk0NiAxNC4wNjI0NzMsNC43OTgzNjc1OCAxMy44MTI1ODEsNS4wMzYwMDcwOCBMNy41NDA4MjM0NSwxMS4wMDAyNTI4IEwxMy44MTI1ODEsMTYuOTY1NTA5OCBDMTQuMDYyNDczLDE3LjIwMTEyNjggMTQuMDYyNDczLDE3LjU4NTM5NDkgMTMuODEyNTgxLDE3LjgyMjAyMzIgQzEzLjY4ODE2NjcsMTcuOTQwMzM3MyAxMy41MjQ0MDc3LDE4IDEzLjM2MTcxMiwxOCBMMTMuMzYxNzEyLDE4IFpcIiBpZD1cImZpbGxcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoOS43NjE2MjUsIDEwLjkyMjI1MCkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTkuNzYxNjI1LCAtMTAuOTIyMjUwKSBcIj48L3BhdGg+J1xubWFwX29rciA9ICc8cGF0aCBkPVwiTTE0LjgyNDIsMTYuODAwOCBDMTQuMTEzMiwxNi44MDA4IDEzLjUzNDIsMTYuMjIxOCAxMy41MzQyLDE1LjUxMDggQzEzLjUzNDIsMTQuNzk5OCAxNC4xMTMyLDE0LjIyMDggMTQuODI0MiwxNC4yMjA4IEMxNS41MzUyLDE0LjIyMDggMTYuMTE0MiwxNC43OTk4IDE2LjExNDIsMTUuNTEwOCBDMTYuMTE0MiwxNi4yMjE4IDE1LjUzNTIsMTYuODAwOCAxNC44MjQyLDE2LjgwMDggTDE0LjgyNDIsMTYuODAwOCBaIE01LjE3NTIsMTEuNDU4OCBDNC40NjQyLDExLjQ1ODggMy44ODYyLDEwLjg4MDggMy44ODYyLDEwLjE2OTggQzMuODg2Miw5LjQ1ODggNC40NjQyLDguODc5OCA1LjE3NTIsOC44Nzk4IEM1Ljg4NjIsOC44Nzk4IDYuNDY1Miw5LjQ1ODggNi40NjUyLDEwLjE2OTggQzYuNDY1MiwxMC44ODA4IDUuODg2MiwxMS40NTg4IDUuMTc1MiwxMS40NTg4IEw1LjE3NTIsMTEuNDU4OCBaIE0xNC44MjQyLDMuMTk5OCBDMTUuNTM1MiwzLjE5OTggMTYuMTE0MiwzLjc3ODggMTYuMTE0Miw0LjQ4ODggQzE2LjExNDIsNS4xOTk4IDE1LjUzNTIsNS43Nzg4IDE0LjgyNDIsNS43Nzg4IEMxNC4xMTMyLDUuNzc4OCAxMy41MzQyLDUuMTk5OCAxMy41MzQyLDQuNDg4OCBDMTMuNTM0MiwzLjc3ODggMTQuMTEzMiwzLjE5OTggMTQuODI0MiwzLjE5OTggTDE0LjgyNDIsMy4xOTk4IFogTTE0LjgyNDIsMTMuMDIxOCBDMTQuMDIzMiwxMy4wMjE4IDEzLjMxNzIsMTMuNDA3OCAxMi44NjEyLDEzLjk5NjggTDcuNjAyMiwxMC43MDk4IEM3LjY0MTIsMTAuNTM1OCA3LjY2NTIsMTAuMzU1OCA3LjY2NTIsMTAuMTY5OCBDNy42NjUyLDkuOTgyOCA3LjY0MTIsOS44MDM4IDcuNjAyMiw5LjYyODggTDEzLjA0NjIsNi4yMjU4IEMxMy40OTgyLDYuNjg5OCAxNC4xMjcyLDYuOTc4OCAxNC44MjQyLDYuOTc4OCBDMTYuMTk3Miw2Ljk3ODggMTcuMzE0Miw1Ljg2MTggMTcuMzE0Miw0LjQ4ODggQzE3LjMxNDIsMy4xMTY4IDE2LjE5NzIsMS45OTk4IDE0LjgyNDIsMS45OTk4IEMxMy40NTEyLDEuOTk5OCAxMi4zMzQyLDMuMTE2OCAxMi4zMzQyLDQuNDg4OCBDMTIuMzM0Miw0LjczMjggMTIuMzgwMiw0Ljk2MzggMTIuNDQ2Miw1LjE4NTggTDcuMDU1Miw4LjU1NTggQzYuNTk4Miw4LjAyMzggNS45MjkyLDcuNjc5OCA1LjE3NTIsNy42Nzk4IEMzLjgwMzIsNy42Nzk4IDIuNjg2Miw4Ljc5NjggMi42ODYyLDEwLjE2OTggQzIuNjg2MiwxMS41NDE4IDMuODAzMiwxMi42NTg4IDUuMTc1MiwxMi42NTg4IEM1LjkyOTIsMTIuNjU4OCA2LjU5ODIsMTIuMzE0OCA3LjA1NTIsMTEuNzgzOCBMMTIuMzc1MiwxNS4xMDc4IEMxMi4zNTMyLDE1LjIzOTggMTIuMzM0MiwxNS4zNzI4IDEyLjMzNDIsMTUuNTEwOCBDMTIuMzM0MiwxNi44ODM4IDEzLjQ1MTIsMTcuOTk5OCAxNC44MjQyLDE3Ljk5OTggQzE2LjE5NzIsMTcuOTk5OCAxNy4zMTQyLDE2Ljg4MzggMTcuMzE0MiwxNS41MTA4IEMxNy4zMTQyLDE0LjEzNzggMTYuMTk3MiwxMy4wMjE4IDE0LjgyNDIsMTMuMDIxOCBMMTQuODI0MiwxMy4wMjE4IFpcIiBpZD1cImZpbGxcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTAuMDAwMjAwLCA5Ljk5OTgwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTEwLjAwMDIwMCwgLTkuOTk5ODAwKSBcIj48L3BhdGg+J1xuc2V0dGluZyA9ICc8cGF0aCBkPVwiTTEwLjAwMDEsOC4yMDAyIEM5LjAwNzEsOC4yMDAyIDguMjAwMSw5LjAwNzIgOC4yMDAxLDEwLjAwMDIgQzguMjAwMSwxMC45OTIyIDkuMDA3MSwxMS44MDAyIDEwLjAwMDEsMTEuODAwMiBDMTAuOTkzMSwxMS44MDAyIDExLjgwMDEsMTAuOTkyMiAxMS44MDAxLDEwLjAwMDIgQzExLjgwMDEsOS4wMDcyIDEwLjk5MzEsOC4yMDAyIDEwLjAwMDEsOC4yMDAyIEwxMC4wMDAxLDguMjAwMiBaIE0xMC4wMDAxLDEzLjAwMDIgQzguMzQ2MSwxMy4wMDAyIDcuMDAwMSwxMS42NTQyIDcuMDAwMSwxMC4wMDAyIEM3LjAwMDEsOC4zNDYyIDguMzQ2MSw3LjAwMDIgMTAuMDAwMSw3LjAwMDIgQzExLjY1NDEsNy4wMDAyIDEzLjAwMDEsOC4zNDYyIDEzLjAwMDEsMTAuMDAwMiBDMTMuMDAwMSwxMS42NTQyIDExLjY1NDEsMTMuMDAwMiAxMC4wMDAxLDEzLjAwMDIgTDEwLjAwMDEsMTMuMDAwMiBaXCIgaWQ9XCJmaWxsXCI+PC9wYXRoPjxwYXRoIGQ9XCJNOS4yNTg0LDE2LjgwMDggTDEwLjc0MTQsMTYuODAwOCBMMTEuNTA2NCwxNS4wNjY4IEMxMS41NzA0LDE0LjkyMDggMTEuNjg5NCwxNC44MDY4IDExLjgzODQsMTQuNzQ4OCBDMTIuMzMyNCwxNC41NTc4IDEyLjc4OTQsMTQuMjk0OCAxMy4xOTY0LDEzLjk2NjggQzEzLjMyMDQsMTMuODY2OCAxMy40Nzk0LDEzLjgyMjggMTMuNjM2NCwxMy44Mzc4IEwxNS41MTg0LDE0LjA0MTggTDE2LjI1OTQsMTIuNzU3OCBMMTUuMTM4NCwxMS4yMjY4IEMxNS4wNDQ0LDExLjA5NzggMTUuMDA1NCwxMC45Mzc4IDE1LjAyOTQsMTAuNzgwOCBDMTUuMDY5NCwxMC41MjU4IDE1LjA5NjQsMTAuMjY1OCAxNS4wOTY0LDkuOTk5OCBDMTUuMDk2NCw5LjczMzggMTUuMDY5NCw5LjQ3NDggMTUuMDI5NCw5LjIxODggQzE1LjAwNTQsOS4wNjE4IDE1LjA0NDQsOC45MDE4IDE1LjEzODQsOC43NzM4IEwxNi4yNTk0LDcuMjQxOCBMMTUuNTE4NCw1Ljk1NzggTDEzLjYzNzQsNi4xNjI4IEMxMy40Nzk0LDYuMTc0OCAxMy4zMTk0LDYuMTMzOCAxMy4xOTY0LDYuMDMyOCBDMTIuNzkwNCw1LjcwNTggMTIuMzMzNCw1LjQ0MjggMTEuODM4NCw1LjI1MTggQzExLjY4OTQsNS4xOTM4IDExLjU3MDQsNS4wNzk4IDExLjUwNjQsNC45MzM4IEwxMC43NDE0LDMuMTk5OCBMOS4yNTg0LDMuMTk5OCBMOC40OTM0LDQuOTMzOCBDOC40Mjk0LDUuMDc5OCA4LjMxMDQsNS4xOTM4IDguMTYxNCw1LjI1MTggQzcuNjY1NCw1LjQ0MzggNy4yMDk0LDUuNzA2OCA2LjgwNDQsNi4wMzI4IEM2LjY4MDQsNi4xMzI4IDYuNTIwNCw2LjE3NDggNi4zNjI0LDYuMTYyOCBMNC40ODI0LDUuOTU3OCBMMy43NDA0LDcuMjQxOCBMNC44NjE0LDguNzczOCBDNC45NTU0LDguOTAxOCA0Ljk5NDQsOS4wNjE4IDQuOTY5NCw5LjIxODggQzQuOTMwNCw5LjQ3NDggNC45MDM0LDkuNzMzOCA0LjkwMzQsOS45OTk4IEM0LjkwMzQsMTAuMjY1OCA0LjkzMDQsMTAuNTI1OCA0Ljk2OTQsMTAuNzgwOCBDNC45OTQ0LDEwLjkzNzggNC45NTU0LDExLjA5NzggNC44NjE0LDExLjIyNjggTDMuNzQwNCwxMi43NTc4IEw0LjQ4MjQsMTQuMDQxOCBMNi4zNjM0LDEzLjgzNzggQzYuNTE4NCwxMy44MjI4IDYuNjgwNCwxMy44NjY4IDYuODA0NCwxMy45Njc4IEM3LjIxMDQsMTQuMjk0OCA3LjY2NjQsMTQuNTU3OCA4LjE2MTQsMTQuNzQ4OCBDOC4zMTA0LDE0LjgwNjggOC40Mjk0LDE0LjkyMDggOC40OTM0LDE1LjA2NjggTDkuMjU4NCwxNi44MDA4IFogTTExLjEzMzQsMTcuOTk5OCBMOC44Njc0LDE3Ljk5OTggQzguNjI5NCwxNy45OTk4IDguNDE0NCwxNy44NjA4IDguMzE4NCwxNy42NDI4IEw3LjQ5MzQsMTUuNzcxOCBDNy4wNTE0LDE1LjU3OTggNi42MzU0LDE1LjM0MDggNi4yNTI0LDE1LjA1NjggTDQuMjIyNCwxNS4yNzc4IEMzLjk4MjQsMTUuMjk4OCAzLjc1NzQsMTUuMTg2OCAzLjYzODQsMTQuOTgwOCBMMi41MDU0LDEzLjAxOTggQzIuMzg2NCwxMi44MTM4IDIuNDAwNCwxMi41NTY4IDIuNTQwNCwxMi4zNjQ4IEwzLjc0OTQsMTAuNzEzOCBDMy43MTg0LDEwLjQ1OTggMy43MDM0LDEwLjIyMzggMy43MDM0LDkuOTk5OCBDMy43MDM0LDkuNzc1OCAzLjcxODQsOS41NDA4IDMuNzQ5NCw5LjI4NTggTDIuNTQwNCw3LjYzNDggQzIuNDAwNCw3LjQ0MzggMi4zODY0LDcuMTg2OCAyLjUwNTQsNi45ODA4IEwzLjYzODQsNS4wMTg4IEMzLjc1NzQsNC44MTM4IDMuOTg3NCw0LjcwMjggNC4yMjI0LDQuNzIxOCBMNi4yNTI0LDQuOTQzOCBDNi42MzQ0LDQuNjU5OCA3LjA1MDQsNC40MjA4IDcuNDkzNCw0LjIyODggTDguMzE4NCwyLjM1NzggQzguNDE0NCwyLjE0MDggOC42Mjk0LDEuOTk5OCA4Ljg2NzQsMS45OTk4IEwxMS4xMzI0LDEuOTk5OCBDMTEuMzcwNCwxLjk5OTggMTEuNTg1NCwyLjE0MDggMTEuNjgxNCwyLjM1NzggTDEyLjUwNjQsNC4yMjg4IEMxMi45NDg0LDQuNDIwOCAxMy4zNjQ0LDQuNjU5OCAxMy43NDc0LDQuOTQzOCBMMTUuNzc3NCw0LjcyMTggQzE2LjAxNTQsNC42OTc4IDE2LjI0MjQsNC44MTI4IDE2LjM2MjQsNS4wMTg4IEwxNy40OTQ0LDYuOTgwOCBDMTcuNjEzNCw3LjE4NjggMTcuNTk5NCw3LjQ0MzggMTcuNDU5NCw3LjYzNDggTDE2LjI1MDQsOS4yODU4IEMxNi4yODE0LDkuNTQwOCAxNi4yOTY0LDkuNzc1OCAxNi4yOTY0LDkuOTk5OCBDMTYuMjk2NCwxMC4yMjM4IDE2LjI4MTQsMTAuNDU5OCAxNi4yNTA0LDEwLjcxMzggTDE3LjQ1OTQsMTIuMzY0OCBDMTcuNTk5NCwxMi41NTY4IDE3LjYxMzQsMTIuODEzOCAxNy40OTQ0LDEzLjAxOTggTDE2LjM2MjQsMTQuOTgwOCBDMTYuMjQzNCwxNS4xODc4IDE2LjAxNTQsMTUuMzAyOCAxNS43Nzg0LDE1LjI3NzggTDEzLjc0NzQsMTUuMDU2OCBDMTMuMzYzNCwxNS4zNDA4IDEyLjk0NzQsMTUuNTc5OCAxMi41MDY0LDE1Ljc3MTggTDExLjY4MTQsMTcuNjQyOCBDMTEuNTg2NCwxNy44NjA4IDExLjM3MDQsMTcuOTk5OCAxMS4xMzM0LDE3Ljk5OTggTDExLjEzMzQsMTcuOTk5OCBaXCIgaWQ9XCJmaWxsXCI+PC9wYXRoPidcbnBsdXNfZmlsbCA9ICc8cGF0aCBkPVwiTTEwLjYwMDA5MzUsMTMuMzMzMjM5OCBDMTAuNjAwMDkzNSwxMy42NjQxNjU3IDEwLjMzMTM5MjksMTMuOTMyODY2MyA5Ljk5OTc1OTgzLDEzLjkzMzU3MzQgQzkuODM0Mjk2ODUsMTMuOTMzNTczNCA5LjY4NDM5MDIxLDEzLjg2NTY5MTIgOS41NzYyMDI4NywxMy43NTc1MDM4IEM5LjQ2NzMwODQzLDEzLjY0ODYwOTQgOS40MDAxMzMyOCwxMy40OTk0MDk4IDkuMzk5NDI2MTgsMTMuMzMzMjM5OCBMOS40MDAxMzMyOCwxMC42MDAyNzIgTDYuNjY2NDU4NDcsMTAuNjAwMjcyIEM2LjUwMDk5NTQ4LDEwLjYwMDI3MiA2LjM1MTA4ODg0LDEwLjUzMjM4OTggNi4yNDI5MDE1MSwxMC40MjQyMDI1IEM2LjEzNDAwNzA2LDEwLjMxNTMwOCA2LjA2NjgzMTkyLDEwLjE2NjEwODUgNi4wNjY4MzE5MiwxMC4wMDA2NDU1IEM2LjA2NjgzMTkyLDkuNjY4MzA1MzEgNi4zMzU1MzI0OSw5LjM5OTYwNDczIDYuNjY3MTY1NTgsOS40MDAzMTE4NCBMOS40MDAxMzMyOCw5LjM5OTYwNDczIEw5LjQwMDEzMzI4LDYuNjY3MzQ0MTMgQzkuNDAwMTMzMjgsNi4zMzUwMDM5NCA5LjY2ODEyNjc1LDYuMDY3MDEwNDcgMTAuMDAwNDY2OSw2LjA2NzAxMDQ3IEMxMC4zMzEzOTI5LDYuMDY3MDEwNDcgMTAuNjAwMDkzNSw2LjMzNTcxMTA1IDEwLjYwMDA5MzUsNi42NjY2MzcwMiBMMTAuNjAwMDkzNSw5LjQwMDMxMTg0IEwxMy4zMzMwNjEyLDkuMzk5NjA0NzMgQzEzLjY2NDY5NDMsOS40MDAzMTE4NCAxMy45MzMzOTQ5LDkuNjY5MDEyNDEgMTMuOTMzMzk0OSw5Ljk5OTkzODM5IEMxMy45MzI2ODc4LDEwLjMzMTU3MTUgMTMuNjY0Njk0MywxMC41OTk1NjQ5IDEzLjMzMzA2MTIsMTAuNjAwMjcyIEwxMC42MDAwOTM1LDEwLjU5OTU2NDkgTDEwLjYwMDA5MzUsMTMuMzMzMjM5OCBMMTAuNjAwMDkzNSwxMy4zMzMyMzk4IFogTTEwLjAwMDQsMS45OTk2IEM1LjU4MTQsMS45OTk2IDIuMDAwNCw1LjU4MTYgMi4wMDA0LDkuOTk5NiBDMi4wMDA0LDE0LjQxODYgNS41ODE0LDE3Ljk5OTYgMTAuMDAwNCwxNy45OTk2IEMxNC40MTg0LDE3Ljk5OTYgMTguMDAwNCwxNC40MTg2IDE4LjAwMDQsOS45OTk2IEMxOC4wMDA0LDUuNTgxNiAxNC40MTg0LDEuOTk5NiAxMC4wMDA0LDEuOTk5NiBMMTAuMDAwNCwxLjk5OTYgWlwiIGlkPVwiaWNvbkFkZFwiPjwvcGF0aD4nXG5wbHVzX2JvcmRlciA9ICc8cGF0aCBkPVwiTTEwLDIgQzUuNTgyLDIgMiw1LjU4MiAyLDEwIEMyLDE0LjQxOCA1LjU4MiwxOCAxMCwxOCBDMTQuNDE4LDE4IDE4LDE0LjQxOCAxOCwxMCBDMTgsNS41ODIgMTQuNDE4LDIgMTAsMiBMMTAsMiBaIE0xMCwzLjIgQzEzLjc1LDMuMiAxNi44LDYuMjUgMTYuOCwxMCBDMTYuOCwxMy43NSAxMy43NSwxNi44IDEwLDE2LjggQzYuMjUsMTYuOCAzLjIsMTMuNzUgMy4yLDEwIEMzLjIsNi4yNSA2LjI1LDMuMiAxMCwzLjIgTDEwLDMuMiBaXCIgaWQ9XCJmaWxsXCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTMuMzMzMSwxMC42MDAxIEw2LjY2NjEsMTAuNjAwMSBDNi4zMzUxLDEwLjYwMDEgNi4wNjYxLDEwLjMzMTEgNi4wNjYxLDEwLjAwMDEgQzYuMDY2MSw5LjY2ODEgNi4zMzUxLDkuNDAwMSA2LjY2NjEsOS40MDAxIEwxMy4zMzMxLDkuNDAwMSBDMTMuNjY1MSw5LjQwMDEgMTMuOTMzMSw5LjY2ODEgMTMuOTMzMSwxMC4wMDAxIEMxMy45MzMxLDEwLjMzMTEgMTMuNjY1MSwxMC42MDAxIDEzLjMzMzEsMTAuNjAwMVwiIGlkPVwiZmlsbFwiPjwvcGF0aD48cGF0aCBkPVwiTTEwLjAwMDEsMTMuOTMyNiBDOS42NjgxLDEzLjkzMjYgOS40MDAxLDEzLjY2MzYgOS40MDAxLDEzLjMzMjYgTDkuNDAwMSw2LjY2NjYgQzkuNDAwMSw2LjMzNDYgOS42NjgxLDYuMDY2NiAxMC4wMDAxLDYuMDY2NiBDMTAuMzMyMSw2LjA2NjYgMTAuNjAwMSw2LjMzNDYgMTAuNjAwMSw2LjY2NjYgTDEwLjYwMDEsMTMuMzMyNiBDMTAuNjAwMSwxMy42NjM2IDEwLjMzMjEsMTMuOTMyNiAxMC4wMDAxLDEzLjkzMjZcIiBpZD1cImZpbGxcIj48L3BhdGg+J1xuZGF0ZV9kZWZhdWx0ID0gJzxwYXRoIGQ9XCJNMTUuMjk0LDE2LjggTDQuNzA2LDE2LjggQzQuMjcyLDE2LjggMy45MDYsMTYuNDM0IDMuOTA2LDE2IEwzLjkwNiw4LjI4MiBMMTYuMDk0LDguMjgyIEwxNi4wOTQsMTYgQzE2LjA5NCwxNi40MzQgMTUuNzI4LDE2LjggMTUuMjk0LDE2LjggTDE1LjI5NCwxNi44IFogTTQuNzA2LDQuNjEyIEw2LjE0Niw0LjYxMiBMNi4xNDYsNS4wMzggQzYuMTQ2LDUuMzY5IDYuNDE1LDUuNjM4IDYuNzQ2LDUuNjM4IEM3LjA3OCw1LjYzOCA3LjM0Niw1LjM2OSA3LjM0Niw1LjAzOCBMNy4zNDYsNC42MTIgTDEyLjY1NCw0LjYxMiBMMTIuNjU0LDUuMDM4IEMxMi42NTQsNS4zNjkgMTIuOTIyLDUuNjM4IDEzLjI1NCw1LjYzOCBDMTMuNTg2LDUuNjM4IDEzLjg1NCw1LjM2OSAxMy44NTQsNS4wMzggTDEzLjg1NCw0LjYxMiBMMTUuMjk0LDQuNjEyIEMxNS43MjgsNC42MTIgMTYuMDk0LDQuOTc4IDE2LjA5NCw1LjQxMiBMMTYuMDk0LDcuMDgyIEwzLjkwNiw3LjA4MiBMMy45MDYsNS40MTIgQzMuOTA2LDQuOTc4IDQuMjcyLDQuNjEyIDQuNzA2LDQuNjEyIEw0LjcwNiw0LjYxMiBaIE0xNS4yOTQsMy40MTIgTDEzLjg1NCwzLjQxMiBMMTMuODU0LDIuNiBDMTMuODU0LDIuMjY5IDEzLjU4NiwyIDEzLjI1NCwyIEMxMi45MjIsMiAxMi42NTQsMi4yNjkgMTIuNjU0LDIuNiBMMTIuNjU0LDMuNDEyIEw3LjM0NiwzLjQxMiBMNy4zNDYsMi42IEM3LjM0NiwyLjI2OSA3LjA3OCwyIDYuNzQ2LDIgQzYuNDE1LDIgNi4xNDYsMi4yNjkgNi4xNDYsMi42IEw2LjE0NiwzLjQxMiBMNC43MDYsMy40MTIgQzMuNjA2LDMuNDEyIDIuNzA2LDQuMzEyIDIuNzA2LDUuNDEyIEwyLjcwNiwxNiBDMi43MDYsMTcuMSAzLjYwNiwxOCA0LjcwNiwxOCBMMTUuMjk0LDE4IEMxNi4zOTQsMTggMTcuMjk0LDE3LjEgMTcuMjk0LDE2IEwxNy4yOTQsNS40MTIgQzE3LjI5NCw0LjMxMiAxNi4zOTQsMy40MTIgMTUuMjk0LDMuNDEyIEwxNS4yOTQsMy40MTIgWlwiIGlkPVwiZmlsbFwiPjwvcGF0aD4nXG5hcnJvd19kb3duID0gJzxwYXRoIGQ9XCJNOC41NTkyMzA0NSwxNSBDOC40MTY2ODYwOCwxNSA4LjI3MzIxMDA0LDE0LjkzODExMTMgOC4xNjQyMDU1MiwxNC44MTUzODMgQzcuOTQ1MjY0ODMsMTQuNTcwOTc1MyA3Ljk0NTI2NDgzLDE0LjE3MjM3MDQgOC4xNjQyMDU1MiwxMy45MjY5MTM3IEwxMS42NTA0ODY4LDkuOTk5NjA2NjQgTDguMTY0MjA1NTIsNi4wNzQzOTc1IEM3Ljk0NTI2NDgzLDUuODI4OTQwODEgNy45NDUyNjQ4Myw1LjQzMDMzNTkzIDguMTY0MjA1NTIsNS4xODQ4NzkyNCBDOC4zODIyMTQ1Niw0LjkzODM3MzU5IDguNzM2MjQ2MzMsNC45MzgzNzM1OSA4Ljk1NDI1NTM3LDUuMTg0ODc5MjQgTDEyLjgzNjQ5MzIsOS41NTQ4NDc1MSBDMTMuMDU0NTAyMyw5LjgwMDMwNDIgMTMuMDU0NTAyMywxMC4xOTg5MDkxIDEyLjgzNjQ5MzIsMTAuNDQ1NDE0NyBMOC45NTQyNTUzNywxNC44MTUzODMgQzguODQ1MjUwODUsMTQuOTM4MTExMyA4LjcwMTc3NDgyLDE1IDguNTU5MjMwNDUsMTUgTDguNTU5MjMwNDUsMTUgWlwiIGlkPVwiZmlsbFwiIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+J1xuc3Rhcl9maWxsID0gJzxwYXRoIGQ9XCJNMTcuOTcwOCw4LjE1MjggQzE3Ljg5OTgsNy45MzU4IDE3LjcxMjgsNy43Nzc4IDE3LjQ4NjgsNy43NDQ4IEwxMi42ODQ4LDcuMDQ3OCBMMTAuNTM3OCwyLjY5NjggQzEwLjMzNTgsMi4yODc4IDkuNjYzOCwyLjI4NzggOS40NjE4LDIuNjk2OCBMNy4zMTQ4LDcuMDQ3OCBMMi41MTM4LDcuNzQ0OCBDMi4yODc4LDcuNzc3OCAyLjA5OTgsNy45MzU4IDIuMDI5OCw4LjE1MjggQzEuOTU4OCw4LjM2OTggMi4wMTc4LDguNjA4OCAyLjE4MDgsOC43Njc4IEw1LjY1NTgsMTIuMTU0OCBMNC44MzQ4LDE2LjkzNjggQzQuNzk2OCwxNy4xNjE4IDQuODg4OCwxNy4zODk4IDUuMDczOCwxNy41MjM4IEM1LjE3ODgsMTcuNTk5OCA1LjMwMTgsMTcuNjM3OCA1LjQyNjgsMTcuNjM3OCBDNS41MjE4LDE3LjYzNzggNS42MTc4LDE3LjYxNDggNS43MDU4LDE3LjU2OTggTDkuOTk5OCwxNS4zMTE4IEwxNC4yOTM4LDE3LjU2OTggQzE0LjQ5NjgsMTcuNjc1OCAxNC43NDE4LDE3LjY1ODggMTQuOTI1OCwxNy41MjM4IEMxNS4xMTA4LDE3LjM4OTggMTUuMjAyOCwxNy4xNjE4IDE1LjE2NDgsMTYuOTM2OCBMMTQuMzQ0OCwxMi4xNTQ4IEwxNy44MTg4LDguNzY3OCBDMTcuOTgyOCw4LjYwODggMTguMDQwOCw4LjM2OTggMTcuOTcwOCw4LjE1MjggTDE3Ljk3MDgsOC4xNTI4IFpcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcbiNEZWZhdWx0SHRtbFxuXG4jQ2xhc3Ncbm9wYWNpdHlDb2xvciA9IG5ldyBDb2xvcihcIiNmZmZmZmZcIikuYWxwaGEoLjApXG5jbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy53aWR0aCA/PSAyMFxuXHRcdEBvcHRpb25zLmhlaWdodCA/PSAyMFxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBvcGFjaXR5Q29sb3Jcblx0XHRAb3B0aW9ucy5pY29uID89IG1lbnVcblx0XHRAb3B0aW9ucy5jb2xvciA/PSBcIiM4MDgwODBcIlxuXHRcdEBvcHRpb25zLnZpZXdCb3ggPz0gXCIwIDAgNDAgNDBcIlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdEBkZWZpbmUgXCJpY29uXCIgLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaWNvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuaWNvbiA9IHZhbHVlXG5cdFx0XHRAaHRtbCA9IFwiXCJcIjw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuPHN2ZyBmaWxsPVwiI3tAb3B0aW9ucy5jb2xvcn1cIiB3aWR0aD1cIjQwcHhcIiBoZWlnaHQ9XCI0MHB4XCIgdmlld0JveD1cIiN7QG9wdGlvbnMudmlld0JveH1cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuI3tAb3B0aW9ucy5pY29ufVxuPC9zdmc+XCJcIlwiXG5cdEBkZWZpbmUgXCJjb2xvclwiICxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5jb2xvciA9IHZhbHVlXG5cdFx0XHRAaHRtbCA9IFwiXCJcIjw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuPHN2ZyBmaWxsPVwiI3tAb3B0aW9ucy5jb2xvcn1cIiB3aWR0aD1cIjQwcHhcIiBoZWlnaHQ9XCI0MHB4XCIgdmlld0JveD1cIiN7QG9wdGlvbnMudmlld0JveH1cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuI3tAb3B0aW9ucy5pY29ufVxuPC9zdmc+XCJcIlwiXG5cblxuZXhwb3J0cy5JY29uID0gSWNvblxuZXhwb3J0cy5jYW5jZWwgPSBjYW5jZWxcbmV4cG9ydHMubWVudSA9IG1lbnVcbmV4cG9ydHMucGx1c19ib2xkID0gcGx1c19ib2xkXG5leHBvcnRzLmFycm93X2xlZnQgPSBhcnJvd19sZWZ0XG5leHBvcnRzLmFycm93X2Rvd24gPSBhcnJvd19kb3duXG5leHBvcnRzLm1hcF9va3IgPSBtYXBfb2tyXG5leHBvcnRzLnNldHRpbmcgPSBzZXR0aW5nXG5leHBvcnRzLnBsdXNfZmlsbCA9IHBsdXNfZmlsbFxuZXhwb3J0cy5wbHVzX2JvcmRlciA9IHBsdXNfYm9yZGVyXG5leHBvcnRzLmRhdGVfZGVmYXVsdCA9IGRhdGVfZGVmYXVsdFxuZXhwb3J0cy5zdGFyX2ZpbGwgPSBzdGFyX2ZpbGwiLCJjbGFzcyBleHBvcnRzLkNpcmNsZSBleHRlbmRzIExheWVyXG5cdGN1cnJlbnRWYWx1ZTogbnVsbFxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAb3B0aW9ucy5jaXJjbGVTaXplID89IDMwMFxuXHRcdEBvcHRpb25zLnN0cm9rZVdpZHRoID89IDI0XG5cblx0XHRAb3B0aW9ucy5zdHJva2VDb2xvciA/PSBcIiNmYzI0NWNcIlxuXHRcdEBvcHRpb25zLnRvcENvbG9yID89IG51bGxcblx0XHRAb3B0aW9ucy5ib3R0b21Db2xvciA/PSBudWxsXG5cdFx0QG9wdGlvbnMuZHJvcFNoYWRvdyA/PSBudWxsXG5cblx0XHRAb3B0aW9ucy5oYXNDb3VudGVyID89IGZhbHNlXG5cdFx0QG9wdGlvbnMuY291bnRlckNvbG9yID89IFwiI2ZmZlwiXG5cdFx0QG9wdGlvbnMuY291bnRlckZvbnRTaXplID89IDYwXG5cdFx0QG9wdGlvbnMuaGFzTGluZWFyRWFzaW5nID89IGZhbHNlXG5cdFx0QG9wdGlvbnMuY291bnRlcldlaWdodCA/PSAwXG5cdFx0QG9wdGlvbnMuaGFzUGVyY2VudGFnZSA/PSBmYWxzZVxuXG5cdFx0QG9wdGlvbnMudmFsdWUgPSAyXG5cblx0XHRAb3B0aW9ucy52aWV3Qm94ID0gKEBvcHRpb25zLmNpcmNsZVNpemUpICsgQG9wdGlvbnMuc3Ryb2tlV2lkdGhcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiXCJcblx0XHRALmhlaWdodCA9IEBvcHRpb25zLnZpZXdCb3hcblx0XHRALndpZHRoID0gQG9wdGlvbnMudmlld0JveFxuXHRcdEAucm90YXRpb24gPSAtOTBcblxuXG5cdFx0QC5wYXRoTGVuZ3RoID0gTWF0aC5QSSAqIEBvcHRpb25zLmNpcmNsZVNpemVcblxuXHRcdEAuY2lyY2xlSUQgPSBcImNpcmNsZVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDApXG5cdFx0QC5ncmFkaWVudElEID0gXCJjaXJjbGVcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxuXG5cdFx0IyBQdXQgdGhpcyBpbnNpZGUgbGluZWFyZ3JhZGllbnRcblx0XHQjIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG5cdFx0IyAgICB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiNTAlXCIgeTI9XCIwJVwiIGdyYWRpZW50VHJhbnNmb3JtPVwicm90YXRlKDEyMClcIlxuXG5cblx0XHRpZiBAb3B0aW9ucy5oYXNDb3VudGVyIGlzbnQgbnVsbFxuXHRcdFx0Y291bnRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0XHR3aWR0aDogQC53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0XHRyb3RhdGlvbjogOTBcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLmNvdW50ZXJDb2xvclxuXG5cdFx0XHRzdHlsZSA9IHtcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdGZvbnRTaXplOiBcIiN7QG9wdGlvbnMuY291bnRlckZvbnRTaXplfXB4XCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje0AuaGVpZ2h0fXB4XCJcblx0XHRcdFx0Zm9udFdlaWdodDogXCIje0BvcHRpb25zLmNvdW50ZXJXZWlnaHR9XCJcblx0XHRcdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHR9XG5cblx0XHRcdGNvdW50ZXIuc3R5bGUgPSBzdHlsZVxuXG5cdFx0XHRudW1iZXJTdGFydCA9IDBcblx0XHRcdG51bWJlckVuZCA9IDEwMFxuXHRcdFx0bnVtYmVyRHVyYXRpb24gPSAyXG5cblx0XHRcdG51bWJlck5vdyA9IG51bWJlclN0YXJ0XG5cdFx0XHRudW1iZXJJbnRlcnZhbCA9IG51bWJlckVuZCAtIG51bWJlclN0YXJ0XG5cblxuXHRcdEAuaHRtbCA9IFwiXCJcIlxuXHRcdFx0PHN2ZyB2aWV3Qm94PSctI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAtI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAje0BvcHRpb25zLnZpZXdCb3h9ICN7QG9wdGlvbnMudmlld0JveH0nIC13ZWJraXQtZmlsdGVyPScje0BvcHRpb25zLmRyb3BTaGFkb3d9JyBmaWx0ZXI9JyN7QG9wdGlvbnMuZHJvcFNoYWRvd30nID5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdCAgICA8bGluZWFyR3JhZGllbnQgaWQ9JyN7QGdyYWRpZW50SUR9JyA+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wLWNvbG9yPScje2lmIEBvcHRpb25zLnRvcENvbG9yIGlzbnQgbnVsbCB0aGVuIEBvcHRpb25zLmJvdHRvbUNvbG9yIGVsc2UgQG9wdGlvbnMuc3Ryb2tlQ29sb3J9Jy8+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMudG9wQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nIHN0b3Atb3BhY2l0eT1cIjFcIiAvPlxuXHRcdFx0XHQgICAgPC9saW5lYXJHcmFkaWVudD5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8Y2lyY2xlIGlkPScje0BjaXJjbGVJRH0nXG5cdFx0XHRcdFx0XHRmaWxsPSdub25lJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWxpbmVjYXA9J3JvdW5kJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoICAgICAgPSAnI3tAb3B0aW9ucy5zdHJva2VXaWR0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaGFycmF5ICA9ICcje0AucGF0aExlbmd0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaG9mZnNldCA9ICcwJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlPVwidXJsKCMje0BncmFkaWVudElEfSlcIlxuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoPVwiMTBcIlxuXHRcdFx0XHRcdFx0Y3ggPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0Y3kgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0ciAgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9Jz5cblx0XHRcdDwvc3ZnPlwiXCJcIlxuXG5cdFx0c2VsZiA9IEBcblx0XHRVdGlscy5kb21Db21wbGV0ZSAtPlxuXHRcdFx0c2VsZi5wYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiMje3NlbGYuY2lyY2xlSUR9XCIpXG5cblx0XHRAcHJveHkgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdEBwcm94eS5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uLCBsYXllcikgLT5cblx0XHRcdHNlbGYub25GaW5pc2hlZCgpXG5cblx0XHRAcHJveHkub24gJ2NoYW5nZTp4JywgLT5cblxuXHRcdFx0b2Zmc2V0ID0gVXRpbHMubW9kdWxhdGUoQC54LCBbMCwgNTAwXSwgW3NlbGYucGF0aExlbmd0aCwgMF0pXG5cblx0XHRcdHNlbGYucGF0aC5zZXRBdHRyaWJ1dGUgJ3N0cm9rZS1kYXNob2Zmc2V0Jywgb2Zmc2V0XG5cblx0XHRcdGlmIHNlbGYub3B0aW9ucy5oYXNDb3VudGVyIGlzbnQgZmFsc2Vcblx0XHRcdFx0bnVtYmVyTm93ID0gVXRpbHMucm91bmQoc2VsZi5wcm94eS54IC8gNSlcblx0XHRcdFx0Y291bnRlci5odG1sID0gbnVtYmVyTm93XG5cdFx0XHRcdGlmIHNlbGYub3B0aW9ucy5oYXNQZXJjZW50YWdlIGlzbnQgZmFsc2Vcblx0XHRcdFx0XHRjb3VudGVyLmh0bWwgPSBudW1iZXJOb3cgKyBcIiVcIlxuXG5cdFx0VXRpbHMuZG9tQ29tcGxldGUgLT5cblx0XHRcdHNlbGYucHJveHkueCA9IDAuMVxuXG5cdGNoYW5nZVRvOiAodmFsdWUsIHRpbWUpIC0+XG5cdFx0aWYgdGltZSBpcyB1bmRlZmluZWRcblx0XHRcdHRpbWUgPSAyXG5cblx0XHRpZiBAb3B0aW9ucy5oYXNDb3VudGVyIGlzIHRydWUgYW5kIEBvcHRpb25zLmhhc0xpbmVhckVhc2luZyBpcyBmYWxzZSAjIG92ZXJyaWRlIGRlZmF1bHQgXCJlYXNlLWluLW91dFwiIHdoZW4gY291bnRlciBpcyB1c2VkXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwibGluZWFyXCJcblx0XHRlbHNlXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFx0QHByb3h5LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6IDUwMCAqICh2YWx1ZSAvIDEwMClcblx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdGN1cnZlOiBjdXN0b21DdXJ2ZVxuXG5cblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cdHN0YXJ0QXQ6ICh2YWx1ZSkgLT5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogMC4wMDFcblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cblxuXHRoaWRlOiAtPlxuXHRcdEAub3BhY2l0eSA9IDBcblxuXHRzaG93OiAtPlxuXHRcdEAub3BhY2l0eSA9IDFcblxuXHRvbkZpbmlzaGVkOiAtPlxuXG4iLCJjbGFzcyBUZXh0TGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0QGRvQXV0b1NpemUgPSBmYWxzZVxuXHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gZmFsc2Vcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJoc2xhKDYwLCA5MCUsIDQ3JSwgLjQpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmNvbG9yID89IFwicmVkXCJcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMS4yNVxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIkhlbHZldGljYVwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAyMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlVzZSBsYXllci50ZXh0IHRvIGFkZCB0ZXh0XCJcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHN0eWxlLndoaXRlU3BhY2UgPSBcInByZS1saW5lXCIgIyBhbGxvdyBcXG4gaW4gLnRleHRcblx0XHRAc3R5bGUub3V0bGluZSA9IFwibm9uZVwiICMgbm8gYm9yZGVyIHdoZW4gc2VsZWN0ZWRcblx0XHRcblx0c2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUsIHB4U3VmZml4ID0gZmFsc2UpIC0+XG5cdFx0QHN0eWxlW3Byb3BlcnR5XSA9IGlmIHB4U3VmZml4IHRoZW4gdmFsdWUrXCJweFwiIGVsc2UgdmFsdWVcblx0XHRAZW1pdChcImNoYW5nZToje3Byb3BlcnR5fVwiLCB2YWx1ZSlcblx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdFx0XG5cdGNhbGNTaXplOiAtPlxuXHRcdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdFx0bGluZUhlaWdodDogQHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRcdGZvbnRTaXplOiBAc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRcdGZvbnRXZWlnaHQ6IEBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nVG9wOiBAc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdFx0cGFkZGluZ1JpZ2h0OiBAc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nQm90dG9tOiBAc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdFx0dGV4dFRyYW5zZm9ybTogQHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRcdGJvcmRlcldpZHRoOiBAc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRcdGxldHRlclNwYWNpbmc6IEBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0XHRmb250RmFtaWx5OiBAc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdFx0Zm9udFN0eWxlOiBAc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0XHRmb250VmFyaWFudDogQHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cdFx0Y29uc3RyYWludHMgPSB7fVxuXHRcdGlmIEBkb0F1dG9TaXplSGVpZ2h0IHRoZW4gY29uc3RyYWludHMud2lkdGggPSBAd2lkdGhcblx0XHRzaXplID0gVXRpbHMudGV4dFNpemUgQHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cdFx0aWYgQHN0eWxlLnRleHRBbGlnbiBpcyBcInJpZ2h0XCJcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRcdEB4ID0gQHgtQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdEBoZWlnaHQgPSBzaXplLmhlaWdodFxuXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZVwiLFxuXHRcdGdldDogLT4gQGRvQXV0b1NpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZUhlaWdodFwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImNvbnRlbnRFZGl0YWJsZVwiLFxuXHRcdHNldDogKGJvb2xlYW4pIC0+XG5cdFx0XHRAX2VsZW1lbnQuY29udGVudEVkaXRhYmxlID0gYm9vbGVhblxuXHRcdFx0QGlnbm9yZUV2ZW50cyA9ICFib29sZWFuXG5cdFx0XHRAb24gXCJpbnB1dFwiLCAtPiBAY2FsY1NpemUoKSBpZiBAZG9BdXRvU2l6ZVxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQF9lbGVtZW50LnRleHRDb250ZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2VsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6dGV4dFwiLCB2YWx1ZSlcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImZvbnRGYW1pbHlcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udEZhbWlseVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFNpemVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFNpemUucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFNpemVcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsaW5lSGVpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxpbmVIZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxpbmVIZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250V2VpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRXZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRXZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U3R5bGVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTdHlsZVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRWYXJpYW50XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRWYXJpYW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRWYXJpYW50XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1wiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nVG9wXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdUb3AucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0JvdHRvbVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nQm90dG9tLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nTGVmdFwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdMZWZ0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwidGV4dEFsaWduXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInRleHRUcmFuc2Zvcm1cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUudGV4dFRyYW5zZm9ybSBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dFRyYW5zZm9ybVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImxldHRlclNwYWNpbmdcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGV0dGVyU3BhY2luZy5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsZXR0ZXJTcGFjaW5nXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGVuZ3RoXCIsIFxuXHRcdGdldDogLT4gQHRleHQubGVuZ3RoXG5cbmNvbnZlcnRUb1RleHRMYXllciA9IChsYXllcikgLT5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XG5cdGNzc09iaiA9IHt9XG5cdGNzcyA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLmNzc1xuXHRjc3MuZm9yRWFjaCAocnVsZSkgLT5cblx0XHRyZXR1cm4gaWYgXy5pbmNsdWRlcyBydWxlLCAnLyonXG5cdFx0YXJyID0gcnVsZS5zcGxpdCgnOiAnKVxuXHRcdGNzc09ialthcnJbMF1dID0gYXJyWzFdLnJlcGxhY2UoJzsnLCcnKVxuXHR0LnN0eWxlID0gY3NzT2JqXG5cdFxuXHRpbXBvcnRQYXRoID0gbGF5ZXIuX19mcmFtZXJJbXBvcnRlZEZyb21QYXRoXG5cdGlmIF8uaW5jbHVkZXMgaW1wb3J0UGF0aCwgJ0AyeCdcblx0XHR0LmZvbnRTaXplICo9IDJcblx0XHR0LmxpbmVIZWlnaHQgPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KSoyKSsncHgnXG5cdFx0dC5sZXR0ZXJTcGFjaW5nICo9IDJcblx0XHRcdFx0XHRcblx0dC55IC09IChwYXJzZUludCh0LmxpbmVIZWlnaHQpLXQuZm9udFNpemUpLzIgIyBjb21wZW5zYXRlIGZvciBob3cgQ1NTIGhhbmRsZXMgbGluZSBoZWlnaHRcblx0dC55IC09IHQuZm9udFNpemUgKiAwLjEgIyBza2V0Y2ggcGFkZGluZ1xuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDggIyBza2V0Y2ggcGFkZGluZ1xuXHR0LndpZHRoICs9IHQuZm9udFNpemUgKiAwLjUgIyBza2V0Y2ggcGFkZGluZ1xuXG5cdHQudGV4dCA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuXHRsYXllci5kZXN0cm95KClcblx0cmV0dXJuIHRcblxuTGF5ZXI6OmNvbnZlcnRUb1RleHRMYXllciA9IC0+IGNvbnZlcnRUb1RleHRMYXllcihAKVxuXG5jb252ZXJ0VGV4dExheWVycyA9IChvYmopIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllcilcblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXJNb2R1bGUgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFLQUE7QURBQSxJQUFBLGdEQUFBO0VBQUE7OztBQUFNOzs7RUFFUSxtQkFBQyxPQUFEOztNQUFDLFVBQVE7O0lBQ3JCLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7O01BQ3BCLE9BQU8sQ0FBQyxrQkFBc0IsT0FBTyxDQUFDLEtBQVgsR0FBc0Isd0JBQXRCLEdBQW9EOzs7TUFDL0UsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxhQUFjOzs7TUFDdEIsT0FBTyxDQUFDLFdBQVk7OztNQUNwQixPQUFPLENBQUMsT0FBUTs7SUFDaEIsMkNBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQjtJQUNwQixJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsR0FBaUI7RUFYTDs7c0JBYWIsUUFBQSxHQUFVLFNBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsUUFBbEI7O01BQWtCLFdBQVc7O0lBQ3RDLElBQUMsQ0FBQSxLQUFNLENBQUEsUUFBQSxDQUFQLEdBQXNCLFFBQUgsR0FBaUIsS0FBQSxHQUFNLElBQXZCLEdBQWlDO0lBQ3BELElBQUMsQ0FBQSxJQUFELENBQU0sU0FBQSxHQUFVLFFBQWhCLEVBQTRCLEtBQTVCO0lBQ0EsSUFBRyxJQUFDLENBQUEsVUFBSjthQUFvQixJQUFDLENBQUEsUUFBRCxDQUFBLEVBQXBCOztFQUhTOztzQkFLVixRQUFBLEdBQVUsU0FBQTtBQUNULFFBQUE7SUFBQSxtQkFBQSxHQUNDO01BQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxLQUFNLENB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
