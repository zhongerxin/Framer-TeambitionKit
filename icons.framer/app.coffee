#屏幕基础设定
Framer.Device.customize
	deviceType: "fullscreen"
	screenWidth: 1440
	screenHeight: 900
	devicePixelRatio: 1
Framer.Device.deviceType = "fullscreen"

document.body.style.cursor = "auto"
{Icon,cancel,menu} = require "iconModule"
icon = new Icon
	color:'tomato'
	name:cancel
	midX: Screen.midX
	midY:Screen.midY 
icon.states.normal = 
	rotation:icon.rotation
# 	color:icon.color
	name:cancel
	animationOptions:
		time:0.2
		curve:Bezier.easeInOut
icon.states.plus = 
	name:menu
	rotation:45
# 	color:"#3da3f8"
	animationOptions:
		time:0.2
		curve:Bezier.easeInOut
icon.onClick ->
	icon.stateCycle("plus","normal")
	


