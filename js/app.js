console.log('app.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  var apiRootURI = "http://localhost:8888/slim/app_1/myApp.php/";
  var customersURI = "v1.0.0/read/customer";

  var getAllCustomers = function(){
    $.ajax({
      method: "GET",
      url: apiRootURI+customersURI,
      cache: false,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:getAllCustomers:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        appFirstObj.onGotAllCustomerData(data);
      },
    })
    .done(function(data){
      console.group('AJAX:getAllCustomers:done');
      console.log(data);
      console.groupEnd();
    })
    .fail(function(error){
      console.log('AJAX:getAllCustomers:fail:',error);
    });
  }
  getAllCustomers();
});//END: jQuery.ready()