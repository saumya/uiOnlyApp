console.log('app.js');
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
        app.onGotData(data);
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
});//END: jQuery-ready()
//START - Application Object
var app = {
  onGotData: function(dataObj){
    console.log('onGotData');
    console.log(dataObj);
    dataObj.map(function(cValue,cIndex,cArray){
      console.log(cValue,cIndex,cArray);
      console.log(cValue.name);
      var sHtml = "<div class='shortDetail'><div>"+cValue.id+":"+cValue.name+":"+cValue.phone+"</div><div>"+cValue.address+"</div></div>";
      $('#idCustomers').append(sHtml);
    });
  },
  endApp: function(){
    console.log('End Application');
  }
};
//END - Application Object