---
title: Project - Bus Electrification Simulation
permalink: /bus-sim/
layout: md-page
---

In the summer of 2022 I worked with [UT professor Sergio Castellanos][castellanos]
on [RESET lab][reset]'s ongoing research into transit bus fleet electrification in Mexico City.

Greenhouse gas (GHG) emissions and health-degrading air pollutants both come
out of the tailpipes of internal combustion (especially heavy-duty) vehicles,
so there is an opportunity to feed two birds with one scone: simultaneously
reducing GHG emissions and improving public health through bus fleet
electrification. Additionally, these pollutants are unequally distributed.
Poor and marginalized communities bear the brunt of the exposure. To move towards
equal access to clean air, it makes sense to prioritize transportation electrification
investments in these communities as we pursue GHG reductions.

<br />

<figure>
  <img class="img-fluid" src="{{ site.url }}/assets/img/bus-sim.png"
    alt="Electric Bus Range Simulation" />
  <figcaption class="figure-caption">
    Simulation output for a Mexicali Bus route. From left to right, the graphs show the drive cycle
    time series, cumulative energy expenditure over time, battery state of charge over time, and
    battery state of charge over distance.
  </figcaption>
</figure>

<br />

To implement that prioritization, a city-scale method of quantifying the
environmental burden of different urban areas is required. RESET lab proposed
an open source Environmental Justice (EJ) Index to do just that, and make it easier
for policy makers to factor environmental justice into the pursuit of their GHG
reduction goals. One potential use of this EJ index is producing a literal map of
which bus routes should be electrified to achieve the greatest reduction in
environmental burden for the same investment.

[castellanos]: https://www.sergiocastellanos.com/
[reset]: https://www.reset-lab.com/
