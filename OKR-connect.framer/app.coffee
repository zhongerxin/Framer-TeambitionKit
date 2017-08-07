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

{TextLayerModule} = require 'TextLayer'

{Icon,menu,plus_bold,arrow_left,map_okr,setting,plus_fill,plus_border,date_default,arrow_down} = require "iconModule"
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
#关联专用 Class ---------------------------------------------
class AddConnect extends Layer
	constructor: (@options={}) ->
		@options.width ?= 800
		@options.height ?= 60
		@options.backgroundColor ?= opacityColor
		@Button = new IconLinkButton
			name:"button"
			text:"添加关联链接"
			linkColor:tb_Blue
			icon:plus_border
			x:16
		@Button.states.default =
			linkColor:@Button.linkColor
			animationOptions:defaultAnimation
		@Button.states.hover =
			linkColor:tb_Blue_60
			animationOptions:defaultAnimation
		@Button.onMouseOver ->
			cursorPointer()
			@animate("hover")
		@Button.onMouseOut ->
			cursorAuto()
			@animate("default")
		super @options
		@Button.parent = @
		@Button.midY = @options.height/2
		
class InputUrl extends Layer
	constructor: (@options={}) ->
		@options.width ?= 800
		@options.height ?= 94
		@options.backgroundColor ?= opacityColor
		@confirm = new Button
			width:68
			height:32
			text:"保存"
		@cancel = new WordLinkButton
			text:"取消"
		@url = new TextLayerModule
			text:"在此粘贴关联项目或任务的链接"
			fontSize: 14
			lineHeight: 20/14
			color:tb_Black_70
			x: 16
			y: 10
			contentEditable:true
			width:612
			height:20
		@url.onClick ->
			@color = tb_Black_100
			if @text == "在此粘贴关联项目或任务的链接"
				@text = ""
		super @options
		@confirm.props = 
			parent:@
			maxX: @options.width - 16
			maxY: @options.height - 16
		@cancel.props = 
			parent:@
			midY:@confirm.midY
			maxX:@confirm.x - 20
		@url.props = 
			parent:@
		@confirm.onClick ->
			print @parent.url.text
class ConnectCell extends Layer
	constructor: (@options={}) ->
		@options.width ?= 768
		@options.height ?= 60
		@options.image ?= "images/cell_task_finish.png"
		@options.backgroundColor ?= opacityColor
		@arrow = new Icon
			icon: arrow_down
			rotation:90
			color:tb_Black_90
		super @options
		@arrow.props = 
			parent:@
			midY:@options.height/2
			maxX:@options.width
		@arrow.states.default = 
			color:@arrow.color
			animationOptions:defaultAnimation
		@arrow.states.hover = 
			color:tb_Blue
			animationOptions:defaultAnimation
		@arrow.onMouseOver ->
			cursorPointer()
			@animate("hover")
		@arrow.onMouseOut ->
			cursorAuto()
			@animate("default")
class ConnectCellStack extends Layer
	constructor: (@options={}) ->
		@options.cells ?= []
		@options.height ?= @options.cells.length * 60 + 1
		@options.width ?= 768
		@options.backgroundColor ?= opacityColor
		super @options
	@define "cells",
		get: -> @options.cells
		set: (value) ->
			for cellImage,id in @options.cells
				connectCell = new ConnectCell
					parent:@
					y: id*60
					image:cellImage
			
#clss -------------------
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
ParentObject.props = 
	y:trail.maxY - 4
	midX: Screen.midX

detailBg = new Layer
	width: 800
	height: 298
	midX: Screen.midX
	y: ParentObject.maxY
	backgroundColor: tb_Black_20
	borderRadius: 4
	borderWidth: 1
	borderColor: tb_Black_50
	shadowBlur: 3
	shadowSpread: 0
	shadowColor: "rgba(0,0,0,0.04)"

detailHeader.props =
	parent:detailBg
	x:0
	y:12
	
array = ["images/cell_task_finish.png","images/cell_task_todo.png","images/cell_proj.png","images/cell_url_noname.png","images/cell_url_name.png"]
cells = new ConnectCellStack
	cells:[]
	parent:detailBg
	midX: detailBg.width/2
	y:detailHeader.maxY

addConnect = new AddConnect
	parent:detailBg
	x:0
	y:cells.maxY

inputUrl = new InputUrl
	parent:detailBg
	x:0
	y:cells.maxY
	visible: false
	opacity:0

childObject.props = 
	y: detailBg.maxY
	midX:Screen.midX
	
addConnect.Button.onClick ->
	@opacity = 0
	inputUrl.visible = true
	inputUrl.opacity = 1
	