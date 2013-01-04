
  window.Ball = (function() {

    function Ball(app) {
      this.app = app;
      this.x = this.app.random(this.app.width - 200) + 100;
      this.y = this.app.random(this.app.height - 200) + 100;
      this.radius = this.app.random(20) + 20;
      this.xacc = this.app.random(2) - 1;
      this.yacc = this.app.random(2) - 1;
    }

    Ball.prototype.draw = function() {
      this.app.ctx.fillStyle = 'white';
      this.app.ctx.fillCircle(this.x, this.y, this.radius);
      this.friction();
      this.hitTest();
      return this.movement();
    };

    Ball.prototype.movement = function() {
      this.x += this.xacc;
      this.y += this.yacc;
      return this.edges();
    };

    Ball.prototype.friction = function() {
      this.xacc *= this.app.friction;
      this.yacc *= this.app.friction;
      this.xacc += this.app.xgravity;
      return this.yacc += this.app.ygravity;
    };

    Ball.prototype.edges = function() {
      if (this.y > this.app.height - this.radius) {
        this.y = this.app.height - this.radius;
        this.yacc *= -1;
      }
      if (this.y < this.radius) {
        this.y = this.radius;
        this.yacc *= -1;
      }
      if (this.x >= this.app.width - this.radius) {
        this.x = this.app.width - this.radius;
        this.xacc *= -1;
      }
      if (this.x < this.radius) {
        this.x = this.radius;
        return this.xacc *= -1;
      }
    };

    Ball.prototype.hitTest = function() {
      var ball, _i, _len, _ref, _results;
      _ref = this.app.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(this.intersect(ball));
      }
      return _results;
    };

    Ball.prototype.setAcc = function(xacc, yacc) {
      this.xacc = xacc;
      return this.yacc = yacc;
    };

    Ball.prototype.testforself = function(ball) {
      return ball.x !== this.x && ball.y !== this.y;
    };

    Ball.prototype.intersect = function(ball) {
      var Across1, Across2, App1, App2, Depart1, Depart2, distance, theta;
      distance = this.app.dist(this.x, this.y, ball.x, ball.y);
      if (distance < ball.radius + this.radius && this.testforself(ball)) {
        this.x = ball.x + (this.x - ball.x) * (ball.radius + this.radius) / distance;
        this.y = ball.y + (this.y - ball.y) * (ball.radius + this.radius) / distance;
        theta = Math.atan2(ball.y - this.y, ball.x - this.x);
        App1 = -(ball.xacc * Math.cos(theta) + ball.yacc * Math.sin(theta));
        Across1 = ball.yacc * Math.cos(theta) - ball.xacc * Math.sin(theta);
        App2 = this.xacc * Math.cos(theta) + this.yacc * Math.sin(theta);
        Across2 = this.yacc * Math.cos(theta) - this.xacc * Math.sin(theta);
        Depart1 = App2;
        Depart2 = App1;
        Depart1 *= this.app.bounceModifier;
        Depart2 *= this.app.bounceModifier;
        Across1 *= this.app.bounceModifier;
        Across2 *= this.app.bounceModifier;
        ball.xacc = Depart1 * Math.cos(theta) - Across1 * Math.sin(theta);
        ball.yacc = Depart1 * Math.sin(theta) + Across1 * Math.cos(theta);
        this.xacc = -(Across2 * Math.sin(theta) + Depart2 * Math.cos(theta));
        return this.yacc = Across2 * Math.cos(theta) - Depart2 * Math.sin(theta);
      }
    };

    return Ball;

  })();
