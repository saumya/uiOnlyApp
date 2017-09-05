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
  logVersion: function(){
    console.log('%c version-' + this.getVersion().version +' ','background: #F00; color: #FFF');
  },
  allData:{ soldData:{}, customersData:{}, productsData:{} },
  init: function(){
    console.log('appHome:init');
    var that = this;
    restCalls.getAllSoldData(that);
  },
  onGotAllSoldData: function(resultData){
    console.log('onGotAllSoldData:',resultData);
    var that = this;
    //that.logVersion();
    //this.logVersion();
    var totalTimesSold = resultData.length;
    //console.log(this.allData);
    this.allData.soldData = resultData;
    //console.log(this.allData);
    //
    $('#id_totalTimesSold').html('Total '+totalTimesSold+' transactions');
    resultData.map(function(cValue,cIndex,cArray){
      //console.log(that.getVersion());
      
      //console.log(cValue);
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'><div> Customer ID = "+cValue.customer_id+": Product ID = "+cValue.product_id+"</div><div> Quantity = "+cValue.quantity+' : on '+cValue.s_date+"</div><div id=sold_"+cValue.id+" class='btnDelete'>Delete</div></div>";
      // Removed the DELETE button
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'><div> Customer ID = "+cValue.customer_id+": Product ID = "+cValue.product_id+"</div><div> Quantity = "+cValue.quantity+' : on '+cValue.s_date+"</div></div>";
      var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.s_date+' : Nos.'+cValue.quantity+"</div> </div>";
      $('#id_all_sold').append(sHtml);
    });
    //
    restCalls.getAllCustomers(that);
  },
  onGotAllCustomerData: function(resultObj){
    console.log('onGotAllCustomerData:',resultObj);
    this.allData.customersData = resultObj;
    /*
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
    */
    var that = this;
    var resultProducts = restCalls.getAllProducts(that);
    resultProducts.done(function(data){
      that.allData.productsData = data;
      that.renderWithAllData();
    });
  },
  onAppReadyWithCustomerData: function(){
    console.log('%c Just a callback. Doing Nothing. ','background: #222; color: #bada55');
  },
  renderWithAllData: function(){
    console.log('renderWithAllData');
    console.log(this.allData);
    $('#id_all_sold').html('');
    var that = this;
    this.allData.soldData.map(function(cValue,cIndex,cArray){
      //console.log(cValue);
      var sHtml = '';
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.s_date+' : Nos.'+cValue.quantity+"</div> </div>";
      var i = 0;
      var j = 0;
      sHtml += "<div id="+cValue.id+" class='shortDetail'> <div> <span class='sDetails'>"+cValue.s_date+"</span><span class='sDetails'>"+cValue.quantity+"</span>";
      //
      for(i;i<that.allData.productsData.length;i++){
        //console.log(cValue.product_id,that.allData.productsData[i]);
        if(cValue.product_id === that.allData.productsData[i].id){
          sHtml += "<span class='sDetails'>"+that.allData.productsData[i].name+"</span>";
          break;
        }
      }
      for(j;j<that.allData.customersData.length;j++){
        if(cValue.customer_id === that.allData.customersData[j].id){
          sHtml += "<span class='sDetails'>"+that.allData.customersData[j].name+"</span>";
          break;
        }
      }
      sHtml+='</div></div>';

      $('#id_all_sold').append(sHtml);
      //
      $('#id_totalCustomers').html(that.allData.customersData.length+' Customers / '+that.allData.productsData.length+' Products');
    });
  },
  end:function(){
    console.log('AppHome : End');
  }
};