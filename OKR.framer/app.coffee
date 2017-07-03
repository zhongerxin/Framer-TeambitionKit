#基础设定
#屏幕设定
Framer.Device.customize
	deviceType: "fullscreen"
	screenWidth: 1440
	screenHeight: 900
	devicePixelRatio: 1
Framer.Device.deviceType = "fullscreen"


#手势设定
cursorAuto = ->
	document.body.style.cursor = "auto"
cursorPointer = ->
	document.body.style.cursor = "pointer"
cursorAuto()
#基础动画设定
defaultAnimation =
	time: 0.2
	curve: Bezier.easeInOut
#基础颜色设定
opacityColor = new Color("#ffffff").alpha(.0)
tb_Blue = new Color("#3DA8F5")
tb_Blue_60 = new Color("#3696DC")
tb_Red = new Color("#FF4F3E")
tb_Black_100 = new Color("#383838")
tb_Black_90 = new Color("#808080")
tb_Black_80 = new Color("#A6A6A6")
tb_Black_70 = new Color("#CCCCCC")
tb_Black_50 = new Color("#E5E5E5")
tb_Black_30 = new Color("#F5F5F5")
tb_Black_20 = new Color("#FFFFFF")



{CardStack,Card} = require "okrKit"
{Icon,menu,plus_bold} = require "iconModule"

cardstack = new CardStack
	x: Screen.midX - 135
	y: Screen.midY - 120
cardstack.onClick ->
	@width = 1000
	@tagLabel = "rrrrr"
	@refresh()
	
class Button extends TextLayer
	constructor: (options) ->
		super _.defaults options,
			height:40
			width:76
			borderRadius:4
			backgroundColor:tb_Blue
			text: "Button"
			textAlign: "center"
			fontSize: 14
			fontWeight: 600
			lineHeight: 1
			color:tb_Black_20
		@states.default = 
			backgroundColor:@backgroundColor
			animationOptions:defaultAnimation
		@states.hover = 
			backgroundColor:tb_Blue_60
			animationOptions:defaultAnimation
		@lineHeight = @height/@fontSize
		@on "mouseenter", ->
			cursorPointer()
			@animate("hover")
		@on "mouseleave", ->
			cursorAuto()
			@animate("default")
		
class CircleButton extends Button
	constructor: (options) ->
		super _.defaults options,
			height:24
			width:24
			text:""
			borderRadius:12
			name:""
		@icon = new Icon
			name:@name
			midX:@midX
			midY:@midY
			color:tb_Black_20	

class Navigation extends Layer
	constructor: (options) ->
		super _.defaults options,
			height: 48
			width:Screen.width
			backgroundColor:opacityColor
		@background = new Layer
			parent:@
			width:@width
			height:@height
			backgroundColor:tb_Black_20
			shadowSpread: 0
			shadowY: 1
			shadowColor: "rgba(0,0,0,0.15)"
			shadowBlur: 3
		@icon_workSpaceMenu = new Icon
			name:menu
			x:16
			midY:@height/2
			parent:@
			color:tb_Black_80
		@label_workSpaceTitle = new TextLayer
			x:@icon_workSpaceMenu.maxX + 8
			midY:@height/2
			parent:@
			text: "Teambition"
			height: 18
			fontSize: 18
			lineHeight: 1
			color:tb_Black_100
		@input_searchBar = new TextLayer
			x: @label_workSpaceTitle.maxX + 20
			midY:@height/2
			parent:@
			width:272
			height:32
			borderRadius:16
			backgroundColor: "#FAFAFA"
			borderWidth:1
			borderColor: tb_Black_50
			text: "在当前企业中搜索"
			fontSize: 14
			lineHeight: 32/14
			color:tb_Black_70
			padding:
				left: 36
		@button_addTask = new CircleButton
			x: @input_searchBar.maxX + 20
			midY:@height/2
			parent:@
			name:plus_bold
		@avatar_selfNormal = new Layer
			midY:@height/2
			maxX:@width - 16
			image: "images/avatar-12.png"
			width:28
			height:28
			borderRadius:14


nav = new Navigation
	y: 0
