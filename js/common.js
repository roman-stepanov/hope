$(document).ready(function() {
  var pageHeader = $('#page-header');
  var pageHeaderTopPosition = pageHeader.offset().top;
  var pageHeaderHeight = pageHeader.outerHeight();

  var navigation = pageHeader.find('.navigation');

  var mainContent = $('.main-content');
  var contentSections = $('.content-section');

  var portfolioFilter = $('#portfolio-filter');
  var portfolioActiveFilter = portfolioFilter.find('.portfolio__filter-link--active');
  var portfolioGrid = $('#portfolio-grid');

  var updateNavigation = function() {
    contentSections.each(function() {
      var section = $(this);
      var sectionHeight = section.outerHeight();
      var sectionOffsetTop = section.offset().top;
      var sectionAnchor = navigation.find('a[href="#'+ section.attr('id') +'"]');
      var scrollTop = $(window).scrollTop();

      if ( (sectionOffsetTop - pageHeaderHeight <= scrollTop) && (sectionOffsetTop + sectionHeight - pageHeaderHeight > scrollTop) ) {
        sectionAnchor.parent().addClass('navigation__item--active');
      } else {
        sectionAnchor.parent().removeClass('navigation__item--active');
      }
    });
  };

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

  var onScrollWindow = function() {
    if ($(window).scrollTop() >= pageHeaderTopPosition) {
      pageHeader.addClass('page-header--fixed');
      mainContent.css('margin-top', pageHeaderHeight + 'px');
    } else {
      pageHeader.removeClass('page-header--fixed');
      mainContent.css('margin-top', '0px');
    }

    updateNavigation();
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

  $(window).on('scroll', onScrollWindow);
  portfolioFilter.find('a').on('click', onClickPortfolioFilter);
});
