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

{Icon,menu,plus_bold,arrow_left,map_okr,setting,plus_fill,plus_border,date_default,arrow_down,star_fill} = require "iconModule"
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
		@avatar_selfNormal = new Layer
			name:"right"
			height:48
			width:658/2
			image: "images/rightPart.png"
			midY:@options.height/2
			maxX:@options.width - 16
		@appIcon = new AppIcon
			name:"appIcon"
			midY:@options.height/2
			maxX:@options.width - 16 - 128
		super @options
		@background.parent = @
		@icon_workSpaceMenu.parent = @
		@button_add.parent = @
		@label_workSpaceTitle.parent = @
		@input_searchBar.parent = @
		@avatar_selfNormal.parent = @
		@appIcon.parent = @

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

#function show hide
hideAndShow = (layer) ->
	layer.states.show = 
		opacity:1
		animationOptions:defaultAnimation
	layer.states.hide = 
		opacity:0
		animationOptions:defaultAnimation

#此次专用 Class ---------------------------------------------
class AppIcon extends Layer
	constructor:(@options={}) ->
		@options.height = 48
		@options.width = 40
		@options.image ?= "images/app_icon_black.png"
		@droPdown = new AppDropDown
			midX: @options.width/2
			y: 20
		super @options
		@droPdown.parent = @
		@states.default = 
			image:@image
			animationOptions:defaultAnimation
		@states.hover = 
			image:"images/app_icon_blue.png"
			animationOptions:defaultAnimation
		@onMouseOver ->
			cursorPointer()
			@animate("hover")
		@onMouseOut ->
			cursorAuto()
			@animate("default")
		@onClick ->
			@droPdown.stateCycle("click", "default")
class AppDropDown extends Layer
	constructor:(@options={}) ->
		@options.width = 644/2
		@options.height = 980/2
		@options.opacity ?= 0
		@options.image ?= "images/drop-down.png"
		super @options
		@states.default = 
			opacity:0
			y:@y
			animationOptions:defaultAnimation
		@states.click = 
			opacity:1
			y:@y + 24
			animationOptions:defaultAnimation

class SectionCell extends TextLayer
	constructor:(@options={}) ->
		@options.width = 208
		@options.height = 32
		@options.backgroundColor ?= opacityColor
		@options.borderRadius = 4
		@options.text ?= "Section"
		@options.fontSize = 14
		@options.lineHeight = 32/14
		@options.padding = {left:6}
		@options.color ?= tb_Black_90
		@options.pin ?= false
		super @options
		@states.default = 
			backgroundColor:@backgroundColor
			animationOptions:defaultAnimation
		@states.hover = 
			backgroundColor:tb_Black_20
# 			color:tb_Black_100
			animationOptions:defaultAnimation
		@onMouseOver ->
			cursorPointer()
			@animate("hover")
		@onMouseOut ->
			cursorAuto()
			if @options.pin == false
				@animate("default")

class SectionList extends Layer
	constructor:(@options={}) ->
		@options.width ?= 208
		@options.backgroundColor = opacityColor
		@options.sections ?= ["Section1","Section2","Section3"]
		@options.height ?= @options.sections.length * (32+4)
		@sectionLayers = []
		@title = new TextLayer
			fontSize:16
			text:"分类"
			lineHeight:24/16
			height:24
			color:tb_Black_100
			fontWeight:500
		super @options
		@title.parent = @
	@define "sections",
		get: -> @options.sections
		set: (value) ->
			for section,id in value
				@cell = new SectionCell
					text:section
					y: id*(32+4) + 40
					parent:@
				@sectionLayers.push(@cell)
			for section,id in @sectionLayers
				section.onClick ->
					@options.pin = true
					for layer in @parent.sectionLayers
						if @ != layer
							layer.options.pin = false
							layer.animate("default")

class ProjectCard extends Layer
	constructor:(@options={}) ->
		@options.width ?= 272
		@options.height ?= 200
		@options.borderWidth = 1
		@options.borderRadius = 4
		@options.borderColor = tb_Black_50
		@options.backgroundColor ?= tb_Black_20
		@options.shadowColor = "rgba(0,0,0,0.04)"
		@options.shadowBlur = 3
		@options.titleString ?= "Title"
		@options.detaiString ?= "Detail"
		@hoverPrImage = new Layer
			name:"hrImage"
			width:@options.width-24
			height:136
			borderRadius:2
			midX: @options.width/2
			y:12
			image:"images/hoverPrImage/0.png"
		@projectImage = new Layer
			name:"prImage"
			width:@options.width-24
			height:136
			borderRadius:2
			midX: @options.width/2
			y:12
			image:"images/prImage/0.png"
		@title = new TextLayer
			name:"title"
			width: 212
			height: 24
			fontSize:16
			color:tb_Black_100
			lineHeight:24/16
			text:@options.titleString
			x: 12
			maxY: @options.height - 24
		
		@detail = new TextLayer
			name:"detail"
			width: 212
			height: 18
			fontSize:12
			color:tb_Black_80
			lineHeight:18/12
			text:@options.detaiString
			x: 12
			maxY: @options.height - 6
		@star = new Icon
			name:"default"
			icon:star_fill
			color:tb_Black_80
			maxX:@options.width-12
			maxY:@options.height - 16
			opacity:0
		@setting = new Icon
			name:"setting"
			icon:setting
			color:tb_Black_80
			maxX:@options.width - 40
			maxY:@options.height - 16
			opacity:0
		@tag = new Layer
			name:"tag"
			image:"images/companyTag.png"
			width: 168/2
			height:48/2
			x: 12
			maxY:@options.height - 14
			opacity:0
		super @options
		@hoverPrImage.parent = @
		@projectImage.parent = @
		@title.parent = @
		@detail.parent = @
		@star.parent = @
		@setting.parent = @
		@tag.parent = @
		@star.states.show = 
			opacity:1
			animationOptions:defaultAnimation
		@star.states.hide = 
			opacity:@star.opacity
			animationOptions:defaultAnimation
		@star.states.default =
			color:@star.color
			animationOptions:defaultAnimation
		@star.states.hover = 
			color:tb_Black_90
			animationOptions:defaultAnimation
		@star.states.click = 
			color:"#FFAF38"
			animationOptions:defaultAnimation
		@star.onMouseOver ->
			if @name == "default"
				cursorPointer()
				@animate("hover")
		@star.onMouseOut ->
			if @name == "default"
				cursorAuto()
				@animate("default")
		@star.onClick ->
			if @name == "active"
				@animate("default")
				@name = "default"
				return
			if @name == "default"
				@animate("click")
				@name = "active"
				return
				
		hideAndShow(@setting)
		hideAndShow(@detail)
		hideAndShow(@title)
		hideAndShow(@projectImage)
		hideAndShow(@tag)
		@on "mouseenter", ->
			cursorPointer()
			@star.animate("show")
			@setting.animate("show")
			@title.animate("hide")
			@detail.animate("hide")
			@projectImage.animate("hide")
			@tag.animate("show")
		@on "mouseleave", ->
			cursorAuto()
			if @star.name == "default"
				@star.animate("hide")
			@setting.animate("hide")
			@title.animate("show")
			@detail.animate("show")
			@projectImage.animate("show")
			@tag.animate("hide")
	@define "detaiString",
		get: -> @options.detaiString
		set: (value) ->
			@detail.text = value
			if value == ""
				@title.maxY = @options.height - 14
class ProjectSection extends Layer
	constructor:(@options={}) ->
		@options.width ?= 872
		@options.height ?= 696
		@options.backgroundColor = opacityColor
		@sectionTitle = new TextLayer
			fontSize:16
			text:"Section1"
			lineHeight:24/16
			height:24
			color:tb_Black_100
			fontWeight:500
		@cards = []
		for i in [0...10]
			if i < 4 
				card = new ProjectCard
					x:i*300
					y:40
					detaiString:"商业项目增殖服务说明"
					titleString:"商业闭环团队"
				card.hoverPrImage.image = "images/hoverPrImage/#{i}.png"
				card.projectImage.image = "images/prImage/#{i}.png"
				@cards.push(card)
			if 3 < i < 7 
				card = new ProjectCard
					x:(i-4)*300
					y:268
					detaiString:"商业项目增殖服务说明"
					titleString:"商业闭环团队"
				card.hoverPrImage.image = "images/hoverPrImage/#{3}.png"
				card.projectImage.image = "images/prImage/#{i}.png"
				@cards.push(card)
			if 6 < i < 10 
				card = new ProjectCard
					x:(i-7)*300
					y:496
					detaiString:"商业项目增殖服务说明"
					titleString:"商业闭环团队"
				card.hoverPrImage.image = "images/hoverPrImage/#{4}.png"
				card.projectImage.image = "images/prImage/#{i}.png"
				@cards.push(card)
		super @options
		@sectionTitle.parent = @
		for i in @cards
			i.parent = @

class ProjectList extends Layer
	constructor:(@options={}) ->
		@options.width ?= 872
		@options.sections ?= ["星标项目"]
		@options.height ?= (@options.sections.length) * (696+32)
		@options.backgroundColor ?= opacityColor
		super @options
	@define "sections",
		get: -> @options.sections
		set: (value) ->
			for section,id in value
				section = new ProjectSection
					parent:@
					y: id * (696+32)
				section.sectionTitle.text = @options.sections[id]
					
#clss -------------------
main = new Layer
	height: Screen.height - 48 
	width: 1100
	midX: Screen.midX
	y: 48
	backgroundColor: opacityColor
left = new SectionList
	y: 40
	sections:["星标项目","Analysis","Company","Customer Success","Product & Engineering","Marketing"]
	parent:main
for section,id in left.children
	if id == 0
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: 0
					true
					curve: Bezier.ease, time: 0.5
				)
	if id == 1
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: (696+32)
					true
					curve: Bezier.ease, time: 0.5
				)
	if id == 2
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: 2*(696+32)
					true
					curve: Bezier.ease, time: 0.5
				)
	if id == 3
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: 3*(696+32)
					true
					curve: Bezier.ease, time: 0.5
				)
	if id == 4
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: 4*(696+32)
					true
					curve: Bezier.ease, time: 0.5
				)
	if id == 5
		section.onClick ->
			scroll.scrollToPoint(
					x:0, y: 5*(696+32)
					true
					curve: Bezier.ease, time: 0.5
				)
scroll = new ScrollComponent
	width: 872
	height: Screen.height - 48
	y: 0
	x: 228
	backgroundColor: opacityColor
	parent: main
scroll.scrollHorizontal = false
scroll.contentInset =
    top: 40
    right: 0
    bottom: 40
    left: 0
scroll.mouseWheelEnabled = true
project = new ProjectList
	parent:scroll.content
	sections:left.sections


nav = new Navigation


