$(document).ready(function() {
  // Nav scrolling
  $('.navigation__link').on('click', () =>
    $('.navigation__checkbox').prop('checked', false)
  );

  // Enable smooth scrolling
  smoothScroll();

  // Hide popup on click anywhere outside it
  $(document).mouseup(e => closePopupOnClickOutside(e));

  // Close elements on escape key
  $(document).keyup(e => {
    closeOnEsc(e, '.popup__content');
    closeOnEsc(e, '.navigation__nav');
  });
});

function closePopupOnClickOutside(e) {
  var container = $('.popup__content');
  // If the target of the click isn't the container or a descendant of the container
  if (
    parseInt(container.css('opacity')) === 1 &&
    ((!container.is(e.target) && container.has(e.target).length === 0) ||
      $(e.target).hasClass('popup__close')) // Close button clicked
  )
    // Change target to trigger popup hidden styles
    location.hash = '#section-tours';
}

function closeOnEsc(e, target) {
  if (parseInt($(target).css('opacity')) === 1 && e.keyCode === 27) {
    target === '.popup__content'
      ? (location.hash = '#section-tours')
      : $('.navigation__checkbox').prop('checked', false);
  }
}

function filterPath(string) {
  return string
    .replace(/^\//, '')
    .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
    .replace(/\/$/, '');
}

function smoothScroll() {
  var locationPath = filterPath(location.pathname);
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href="#popup"]')
    .each(function() {
      var thisPath = filterPath(this.pathname) || locationPath;
      var hash = this.hash;
      if ($('#' + hash.replace(/#/, '')).length) {
        if (
          locationPath == thisPath &&
          (location.hostname == this.hostname || !this.hostname) &&
          this.hash.replace(/#/, '')
        ) {
          var $target = $(hash),
            target = this.hash;
          if (target) {
            $(this).click(function(event) {
              event.preventDefault();
              $('html, body')
                .animate({ scrollTop: $target.offset().top }, 1000, function() {
                  $target.focus();
                  if ($target.is(':focus')) {
                    //Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex', '-1'); //Adding tabindex for elements not focusable
                    $target.focus(); //Set focus again
                  }
                })
                .promise()
                .then(function() {
                  location.hash = target;
                });
            });
          }
        }
      }
    });
}
