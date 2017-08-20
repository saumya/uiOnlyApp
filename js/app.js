console.log('app.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  restCalls.getAllCustomers();
});//END: jQuery.ready()