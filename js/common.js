$(document).ready(function() {
  var portfolioFilter = $('#portfolio-filter');
  var portfolioActiveFilter = portfolioFilter.find('.portfolio__filter-link--active');
  var portfolioGrid = $('#portfolio-grid');

  var updatePortfolioGrid = function() {
    portfolioGrid.animate(
      {opacity: 0}, 500,
      function() {
        portfolioGrid.animate(
          {opacity: 1}, 500
        );
      }
    );
  };

  var onClickPortfolioFilter = function(evt) {
    evt.preventDefault();
    var target = $(this);

    portfolioActiveFilter.removeClass('portfolio__filter-link--active');
    target.addClass('portfolio__filter-link--active');
    portfolioActiveFilter = target;

    updatePortfolioGrid();
  };

  portfolioGrid.imagesLoaded(function() {
    portfolioGrid.masonry({
      itemSelector: '.portfolio__grid-item',
      columnWidth: 370,
      gutter: 30
    });
  });

  portfolioFilter.find('a').on('click', onClickPortfolioFilter);
});
