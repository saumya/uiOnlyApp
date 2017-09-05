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
  $('#idBtnReports').on('click',function(){ window.location.href = rootURL + 'reports_home.html'; });
  //
  //restCalls.getAllCustomers();
  console.log('%c version-' + appReportHome.getVersion().version +' ','background: #F00; color: #FFF');
  appReportHome.init();
});//END: jQuery.ready()

var appReportHome = {
  getVersion:function(){
    return {'version':'1.0.0'};
  },
  init: function(){
    console.log('appHome:init');
    var that = this;
    restCalls.getAllSoldData(that);
  },
  onGotAllSoldData: function(resultData){
    console.log('onGotAllSoldData:',resultData);
    var totalTimesSold = resultData.length;
    $('#id_totalTimesSold').html('Total '+totalTimesSold+' times Sold.');
    resultData.map(function(cValue,cIndex,cArray){
      console.log(cValue);
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'><div> Customer ID = "+cValue.customer_id+": Product ID = "+cValue.product_id+"</div><div> Quantity = "+cValue.quantity+' : on '+cValue.s_date+"</div><div id=sold_"+cValue.id+" class='btnDelete'>Delete</div></div>";
      // Removed the DELETE button
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'><div> Customer ID = "+cValue.customer_id+": Product ID = "+cValue.product_id+"</div><div> Quantity = "+cValue.quantity+' : on '+cValue.s_date+"</div></div>";
      var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.s_date+' : Nos.'+cValue.quantity+"</div> </div>";
      $('#id_all_sold').append(sHtml);
    });
  },
  onGotAllCustomerData: function(resultObj){
    console.log('onGotAllCustomerData:',resultObj);
    var total = resultObj.length;
    $('#idTotal_Cust').html(total);
    var resultObjProducts = restCalls.getAllProducts();
    resultObjProducts.done(function(resultData){
      var totalProducts = resultData.length;
      $('#idTotal_Products').html(totalProducts);
    });
    var resultObjCompanies = restCalls.getAllCompanies();
    resultObjCompanies.done(function(resultdata){
      var totalCompanies = resultdata.length;
      $('#idTotal_Companies').html(totalCompanies);
    });
  },
  onAppReadyWithCustomerData: function(){
    console.log('%c Just a callback. Doing Nothing. ','background: #222; color: #bada55');
  },
  end:function(){
    console.log('AppHome : End');
  }
};