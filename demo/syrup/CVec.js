/*!
 * Complex Vector Library v0.1a
 * 
 * Public Domain
 *
 * Date: Tue May 3 22:30:00 2011 -0800
 */

function CVec(tuple) {
	this.tup = tuple;
}

CVec.prototype.get = function (index) {
	return this.tup[index];
}

CVec.prototype.toString = function () {
	return "[" + this.tup.map(function (a) { return a.toString() + ""; }) + "]";
}

CVec.sum = function (v) {
	return v.tup.reduce(
		function (a, b) { return Complex.add(a, b); }, new Complex(0, 0));
}

CVec.dot = function (u, v) {
	return CVec.sum(new CVec(Functional.bimap(Complex.mul, u.tup, v.tup)));
}

CVec.cross = function (u, v) {
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

CVec.add = function (u, v) {
	return new CVec(Functional.bimap(Complex.add, u.tup, v.tup));
}

CVec.sub = function (u, v) {
	return new CVec(Functional.bimap(Complex.sub, u.tup, v.tup));
}

CVec.scale = function (s, v) {
	return new CVec(v.tup.map(function (a) { return Complex.scale(a, s); }));
}

CVec.neg = function (v) {
	return new CVec(v.tup.map(
		function (a) { return Complex.sub(new Complex(0, 0), a); }));
}

CVec.prototype.x = function () {
	return this.tup[0];
}


CVec.prototype.y = function () {
	return this.tup[1];
}


CVec.prototype.z = function () {
	return this.tup[2];
}
