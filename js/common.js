$(document).ready(function() {

  var portfolioGridContainer = $('#portfolio-grid-container');

  portfolioGridContainer.imagesLoaded(function() {
    portfolioGridContainer.masonry({
      itemSelector: '.portfolio__grid-item',
      columnWidth: 370,
      gutter: 30
    });
  });
});
