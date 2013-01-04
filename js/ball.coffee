class window.Ball

  constructor: (@app) ->
    @x = @app.random(@app.width - 200) + 100
    @y = @app.random(@app.height - 200) + 100
    @radius = @app.random(20) + 20
    @xacc = @app.random(2) - 1
    @yacc = @app.random(2) - 1

  draw: ->
    @app.ctx.fillStyle = 'white'
    @app.ctx.fillCircle @x, @y, @radius
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
    if @y > @app.height - @radius
      @y = @app.height - @radius
      @yacc *= -1

    if @y < @radius
      @y = @radius
      @yacc *= -1

    if @x >= @app.width - @radius
      @x = @app.width - @radius
      @xacc *= -1

    if @x < @radius
      @x = @radius
      @xacc *= -1

  hitTest: ->
    @intersect(ball) for ball in @app.balls
        
  setAcc:(xacc, yacc)->
    @xacc = xacc
    @yacc = yacc

  testforself: (ball)->
    ball.x isnt @x and ball.y isnt @y

  intersect: (ball)->
    distance = @app.dist @x, @y, ball.x, ball.y
    if distance < ball.radius + @radius and @testforself(ball)
      @x = ball.x + (@x - ball.x) * (ball.radius + @radius)/distance
      @y = ball.y + (@y - ball.y) * (ball.radius + @radius)/distance
      
      theta = Math.atan2(ball.y - @y, ball.x - @x)
      App1 = -(ball.xacc * Math.cos(theta) + ball.yacc * Math.sin theta)
      Across1 = ball.yacc * Math.cos(theta) - ball.xacc * Math.sin theta
      App2 = @xacc * Math.cos(theta) + @yacc * Math.sin theta
      Across2 = @yacc * Math.cos(theta) - @xacc * Math.sin theta

      #After collision:
      Depart1 = App2 #(if both balls same mass)
      # Across1(after) = Across1 (before).
      Depart2 = App1 #(if both balls same mass)
      # Across2(after) = Across2 (before).

      # reduce bouncing
      Depart1 *= @app.bounceModifier
      Depart2 *= @app.bounceModifier
      Across1 *= @app.bounceModifier
      Across2 *= @app.bounceModifier

      #After collision
      ball.xacc = Depart1 * Math.cos(theta) - Across1 * Math.sin theta
      ball.yacc = Depart1 * Math.sin(theta) + Across1 * Math.cos theta

      @xacc =  -(Across2 * Math.sin(theta)  + Depart2 * Math.cos(theta) )
      @yacc =   Across2 * Math.cos(theta)  - Depart2 * Math.sin theta
