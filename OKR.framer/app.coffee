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



{Icon,menu,plus_bold,arrow_left,map_okr,setting,plus_fill,plus_border,date_default} = require "iconModule"
{Circle} = require "circleModule"

class Avatar extends Layer
	constructor: (@options={}) ->
		@options.image ?= "images/avatar-12.png"
		@options.width ?= 24
		@options.height ?= @options.width
		@options.borderRadius ?= @options.width/2
		@options.isHoverTag ?= false
		@tag = new Tag
			text:"前往罗伯特的主页"
			opacity:0
		super @options
		@tag.parent = @
		@tag.midX = @options.width/2
		@tag.maxY = 0
		@tag.states.default = 
			y: @tag.y
			opacity:@tag.opacity
			animationOptions:defaultAnimation
		@tag.states.stretch = 
			y: @tag.y - 7
			opacity:1
			animationOptions:defaultAnimation
	@define "isHoverTag",
		get: -> @options.isHoverTag
		set: (value) ->
			@options.isHoverTag = value
			if @options.isHoverTag
				@onMouseOver ->
					@tag.animate("stretch")
					cursorPointer()
				@onMouseOut ->
					@tag.animate("default")
					cursorAuto()
class Button extends TextLayer
	constructor: (@options={}) ->
		@options.height ?= 40
		@options.width ?= 76
		@options.borderRadius ?= 4
		@options.backgroundColor ?= tb_Blue
		@options.text ?= "Button"
		@options.textAlign ?= "center"
		@options.fontSize ?= 14
		@options.fontWeight ?= 600
		@options.lineHeight ?= @options.height/@options.fontSize
		@options.color ?= tb_Black_20
		super @options
		@states.default = 
			backgroundColor:@backgroundColor
			animationOptions:defaultAnimation
		@states.hover = 
			backgroundColor:tb_Blue_60
			animationOptions:defaultAnimation
		@onMouseOver ->
			cursorPointer()
			@animate("hover")
		@onMouseOut ->
			cursorAuto()
			@animate("default")

class CircleButton extends Button
	constructor: (@options={}) ->
		@options.height ?= 24
		@options.width ?= 24
		@options.text ?= ""
		@options.borderRadius ?= 12
		@options.icon ?= plus_bold
		@iconLayer = new Icon
			name:"icon"
			midX:@options.width/2
			midY:@options.height/2
			color:tb_Black_20
		super @options
		@iconLayer.parent = @
	@define "icon",
		get: -> @options.icon
		set: (value) ->
			@options.icon = value
			@iconLayer.icon = @options.icon

class Navigation extends Layer
	constructor: (@options={}) ->
		@options.height = 48
		@options.width = Screen.width
		@options.backgroundColor = opacityColor
		@background = new Layer
			name:"background"
			width:@options.width
			height:@options.height
			backgroundColor:tb_Black_20
			shadowSpread: 0
			shadowY: 1
			shadowColor: "rgba(0,0,0,0.15)"
			shadowBlur: 3
		@icon_workSpaceMenu = new Icon
			name:"icon_workSpaceMenu"
			icon:menu
			x:16
			midY:@options.height/2
			color:tb_Black_80
		@label_workSpaceTitle = new TextLayer
			name:"label_workSpaceTitle"
			x:@icon_workSpaceMenu.maxX + 8
			midY:@options.height/2
			text: "Teambition"
			height: 18
			fontSize: 18
			lineHeight: 1
			color:tb_Black_100
		@input_searchBar = new TextLayer
			name:"input_searchBar"
			x: @label_workSpaceTitle.maxX + 20
			midY:@options.height/2
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
		@button_add = new CircleButton
			name:"button_addTask"
			x: @input_searchBar.maxX + 20
			midY:@options.height/2
			icon:plus_bold
		@avatar_selfNormal = new Avatar
			name:"avatar_selfNormal"
			width:28
			midY:@options.height/2
			maxX:@options.width - 16
		super @options
		@background.parent = @
		@icon_workSpaceMenu.parent = @
		@button_add.parent = @
		@label_workSpaceTitle.parent = @
		@input_searchBar.parent = @
		@avatar_selfNormal.parent = @

class Trail extends Layer
	constructor: (@options={}) ->
		@options.height ?= 48
		@options.width ?= 800
		@options.backgroundColor = opacityColor
		@options.trails ?= []
		@options.trailLayers = []
		super @options
	@define "trails",
		get: -> @options.trails
		set: (value) ->
			for i in @options.trailLayers
				i.destroy()
			@options.trailLayers = []
			@options.trails = value
			for i in [0...@options.trails.length]
				@trail = new TextLayer
					name:"step"
					parent:@
					width:@options.trails[i].length*15.5 + 24
					height:48
					backgroundColor: opacityColor
					text: @options.trails[i]
					fontSize: 15
					lineHeight: 48/15
					color:tb_Black_100
				@options.trailLayers.push(@trail)
				@arrow = new Icon
					name:"icon"
					parent:@trail
					backgroundColor:opacityColor
					maxX:@trail.maxX-2
					midY:@trail.height/2
					icon:arrow_left
					color:tb_Black_100
				if i==0
					@trail.x = 0
				if i>0
					@trail.x=@options.trailLayers[i-1].maxX
				if i==@options.trails.length-1
					@arrow.opacity = 0
				@trail.states.default = 
					color:@trail.color
					animationOptions:defaultAnimation
				@trail.states.hover = 
					color:tb_Blue_60
					animationOptions:defaultAnimation
				@trail.onMouseOver ->
					cursorPointer()
					@animate("hover")
				@trail.onMouseOut ->
					cursorAuto()
					@animate("default")
class WordLinkButton extends TextLayer
	constructor: (@options={}) ->
		@options.height ?= 20
		@options.text ?= "链接"
		@options.fontSize ?= 14
		@options.color ?= tb_Black_90
		@options.lineHeight ?= @options.height/@options.fontSize
		super @options
		@states.default = 
			color:@options.color
			animationOptions:defaultAnimation
		@states.hover = 
			color:tb_Blue
			animationOptions:defaultAnimation
		@onMouseOver ->
			cursorPointer()
			@animate("hover")
		@onMouseOut ->
			cursorAuto()
			@animate("default")
					
class IconLinkButton extends TextLayer
	constructor: (@options={}) ->
		@options.height ?= 20
		@options.icon ?= menu
		@options.text ?= "链接"
		@options.fontSize ?= 14
		@options.linkColor ?= tb_Black_90
		@options.lineHeight ?= @options.height/@options.fontSize
		@options.padding = {left:24}
		@iconLayer = new Icon
			name:"icon"
			midY:@options.height/2
		super @options
		@iconLayer.parent = @
		@states.default = 
			linkColor:@options.linkColor
			animationOptions:defaultAnimation
		@states.hover = 
			linkColor:tb_Blue
			animationOptions:defaultAnimation
		@onMouseOver ->
			cursorPointer()
			@animate("hover")
		@onMouseOut ->
			cursorAuto()
			@animate("default")
	@define "icon",
		get: -> @options.icon
		set: (value) ->
			@options.icon = value
			@iconLayer.icon = @options.icon
	@define "linkColor",
		get: -> @options.linkColor
		set: (value) ->
			@options.linkColor = value
			@color = @options.linkColor
			@iconLayer.color = @options.linkColor
			
class IconLink extends TextLayer
	constructor: (@options={}) ->
		@options.height ?= 20
		@options.icon ?= menu
		@options.text ?= "链接"
		@options.fontSize ?= 14
		@options.linkColor ?= tb_Black_90
		@options.lineHeight ?= @options.height/@options.fontSize
		@options.padding ?= {left:24}
		@options.viewBox ?= "0 0 40 40"
		@iconLayer = new Icon
			viewBox: @options.viewBox
			name:"icon"
			midY:@options.height/2
		super @options
		@iconLayer.parent = @
	@define "icon",
		get: -> @options.icon
		set: (value) ->
			@options.icon = value
			@iconLayer.icon = @options.icon
	@define "linkColor",
		get: -> @options.linkColor
		set: (value) ->
			@options.linkColor = value
			@color = @options.linkColor
			@iconLayer.color = @options.linkColor

class RightTopTools extends Layer
	constructor:(@options={}) ->
		@options.height ?= 48
		@options.width ?= 800
		@options.backgroundColor = opacityColor
		@setting = new IconLinkButton
			name:"setting"
			text:"配置"
			icon:setting
			midY:@options.height/2
		@map = new IconLinkButton
			name:"map"
			text:"目标地图"
			icon:map_okr
			maxX:@options.width
			midY:@options.height/2
		@newObject = new IconLinkButton
			name:"newObject"
			text:"新建目标"
			linkColor:tb_Blue
			icon:plus_fill
			maxX:@options.width - @setting.width - @map.width - 48
			midY:@options.height/2
		@newObject.states.default =
			linkColor:@newObject.linkColor
			animationOptions:defaultAnimation
		@newObject.states.hover =
			linkColor:tb_Blue_60
			animationOptions:defaultAnimation
		@newObject.onMouseOver ->
			cursorPointer()
			@animate("hover")
		@newObject.onMouseOut ->
			cursorAuto()
			@animate("default")
		super @options
		@setting.parent = @
		@setting.maxX = @options.width
		@map.parent = @
		@map.maxX = @options.width - @setting.width - 24
		@newObject.parent = @
		@newObject.maxX = @options.width - @setting.width - @map.width - 48

class CardBg extends Layer
	constructor: (@options={}) ->
		@options.borderRadius ?= 4
		@options.backgroundColor ?= tb_Black_20
		@options.shadowY ?= 2
		@options.shadowColor ?= "rgba(0,0,0,0.05)"
		@options.shadowBlur ?= 3
		super @options		
class Tag extends TextLayer
	constructor: (@options={}) ->
		@options.text ?= "标签"
		@options.fontSize = 14
		@options.lineHeight = 20/14
		@options.color ?= tb_Black_20
		@options.borderRadius = 4
		@options.backgroundColor ?= tb_Black_100
		@options.shadowSpread = 0
		@options.shadowY = 2
		@options.shadowColor = "rgba(0,0,0,0.05)"
		@options.shadowBlur = 3
		@options.padding =
			left: 12
			right: 12
			top: 8
			bottom: 8
		@arrow = new Layer
			name:"icon"
			width:8
			height:8
			backgroundColor: tb_Black_100
			rotation: 45
		super @options
		@arrow.parent = @
		@arrow.midX = @width/2
		@arrow.midY = @height
		
class ToolTag extends Layer
	constructor:(@options={}) ->
		@options.width ?= 210
		@options.height ?= 36
		@options.backgroundColor ?= tb_Black_20
		@options.borderRadius ?= 4
		@options.shadowSpread = 0
		@options.shadowY = 2
		@options.shadowColor = "rgba(0,0,0,0.05)"
		@options.shadowBlur = 3
		@arrow = new Layer
			name:"arrow"
			width:8
			height:8
			y:-4
			backgroundColor: tb_Black_20
			rotation: 45
		@newObject = new IconLinkButton
			name:"newObject"
			icon:plus_border
			text:"创建子目标"
			midY:@options.height/2
			x:12
		@detail = new WordLinkButton
			name:"detail"
			text:"详情"
			midY:@options.height/2
			x:@newObject.maxX + 17
		@connect = new WordLinkButton
			name:"connect"
			text:"关联"
			midY:@options.height/2
			x:@detail.maxX + 17
		super @options
		@arrow.parent = @
		@arrow.midX = @width/2
		@newObject.parent = @
		@detail.parent = @
		@connect.parent = @

				
class CardStack extends Layer
	constructor: (@options={}) ->
		@options.backgroundColor = opacityColor
		@options.width = 320
		@options.height = 164
		@options.cardNumber ?= 1
		@cards = []
		@tag = new ToolTag
			name:"tag"
			midX: @options.width/2
			opacity:0
		super @options
		@tag.parent = @
		@on "mouseenter", ->
			if @options.cardNumber > 1
				cursorPointer()
			@highLight.animate("stretch")
			@tag.animate("stretch")
			for i in @cards
				i.animate("stretch")
		@on "mouseleave", ->
			cursorAuto()
			@highLight.animate("default")
			@tag.animate("default")
			for i in @cards
				i.animate("default")
	@define "cardNumber",
		get: -> @options.cardNumber
		set: (value) ->
			@options.cardNumber = value
			for i in @cards
				i.destroy()
			@cards = []
			for i in [0...@.options.cardNumber]
				@card = new CardBg
					name:"card"
					width: @options.width - i*8
					height: 120
					midX:@options.width/2
					y: i*3
				@card.states.default = 
					y:@card.y
					animationOptions: defaultAnimation
				@card.states.stretch = 
					y:@card.y + 3*i
					animationOptions: defaultAnimation
				@cards.push(@card)
			@highLight = new Layer
				name:"highlight"
				parent:@cards[0]
				backgroundColor: "#3DA5F8"
				height: 120
				style: {"borderRadius": "3px 0 0 3px"}
				width:0
			for card,id in @cards
				card.parent = @
				card.index = 3 - id
			@tag.y = @cards[@options.cardNumber-1].height
			@highLight.states.default = 
				width:@highLight.width
				animationOptions:defaultAnimation
			@highLight.states.stretch = 
				width:@highLight.width + 8
				animationOptions:defaultAnimation		
			@tag.states.default = 
				y: @tag.y
				opacity:@tag.opacity
				animationOptions:defaultAnimation
			@tag.states.stretch = 
				y: @tag.y + 6*@options.cardNumber + 2
				opacity:1
				animationOptions:defaultAnimation
	
class MapCard extends CardStack
	constructor: (@options={}) ->
		super @options
		@avatar = new Avatar
			name:"avatar"
			isHoverTag: true
			parent:@
			x:16
			y:12

		@name = new TextLayer
			name:"name"
			parent:@
			x: @avatar.x
			y: @avatar.y
			text: "罗伯特"
			fontSize: 14
			lineHeight: @avatar.height/14
			color:tb_Black_80
			padding:
				left: @avatar.width + 8
		@object = new TextLayer
			name:"object"
			parent:@
			x: @avatar.x
			y: @avatar.maxY + 10
			width:212
			height:40
			text: "完成网站首页的改版设计，完成网站首页的改版设计"
			fontSize: 14
			lineHeight: 18/14
			color:tb_Black_100
		@cycleTag = new IconLink
			name:"cycleTag"
			text:"2017年 Q3"
			lineHeight:16/12
			fontSize:12
			linkColor:tb_Black_80
			viewBox:"0 0 50 50"
			padding: {left:20}
			parent:@
			icon:date_default
			x:@avatar.x
			y:@object.maxY + 10
		@superObject = new IconLink
			name:"cycleTag"
			text:"公司目标"
			lineHeight:16/12
			fontSize:12
			linkColor:tb_Black_80
			viewBox:"0 0 50 50"
			padding: {left:20}
			parent:@
			icon:map_okr
			x:@cycleTag.maxX + 12
			y:@object.maxY + 10
		@circlebg = new Layer
			parent:@
			x:240 + 2
			y:28 + 2
			width:64.5
			height:64.5
			backgroundColor:opacityColor
			borderRadius:32
			borderWidth:1
			borderColor:tb_Black_50
		@loadingCircle = new Circle
			parent:@
			topColor: "#3DC8F5"
			circleSize: 64
			strokeWidth: 4
			bottomColor: "#3DA8F5"
			hasCounter: true
			hasLinearEasing: true
			counterColor: tb_Black_100
			x:240
			y:28
			counterFontSize: 14
			counterWeight: 0
			dropShadow: "drop-shadow(-1px 0px 3px rgba(61,168,245,0.4))"
			hasPercentage: true
		@loadingCircle.changeTo(60,1.8)

class StartButton extends TextLayer
	constructor:(@options={}) ->
		@options.height ?= 40
		@options.backgroundColor ?= opacityColor
		@options.fontSize = 14
		@options.color ?= tb_Black_100
		@options.fontWeight ?= 600
		@options.lineHeight = @options.height/@options.fontSize
		@options.padding ?= {left:20,right:20}
		super @options
		@bg = new CardBg
			borderRadius:20
			x:@x
			y:@y
		@bg.index = 2
		@bg.width = @width
		@bg.height = @height
		@bg.states.default =
			backgroundColor:@bg.backgroundColor
			animationOptions:defaultAnimation
		@bg.states.hover =
			backgroundColor:tb_Blue
			animationOptions:defaultAnimation
		@states.default =
			color:@color
			animationOptions:defaultAnimation
		@states.hover =
			color:tb_Black_20
			animationOptions:defaultAnimation
		@onMouseOver ->
			@bg.animate("hover")
			@animate("hover")
			cursorPointer()
		@onMouseOut ->
			@bg.animate("default")
			@animate("default")
			cursorAuto()
			
		

			
nav = new Navigation

trail = new Trail
	width:800
	y: nav.maxY
	midX:Screen.midX
	trails:["首页","目标管理"]
	
rightTools = new RightTopTools	
	width:800
	y: nav.maxY
	midX:Screen.midX
	

start = new StartButton
	text:"开始创建目标"
	y:200
start.midX = Screen.midX
start.bg.x = start.x
line = new Layer
	width: 1382/2
	height: 162/2
	midX:start.midX
	y:start.maxY
	image: "images/line.png"
	


mapCard1 = new MapCard
	midX: Screen.midX - 340
	y:line.maxY
	cardNumber:3
mapCard2 = new MapCard
	midX: Screen.midX
	y:line.maxY
	cardNumber:1
mapCard3 = new MapCard
	midX: Screen.midX + 340
	y:line.maxY
	cardNumber:1
line2 = new Layer
	width: 1382/2
	height: 162/2
	index:1
	midX:start.midX
	y:mapCard1.maxY - 44
	image: "images/line.png"
mapCard1 = new MapCard
	midX: Screen.midX - 340
	y:line2.maxY
	cardNumber:1
mapCard2 = new MapCard
	midX: Screen.midX
	y:line2.maxY
	cardNumber:1
mapCard3 = new MapCard
	midX: Screen.midX + 340
	y:line2.maxY
	cardNumber:1
