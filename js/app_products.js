console.log('app_products.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  //Menu
  $('#id_menu_home').on('click',function(){
    //ref: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage
    //window.location.replace('http://msn.com');
    window.location.href = 'http://localhost:8888/slim/ui_app_1/home.html';
  });
  $('#id_menu_customers').on('click',function(){ window.location.href = 'http://localhost:8888/slim/ui_app_1/customers.html'; });
  //$('#id_menu_products').on('click',function(){ window.location.href = 'http://localhost:8888/slim/ui_app_1/products.html'; });
  // Get the Customers data
  //restCalls.getAllCustomers();
});//END: jQuery.ready()