/*!
 * Complex Number Library v0.1a
 * 
 * Public Domain
 *
 * Date: Tue May 3 22:30:00 2011 -0800
 */

function Complex(real, imaginary) {
	this.re = real;
	this.im = imaginary;
}

Complex.prototype.toString = function () {
	var a = this;
	if (a.im == 0)
		return a.re + "";
	if (a.re == 0)
		return a.im + "i";
	if (a.im < 0)
		return "(" + a.re + "-" + (-a.im) + "i)";
	return "(" + a.re + "+" + a.im + "i)";
}

Complex.abs = function (a) {
	return Math.sqrt(a.re*a.re + a.im*a.im);
}

Complex.phase = function (a) {
	return Math.atan2(a.im, a.re);
}

Complex.add = function (a, b) {
	return new Complex(a.re + b.re, a.im + b.im);
}

Complex.sub = function (a, b) {
	return new Complex(a.re - b.re, a.im - b.im);
}

Complex.mul = function (a, b) {
	return new Complex(a.re * b.re - a.im * b.im, 
					   a.re * b.im + a.im * b.re);
}

Complex.div = function (a, b) {
	return Complex.mul(a, Complex.reciprocal(b));
}

Complex.scale = function (a, b) {
	return new Complex(a.re * b, a.im * b);
}

Complex.conjugate = function (a) {
	return new Complex(a.re, -a.im);
}

Complex.reciprocal = function (a) {
	var scale = a.re*a.re + a.im*a.im;
	return new Complex(a.re / scale, -a.im / scale);
}

/*Complex.prototype.real = function () {
	return this.re;
}

Complex.prototype.imaginary = function () {
	return this.im;
}*/

Math.sinh = function(a) {
	return 0.5*(Math.exp(a) - Math.exp(-a));
}

Math.cosh = function(a) {
	return 0.5*(Math.exp(a) + Math.exp(-a));
}

Complex.exp = function (a) {
	return new Complex(Math.exp(a.re) * Math.cos(a.im), 
					   Math.exp(a.re) * Math.sin(a.im));
}

Complex.sin = function (a) {
	return new Complex(Math.sin(a.re) * Math.cosh(a.im), 
					   Math.cos(a.re) * Math.sinh(a.im));
}

Complex.cos = function (a) {
	return new Complex(Math.cos(a.re) * Math.cosh(a.im), 
					  -Math.sin(a.re) * Math.sinh(a.im));
}

Complex.tan = function (a) {
	return Complex.div(Complex.sin(a), Complex.cos(a));
}
