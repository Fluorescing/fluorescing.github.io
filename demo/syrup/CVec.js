/*!
 * Complex Vector Library v0.1a
 *
 * Public Domain
 *
 * Date: Tue May 3 22:30:00 2011 -0800
 */

class CVec {

	constructor(tuple) {
		this.tup = tuple;
	}

	get(index) {
		return this.tup[index];
	}

	toString() {
		return "[" + this.tup.map(function (a) { return a.toString() + ""; }) + "]";
	}

	x() {
		return this.tup[0];
	}

	y() {
		return this.tup[1];
	}

	z() {
		return this.tup[2];
	}

	static sum(v) {
		return v.tup.reduce(
			function (a, b) { return Complex.add(a, b); }, new Complex(0, 0));
	}

	static dot(u, v) {
		return CVec.sum(new CVec(Functional.bimap(Complex.mul, u.tup, v.tup)));
	}

	static cross(u, v) {
		if (u.length != v.length || u.length != 3)
			throw new TypeError();

		return new Vec(
			Complex.sub(
				Complex.mul(u.tup[1], v.tup[2]),
				Complex.mul(u.tup[2], v.tup[1])),
			Complex.sub(
				Complex.mul(u.tup[2], v.tup[0]),
				Complex.mul(u.tup[0], v.tup[2])),
			Complex.sub(
				Complex.mul(u.tup[0], v.tup[1]),
				Complex.mul(u.tup[1], v.tup[0])));
	}

	static add(u, v) {
		return new CVec(Functional.bimap(Complex.add, u.tup, v.tup));
	}

	static sub(u, v) {
		return new CVec(Functional.bimap(Complex.sub, u.tup, v.tup));
	}

	static scale(s, v) {
		return new CVec(v.tup.map(function (a) { return Complex.scale(a, s); }));
	}

	static neg(v) {
		return new CVec(v.tup.map(
			function (a) { return Complex.sub(new Complex(0, 0), a); }));
	}
}
