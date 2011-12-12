window.sketch = (p5) ->
  p5.setup = ->
    p5.colorMode p5.HSB, 300, 10, 10, 10
    p5.size(window.innerWidth, window.innerHeight)
    p5.noStroke()
    p5.smooth()
    @mouseUp = true
    @oneSelected = false
    @balls = []
    @friction = 0.999
    @balls.push new window.Ball(p5,@) for count in [0..5]
    @xgravity = 0
    @ygravity = 0.1

  p5.draw = ->  
    p5.fill 0, 0, 0, 1
    p5.rect 0, 0, p5.width, p5.height
    ball.draw() for ball in @balls

$ ->
  canvas = $("canvas")
  window.processing = new Processing canvas[0], window.sketch
  $(window).resize ->
    $("canvas").css {
      height : $(window).height()
      width : $(window).width()
    }
    processing.size $(window).width(), $(window).height() 
  $(window).bind "deviceorientation", window.deviceOrientationHandler
  $('canvas').bind 'touchmove', window.blockIosScroll
  $(body).bind "orientationchange", window.blockRotation
  $(body).bind "keypress", window.keyPressHandler

window.deviceOrientationHandler = (event)->
  window.processing.xgravity = - event.originalEvent.beta / 40
  window.processing.ygravity = event.originalEvent.gamma / 40

window.blockIosScroll = (e)-> e.preventDefault()

window.blockRotation = (event)-> console.log window.orientation

window.keyPressHandler = (event)->
  