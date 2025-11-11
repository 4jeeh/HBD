$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
});
