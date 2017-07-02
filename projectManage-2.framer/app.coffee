#屏幕基础设定
Framer.Device.customize
	deviceType: "fullscreen"
	screenWidth: 1440
	screenHeight: 900
	devicePixelRatio: 1
Framer.Device.deviceType = "fullscreen"

document.body.style.cursor = "auto"

#ICON设定
menu.image = ""
menu.html = '<?xml version="1.0" encoding="UTF-8"?>
<svg width="28px" height="18px" viewBox="0 0 28 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 44.1 (41455) - http://www.bohemiancoding.com/sketch -->
    <title>icon</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <polygon id="path-1" points="0 20 20 20 20 0 0 0"></polygon>
    </defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="cell/header" transform="translate(-85.000000, -27.000000)">
            <g id="Group-2">
                <g>
                    <g id="icon" transform="translate(90.000000, 30.000000) scale(-1, 1) rotate(-270.000000) translate(-90.000000, -30.000000) translate(80.000000, 20.000000)">
                        <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"></use>
                        </mask>
                        <g id="boxIcon"></g>
                        <path d="M7.4926,14.5906 C7.2576,14.3576 7.2576,13.9776 7.4926,13.7436 L11.2346,9.9996 L7.4926,6.2576 C7.2576,6.0236 7.2576,5.6436 7.4926,5.4096 C7.7266,5.1746 8.1066,5.1746 8.3406,5.4096 L12.5076,9.5756 C12.7416,9.8096 12.7416,10.1896 12.5076,10.4246 L8.3406,14.5906 C8.2236,14.7076 8.0696,14.7666 7.9166,14.7666 C7.7636,14.7666 7.6096,14.7076 7.4926,14.5906 Z" id="fill" fill="#A6A6A6" mask="url(#mask-2)"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>'

menu.html = menu.html.replace("#A6A6A6","#3dA8f5")
defaultAnimation = 
	time: 0.2
	curve: Bezier.easeInOut	

#处理 hover 逻辑
cell.states.hover =
	backgroundColor: "#F5F5F5"
	animationOptions: defaultAnimation
cell.states.default = 
	backgroundColor: "#ffffff"
	animationOptions: defaultAnimation

iconShows = [sort,filter]
iconHighlights = [filte_main,up,down]

for i in [0...2]
	iconShows[i].states.show =
		opacity:1
		animationOptions:defaultAnimation
	iconShows[i].states.hide =
		opacity:0
		animationOptions:defaultAnimation
	iconShows[i].onMouseOver ->
		document.body.style.cursor = "pointer"
	iconShows[i].onMouseOut ->
		document.body.style.cursor = "auto"

sort.onMouseOver ->
	sort.backgroundColor = "#e5e5e5"
filter.onMouseOver ->
	filter.backgroundColor = "#e5e5e5"
	
sort.onMouseOut ->
	sort.backgroundColor = ""
filter.onMouseOut ->
	filter.backgroundColor = ""

cell.onMouseOver ->
	cell.animate("hover")
	for i in iconShows
		i.animate("show")

bg.onMouseOver ->
	document.body.style.cursor = "auto"
	if drop_down.opacity < 1
		cell.animate("default")
		for i in iconShows
			if i.name != "show"
				i.animate("hide")

bg.onClick ->
	drop_down.animate("hide")
	cell.animate("default")
	for i in iconShows
		i.animate("hide")

#处理 icon 点击

for i in [0...3]
	iconHighlights[i].states.normal =
		html: iconHighlights[i].html
		animationOptions:defaultAnimation
	iconHighlights[i].states.highlight =
		html: iconHighlights[i].html.replace("<svg","<svg fill='#3DA8F5'")
		animationOptions:defaultAnimation

times = 0
sort.onClick ->
	if times == 0
		up.animate("highlight")
		down.animate("normal")
		sort.name = "show"
	if times == 1
		up.animate("normal")
		down.animate("highlight")
		sort.name = "show"
	if times == 2
		up.animate("normal")
		down.animate("normal")
		sort.name = "hide"
	times += 1
	if times == 3
		times = 0

drop_down.states.show = 
	opacity: 1
	y: drop_down.y + 20
	animationOptions:defaultAnimation
drop_down.states.hide = 
	opacity: 0
	y: drop_down.y
	animationOptions:defaultAnimation
	
filter.onClick ->
	drop_down.stateCycle("show","hide")

#dropdown
confirm_1.onMouseOver ->
	if drop_down.opacity == 1
		document.body.style.cursor = "pointer"
confirm_1.onMouseOut ->
	document.body.style.cursor = "auto"
reset.onMouseOver ->
	if drop_down.opacity == 1
		document.body.style.cursor = "pointer"
reset.onMouseOut ->
	document.body.style.cursor = "auto"

confirm_1.onClick ->
	drop_down.animate("hide")
	cell.animate("default")
	filte_main.animate("highlight")
	filter.name = "show"
reset.onClick ->
	drop_down.animate("hide")
	cell.animate("default")
	filte_main.animate("normal")
	filter.name = "hide"
