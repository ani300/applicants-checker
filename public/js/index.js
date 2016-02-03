$(document).ready(function() {
  Handlebars.registerHelper("inc", function(value, options){
      return parseInt(value) + 1;
  });

  $.ajax({
      url: "/api/applications",
      type: "GET",
      dataType : "json",
      success: function(json) {
        $.ajax({
            url: "/templates/applications-list.hbs",
            type: "GET",
            success: function(data) {
                var template = Handlebars.compile(data);
                $("#list-applications tbody").html(template(json));
            }
        });
      },
   
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      error: function(xhr, status, errorThrown) {
          alert("Sorry, there was a problem!");
          console.log("Error: " + errorThrown);
          console.log("Status: " + status);
          console.dir(xhr);
      },
   
      // Code to run regardless of success or failure
      complete: function(xhr, status) {
      }
  });
});