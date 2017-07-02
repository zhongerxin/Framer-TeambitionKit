defaultAnimation =
	time: 0.2
	curve: Bezier.easeInOut
opacityColor = new Color("#ffffff").alpha(.0)
cursorAuto = ->
	document.body.style.cursor = "auto"
cursorPointer = ->
	document.body.style.cursor = "pointer"

class Card extends Layer
	constructor: (options) ->
		super _.defaults options,
			borderRadius : 3
			backgroundColor : "#ffffff"
			shadowSpread : 0
			shadowY : 2
			shadowColor : "rgba(0,0,0,0.05)"
			shadowBlur : 3		
class Tag extends Layer
	constructor: (options) ->
		super _.defaults options,
			width : 103
			height : 36
			borderRadius : 4
			backgroundColor : "#ffffff"
			shadowSpread : 0
			shadowY : 2
			shadowColor : "rgba(0,0,0,0.05)"
			shadowBlur : 3
		
		@arrow = new Layer
			parent: @
			width:12
			height:12
			backgroundColor: "#ffffff"
			rotation: 45
			y: -6
			midX: @.width/2
		
		@tag_label = new TextLayer
			text: "创建子目标"
			parent:@
			fontSize: 14
			textAlign:"center"
			color: "#808080"
			width: 80
			height: 17
			midX: @.width/2
			midY: @.height/2 
		@tag_label.states.default = 
			color: "#808080"
			animationOptions: defaultAnimation
		@tag_label.states.highlight = 
			color: "#3da8f5"
			animationOptions:
				time: 0.2
				curve: Bezier.easeInOut
		@tag_label.onMouseOver ->
			cursorPointer()
			@animate("highlight")
		@tag_label.onMouseOut ->
			cursorAuto()
			@animate("default")		
			
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
			@card_cover = new Card
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
exports.Card = Card