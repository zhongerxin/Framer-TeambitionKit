require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"iconModule":[function(require,module,exports){
var Icon, cancel, menu, opacityColor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

menu = '<path d="M15.8331,6.4248 L4.1661,6.4248 C3.8351,6.4248 3.5661,6.1558 3.5661,5.8248 C3.5661,5.4928 3.8351,5.2248 4.1661,5.2248 L15.8331,5.2248 C16.1651,5.2248 16.4331,5.4928 16.4331,5.8248 C16.4331,6.1558 16.1651,6.4248 15.8331,6.4248 L15.8331,6.4248 Z" id="fill"  mask="url(#mask-2)"></path> <path d="M15.8331,10.5913 L4.1661,10.5913 C3.8351,10.5913 3.5661,10.3223 3.5661,9.9913 C3.5661,9.6593 3.8351,9.3913 4.1661,9.3913 L15.8331,9.3913 C16.1651,9.3913 16.4331,9.6593 16.4331,9.9913 C16.4331,10.3223 16.1651,10.5913 15.8331,10.5913" id="fill" mask="url(#mask-2)"></path> <path d="M15.8331,14.7754 L4.1661,14.7754 C3.8351,14.7754 3.5661,14.5064 3.5661,14.1754 C3.5661,13.8444 3.8351,13.5764 4.1661,13.5764 L15.8331,13.5764 C16.1651,13.5764 16.4331,13.8444 16.4331,14.1754 C16.4331,14.5064 16.1651,14.7754 15.8331,14.7754" id="fill" mask="url(#mask-2)"></path>';

cancel = '<path d="M10.8485,10 L15.4245,5.424 C15.6585,5.19 15.6585,4.81 15.4245,4.576 C15.1905,4.341 14.8105,4.341 14.5755,4.576 L10.0005,9.152 L5.4245,4.576 C5.1905,4.341 4.8105,4.341 4.5755,4.576 C4.3415,4.81 4.3415,5.19 4.5755,5.424 L9.1515,10 L4.5755,14.576 C4.3415,14.81 4.3415,15.19 4.5755,15.424 C4.6925,15.541 4.8465,15.6 5.0005,15.6 C5.1535,15.6 5.3075,15.541 5.4245,15.424 L10.0005,10.848 L14.5755,15.424 C14.6925,15.541 14.8465,15.6 15.0005,15.6 C15.1535,15.6 15.3075,15.541 15.4245,15.424 C15.6585,15.19 15.6585,14.81 15.4245,14.576 L10.8485,10 L10.8485,10 Z" id="fill" mask="url(#mask-2)"></path>';

opacityColor = new Color("#ffffff").alpha(.0);

Icon = (function(superClass) {
  extend(Icon, superClass);

  function Icon(options) {
    Icon.__super__.constructor.call(this, _.defaults(options, {
      width: 20,
      height: 20,
      name: menu,
      backgroundColor: opacityColor,
      color: "#808080",
      html: ""
    }));
    this.init();
    this.on("change:color", function() {
      return this.init();
    });
    this.on("change:name", function() {
      return this.init();
    });
  }

  Icon.prototype.init = function() {
    return this.html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg fill=\"" + this.color + "\" width=\"40x\" height=\"40px\" viewBox=\"0 0 40 40\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<defs>\n	<polygon id=\"path-1\" points=\"0 40 40 40 40 0 0 0\"></polygon>\n</defs>\n	\n" + this.name + "\n</svg>";
  };

  return Icon;

})(Layer);

exports.Icon = Icon;

exports.cancel = cancel;

exports.menu = menu;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"okrKit":[function(require,module,exports){
var Card, CardStack, Tag, cursorAuto, cursorPointer, defaultAnimation, opacityColor,
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

Card = (function(superClass) {
  extend(Card, superClass);

  function Card(options) {
    Card.__super__.constructor.call(this, _.defaults(options, {
      borderRadius: 3,
      backgroundColor: "#ffffff",
      shadowSpread: 0,
      shadowY: 2,
      shadowColor: "rgba(0,0,0,0.05)",
      shadowBlur: 3
    }));
  }

  return Card;

})(Layer);

Tag = (function(superClass) {
  extend(Tag, superClass);

  function Tag(options) {
    Tag.__super__.constructor.call(this, _.defaults(options, {
      width: 103,
      height: 36,
      borderRadius: 4,
      backgroundColor: "#ffffff",
      shadowSpread: 0,
      shadowY: 2,
      shadowColor: "rgba(0,0,0,0.05)",
      shadowBlur: 3
    }));
    this.arrow = new Layer({
      parent: this,
      width: 12,
      height: 12,
      backgroundColor: "#ffffff",
      rotation: 45,
      y: -6,
      midX: this.width / 2
    });
    this.tag_label = new TextLayer({
      text: "创建子目标",
      parent: this,
      fontSize: 14,
      textAlign: "center",
      color: "#808080",
      width: 80,
      height: 17,
      midX: this.width / 2,
      midY: this.height / 2
    });
    this.tag_label.states["default"] = {
      color: "#808080",
      animationOptions: defaultAnimation
    };
    this.tag_label.states.highlight = {
      color: "#3da8f5",
      animationOptions: {
        time: 0.2,
        curve: Bezier.easeInOut
      }
    };
    this.tag_label.onMouseOver(function() {
      cursorPointer();
      return this.animate("highlight");
    });
    this.tag_label.onMouseOut(function() {
      cursorAuto();
      return this.animate("default");
    });
  }

  return Tag;

})(Layer);

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
      this.card_cover = new Card({
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

exports.Card = Card;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0ZyYW1lci1UZWFtYml0aW9uS2l0L09LUi5mcmFtZXIvbW9kdWxlcy9va3JLaXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vRnJhbWVyLVRlYW1iaXRpb25LaXQvT0tSLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL0ZyYW1lci1UZWFtYml0aW9uS2l0L09LUi5mcmFtZXIvbW9kdWxlcy9pY29uTW9kdWxlLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmYXVsdEFuaW1hdGlvbiA9XG5cdHRpbWU6IDAuMlxuXHRjdXJ2ZTogQmV6aWVyLmVhc2VJbk91dFxub3BhY2l0eUNvbG9yID0gbmV3IENvbG9yKFwiI2ZmZmZmZlwiKS5hbHBoYSguMClcbmN1cnNvckF1dG8gPSAtPlxuXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5jdXJzb3JQb2ludGVyID0gLT5cblx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIlxuXG5jbGFzcyBDYXJkIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGJvcmRlclJhZGl1cyA6IDNcblx0XHRcdGJhY2tncm91bmRDb2xvciA6IFwiI2ZmZmZmZlwiXG5cdFx0XHRzaGFkb3dTcHJlYWQgOiAwXG5cdFx0XHRzaGFkb3dZIDogMlxuXHRcdFx0c2hhZG93Q29sb3IgOiBcInJnYmEoMCwwLDAsMC4wNSlcIlxuXHRcdFx0c2hhZG93Qmx1ciA6IDNcdFx0XG5jbGFzcyBUYWcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFx0c3VwZXIgXy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0d2lkdGggOiAxMDNcblx0XHRcdGhlaWdodCA6IDM2XG5cdFx0XHRib3JkZXJSYWRpdXMgOiA0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgOiBcIiNmZmZmZmZcIlxuXHRcdFx0c2hhZG93U3ByZWFkIDogMFxuXHRcdFx0c2hhZG93WSA6IDJcblx0XHRcdHNoYWRvd0NvbG9yIDogXCJyZ2JhKDAsMCwwLDAuMDUpXCJcblx0XHRcdHNoYWRvd0JsdXIgOiAzXG5cdFx0XG5cdFx0QGFycm93ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOjEyXG5cdFx0XHRoZWlnaHQ6MTJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCJcblx0XHRcdHJvdGF0aW9uOiA0NVxuXHRcdFx0eTogLTZcblx0XHRcdG1pZFg6IEAud2lkdGgvMlxuXHRcdFxuXHRcdEB0YWdfbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIuWIm+W7uuWtkOebruagh1wiXG5cdFx0XHRwYXJlbnQ6QFxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHR0ZXh0QWxpZ246XCJjZW50ZXJcIlxuXHRcdFx0Y29sb3I6IFwiIzgwODA4MFwiXG5cdFx0XHR3aWR0aDogODBcblx0XHRcdGhlaWdodDogMTdcblx0XHRcdG1pZFg6IEAud2lkdGgvMlxuXHRcdFx0bWlkWTogQC5oZWlnaHQvMiBcblx0XHRAdGFnX2xhYmVsLnN0YXRlcy5kZWZhdWx0ID0gXG5cdFx0XHRjb2xvcjogXCIjODA4MDgwXCJcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IGRlZmF1bHRBbmltYXRpb25cblx0XHRAdGFnX2xhYmVsLnN0YXRlcy5oaWdobGlnaHQgPSBcblx0XHRcdGNvbG9yOiBcIiMzZGE4ZjVcIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTogMC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZUluT3V0XG5cdFx0QHRhZ19sYWJlbC5vbk1vdXNlT3ZlciAtPlxuXHRcdFx0Y3Vyc29yUG9pbnRlcigpXG5cdFx0XHRAYW5pbWF0ZShcImhpZ2hsaWdodFwiKVxuXHRcdEB0YWdfbGFiZWwub25Nb3VzZU91dCAtPlxuXHRcdFx0Y3Vyc29yQXV0bygpXG5cdFx0XHRAYW5pbWF0ZShcImRlZmF1bHRcIilcdFx0XG5cdFx0XHRcbmNsYXNzIENhcmRTdGFjayBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRzdXBlciBfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgOiBvcGFjaXR5Q29sb3Jcblx0XHRcdHdpZHRoIDogMzcwXG5cdFx0XHRoZWlnaHQgOiAxOTdcblx0XHRcdHRhZ0xhYmVsOlwiXCJcblx0XHRAaW5pdCgpXG5cdHJlZnJlc2g6IC0+XG5cdFx0Zm9yIGkgaW4gWzAuLi4zXVxuXHRcdFx0QGNhcmRzW2ldLndpZHRoID0gIEB3aWR0aCAtIGkqOFxuXHRcdEB0YWcueCA9ICAgQHdpZHRoLzIgLSA1MVxuXHRcdEB0YWcudGFnX2xhYmVsLnRleHQgPSBAdGFnTGFiZWxcblx0aW5pdDogLT5cblx0XHRAY2FyZHMgPSBbXVxuXHRcdGZvciBpIGluIFswLi4uM11cblx0XHRcdEBjYXJkX2NvdmVyID0gbmV3IENhcmRcblx0XHRcdFx0d2lkdGg6IEB3aWR0aCAtIGkqOFxuXHRcdFx0XHRoZWlnaHQ6IDEyMFxuXHRcdFx0XHRpbmRleDogMyAtIGlcblx0XHRcdFx0bWlkWDpALndpZHRoLzJcblx0XHRcdFx0eTogaSozXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0QGNhcmRfY292ZXIuc3RhdGVzLmRlZmF1bHQgPSBcblx0XHRcdFx0eTpAY2FyZF9jb3Zlci55XG5cdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IGRlZmF1bHRBbmltYXRpb25cblx0XHRcdEBjYXJkX2NvdmVyLnN0YXRlcy5zdHJldGNoID0gXG5cdFx0XHRcdHk6QGNhcmRfY292ZXIueSArIDMqKGkrMSlcblx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczogZGVmYXVsdEFuaW1hdGlvblxuXHRcdFx0QGNhcmRzLnB1c2goQGNhcmRfY292ZXIpXG5cdFx0XG5cdFx0QG1hc2sgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDpAY2FyZHNbMF1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjM0RBNUY4XCJcblx0XHRcdGhlaWdodDogMTIwXG5cdFx0XHRzdHlsZToge1wiYm9yZGVyUmFkaXVzXCI6IFwiM3B4IDAgMCAzcHhcIn1cblx0XHRcdHdpZHRoOjBcblx0XHRAbWFzay5zdGF0ZXMuZGVmYXVsdCA9IFxuXHRcdFx0d2lkdGg6QG1hc2sud2lkdGhcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6ZGVmYXVsdEFuaW1hdGlvblxuXHRcdEBtYXNrLnN0YXRlcy5zdHJldGNoID0gXG5cdFx0XHR3aWR0aDpAbWFzay53aWR0aCArIDhcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6ZGVmYXVsdEFuaW1hdGlvblxuXG5cdFx0QHRhZyA9IG5ldyBUYWdcblx0XHRcdHBhcmVudDpAXG5cdFx0XHR4OiBAd2lkdGgvMiAtIDUxXG5cdFx0XHR5OiBAY2FyZHNbMF0uaGVpZ2h0ICsgMTZcblx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHRcblx0XHRAdGFnLnN0YXRlcy5kZWZhdWx0ID0gXG5cdFx0XHR5OiBAdGFnLnlcblx0XHRcdG9wYWNpdHk6QHRhZy5vcGFjaXR5XG5cdFx0XHRhbmltYXRpb25PcHRpb25zOmRlZmF1bHRBbmltYXRpb25cblx0XHRAdGFnLnN0YXRlcy5zdHJldGNoID0gXG5cdFx0XHR5OiBAdGFnLnkgKyAzKkBjYXJkcy5sZW5ndGhcblx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpkZWZhdWx0QW5pbWF0aW9uXG5cdFx0XHRcblx0XHRAb24gXCJtb3VzZWVudGVyXCIsIC0+XG5cdFx0XHRjdXJzb3JQb2ludGVyKClcblx0XHRcdEBtYXNrLmFuaW1hdGUoXCJzdHJldGNoXCIpXG5cdFx0XHRAdGFnLmFuaW1hdGUoXCJzdHJldGNoXCIpXG5cdFx0XHRmb3IgaSBpbiBAY2FyZHNcblx0XHRcdFx0aS5hbmltYXRlKFwic3RyZXRjaFwiKVxuXHRcdEBvbiBcIm1vdXNlbGVhdmVcIiwgLT5cblx0XHRcdGN1cnNvckF1dG8oKVxuXHRcdFx0QG1hc2suYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdEB0YWcuYW5pbWF0ZShcImRlZmF1bHRcIilcblx0XHRcdGZvciBpIGluIEBjYXJkc1xuXHRcdFx0XHRpLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5leHBvcnRzLkNhcmRTdGFjayA9IENhcmRTdGFja1xuZXhwb3J0cy5DYXJkID0gQ2FyZCIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjSUNPTlNcbm1lbnUgPSAnPHBhdGggZD1cIk0xNS44MzMxLDYuNDI0OCBMNC4xNjYxLDYuNDI0OCBDMy44MzUxLDYuNDI0OCAzLjU2NjEsNi4xNTU4IDMuNTY2MSw1LjgyNDggQzMuNTY2MSw1LjQ5MjggMy44MzUxLDUuMjI0OCA0LjE2NjEsNS4yMjQ4IEwxNS44MzMxLDUuMjI0OCBDMTYuMTY1MSw1LjIyNDggMTYuNDMzMSw1LjQ5MjggMTYuNDMzMSw1LjgyNDggQzE2LjQzMzEsNi4xNTU4IDE2LjE2NTEsNi40MjQ4IDE1LjgzMzEsNi40MjQ4IEwxNS44MzMxLDYuNDI0OCBaXCIgaWQ9XCJmaWxsXCIgIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+XG5cdDxwYXRoIGQ9XCJNMTUuODMzMSwxMC41OTEzIEw0LjE2NjEsMTAuNTkxMyBDMy44MzUxLDEwLjU5MTMgMy41NjYxLDEwLjMyMjMgMy41NjYxLDkuOTkxMyBDMy41NjYxLDkuNjU5MyAzLjgzNTEsOS4zOTEzIDQuMTY2MSw5LjM5MTMgTDE1LjgzMzEsOS4zOTEzIEMxNi4xNjUxLDkuMzkxMyAxNi40MzMxLDkuNjU5MyAxNi40MzMxLDkuOTkxMyBDMTYuNDMzMSwxMC4zMjIzIDE2LjE2NTEsMTAuNTkxMyAxNS44MzMxLDEwLjU5MTNcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPlxuXHQ8cGF0aCBkPVwiTTE1LjgzMzEsMTQuNzc1NCBMNC4xNjYxLDE0Ljc3NTQgQzMuODM1MSwxNC43NzU0IDMuNTY2MSwxNC41MDY0IDMuNTY2MSwxNC4xNzU0IEMzLjU2NjEsMTMuODQ0NCAzLjgzNTEsMTMuNTc2NCA0LjE2NjEsMTMuNTc2NCBMMTUuODMzMSwxMy41NzY0IEMxNi4xNjUxLDEzLjU3NjQgMTYuNDMzMSwxMy44NDQ0IDE2LjQzMzEsMTQuMTc1NCBDMTYuNDMzMSwxNC41MDY0IDE2LjE2NTEsMTQuNzc1NCAxNS44MzMxLDE0Ljc3NTRcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcblxuY2FuY2VsID0gJzxwYXRoIGQ9XCJNMTAuODQ4NSwxMCBMMTUuNDI0NSw1LjQyNCBDMTUuNjU4NSw1LjE5IDE1LjY1ODUsNC44MSAxNS40MjQ1LDQuNTc2IEMxNS4xOTA1LDQuMzQxIDE0LjgxMDUsNC4zNDEgMTQuNTc1NSw0LjU3NiBMMTAuMDAwNSw5LjE1MiBMNS40MjQ1LDQuNTc2IEM1LjE5MDUsNC4zNDEgNC44MTA1LDQuMzQxIDQuNTc1NSw0LjU3NiBDNC4zNDE1LDQuODEgNC4zNDE1LDUuMTkgNC41NzU1LDUuNDI0IEw5LjE1MTUsMTAgTDQuNTc1NSwxNC41NzYgQzQuMzQxNSwxNC44MSA0LjM0MTUsMTUuMTkgNC41NzU1LDE1LjQyNCBDNC42OTI1LDE1LjU0MSA0Ljg0NjUsMTUuNiA1LjAwMDUsMTUuNiBDNS4xNTM1LDE1LjYgNS4zMDc1LDE1LjU0MSA1LjQyNDUsMTUuNDI0IEwxMC4wMDA1LDEwLjg0OCBMMTQuNTc1NSwxNS40MjQgQzE0LjY5MjUsMTUuNTQxIDE0Ljg0NjUsMTUuNiAxNS4wMDA1LDE1LjYgQzE1LjE1MzUsMTUuNiAxNS4zMDc1LDE1LjU0MSAxNS40MjQ1LDE1LjQyNCBDMTUuNjU4NSwxNS4xOSAxNS42NTg1LDE0LjgxIDE1LjQyNDUsMTQuNTc2IEwxMC44NDg1LDEwIEwxMC44NDg1LDEwIFpcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcblxuXG4jQ2xhc3Ncbm9wYWNpdHlDb2xvciA9IG5ldyBDb2xvcihcIiNmZmZmZmZcIikuYWxwaGEoLjApXG5jbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bmFtZTogbWVudVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcGFjaXR5Q29sb3Jcblx0XHRcdGNvbG9yOlwiIzgwODA4MFwiXG5cdFx0XHRodG1sOlwiXCJcblx0XHRAaW5pdCgpXG5cdFx0QG9uIFwiY2hhbmdlOmNvbG9yXCIsIC0+XG5cdFx0XHRAaW5pdCgpXG5cdFx0QG9uIFwiY2hhbmdlOm5hbWVcIiwgLT5cblx0XHRcdEBpbml0KClcblx0aW5pdDogLT5cblx0XHRAaHRtbCA9IFwiXCJcIlxuXHRcdDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuXHRcdDxzdmcgZmlsbD1cIiN7QGNvbG9yfVwiIHdpZHRoPVwiNDB4XCIgaGVpZ2h0PVwiNDBweFwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuXHRcdDxkZWZzPlxuXHRcdFx0PHBvbHlnb24gaWQ9XCJwYXRoLTFcIiBwb2ludHM9XCIwIDQwIDQwIDQwIDQwIDAgMCAwXCI+PC9wb2x5Z29uPlxuXHRcdDwvZGVmcz5cblx0XG5cdFx0I3tAbmFtZX1cblx0XHQ8L3N2Zz5cIlwiXCJcblxuXG5leHBvcnRzLkljb24gPSBJY29uXG5leHBvcnRzLmNhbmNlbCA9IGNhbmNlbFxuZXhwb3J0cy5tZW51ID0gbWVudVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFHQUE7QURDQSxJQUFBLGdDQUFBO0VBQUE7OztBQUFBLElBQUEsR0FBTzs7QUFJUCxNQUFBLEdBQVM7O0FBSVQsWUFBQSxHQUFtQixJQUFBLEtBQUEsQ0FBTSxTQUFOLENBQWdCLENBQUMsS0FBakIsQ0FBdUIsRUFBdkI7O0FBQ2I7OztFQUNRLGNBQUMsT0FBRDtJQUNaLHNDQUFNLENBQUMs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
