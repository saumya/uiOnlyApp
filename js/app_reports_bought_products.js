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
  appBoughtReport.logVersion();
  appBoughtReport.init();
});//END: jQuery.ready()

var appBoughtReport = {
  getVersion:function(){
    return {'version':'1.0.0'};
  },
  logVersion: function(){
    console.log('%c version-' + this.getVersion().version +' ','background: #F00; color: #FFF');
  },
  allData:{ boughtData:{}, customersData:{}, productsData:{}, companiesData:{} },
  init: function(){
    console.log('appBoughtReport:init');
    var that = this;
    //restCalls.getAllBoughtData(that.onGotAllBoughtData); // callback
    restCalls.getAllBoughtData(that); // scope
  },
  onGotAllBoughtData: function(resultData){
    console.log('onGotAllBoughtData');
    var that = this;
    var totalBoughtTransactions = resultData.length;
    this.allData.boughtData = resultData;
    $('#id_totalTimesSold').html('Bought in '+totalBoughtTransactions+' transactions');
    resultData.map(function(cValue,cIndex,cArray){
      var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.b_date+' : Nos.'+cValue.quantity+"</div> </div>";
      $('#id_all_sold').append(sHtml);
    });
    restCalls.getAllCustomers(that);
  },
  onGotAllCustomerData: function(resultObj){
    console.log('onGotAllCustomerData:',resultObj);
    this.allData.customersData = resultObj;
    var that = this;
    var resultProducts = restCalls.getAllProducts(that);
    resultProducts.done(function(data){
      that.allData.productsData = data;
      that.onGotAllProductsData();
    });
  },
  onGotAllProductsData: function(){
    console.log('onGotAllProductsData');
    var that = this;
    var result = restCalls.getAllCompanies();
    result.done(function(resultData){
      that.allData.companiesData = resultData;
      that.onGotAllCompaniesData();
    });
  },
  onGotAllCompaniesData: function(){
    console.log('onGotAllCompaniesData');
    this.renderWithAllData();
  },
  onAppReadyWithCustomerData: function(){
    console.log('%c Just a callback. Doing Nothing. ','background: #222; color: #bada55');
  },
  renderWithAllData: function(){
    //console.clear();
    console.log('================ renderWithAllData ===========');
    console.log(this.allData);
    $('#id_all_sold').html('');
    var that = this;
    this.allData.boughtData.map(function(cValue,cIndex,cArray){
      //console.log(cValue);
      var sHtml = '';
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.s_date+' : Nos.'+cValue.quantity+"</div> </div>";
      var i = 0; //products
      var j = 0; //Customers
      var k = 0; //Companies
      sHtml += "<div id="+cValue.id+" class='shortDetailDiv'> <span class='sDetails'>"+cValue.b_date+"</span><span class='sDetails'>"+cValue.quantity+"</span>";
      //
      for(i;i<that.allData.productsData.length;i++){
        //console.log(cValue.product_id,that.allData.productsData[i].id);
        if(cValue.product_id === that.allData.productsData[i].id){
          //console.log(cValue.product_id,that.allData.productsData[i].id);
          //console.log('Product',that.allData.productsData[i]);
          sHtml += "<span class='sDetails'>"+that.allData.productsData[i].name+"</span>";
            for(k;k<that.allData.companiesData.length;k++){
              /*
              console.log('==================== >>>');
              console.log(that.allData.productsData[i].id_company,that.allData.companiesData[k].id);
              console.log('<<< ====================');
              */
              //console.log(cValue.product_id,that.allData.productsData[i].id_company);
              if(that.allData.productsData[i].id_company === that.allData.companiesData[k].id){
                //console.log('===============',that.allData.companiesData[k].name+'===========');
                sHtml += "<span class='sDetails'>"+that.allData.companiesData[k].name+"</span>";
                break;
              }else{
                sHtml += "<span class='sDetails'> - NA - </span>";
                break;
              }
            }
          break;
        }
      }
      /*
      for(j;j<that.allData.customersData.length;j++){
        if(cValue.customer_id === that.allData.customersData[j].id){
          sHtml += "<span class='sDetails'>"+that.allData.customersData[j].name+"</span>";
          break;
        }
      }
      */

      sHtml+='</div>';

      $('#id_all_sold').append(sHtml);
      //
      $('#id_totalCustomers').html(that.allData.customersData.length+' Customers / '+that.allData.productsData.length+' Products');
    });
  },
  end:function(){
    console.log('AppHome : End');
  }
};