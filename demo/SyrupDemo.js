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
	this.samples = 8;
	this.polarize = true;

	this.bimage = new Array(this.WIDTH);

	//this.angle = 90;
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
					Complex.sub(
						Complex.mul(v.x(), sin),
						Complex.mul(v.y(), cos))]);
}

SyrupDemo.Retarder = function (v, epsx, epsy) {
	var expx = Complex.exp(new Complex(0, epsx));
	var expy = Complex.exp(new Complex(0, epsy));
	return new CVec([Complex.mul(v.x(), expx), Complex.mul(v.y(), expy)]);
}

SyrupDemo.prototype.TestRed = function (rotation, polangle) {
	var sample = 0.0;
	
	// Initial Wave (Horizontally Polarized)
	var L = new CVec([new Complex(1/Math.sqrt(2), 0), new Complex(0, 1/Math.sqrt(2))]);
	var R = new CVec([new Complex(0, 1/Math.sqrt(2)), new Complex(1/Math.sqrt(2), 0)]);

	R = SyrupDemo.Retarder(R, -90.0*Math.PI/180.0, -90.0*Math.PI/180.0);

	// Rotate Wave
	L = SyrupDemo.Rotator(L, rotation);
	R = SyrupDemo.Rotator(R, rotation);
	
	// Final Polarizer (Vertical Polarizer)
	if (this.polarize)
	{
		L = SyrupDemo.Polarizer(L, polangle);
		R = SyrupDemo.Polarizer(R, polangle);
	}
	
	// take many samples to find approximate intensity
	for (var i = 0; i < this.samples; i++) {
		
		// Progress the wave by a small amount
		var dt = Math.PI*2.0/this.samples;
		var phase = i*dt;
		var nL = SyrupDemo.Retarder(L, phase, phase);
		var nR = SyrupDemo.Retarder(R, phase, phase);
		
		// find the sum of the L- and R-state waves
		var P = CVec.add(nL, nR);
		
		// accumulate intensity
		sample += Math.sqrt(P.y().real()*P.y().real() + P.x().real()*P.x().real());
	}
	
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
			var xprime = x - 3.0*radius;
			distance = 2.0*Math.sqrt(radius*radius - xprime*xprime);
			brightness = distance / (2.0*radius);

			// color of the syrup (yellowish)
			rb = 0.9;
			gb = 0.9;
			bb = 0.72;
		}

		// The distance traveled through the syrup (2.5 inches diameter)
		distance *= 2.5/(2.0*radius);

		// Calculate colors
		//  - Rotation is dependent on the distance traveled through
		//      the syrup.
		//  - The edges will dim to mimic the round shape of a bottle.
		var red = this.TestRed(distance*Math.PI/(180.0/30.815)*(655.0/640.0), angle);
		var green = this.TestRed(distance*Math.PI/(180.0/30.815)*(655.0/510.0), angle);
		var blue = this.TestRed(distance*Math.PI/(180.0/30.815)*(655.0/440.0), angle);

		if (!redfilter)
			red *= 0;
		if (!greenfilter)
			green *= 0;
		if (!bluefilter)
			blue *= 0;
	
		/*switch (filterChoice) {
		case 1:
			green = 0;
			blue = 0;
			break;
		case 2:
			red = 0;
			blue = 0;
			break;
		case 3:
			red = 0;
			green = 0;
			break;
		}*/

		red *= brightness*rb*1.5;
		green *= brightness*gb*1.5;
		blue *= brightness*bb*1.5;

		// Draw vertical bars
		var barwidth = 200/this.WIDTH;
		ctx.fillStyle = "rgb(" + Math.floor(255*red/2/this.samples) + "," +
								 Math.floor(255*green/2/this.samples) + "," +
								 Math.floor(255*blue/2/this.samples) + ")";
		ctx.fillRect (x*barwidth, 0, x*barwidth+barwidth, 16);
	}
}

