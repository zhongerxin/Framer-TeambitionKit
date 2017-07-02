(function(scope) {var __layer_0__ = new Layer({"height":900,"name":"Screen","constraintValues":{"height":900,"heightFactor":1,"width":1440,"widthFactor":1},"backgroundColor":"rgb(255, 255, 255)","clip":true,"width":1440});var bg = new Layer({"parent":__layer_0__,"height":900,"name":"bg","constraintValues":{"height":900,"centerAnchorX":0.5,"width":1440,"bottom":0,"right":0,"centerAnchorY":0.5},"backgroundColor":"rgb(255, 255, 255)","clip":false,"width":1440});var drop_down = new Layer({"parent":__layer_0__,"name":"drop-down","backgroundColor":"rgba(255, 255, 255, 0.5)","shadowBlur":5,"width":266,"x":570,"height":132,"constraintValues":{"left":null,"height":132,"centerAnchorX":0.4881944444444444,"width":266,"top":388,"centerAnchorY":0.5044444444444445},"shadowColor":"rgba(0, 0, 0, 0.05)","opacity":0,"clip":false,"shadowY":2,"y":388});var reset = new Layer({"parent":drop_down,"name":"reset","borderWidth":1,"backgroundColor":null,"width":110,"x":16,"borderColor":"rgb(17, 153, 238)","height":42,"constraintValues":{"left":16,"height":42,"centerAnchorX":0.2669172932330827,"width":110,"bottom":17,"top":null,"centerAnchorY":0.7121212121212122},"borderRadius":4,"clip":false,"y":73});var __layer_1__ = new Layer({"parent":reset,"height":19,"constraintValues":{"left":null,"height":19,"centerAnchorX":0.4956140350877193,"width":33,"top":12,"centerAnchorY":0.5119047619047619},"backgroundColor":null,"width":33,"x":38,"html":"<div style=\"font: normal normal normal 16px\/normal -apple-system, BlinkMacSystemFont;\"><div class=\"DraftEditor-root DraftEditor-alignCenter\"><div class=\"DraftEditor-editorContainer\"><div class=\"public-DraftEditor-content\" contenteditable=\"false\" spellcheck=\"false\" style=\"outline:none;white-space:pre-wrap;word-wrap:break-word;\"><div data-contents=\"true\"><div class=\"\" data-block=\"true\" data-editor=\"e7aro\" data-offset-key=\"8ahkl-0-0\" contenteditable=\"false\"><div style=\"font-size:1px;text-align:center;\"><div data-offset-key=\"8ahkl-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"8ahkl-0-0\" style=\"tab-size:4;font-weight:400;font-family:&#x27;.SFNSText&#x27;, &#x27;SFUIText-Regular&#x27;, &#x27;.SFUIText&#x27;, &#x27;SF UI Text&#x27;, &#x27;Times New Roman&#x27;;-webkit-text-fill-color:rgb(17, 153, 238);font-size:16px;letter-spacing:0px;line-height:1.2;\"><span data-text=\"true\">重置<\/span><\/span><\/div><\/div><\/div><\/div><\/div><\/div><\/div><\/div>","y":12});var confirm_1 = new Layer({"parent":drop_down,"height":42,"name":"confirm","borderRadius":4,"constraintValues":{"left":null,"height":42,"centerAnchorX":0.7368421052631579,"width":110,"bottom":17,"right":15,"top":null,"centerAnchorY":0.7121212121212122},"backgroundColor":"rgb(0, 170, 255)","clip":false,"width":110,"x":141,"y":73});var __layer_2__ = new Layer({"parent":confirm_1,"height":19,"constraintValues":{"left":null,"height":19,"centerAnchorX":0.4956140350877193,"width":33,"top":12,"centerAnchorY":0.5119047619047619},"backgroundColor":null,"width":33,"x":38,"html":"<div style=\"font: normal normal normal 16px\/normal -apple-system, BlinkMacSystemFont;\"><div class=\"DraftEditor-root DraftEditor-alignCenter\"><div class=\"DraftEditor-editorContainer\"><div class=\"public-DraftEditor-content\" contenteditable=\"false\" spellcheck=\"false\" style=\"outline:none;white-space:pre-wrap;word-wrap:break-word;\"><div data-contents=\"true\"><div class=\"\" data-block=\"true\" data-editor=\"61hr6\" data-offset-key=\"8ahkl-0-0\" contenteditable=\"false\"><div style=\"font-size:1px;text-align:center;\"><div data-offset-key=\"8ahkl-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"8ahkl-0-0\" style=\"tab-size:4;font-weight:400;font-family:&#x27;.SFNSText&#x27;, &#x27;SFUIText-Regular&#x27;, &#x27;.SFUIText&#x27;, &#x27;SF UI Text&#x27;, &#x27;Times New Roman&#x27;;-webkit-text-fill-color:rgb(255, 255, 255);font-size:16px;letter-spacing:0px;line-height:1.2;\"><span data-text=\"true\">筛选<\/span><\/span><\/div><\/div><\/div><\/div><\/div><\/div><\/div><\/div>","y":12});var cell = new Layer({"parent":__layer_0__,"name":"cell","borderWidth":0.5,"backgroundColor":"rgb(255, 255, 255)","width":340,"x":536,"borderColor":"rgb(229, 229, 229)","height":60,"constraintValues":{"left":null,"height":60,"centerAnchorX":0.4902777777777778,"width":340,"top":358,"centerAnchorY":0.4311111111111111},"clip":false,"y":358});var title = new Layer({"parent":cell,"height":22,"name":"title","constraintValues":{"left":12,"height":22,"centerAnchorX":0.1602941176470588,"width":93,"top":null,"centerAnchorY":0.5},"backgroundColor":null,"width":93,"x":12,"html":"<div style=\"font: normal normal normal 16px\/normal -apple-system, BlinkMacSystemFont;\"><div class=\"DraftEditor-root\"><div class=\"DraftEditor-editorContainer\"><div class=\"public-DraftEditor-content\" contenteditable=\"false\" spellcheck=\"false\" style=\"outline:none;white-space:pre-wrap;word-wrap:break-word;\"><div data-contents=\"true\"><div class=\"\" data-block=\"true\" data-editor=\"ep5bi\" data-offset-key=\"8ahkl-0-0\" contenteditable=\"false\"><div style=\"font-size:1px;\"><div data-offset-key=\"8ahkl-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"8ahkl-0-0\" style=\"tab-size:4;font-weight:400;font-family:&#x27;.SFNSText&#x27;, &#x27;SFUIText-Regular&#x27;, &#x27;.SFUIText&#x27;, &#x27;SF UI Text&#x27;, &#x27;Times New Roman&#x27;;-webkit-text-fill-color:rgb(166, 166, 166);font-size:14px;letter-spacing:0px;line-height:1.6000000000000005;\"><span data-text=\"true\"> 项目结束时间 <\/span><\/span><\/div><\/div><\/div><\/div><\/div><\/div><\/div><\/div>","y":19});var sort = new Layer({"parent":cell,"height":32,"name":"sort","borderRadius":4,"constraintValues":{"left":109,"height":32,"centerAnchorX":0.3558823529411765,"width":24,"top":null,"centerAnchorY":0.5},"backgroundColor":"transparent","opacity":0,"width":24,"clip":false,"x":109,"y":14});var down = new Layer({"parent":sort,"name":"down","backgroundColor":null,"width":24,"html":"<?xml version=\"1.0\"?><svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M7 10l5 5 5-5z\"><\/path><\/svg>","style":{"fill":"rgba(166, 166, 166, 1.00)"},"htmlIntrinsicSize":{"height":24,"width":24},"height":24,"constraintValues":{"aspectRatioLocked":true,"height":24,"centerAnchorX":0.5,"width":24,"bottom":0,"right":0,"top":null,"centerAnchorY":0.625},"y":8});var up = new Layer({"parent":sort,"name":"up","backgroundColor":null,"width":24,"html":"<?xml version=\"1.0\"?><svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M7 14l5-5 5 5z\"><\/path><\/svg>","style":{"fill":"rgba(166, 166, 166, 1.00)"},"htmlIntrinsicSize":{"height":24,"width":24},"height":24,"constraintValues":{"height":24,"centerAnchorX":0.5,"width":24,"right":0,"centerAnchorY":0.375,"aspectRatioLocked":true}});var filter = new Layer({"parent":cell,"height":32,"name":"filter","borderRadius":4,"constraintValues":{"left":141,"height":32,"centerAnchorX":0.45,"width":24,"top":null,"centerAnchorY":0.5},"backgroundColor":null,"opacity":0,"width":24,"clip":false,"x":141,"y":14});var filte_main = new Layer({"parent":filter,"name":"filte-main","backgroundColor":null,"width":24,"html":"<?xml version=\"1.0\"?><svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"><\/path><\/svg>","style":{"fill":"rgba(166, 166, 166, 1.00)"},"htmlIntrinsicSize":{"height":24,"width":24},"height":24,"constraintValues":{"aspectRatioLocked":true,"height":24,"centerAnchorX":0.5,"width":24,"right":0,"top":4,"centerAnchorY":0.5},"y":4});var menu = new Layer({"parent":cell,"name":"menu","backgroundColor":null,"width":14,"x":301,"height":14,"constraintValues":{"left":null,"aspectRatioLocked":true,"height":14,"centerAnchorX":0.9058823529411765,"width":14,"right":25,"top":null,"centerAnchorY":0.5},"image":"images\/_vekter\/OY1COm7mjileaQhGwYZ6fZsVeoGbHZQKlZQsTeutvUWGhgzrGU65zzSfu5eFauV7zQcoIIzHpiG8qcrErgTQ.svg","clip":false,"y":23});drop_down.__framerInstanceInfo = {"hash":"#vekter|drop_down","targetName":"drop_down","vekterClass":"RectangleNode"};down.__framerInstanceInfo = {"originalFilename":"arrow_drop_down","hash":"#vekter|down","targetName":"down","vekterClass":"SVGNode"};sort.__framerInstanceInfo = {"hash":"#vekter|sort","targetName":"sort","vekterClass":"RectangleNode"};__layer_2__.__framerInstanceInfo = {"hash":"#vekter|__layer_2__","vekterClass":"TextNode","text":"筛选"};__layer_0__.__framerInstanceInfo = {"hash":"#vekter|__layer_0__","vekterClass":"FrameNode"};cell.__framerInstanceInfo = {"hash":"#vekter|cell","targetName":"cell","vekterClass":"RectangleNode"};confirm_1.__framerInstanceInfo = {"hash":"#vekter|confirm_1","targetName":"confirm_1","vekterClass":"RectangleNode"};menu.__framerInstanceInfo = {"originalFilename":"filter-highlight.svg","hash":"#vekter|menu","targetName":"menu","vekterClass":"ImageNode"};reset.__framerInstanceInfo = {"hash":"#vekter|reset","targetName":"reset","vekterClass":"RectangleNode"};__layer_1__.__framerInstanceInfo = {"hash":"#vekter|__layer_1__","vekterClass":"TextNode","text":"重置"};bg.__framerInstanceInfo = {"hash":"#vekter|bg","targetName":"bg","vekterClass":"RectangleNode"};title.__framerInstanceInfo = {"hash":"#vekter|title","targetName":"title","vekterClass":"TextNode","text":" 项目结束时间 "};filter.__framerInstanceInfo = {"hash":"#vekter|filter","targetName":"filter","vekterClass":"RectangleNode"};up.__framerInstanceInfo = {"originalFilename":"arrow_drop_up","hash":"#vekter|up","targetName":"up","vekterClass":"SVGNode"};filte_main.__framerInstanceInfo = {"originalFilename":"filter_list","hash":"#vekter|filte_main","targetName":"filte_main","vekterClass":"SVGNode"};if (scope["__vekterVariables"]) { scope["__vekterVariables"].map(function(variable) { delete scope[variable] } ) };Object.assign(scope, {bg, drop_down, reset, confirm_1, cell, title, sort, down, up, filter, filte_main, menu});scope["__vekterVariables"] = ["bg", "drop_down", "reset", "confirm_1", "cell", "title", "sort", "down", "up", "filter", "filte_main", "menu"];if (typeof Framer.CurrentContext.layout === 'function') {Framer.CurrentContext.layout()};})(window);