
class App
  constructor: ->
    @setupVars()
    @bindEvents()
    @draw()
  setupVars: ->
    @canvas = document.getElementsByTagName("canvas")[0]
    @ctx = @canvas.getContext '2d'
    @addCircle()
    @mouseUp = true
    @oneSelected = false
    @balls = []
    @friction = 0.999
    @bounceModifier = 0.7
    @resize()
    @balls.push new window.Ball(@) for count in [0..15]
    @xgravity = 0
    @ygravity = 0.1
  bindEvents: ->
    window.addEventListener 'resize', @resize, false
    window.addEventListener 'deviceorientation', @deviceorientation, false
    @canvas.addEventListener 'touchmove', @touchmove, false
    document.body.addEventListener "orientationchange", @orientationchange, false
  resize: =>
    @width = window.innerWidth
    @height = window.innerHeight
    
    @canvas.style.height = "#{@height}px"
    @canvas.style.width = "#{@width}px"

    @canvas.width = @width
    @canvas.height = @height

  deviceorientation: (event)=>
    @xgravity = - event.beta / 40
    @ygravity = event.gamma / 40
  
  addCircle: ->
    @ctx.fillCircle = (x,y,r)->
      @beginPath()
      @arc x, y, r, 0, Math.PI * 2, false
      @closePath()
      @fill()

  dist: (x1, y1, x2, y2)->
    xs = x2 - x1
    xs = xs * xs
    ys = y2 - y1
    ys = ys * ys
    Math.sqrt xs + ys

  touchmove: (e)-> e.preventDefault()
  
  orientationchange: (event)-> console.log window.orientation
  random: (int)-> Math.random() * int
  draw: =>  
    @ctx.fillStyle = 'black'
    @ctx.fillRect 0, 0, @width, @height
    ball.draw() for ball in @balls
    setTimeout @draw, 50

window.addEventListener 'load', ->
  window.app = new App
, false


  