defaultAnimation =
	time: 0.2
	curve: Bezier.easeInOut
opacityColor = new Color("#ffffff").alpha(.0)
cursorAuto = ->
	document.body.style.cursor = "auto"
cursorPointer = ->
	document.body.style.cursor = "pointer"

class CardBg extends Layer
	constructor: (@options={}) ->
		@options.borderRadius = 4
		@options.backgroundColor ?= "#ffffff"
		@options.shadowY ?= 2
		@options.shadowColor ?= "rgba(0,0,0,0.05)"
		@options.shadowBlur ?= 3
		super @options		
class Tag extends TextLayer
	constructor: (@options={}) ->
		@options.text ?= "标签"
		@options.fontSize = 14
		@options.lineHeight = 20/14
		@options.color ?= "#ffffff"
		@options.borderRadius = 4
		@options.backgroundColor ?= "#383838"
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
			width:8
			height:8
			backgroundColor: "#383838"
			rotation: 45
		super @options
		@arrow.parent = @
		@arrow.midX = @width/2
		@arrow.midY = @height
				
class CardStack extends Layer
	constructor: (options) ->
		super _.defaults options,
			backgroundColor : opacityColor
			width : 370
			height : 197
			tagLabel:""
		@init()
	refresh: ->
		for i in [0...3]
			@cards[i].width =  @width - i*8
		@tag.x =   @width/2 - 51
		@tag.tag_label.text = @tagLabel
	init: ->
		@cards = []
		for i in [0...3]
			@card_cover = new CardBg
				width: @width - i*8
				height: 120
				index: 3 - i
				midX:@.width/2
				y: i*3
				parent: @
			@card_cover.states.default = 
				y:@card_cover.y
				animationOptions: defaultAnimation
			@card_cover.states.stretch = 
				y:@card_cover.y + 3*(i+1)
				animationOptions: defaultAnimation
			@cards.push(@card_cover)
		
		@mask = new Layer
			parent:@cards[0]
			backgroundColor: "#3DA5F8"
			height: 120
			style: {"borderRadius": "3px 0 0 3px"}
			width:0
		@mask.states.default = 
			width:@mask.width
			animationOptions:defaultAnimation
		@mask.states.stretch = 
			width:@mask.width + 8
			animationOptions:defaultAnimation

		@tag = new Tag
			parent:@
			x: @width/2 - 51
			y: @cards[0].height + 16
			opacity:0
				
		@tag.states.default = 
			y: @tag.y
			opacity:@tag.opacity
			animationOptions:defaultAnimation
		@tag.states.stretch = 
			y: @tag.y + 3*@cards.length
			opacity:1
			animationOptions:defaultAnimation
			
		@on "mouseenter", ->
			cursorPointer()
			@mask.animate("stretch")
			@tag.animate("stretch")
			for i in @cards
				i.animate("stretch")
		@on "mouseleave", ->
			cursorAuto()
			@mask.animate("default")
			@tag.animate("default")
			for i in @cards
				i.animate("default")
exports.CardStack = CardStack
exports.CardBg = CardBg