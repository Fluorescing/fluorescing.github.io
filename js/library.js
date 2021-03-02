$(document).ready(function () {
  init_document_ready();
});

function init_document_ready() {
  create_colorSwatch();
}

function create_colorSwatch() {
  $("li.color").each(function () {
    var color = $(this).text();
    $(this).css("background-color", color);
    var c = color.substring(1);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >> 8) & 0xff;
    var b = (rgb >> 0) & 0xff;
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma < 85) {
      $(this).css("color", "#f0f0f0");
    }
  });
}
