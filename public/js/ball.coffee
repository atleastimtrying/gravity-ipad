class window.Ball

  constructor: (@p5, @app) ->
    @x = @p5.random(@p5.width - 200) + 100
    @y = @p5.random(@p5.height - 200) + 100
    @radius = p5.random(20) + 20
    @xacc = @p5.random(2) - 1
    @yacc = @p5.random(2) - 1
    @hue = @p5.random 300
    @snapMouse = false

  draw: ->
    if @snapMouse 
      @x = @p5.mouseX
      @y = @p5.mouseY
    @p5.fill @hue, 10, 8
    @p5.ellipse @x, @y, @radius * 2, @radius * 2
    @friction()
    @hitTest()
    @movement()

  movement: ->
    @x += @xacc
    @y += @yacc
    @edges()

  friction: ->
    #modifier = (20 - @radius) * 0.01
    @xacc *= @app.friction #- modifier
    @yacc *= @app.friction #- modifier
    @xacc += @app.xgravity
    @yacc += @app.ygravity

  edges: ->
    if @y > @p5.height - @radius
      @y = @p5.height - @radius
      @yacc *= -1

    if @y < @radius
      @y = @radius
      @yacc *= -1

    if @x >= @p5.width - @radius
      @x = @p5.width - @radius
      @xacc *= -1

    if @x < @radius
      @x = @radius
      @xacc *= -1

  hitTest: ->
    @intersect(ball) for ball in @app.balls
        
  setAcc:(xacc, yacc)->
    @xacc = xacc
    @yacc = yacc
  
  pressed: =>
    if @p5.dist(@p5.mouseX, @p5.mouseY, @x, @y) < @radius and !@app.oneSelected
      @snapMouse = true
      @app.oneSelected = true
  
  released: ->
    if @snapMouse 
      @setAcc( @p5.mouseX - @p5.pmouseX, @p5.mouseY - @p5.pmouseY)
      @snapMouse = false

  testforself: (ball)->
    ball.x isnt @x and ball.y isnt @y

  intersect: (ball)->
    distance = @p5.dist @x, @y, ball.x, ball.y
    if distance < ball.radius + @radius and @testforself(ball)
      @x = ball.x + (@x - ball.x) * (ball.radius + @radius)/distance
      @y = ball.y + (@y - ball.y) * (ball.radius + @radius)/distance
      
      theta = @p5.atan2(ball.y - @y, ball.x - @x)
      App1 = -(ball.xacc * @p5.cos(theta) + ball.yacc * @p5.sin theta)
      Across1 = ball.yacc * @p5.cos(theta) - ball.xacc * @p5.sin theta
      App2 = @xacc * @p5.cos(theta) + @yacc * @p5.sin theta
      Across2 = @yacc * @p5.cos(theta) - @xacc * @p5.sin theta

      #After collision:
      Depart1 = App2 #(if both balls same mass)
      # Across1(after) = Across1 (before).
      Depart2 = App1 #(if both balls same mass)
      # Across2(after) = Across2 (before).

      # reduce bouncing
      Depart1 *= 0.8
      Depart2 *= 0.8
      Across1 *= 0.8
      Across2 *= 0.8

      #After collision
      ball.xacc = Depart1 * @p5.cos(theta) - Across1 * @p5.sin theta
      ball.yacc = Depart1 * @p5.sin(theta) + Across1 * @p5.cos theta

      @xacc =  -(Across2 * @p5.sin(theta)  + Depart2 * @p5.cos(theta) )
      @yacc =   Across2 * @p5.cos(theta)  - Depart2 * @p5.sin theta
