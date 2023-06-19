(function ($) {
  $(function () {

    /* CounterFlip */
    function agCounterFlip() {
      $('.js-count', '#js-counter').each(function() {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
          duration: 15000,
          easing: 'swing',
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        });
      });
    }

    agCounterFlip();
    /* /CounterFlip */

    /* Show Time */
    function agShowTime(){
      var date = new Date();
      var m = date.getMinutes(); // 0 - 59
      var s = date.getSeconds(); // 0 - 59

      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;

      var time = m + ":" + s;
      document.getElementById("js-time").innerText = time;
      document.getElementById("js-time").textContent = time;

      setTimeout(agShowTime, 1000);

    }

    agShowTime();
    /* /Show Time */


    /* Scroll Animation */
    function agScrollAnimation() {
      var agAdvantageItemBox = $('.js-scroll_box'),
        agWindowHeight = $(window).outerHeight(),
        agOffsetCoefficient;

      if (agAdvantageItemBox.outerHeight() > 500) {
        agOffsetCoefficient = .5;
      } else {
        agOffsetCoefficient = .75;
      }

      agAdvantageItemBox.each(function (i, elem) {
        if ($(window).scrollTop() >= $(elem).offset().top - agWindowHeight * agOffsetCoefficient) {
          $(elem).find('.js-scroll_item').addClass('js-ag-scroll_item__active').removeClass('js-ag-scroll_item__inactive');
        } else {
          $(elem).find('.js-scroll_item').removeClass('js-ag-scroll_item__active').addClass('js-ag-scroll_item__inactive');
        }
      })
    }

    $(window).on('scroll load', function () {
      agScrollAnimation();
    });
    /* /Scroll Animation */


    /* Nav */
    $('.js-ag-nav_bars').on('click', function () {
      $('.js-workout-page').addClass('js-workout-page_nav__open');
      $('.js-nav').addClass('js-ag-nav_open');
      $('html, body').addClass('js-ag-body-noscroll');
    });

    $('.js-nav_btn-close').on('click', function () {
      $('.js-workout-page').removeClass('js-workout-page_nav__open');
      $('.js-nav').removeClass('js-ag-nav_open');
      $('html, body').removeClass('js-ag-body-noscroll');
    });

    $(document).bind('keyup', function (e) {
      if (e.keyCode != 27) {
        return true;
      }
      /* 'Esc' key (27) */
      if (e.keyCode == 27 && $('.js-nav').is(':visible')) {
        $('.js-workout-page').removeClass('js-workout-page_nav__open');
        $('.js-nav').removeClass('js-ag-nav_open');
        $('html, body').removeClass('js-ag-body-noscroll');
      }
    });

    $(document).mouseup(function (e) {
      if ((!$('.js-nav').is(e.target) && $('.js-nav').has(e.target).length === 0)) {
        $('.js-workout-page').removeClass('js-workout-page_nav__open');
        $('.js-nav').removeClass('js-ag-nav_open');
        $('html, body').removeClass('js-ag-body-noscroll');
      }
    });
    /* /Nav */

    /* Popup */
    $('.js-popup_btn').on('click', function (e) {
      e.preventDefault();

      $('#js-popup-video_video').fadeIn();

      if ($('#js-popup-video').css('display') == 'none') {
        $('#js-popup-video').addClass('js-ag-popup_overlay__open');
        $('html, body').addClass('js-ag-body-noscroll');
      }
    });

    $('#js-popup-video_btn-close').on('click', function () {
      agPopupClose();

      var agVideo = $('.js-video_player');

      agVideo.get(0).pause();
    });

    function agPopupClose() {
      if ($('#js-popup-video').css('display') == 'block') {
        $('#js-popup-video').removeClass('js-ag-popup_overlay__open');
        $('html, body').removeClass('js-ag-body-noscroll');
      }
    }

    $(document).bind('keyup', function (e) {
      if (e.keyCode != 27) {
        return true;
      }
      /* 'Esc' key (27) */
      if (e.keyCode == 27 && $('#js-popup-video').is(':visible')) {
        agPopupClose();
      }
    });

    $(document).mouseup(function (e) {
      if ((!$('#js-popup-video').is(e.target) && $('#js-popup-video').has(e.target).length === 0)) {
        agPopupClose();
      }
    });

    /* Video click */
    window.youTuber = {
      template:
      '<video class="js-video_player" controls="controls" poster="videos/[%videoid%].jpg" autoplay>' +
      '<source src="videos/[%videoid%].ogv" type="video/ogg; codecs=&quot;theora, vorbis&quot;">' +
      '<source src="videos/[%videoid%].mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">' +
      '<source src="videos/[%videoid%].webm" type="video/webm; codecs=&quot;vp8, vorbis&quot;">' +

      '<a href="videos/[%videoid%].mp4">Video</a>' +
      '</video>',

      init: function(selector) {
        $(selector).on('click', function() {
          youTuber.loadItem($(this));
        });
      },

      loadItem: function (container) {
        var agVideoID = container.attr('data-video-id');

        if (typeof agVideoID !== 'undefined') {
          $('.js-videos').html(youTuber.template.replaceAll("[%videoid%]", agVideoID));
        }
      }

    }

    youTuber.init('.js-popup_btn');
    /* /Video click */
    /* /Popup */


    function agVideoMore() {

      function ajax_get(url, callback) {
        try {
          xmlhttp = new XMLHttpRequest();

          xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 404) {
              return;
            }

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

              var Valute = JSON.parse(xmlhttp.responseText);

              document.getElementById('js-video_more').innerHTML = `${Object.values(Valute).map(videoTemplate).join("")}`;

              try {
                var data = JSON.parse(xmlhttp.responseText);
              } catch (err) {
                return;
              }

              callback(data);
            }
          };


          xmlhttp.open("GET", url, true);

          xmlhttp.send();

        } catch(err){};
      }

      ajax_get('https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/workout/JSON/video.json', function(data) {});
    }


    function videoTemplate(video) {
      return `
          <div class="js-popup_btn ag-video_item" data-video-id="${video.id}">
            <div class="ag-video_img-box">
              <img src="${video.image}" class="ag-video_img" width="373" height="250" alt="${video.name}" />
            </div>
  
            <div class="ag-video_descr">
              <div class="ag-video-descr_info">
                <div class="ag-video-descr_name">${video.name}</div>
                <div class="ag-video-descr_calory">${video.calory}</div>
              </div>
              <div class="ag-video-descr_time">${video.time}</div>
            </div>
          </div>`;
    }

    $('.js-video_link').on('click', function(e) {
      e.preventDefault();

      $('.js-ag-video_more').fadeIn();

      agVideoMore();
    });

  });
})(jQuery);