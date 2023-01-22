---
title: Project - Bus Electrification Simulation
permalink: /bus-sim/
layout: md-page
---

In the summer of 2022 I worked with [UT professor Sergio Castellanos][castellanos]
on [RESET lab][reset]'s ongoing research into transit bus fleet electrification in Mexico City.

### The Challenge

Greenhouse gas (GHG) emissions and [health-degrading air pollutants][health] both
come out of the tailpipes of internal combustion (especially heavy-duty) vehicles,
so there is an opportunity to feed two birds with one scone: simultaneously reduce
GHG emissions and improve public health through bus fleet electrification.
Additionally, these pollutants are unequally distributed. Poor and marginalized
communities bear the brunt of the exposure. To move towards equal access to
clean air, it makes sense to prioritize transportation electrification investments
in these communities as we pursue GHG reductions.

<br />

<figure>
  <img class="img-fluid" src="{{ site.url }}/assets/img/bus-sim.png"
    alt="Electric Bus Range Simulation" />
  <figcaption class="figure-caption">
    Simulation output for a Mexicali Bus route. From left to right, the graphs
    show the drive cycle time series, cumulative energy expenditure over time,
    battery state of charge over time, and battery state of charge over distance.
  </figcaption>
</figure>

<br />

### The Approach

To implement that prioritization, a city-scale method of quantifying the
environmental burden of different urban areas is required. RESET lab [proposed
an open source Environmental Justice (EJ) Index][ej-index] to do just that, and make it
easier for policy makers to factor environmental justice into the pursuit of
their GHG reduction goals. One potential application of the EJ index is to
produce a map of which bus routes should be electrified to optimize the reduction
in environmental burden for the same investment.

### What I did

RESET lab's goal is to use [NREL's FASTSim vehicle powertrain simulator][fastsim]
to determine the technical feasibility of electrifying the most EJ-burdened bus
routes to lend credibility to recommendations to electrify those routes. My work
validated our electric bus parameters by using FASTSim to replicate the results
of a 2021 UC Berkeley study in Mexicali that experimentally recorded bus route
[drive cycles][drive-cycle]. I also modeled the power requirements of electric
buses for those routes.

### The Outcome

I found that FASTSim's simulation consistently estimated the driving range of an
electric bus on a given route at 75% of that estimated by the proprietary black-box
simulation software used in the study. _What accounts for this difference?_
We don't know yet. The next step is to de-noise the drive cycle data
around stops because it may account for false movement (and therefore energy
expenditure) in our FASTSim simulation.

The Jupyter Lab code I wrote for this project can be found [HERE][reset-code].

[castellanos]: https://www.sergiocastellanos.com/
[reset]: https://www.reset-lab.com/
[health]: https://www.epa.gov/pm-pollution/health-and-environmental-effects-particulate-matter-pm
[ej-index]: https://pubs.acs.org/doi/10.1021/acs.est.9b06148
[fastsim]: https://www.nrel.gov/transportation/fastsim.html
[drive-cycle]: https://en.wikipedia.org/wiki/Driving_cycle
[reset-code]: https://github.com/RESET-Lab/TransitBusSimulation/blob/19846dd023e44790baad84385c1fa25af99f7ef2/FASTSim%20Simulation/Bus%20Parameter%20Validation.ipynb
