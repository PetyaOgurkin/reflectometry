import Complex from "complex.js";

const degToRad = (a: number) => a * (Math.PI / 180);

const Ei = Complex(3.17, 1.99 * 10 ** -3);
const Ew = Complex(82, 2.5);

const sin_t = (t: number) => Complex(degToRad(t)).sin();
const cos_t = (t: number) => Complex(degToRad(t)).cos();
const t1 = (t: number) => sin_t(t).div(Ei.sqrt()).asin();

const sin_t1 = (t: number) => t1(t).sin();
const cos_t1 = (t: number) => t1(t).cos();

const f = 1_575_420_000;
const c = 299_792_458;
const k0 = (2 * Math.PI * f) / c;

const rvi_c = (t: number) => Ei.mul(cos_t(t));
const ri_c = (t: number) => Ei.sub(sin_t(t).pow(2)).sqrt();

const rw_c = (t: number) => Ew.sub(Ei.mul(sin_t1(t).pow(2))).sqrt();
const rvw_c1 = (t: number) => Ew.mul(cos_t1(t));
const rvw_c2 = (t: number) => Ei.sqrt().mul(rw_c(t));
const rhw_c = (t: number) => Ei.mul(cos_t1(t));

const rvi = (t: number) =>
  rvi_c(t)
    .sub(ri_c(t))
    .div(rvi_c(t).add(ri_c(t)));

const rhi = (t: number) =>
  cos_t(t)
    .sub(ri_c(t))
    .div(cos_t(t).add(ri_c(t)));

const rvw = (t: number) =>
  rvw_c1(t)
    .sub(rvw_c2(t))
    .div(rvw_c1(t).add(rvw_c2(t)));

const rhw = (t: number) =>
  rhw_c(t)
    .sub(rw_c(t))
    .div(rhw_c(t).add(rw_c(t)));

const e1 = (t: number, d: number) => ri_c(t).mul(d).mul(k0).mul(Complex("2i")).exp();

const Rh = (t: number, d: number) =>
  rhi(t)
    .add(rhw(t).mul(e1(t, d)))
    .div(Complex.ONE.add(rhi(t).mul(rhw(t).mul(e1(t, d)))));

const Rv = (t: number, d: number) =>
  rvi(t)
    .add(rvw(t).mul(e1(t, d)))
    .div(Complex.ONE.add(rvi(t).mul(rvw(t).mul(e1(t, d)))));

const e2 = (t: number, h: number) => cos_t(t).mul(h).mul(k0).mul(Complex("2i")).exp();

const F = (t: number, p0: number, p1: number, p2: number) => p0 + p1 * t + p2 * t ** 2;

export const U = (t: number, h: number, d: number, p0: number, p1: number, p2: number) =>
  F(t, p0, p1, p2) * Complex.ONE.add(Rh(t, d).add(Rv(t, d)).div(2).mul(e2(t, h))).abs();
