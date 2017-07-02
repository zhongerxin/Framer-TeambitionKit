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
    return this.html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg fill=\"" + this.color + "\" width=\"40x\" height=\"40px\" viewBox=\"0 0 40 40\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<defs>\n	<polygon id=\"path-1\" points=\"0 20 20 20 20 0 0 0\"></polygon>\n</defs>\n" + this.name + "\n</svg>";
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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0Rlc2t0b3AvMC1GcmFtZXIgQ29tcC9pY29ucy5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9EZXNrdG9wLzAtRnJhbWVyIENvbXAvaWNvbnMuZnJhbWVyL21vZHVsZXMvaWNvbk1vZHVsZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjSUNPTlNcbm1lbnUgPSAnPHBhdGggZD1cIk0xNS44MzMxLDYuNDI0OCBMNC4xNjYxLDYuNDI0OCBDMy44MzUxLDYuNDI0OCAzLjU2NjEsNi4xNTU4IDMuNTY2MSw1LjgyNDggQzMuNTY2MSw1LjQ5MjggMy44MzUxLDUuMjI0OCA0LjE2NjEsNS4yMjQ4IEwxNS44MzMxLDUuMjI0OCBDMTYuMTY1MSw1LjIyNDggMTYuNDMzMSw1LjQ5MjggMTYuNDMzMSw1LjgyNDggQzE2LjQzMzEsNi4xNTU4IDE2LjE2NTEsNi40MjQ4IDE1LjgzMzEsNi40MjQ4IEwxNS44MzMxLDYuNDI0OCBaXCIgaWQ9XCJmaWxsXCIgIG1hc2s9XCJ1cmwoI21hc2stMilcIj48L3BhdGg+XG5cdDxwYXRoIGQ9XCJNMTUuODMzMSwxMC41OTEzIEw0LjE2NjEsMTAuNTkxMyBDMy44MzUxLDEwLjU5MTMgMy41NjYxLDEwLjMyMjMgMy41NjYxLDkuOTkxMyBDMy41NjYxLDkuNjU5MyAzLjgzNTEsOS4zOTEzIDQuMTY2MSw5LjM5MTMgTDE1LjgzMzEsOS4zOTEzIEMxNi4xNjUxLDkuMzkxMyAxNi40MzMxLDkuNjU5MyAxNi40MzMxLDkuOTkxMyBDMTYuNDMzMSwxMC4zMjIzIDE2LjE2NTEsMTAuNTkxMyAxNS44MzMxLDEwLjU5MTNcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPlxuXHQ8cGF0aCBkPVwiTTE1LjgzMzEsMTQuNzc1NCBMNC4xNjYxLDE0Ljc3NTQgQzMuODM1MSwxNC43NzU0IDMuNTY2MSwxNC41MDY0IDMuNTY2MSwxNC4xNzU0IEMzLjU2NjEsMTMuODQ0NCAzLjgzNTEsMTMuNTc2NCA0LjE2NjEsMTMuNTc2NCBMMTUuODMzMSwxMy41NzY0IEMxNi4xNjUxLDEzLjU3NjQgMTYuNDMzMSwxMy44NDQ0IDE2LjQzMzEsMTQuMTc1NCBDMTYuNDMzMSwxNC41MDY0IDE2LjE2NTEsMTQuNzc1NCAxNS44MzMxLDE0Ljc3NTRcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcblxuY2FuY2VsID0gJzxwYXRoIGQ9XCJNMTAuODQ4NSwxMCBMMTUuNDI0NSw1LjQyNCBDMTUuNjU4NSw1LjE5IDE1LjY1ODUsNC44MSAxNS40MjQ1LDQuNTc2IEMxNS4xOTA1LDQuMzQxIDE0LjgxMDUsNC4zNDEgMTQuNTc1NSw0LjU3NiBMMTAuMDAwNSw5LjE1MiBMNS40MjQ1LDQuNTc2IEM1LjE5MDUsNC4zNDEgNC44MTA1LDQuMzQxIDQuNTc1NSw0LjU3NiBDNC4zNDE1LDQuODEgNC4zNDE1LDUuMTkgNC41NzU1LDUuNDI0IEw5LjE1MTUsMTAgTDQuNTc1NSwxNC41NzYgQzQuMzQxNSwxNC44MSA0LjM0MTUsMTUuMTkgNC41NzU1LDE1LjQyNCBDNC42OTI1LDE1LjU0MSA0Ljg0NjUsMTUuNiA1LjAwMDUsMTUuNiBDNS4xNTM1LDE1LjYgNS4zMDc1LDE1LjU0MSA1LjQyNDUsMTUuNDI0IEwxMC4wMDA1LDEwLjg0OCBMMTQuNTc1NSwxNS40MjQgQzE0LjY5MjUsMTUuNTQxIDE0Ljg0NjUsMTUuNiAxNS4wMDA1LDE1LjYgQzE1LjE1MzUsMTUuNiAxNS4zMDc1LDE1LjU0MSAxNS40MjQ1LDE1LjQyNCBDMTUuNjU4NSwxNS4xOSAxNS42NTg1LDE0LjgxIDE1LjQyNDUsMTQuNTc2IEwxMC44NDg1LDEwIEwxMC44NDg1LDEwIFpcIiBpZD1cImZpbGxcIiBtYXNrPVwidXJsKCNtYXNrLTIpXCI+PC9wYXRoPidcblxuXG4jQ2xhc3Ncbm9wYWNpdHlDb2xvciA9IG5ldyBDb2xvcihcIiNmZmZmZmZcIikuYWxwaGEoLjApXG5jbGFzcyBJY29uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdHN1cGVyIF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bmFtZTogbWVudVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcGFjaXR5Q29sb3Jcblx0XHRcdGNvbG9yOlwiIzgwODA4MFwiXG5cdFx0XHRodG1sOlwiXCJcblx0XHRAaW5pdCgpXG5cdFx0QG9uIFwiY2hhbmdlOmNvbG9yXCIsIC0+XG5cdFx0XHRAaW5pdCgpXG5cdFx0QG9uIFwiY2hhbmdlOm5hbWVcIiwgLT5cblx0XHRcdEBpbml0KClcblx0aW5pdDogLT5cblx0XHRAaHRtbCA9IFwiXCJcIlxuXHRcdDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuXHRcdDxzdmcgZmlsbD1cIiN7QGNvbG9yfVwiIHdpZHRoPVwiNDB4XCIgaGVpZ2h0PVwiNDBweFwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuXHRcdDxkZWZzPlxuXHRcdFx0PHBvbHlnb24gaWQ9XCJwYXRoLTFcIiBwb2ludHM9XCIwIDIwIDIwIDIwIDIwIDAgMCAwXCI+PC9wb2x5Z29uPlxuXHRcdDwvZGVmcz5cblx0XHQje0BuYW1lfVxuXHRcdDwvc3ZnPlwiXCJcIlxuXG5cbmV4cG9ydHMuSWNvbiA9IEljb25cbmV4cG9ydHMuY2FuY2VsID0gY2FuY2VsXG5leHBvcnRzLm1lbnUgPSBtZW51XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRENBLElBQUEsZ0NBQUE7RUFBQTs7O0FBQUEsSUFBQSxHQUFPOztBQUlQLE1BQUEsR0FBUzs7QUFJVCxZQUFBLEdBQW1CLElBQUEsS0FBQSxDQUFNLFNBQU4sQ0FBZ0IsQ0FBQyxLQUFqQixDQUF1QixFQUF2Qjs7QUFDYjs7O0VBQ1EsY0FBQyxPQUFEO0lBQ1osc0NBQU0sQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLEVBQ0w7TUFBQSxLQUFBLEVBQU8sRUFBUDtNQUNBLE1BQUEsRUFBUSxFQURSO01BRUEsSUFBQSxFQUFNLElBRk47TUFHQSxlQUFBLEVBQWlCLFlBSGpCO01BSUEsS0FBQSxFQUFNLFNBSk47TUFLQSxJQUFBLEVBQUssRUFMTDtLQURLLENBQU47SUFPQSxJQUFDLENBQUEsSUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxjQUFKLEVBQW9CLFNBQUE7YUFDbkIsSUFBQyxDQUFBLElBQUQsQ0FBQTtJQURtQixDQUFwQjtJQUVBLElBQUMsQ0FBQSxFQUFELENBQUksYUFBSixFQUFtQixTQUFBO2FBQ2xCLElBQUMsQ0FBQSxJQUFELENBQUE7SUFEa0IsQ0FBbkI7RUFYWTs7aUJBYWIsSUFBQSxHQUFNLFNBQUE7V0FDTCxJQUFDLENBQUEsSUFBRCxHQUFRLDBEQUFBLEdBRUssSUFBQyxDQUFBLEtBRk4sR0FFWSxpUEFGWixHQU1OLElBQUMsQ0FBQSxJQU5LLEdBTUE7RUFQSDs7OztHQWRZOztBQXlCbkIsT0FBTyxDQUFDLElBQVIsR0FBZTs7QUFDZixPQUFPLENBQUMsTUFBUixHQUFpQjs7QUFDakIsT0FBTyxDQUFDLElBQVIsR0FBZTs7OztBRGpDZixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIn0=