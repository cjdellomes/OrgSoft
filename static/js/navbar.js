$(function () {
  var setupNavbar = function () {

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

          $('#bubbles').show();
          $('#register-panel').hide();
          login.hide();
          alert.show();
          alertList.empty();
          profile.show();

      } else {
          console.log("We do not have authorization");

          $('#bubbles').hide();
          $('#register-panel').show();
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