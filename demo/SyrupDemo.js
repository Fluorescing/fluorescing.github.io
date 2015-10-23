/*!
 * Syrup Demo JS v0.1a
 * by Shane Stahlheber
 *
 * Public Domain
 *
 * Date: Wed May 4 1:00:00 2011 -0800
 */

function SyrupDemo(opts) {
	this.WIDTH = 200;
	this.samples = 1;
	this.polarize = true;

	this.bimage = new Array(this.WIDTH);
}

SyrupDemo.Polarizer = function (v, angle) {

    var cos = new Complex(Math.cos(angle), 0);
    var sin = new Complex(Math.sin(angle), 0);
    return new CVec([Complex.add(
                        Complex.mul(v.x(), Complex.mul(cos, cos)), 
                        Complex.mul(v.y(), Complex.mul(sin, cos))), 
                    Complex.add(
                        Complex.mul(v.x(), Complex.mul(sin, cos)),
                        Complex.mul(v.y(), Complex.mul(sin, sin)))]);
}

SyrupDemo.Rotator = function (v, phase) {
	var cos = new Complex(Math.cos(phase), 0);
	var sin = new Complex(Math.sin(phase), 0);
	return new CVec([Complex.sub(
						Complex.mul(v.x(), cos),
						Complex.mul(v.y(), sin)),
					Complex.add(
						Complex.mul(v.x(), sin),
						Complex.mul(v.y(), cos))]);
}

SyrupDemo.prototype.TestRed = function (rotation, polangle) {
	var sample = 0.0;
	
	// Initial Wave (Horizontally Polarized)
    var norm = 1.0 / Math.sqrt(2.0);
	var L = new CVec([new Complex(norm, 0), new Complex(0, norm)]);
    var R = new CVec([new Complex(norm, 0), new Complex(0, -norm)]);

	// Rotate Wave
	L = SyrupDemo.Rotator(L, rotation);
	R = SyrupDemo.Rotator(R, rotation);

	// Final Polarizer (Vertical Polarizer)
	if (this.polarize)
	{
		L = SyrupDemo.Polarizer(L, polangle);
		R = SyrupDemo.Polarizer(R, polangle);
	}

    var V = CVec.add(L, R);

    // get the intensity
    sample = Math.sqrt(V.y().real()*V.y().real() 
        + V.y().imaginary()*V.y().imaginary()
        + V.x().real()*V.x().real() 
        + V.x().imaginary()*V.x().imaginary());
	
	return sample;
}

SyrupDemo.prototype.update = function (ctx, angle, polfilter, redfilter, greenfilter, bluefilter) {

	this.polarize = polfilter;
	
	// calculate buffer values
	for (var x = 0; x < this.WIDTH; x++)
	{
		// radius of the bottle
		var radius = this.WIDTH/6.0;

		// default background settings
		var distance = 0.0;
		var brightness = 1.0;
		var rb = 1.0;
		var gb = 1.0;
		var bb = 1.0;

		// Bottle boundaries
		if (x > 2.0*radius && x < 4.0*radius)
		{
            // find the distance to travel through the syrup
			var xc = x - 3.0*radius;
			distance = 2.0*Math.sqrt(radius*radius - xc*xc);
			
			// color of the syrup (yellowish and darker around edges)
            // this is for aesthetic purposes
            brightness = distance / (2.0*radius);
			rb = 0.9;
			gb = 0.9;
			bb = 0.72;
		}

		// The distance traveled through the syrup (2.5 inches diameter)
		distance *= 2.5/(2.0*radius);

		// Calculate colors
		//  - Rotation is dependent on the distance traveled through the syrup.

        var delta_n = 3.87e-6;
        var distance_nm = distance * 2.54e+7;

        // take a couple samples increased visual accuracy
        var red = this.TestRed(distance_nm * Math.PI * delta_n / 640.0, angle);
        red += this.TestRed(distance_nm * Math.PI * delta_n / 610.0, angle);
        red += this.TestRed(distance_nm * Math.PI * delta_n / 670.0, angle);
        red /= 3.0;

        var green = this.TestRed(distance_nm * Math.PI * delta_n / 510.0, angle);
        green += this.TestRed(distance_nm * Math.PI * delta_n / 490.0, angle);
        green += this.TestRed(distance_nm * Math.PI * delta_n / 530.0, angle);
        green /= 3.0;

        var blue = this.TestRed(distance_nm * Math.PI * delta_n / 440.0, angle);
        blue += this.TestRed(distance_nm * Math.PI * delta_n / 410.0, angle);
        blue += this.TestRed(distance_nm * Math.PI * delta_n / 470.0, angle);
        blue /= 3.0;

		if (!redfilter)
			red *= 0;
		if (!greenfilter)
			green *= 0;
		if (!bluefilter)
			blue *= 0;

		red *= brightness*rb;
		green *= brightness*gb;
		blue *= brightness*bb;

		// Draw vertical bars
		var barwidth = 200/this.WIDTH;
		ctx.fillStyle = "rgb(" + Math.floor(255*red/2/this.samples) + "," +
								 Math.floor(255*green/2/this.samples) + "," +
								 Math.floor(255*blue/2/this.samples) + ")";
		ctx.fillRect(x*barwidth, 0, x*barwidth+barwidth, 16);
	}
}

