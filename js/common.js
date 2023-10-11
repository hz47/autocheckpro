
$(document).ready(function () {
    var baseUrl = "https://milos.oroz.space/autocheckpro/";
// Function to update href attributes
function updateHrefAttributes() {
  // Update href attributes using the base URL
  $(".dynamic-href").attr("href", function () {
    return baseUrl + $(this).data("path");
  });
}
updateHrefAttributes();

});