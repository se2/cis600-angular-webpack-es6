import template from './publications.html';
import $ from 'jquery';

var pubCtrl = function (AppServices) {
  var publications = this;

  // Get the json data from the service($http)
  AppServices.getPubData().then(function (data) {
    publications.umd09JP = data.publications.umd09JP;
    publications.umd03JP = data.publications.umd03JP;
    publications.umd91JP = data.publications.umd91JP;

    publications.books = data.publications.books;
    publications.proceedings = data.publications.proceedings;

    publications.umd09CP = data.publications.umd09CP;
    publications.umd03CP = data.publications.umd03CP;
    publications.umd91CP = data.publications.umd91CP;

    publications.techReports = data.publications.techReports;
    publications.thesisProject = data.publications.thesisProject;
  });

  /* -- Scroll to link -- */
  $('.scroller-link').click(function (e) {
    e.preventDefault(); // Don't automatically jump to the link
    var id;
    id = $(this).attr('href').replace('#', ''); // Extract the id of the element to jump to
    $('html,body').animate({
      scrollTop: $("#" + id).offset().top - 40
    }, 'normal');
  });

  // For Fixed Nav after offset
  var navpos = $('#viewContainer').offset();
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > navpos.top - 8) {
      $('#sideNav').addClass('fixed');
    } else {
      $('#sideNav').removeClass('fixed');
    }
  });
}

export default {
  template: template,
  controller: ['AppServices', pubCtrl],
  controllerAs: 'publications'
};
