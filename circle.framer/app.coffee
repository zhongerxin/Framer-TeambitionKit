# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Apple Watch Activities"
	author: "Jonathan Arnold"
	twitter: "@servusjon"
	description: "Build with SVGCircle Module. Learn more: https://github.com/ServusJon/SVGCircle-Module-for-FramerJS"

#屏幕基础设定
Framer.Device.customize
	deviceType: "fullscreen"
	screenWidth: 1440
	screenHeight: 900
	devicePixelRatio: 1
Framer.Device.deviceType = "fullscreen"

document.body.style.cursor = "auto"


{Circle} = require "circleModule"
bg = new BackgroundLayer


loadingCircle = new Circle
	topColor: "#3DC8F5"
	circleSize: 63
	strokeWidth: 4
	bottomColor: "#3DA8F5"
	hasCounter: true
	hasLinearEasing: true
	counterColor: "#383838"
	x: Screen.midX - 31
	y: Screen.midY - 31
	counterFontSize: 14
	counterWeight: 0
	dropShadow: "drop-shadow(-1px 0px 3px rgba(61,168,245,0.4))"
	hasPercentage: true


loadingCircle.changeTo(60,2)
loadingCircle.onClick ->
	loadingCircle.changeTo(100,2)





# Hello world!