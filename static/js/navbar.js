$(function () {
  var setupNavbar = function () {

    console.log('TEST');

      $('a').each(function(){
          if ($(this).prop('href') == window.location.href) {
              $(this).parents('li').addClass('active');
          }
      });

      var login = $('ul.nav a[href="login"]').parent();
      var alert = $('#alerts');
      var alertList = alert.children('div.dropdown-menu');
      var profile = $('#profile');
      if (typeof(Storage) !== "undefined" && localStorage.getItem("authorization")) {
          console.log("We have authorization");

          login.hide();
          alert.show();
          alertList.empty();
          profile.show();

      } else {
          console.log("We do not have authorization");

          login.show();
          alert.hide();
          alertList.empty();
          profile.hide();
      }

      $('#logout').click(function () {
          localStorage.removeItem("authorization");
          var rawWords = window.location.href.split("/");
          window.location = rawWords[0] + "//" + rawWords[2] + "/";
      });
  };

  setupNavbar();
});