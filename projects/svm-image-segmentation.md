---
title: Project - Forest Landcover Estimation using Image Segmentation
permalink: /svm-image-segmentation/
layout: md-page
---

I took a class on Data Mining in Fall '22 as part of my Master's at Hopkins, and used the final
project as a chance to apply machine learning to a climate-change-related problem:
Using 'traditional' machine learning to estimate the amount of forest coverage
shown in a satellite image of a geographic area.

I developed a binary classifier to perform image segmentation of [satellite images of the
Chesapeake Bay watershed][dataset], labeling each pixel as either forest or non-forest landcover, as
an application of the support vector machine (SVM) model approach to linear classification.

<figure>
  <img class="img-fluid" src="{{ site.url }}/assets/svm/svm-figure.png"
    alt="Image segmentation output figure" />
  <figcaption class="figure-caption">
  A visual comparison between SVM-predicted pixel labels with the true labels.
  </figcaption>
</figure>

<br/>

Here's a video presentation of the project:

<iframe width="560" height="315" src="https://www.youtube.com/embed/lah9Nxz52gg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

The full write-up and Jupyter Lab code can be found <a href="/assets/svm/svm_writeup.pdf">HERE</a>

[dataset]: https://lila.science/datasets/chesapeakelandcover
