console.log('app.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  var rootURL = "http://localhost:8888/slim/ui_app_1/";
  //Menu
  $('#id_menu_home').on('click',function(){
    //ref: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage
    //window.location.replace('http://msn.com');
    window.location.href = rootURL + 'home.html';
  });
  $('#id_menu_companies').on('click',function(){ window.location.href = rootURL + 'companies.html'; });
  $('#id_menu_customers').on('click',function(){ window.location.href = rootURL + 'customers.html'; });
  $('#id_menu_products').on('click',function(){ window.location.href = rootURL + 'products.html'; });
  //
  $('#idBtnProductBuy').on('click',function(){ window.location.href = rootURL + 'products_buy.html'; });
  $('#idBtnProductSell').on('click',function(){ window.location.href = rootURL + 'products_sell.html'; });
  //restCalls.getAllCustomers();
  console.log('%c version-' + appHome.getVersion().version +' ','background: #F00; color: #FFF');
  appHome.init();
});//END: jQuery.ready()

var appHome = {
  getVersion:function(){
    return {'version':'1.0.0'};
  },
  init: function(){
    console.log('appHome:init');
    var that = this;
    restCalls.getAllCustomers(that);
  },
  onGotAllCustomerData: function(resultObj){
    console.log('onGotAllCustomerData:',resultObj);
    var total = resultObj.length;
    $('#idTotal_Cust').html(total);
  },
  onAppReadyWithCustomerData: function(){
    console.log('%c Just a callback. Doing Nothing. ','background: #222; color: #bada55');
  },
  end:function(){
    console.log('AppHome : End');
  }
};