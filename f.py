from cmath import *

ei = 3.2 + 0j
ew = 82 + 2.5j
k0 = (2 * pi * 1_575_420_000) / 299_792_458

def t1(t): return asin(sin(t) / sqrt(ei))
def rvi(t): return (ei * cos(t) - sqrt(ei - sin(t) ** 2)) / (ei * cos(t) + sqrt(ei - sin(t) ** 2))
def rhi(t): return (cos(t) - sqrt(ei - sin(t) ** 2)) / (cos(t) + sqrt(ei - sin(t) ** 2))
def rvw(t): return (ew * cos(t1(t)) - sqrt(ei) * sqrt(ew - ei * sin(t1(t)) ** 2)) / (ew * cos(t1(t)) + sqrt(ei) * sqrt(ew - ei * sin(t1(t)) ** 2))
def rhw(t): return (ei * cos(t1(t)) - sqrt(ew - ei*sin(t1(t)) ** 2)) / (ei * cos(t1(t)) + sqrt(ew - ei*sin(t1(t)) ** 2))
def e(t, d): return exp(2j * k0 *d *sqrt(ei - sin(t) ** 2))
def Rh(t, d): return (rhi(t) + rhw(t) * e(t, d)) / (1 + rhi(t) * rhw(t) * e(t, d))
def Rv(t, d): return (rvi(t) + rvw(t) * e(t, d)) / (1 + rvi(t) * rvw(t) * e(t, d))
def e2(t, h): return exp(2j * k0 * h * cos(t))
def F(t, p0, p1, p2):
    t = t * 180 / pi
    return p0 + p1 * t + p2 * t ** 2
def U(t, d, h, p0, p1, p2): return F(t, p0, p1, p2) * abs(1 + ((Rh(t, d) + Rv(t, d)) / 2) * e2(t, h))


for i in range(91):
    t = i * pi / 180
    print(U(t, 0.5, 1, 1, 1, 1)) 