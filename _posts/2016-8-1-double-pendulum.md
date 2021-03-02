---
layout: post
title: "Double Pendulum Demo"
tags: default
---

*The demonstration can be found [here](../../../../../demo/doublependulum).*

<div markdown="1" style="text-align: justify;">
&emsp;The double pendulum is a
pendulum that has a second pendulum attached to the bottom.  Its motion is
seemingly unpredictable because it exhibits chaos and is thus extremely
sensitive to initial conditions.

{% include image.html url="/img/pendulum.svg" description="Double Pendulum."
width="100%" %}

&emsp;The equations of motion are described by a pair of coupled differential
equations. These equations of motion can be found using Lagrangian mechanics.
The  kinetic energy of the double pendulum is
\$\$T = \frac{1}{2}(m_1 + m_2) L_1^2 \dot{\phi}_1^2 + m_2 L_1 L_2 \dot{\phi}_1
\dot{\phi}_2 \cos(\phi_2-\phi_1) + \frac{1}{2}m_2 L_2^2 \dot{\phi}_2^2~.\$\$
The potential energy of the double pendulum is
\$\$U = -(m_1 + m_2) g L_1 \cos{\phi_1} - m_2 g L_2 \cos{\phi_2}~,\$\$
where $$g$$ is the acceleration due to gravity. The Lagrangian is therefore
\$\$L = T - U = \frac{1}{2}(m_1 + m_2) L_1^2 \dot{\phi}_1^2 + m_2 L_1 L_2
\dot{\phi}_1 \dot{\phi}_2 \cos(\phi_2-\phi_1) + \frac{1}{2}m_2 L_2^2
\dot{\phi}_2^2\\\\-(m_1 + m_2) g L_1 \cos{\phi_1} - m_2 g L_2
\cos{\phi_2}~.\$\$
Using the Lagrange equations for $$\phi_1$$ and $$\phi_2$$,
\$\$\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\phi}_i}\right) -
\frac{\partial L}{\partial \phi_i} = 0~,\$\$
we get the following equations
\$\$\ddot{\phi}_1 L_1^2 (m_1 + m_2) + \ddot{\phi}_2 L_1 L_2 m_2 \cos(\phi_1 -
\phi_2) \\\\+ g L_1 (m_1 + m_2) \sin{\phi_1} + \dot{\phi}_2^2 L_1 L_2 m_2
\sin(\phi_1 - \phi_2) = 0\$\$ and \$\$\ddot{\phi}_2 L_2^2 m_2 + \ddot{\phi}_1
L_1 L_2 m_2 \cos(\phi_1 - \phi_2) \\\\+ g L_2 m_2 \sin{\phi_2} -
\dot{\phi}_1^2 L_1 L_2 m_2 \sin(\phi_1 - \phi_2)  = 0\$\$ with some algebra
work become \$\$\small{\ddot{\phi}_1 = -\frac{g (2m_1 + m_2) \sin{\phi_1} +
m_2 \left(g \sin(\phi_1 - 2\phi_2) + 2\left(\dot{\phi}_2^2 L_2 +
\dot{\phi}_1^2 L_1 \cos(\phi_1 - \phi_2)\right)\sin(\phi_1 -
\phi_2)\right)}{2 L_1 \left(m_1 + m_2 \left(\sin^2(\phi_1 -
\phi_2)\right)\right)}}\$\$ \$\$\small{\ddot{\phi}_2 = \frac{\left(g
(m_1 + m2) \cos\phi_1 + \dot{\phi}_1^2 L_1 (m_1 + m_2) +
\dot{\phi}_2^2 L_2 m_2 \cos(\phi_1 - \phi_2)\right)\sin(\phi_1 -
\phi_2)}{L_2 \left(m_1 + m_2(\sin^2(\phi_1 - \phi_2)\right)}}~.\$\$

&emsp;A solution must be found numerically; to do this, the demonstration
uses the Runge-Kutta 4th-order method.

&emsp;Normally, to demonstrate the sensitivity to initial conditions, the
initial conditions between two double pendulums are made different by a very
small amount.  In this demonstration, the initial conditions of two double
pendulums are set equal, but an equation of motion has a mathematically
equivalent, yet slightly different formulation by using a trigonometric
identity.  One equation of motion, for $$\ddot{\phi}_1$$ is changed to
\$\$\small{\ddot{\phi}_1 = -\frac{g (2m_1 + m_2) \sin{\phi_1} + m_2
\left(g \sin(\phi_1 - 2\phi_2) + 2\left(\dot{\phi}_2^2 L_2 + \dot{\phi}_1^2
L_1 \cos(\phi_1 - \phi_2)\right)\sin(\phi_1 - \phi_2)\right)}{2 L_1
\left(m_1 + m_2 - m_2 \left(\cos^2(\phi_1 - \phi_2)\right)\right)}}~.\$\$
Because we are using floating-point numbers, the different formulation,
although mathematically equivalent, introduces an initial different of
$$10^{-17}$$ radians, which then, because of chaos, explodes over time.
</div>

*The demonstration can be found [here](../../../../../demo/doublependulum).*

--------

**References:**
