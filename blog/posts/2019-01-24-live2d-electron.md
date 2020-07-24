---
title: "Live2D in Electron – live2d-widget.js"
date: 2019-01-24
image: /images/live2d/live2d-widget.png
tag: 
  - Electron
---

## Introduction

As part of Animius, I am currently working on an electron application, which has Live2D as a key feature. After digging around Github, I found [xiazeyu/live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js), a JavaScript implementation of Live2D.

This tutorial was originally intended for Electron. However, I soon found that it applies to all platforms, not just Electron. Thus, feel free to continue even if you’re using something else. Everything should apply as long as it is HTML-JS based.

## Getting Started

Importing Live2d-Widget.js is easy. Simply download the JavaScript files and then place them in your electron project folder. Then, import Live2d-Widget in your html file.

``` html
<script src="L2Dwidget.min.js"></script>
```

Next, create a canvas for your Live2D figure.

``` html
<div id="live2d-widget">
    <canvas id="live2dcanvas" width="300" height="600"></canvas>
</div>
```

Finally, initialize the widget and enjoy seeing your character come to life!

``` js
L2Dwidget.init()
// put this in your javascript file
```

![Live2D in Electron](/images/live2d/live2d-widget.png)

## Configuration

Despite all the goodness in Live2d-Widget.js, it has a convoluted [documentation](https://l2dwidget.js.org/docs/index.html). Many of its links are outdated (404 errors on entirely different sites). Anyways, I found a huge table of init() arguments (some of which are not even used) that's kind of helpful.

| Name                            | Type   | Default value   | Description                                                                |
|---------------------------------|--------|-----------------|----------------------------------------------------------------------------|
| userConfig.model.jsonPath       | String | ”               | Path to your Live2D model’s json file (often *.model.json)                 |
| userConfig.model.scale          | Number | 1               | Scale of the model relative to the canvas                                  |
| userConfig.display.width        | Number | 150             | Basically the width of the canvas                                          |
| userConfig.display.height       | Number | 300             | Basically the height of the canvas                                         |
| userConfig.display.position     | String | ‘right’         | The horizontal anchor of the model on the canvas. Can be ‘left’ or ‘right’ |
| userConfig.display.hOffset      | Number | 0               | Horizontal offset                                                          |
| userConfig.display.vOffset      | Number | -20             | Vertical offset                                                            |
| userConfig.name.canvas          | String | ‘live2dcanvas’  | The id of the HTML canvas to show the model in                             |
| userConfig.name.div             | String | ‘live2d-widget’ | The id of the div that the canvas is in.                                   |
| userConfig.react.opacityDefault | Number | 0.7             | Opacity                                                                    |
| userConfig.react.opacityOnHover | Number | 0.2             | Opacity on mouse hover                                                     |

First of all, let’s use our own Live2D model. This is defined by `userConfig.model.jsonPath`. To define this, we pass a userConfig object (aka dictionary for the python users) with model.jsonPath set.

``` js
L2Dwidget.init({
    model: {jsonPath: 'assets/myModel/myModel.model.json'}
})
```

Furthermore, the default opacity is really annoying. Since the widget is originally made for websites, the default values are understandable. However, when using Live2D in Electron, they are unwanted. Let us remove that by changing userConfig.react.opacityDefault and userConfig.react.opacityOnHover.

``` js
L2Dwidget.init({
    model: {jsonPath: 'assets/myModel/myModel.model.json'},
    react: {opacityDefault: 1, opacityOnHover: 0.2}
})
```

And there you have it! You’ve used Live2D in Electron. Nevertheless, there are still much more configuration to tune. Live2d-Widget.js’s nature of web-oriented design removes a lot of desirable possibilities, such as playing certain animations instead of randomly cycling through them.

To solve these issues, I’ve been digging around the source code and changing some core behaviors. You can see the changes at [gundamMC/live2d-widget.js](https://github.com/gundamMC/live2d-widget.js).
