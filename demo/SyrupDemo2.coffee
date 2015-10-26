---
---
# Syrup Demo JS v0.2.2
# by Shane Stahlheber
#
# Public Domain
#
# Date: Wed May 4 1:00:00 2011 -0800

class SyrupDemo
    constructor: (opts) ->
        @WIDTH = 200
        @polarize = true
        @bimage = new Array(this.WIDTH)
        

SyrupDemo.Polarizer = (v, angle) ->
    cos = new Complex(Math.cos(angle), 0)
    sin = new Complex(Math.sin(angle), 0)
    new CVec([Complex.add(
                 Complex.mul(v.x(), Complex.mul(cos, cos)), 
                 Complex.mul(v.y(), Complex.mul(sin, cos))), 
             Complex.add(
                 Complex.mul(v.x(), Complex.mul(sin, cos)),
                 Complex.mul(v.y(), Complex.mul(sin, sin)))])


SyrupDemo.Rotator = (v, phase) ->
    cos = new Complex(Math.cos(phase), 0)
    sin = new Complex(Math.sin(phase), 0)
    new CVec([Complex.add(
                  Complex.mul(v.x(), cos),
                  Complex.mul(v.y(), sin)),
              Complex.sub(
                  Complex.mul(v.x(), sin),
                  Complex.mul(v.y(), cos))])


SyrupDemo.prototype.DoSimulation = (rotation, polangle) ->
    H = new CVec([new Complex(1, 0), new Complex(0, 0)])
    
    # Rotator (Corn Syrup)
    H = SyrupDemo.Rotator(H, rotation)

    # Polarizer
    if this.polarize
        H = SyrupDemo.Polarizer(H, polangle)
    
    Math.sqrt(H.y().re*H.y().re + H.y().im*H.y().im
            + H.x().re*H.x().re + H.x().im*H.x().im)


SyrupDemo.prototype.update = (ctx, angle, polfilter, redfilter, greenfilter, bluefilter) ->

    this.polarize = polfilter
    
    # calculate buffer values
    for x in [0...this.WIDTH]
        # radius of the bottle
        radius = this.WIDTH / 6.0

        # default background settings
        distance = 0.0
        brightness = 1.0
        rb = 1.0
        gb = 1.0
        bb = 1.0

        # Bottle boundaries
        if x > 2.0*radius and x < 4.0*radius
            # find the distance to travel through the syrup
            xc = x - 3.0 * radius
            distance = 2.0 * Math.sqrt(radius * radius - xc * xc)
            
            # color of the syrup (yellowish and darker around edges)
            # this is for aesthetic purposes
            brightness = distance / (2.0 * radius)
            rb = 0.9
            gb = 0.9
            bb = 0.72

        # The distance traveled through the syrup (2.5 inches diameter)
        distance *= 2.5/(2.0*radius)

        # Calculate colors
        #  - Rotation is dependent on the distance traveled through the syrup.
        delta_n = 3.87e-6
        distance_nm = distance * 2.54e+7

        # take a couple samples increased visual accuracy
        red = this.DoSimulation(distance_nm * Math.PI * delta_n / 640.0, angle)
        red += this.DoSimulation(distance_nm * Math.PI * delta_n / 610.0, angle)
        red += this.DoSimulation(distance_nm * Math.PI * delta_n / 670.0, angle)
        red /= 3.0

        green = this.DoSimulation(distance_nm * Math.PI * delta_n / 510.0, angle)
        green += this.DoSimulation(distance_nm * Math.PI * delta_n / 490.0, angle)
        green += this.DoSimulation(distance_nm * Math.PI * delta_n / 530.0, angle)
        green /= 3.0;

        blue = this.DoSimulation(distance_nm * Math.PI * delta_n / 440.0, angle)
        blue += this.DoSimulation(distance_nm * Math.PI * delta_n / 410.0, angle)
        blue += this.DoSimulation(distance_nm * Math.PI * delta_n / 470.0, angle)
        blue /= 3.0;

        if !redfilter
            red *= 0
        if !greenfilter
            green *= 0
        if !bluefilter
            blue *= 0

        red *= brightness*rb
        green *= brightness*gb
        blue *= brightness*bb

        # Draw vertical bars
        barwidth = 200/this.WIDTH
        ctx.fillStyle = "rgb(" + Math.floor(255*red) + "," +
                                 Math.floor(255*green) + "," +
                                 Math.floor(255*blue) + ")"
        ctx.fillRect(x*barwidth, 0, x*barwidth+barwidth, 16)

