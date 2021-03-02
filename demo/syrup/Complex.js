/*!
 * Complex Number Library v0.1a
 *
 * Public Domain
 *
 * Date: Tue May 3 22:30:00 2011 -0800
 */

class Complex {

	constructor(real, imaginary) {
		this.re = real;
		this.im = imaginary;
	}

	toString() {
		var a = this;
		if (a.im == 0) return a.re + "";
		if (a.re == 0) return a.im + "i";
		if (a.im < 0) return "(" + a.re + "-" + (-a.im) + "i)";
		return "(" + a.re + "+" + a.im + "i)";
	}

	static abs(a) {
		return Math.sqrt(a.re * a.re + a.im * a.im);
	}

	static phase(a) {
		return Math.atan2(a.im, a.re);
	}

	static add(a, b) {
		return new Complex(a.re + b.re, a.im + b.im);
	}

	static sub(a, b) {
		return new Complex(a.re - b.re, a.im - b.im);
	}

	static mul(a, b) {
		return new Complex(a.re * b.re - a.im * b.im,
			a.re * b.im + a.im * b.re);
	}

	static div(a, b) {
		return Complex.mul(a, Complex.reciprocal(b));
	}

	static scale(a, b) {
		return new Complex(a.re * b, a.im * b);
	}

	static conjugate(a) {
		return new Complex(a.re, -a.im);
	}

	static reciprocal(a) {
		var scale = a.re * a.re + a.im * a.im;
		return new Complex(a.re / scale, -a.im / scale);
	}

	static exp(a) {
		return new Complex(Math.exp(a.re) * Math.cos(a.im),
			Math.exp(a.re) * Math.sin(a.im));
	}

	static sin(a) {
		return new Complex(Math.sin(a.re) * Math.cosh(a.im),
			Math.cos(a.re) * Math.sinh(a.im));
	}

	static cos(a) {
		return new Complex(Math.cos(a.re) * Math.cosh(a.im),
			-Math.sin(a.re) * Math.sinh(a.im));
	}

	static tan(a) {
		return Complex.div(Complex.sin(a), Complex.cos(a));
	}
}

Math.sinh = function (a) {
	return 0.5 * (Math.exp(a) - Math.exp(-a));
}

Math.cosh = function (a) {
	return 0.5 * (Math.exp(a) + Math.exp(-a));
}
