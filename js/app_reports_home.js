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
  allData:{ soldData:{}, customersData:{}, productsData:{}, companiesData:{} },
  filterData:{ soldData:{}, boughtData:{} },
  init: function(){
    console.log('appReportHome:init');
    var that = this;
    $('#idBtnFilter').on('click',function(){ that.onFilterByDate(); });
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
    $('#id_totalTimesSold').html('Sold in total '+totalTimesSold+' transactions');
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
    console.log('================ renderWithAllData ===========');
    console.log(this.allData);
    $('#id_all_sold').html('');
    var that = this;
    this.allData.soldData.map(function(cValue,cIndex,cArray){
      //console.log(cValue);
      var sHtml = '';
      //var sHtml = "<div id="+cValue.id+" class='shortDetail'> <div>"+cValue.s_date+' : Nos.'+cValue.quantity+"</div> </div>";
      var i = 0; //products
      var j = 0; //Customers
      var k = 0; //Companies
      sHtml += "<div id="+cValue.id+" class='shortDetailDiv'> <span class='sDetails'>"+cValue.s_date+"</span><span class='sDetails'>"+cValue.quantity+"</span>";
      //
      for(i;i<that.allData.productsData.length;i++){
        //console.log(cValue.product_id,that.allData.productsData[i]);
        if(cValue.product_id === that.allData.productsData[i].id){
          //console.log('Product',that.allData.productsData[i]);
          sHtml += "<span class='sDetails'>"+that.allData.productsData[i].name+"</span>";
          
            for(k;k<that.allData.companiesData.length;k++){
              //console.log('==================== >>>');
              //console.log(that.allData.productsData[i].id_company,that.allData.companiesData[k].id);
              //console.log('<<< ====================');
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
      for(j;j<that.allData.customersData.length;j++){
        if(cValue.customer_id === that.allData.customersData[j].id){
          sHtml += "<span class='sDetails'>"+that.allData.customersData[j].name+"</span>";
          break;
        }
      }
      sHtml+='</div>';

      $('#id_all_sold').append(sHtml);
      //
      $('#id_totalCustomers').html(that.allData.customersData.length+' Customers / '+that.allData.productsData.length+' Products');
    });
  },
  onFilterByDate: function(){
    console.log('onFilterByDate');
    var that = this;
    var sDate = $('#idDate').val();
    restCalls.getByDateBoughtData(sDate,that);
    /*resultObj.sold.map(function(cValue,cIndex,cArray){
      console.log('sold',cValue);
    });
    resultObj.bought.map(function(cValue,cIndex,cArray){
      console.log('bought',cValue);
    });*/
  },
  onGotBoughtByDate: function(result){
    //console.log('onGotBoughtByDate');
    var that = this;
    this.filterData.boughtData = result;
    this.getSoldByDate();
  },
  getSoldByDate: function(){
    //console.log('getSoldByDate');
    var that = this;
    var sDate = $('#idDate').val();
    restCalls.getByDateSoldData(sDate,that);
  },
  onGotSoldByDate: function(result){
    //console.log('onGotSoldByDate');
    var that = this;
    this.filterData.soldData = result;
    console.log('this.filterData',this.filterData);
    this.renderFilterData();
  },
  renderFilterData: function(){
    var sHTML = '';
    sHTML += "<div class='shortDetailDiv'>";
    var nSold = 0;
    var nBought = 0;
    this.filterData.soldData.map(function(cValue,cIndex,cArray){
      //console.log('sold',cValue);
      nSold++;
      sHTML += "<div class='filterRowforSold'> CustomerID="+cValue.customer_id+':ProductID='+cValue.product_id+": Quantity-"+ cValue.quantity+':'+ cValue.s_date +"</div>";
    });
    this.filterData.boughtData.map(function(cValue,cIndex,cArray){
      nBought++;
      sHTML += "<div class='filterRowforBought'>ProductID="+cValue.product_id+": Quantity-"+ cValue.quantity+':'+ cValue.b_date +"</div>";
      //console.log('bought',cValue);
    });

    sHTML += "</div>";

    $('#id_filter_data').html('');
    $('#id_filter_data').html(sHTML);

    var sTotal = 'Bought='+nBought+' / Sold='+nSold;
    $('#id_filter_total').html(sTotal);
  },

  end:function(){
    console.log('AppHome : End');
  }
};