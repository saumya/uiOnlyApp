console.log('app_products_sold.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  
  //Menu-Start
  var rootURL = "http://localhost:8888/slim/ui_app_1/";
  $('#id_menu_home').on('click',function(){
    //ref: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage
    //window.location.replace('http://msn.com');
    window.location.href = rootURL + 'home.html';
  });
  $('#id_menu_companies').on('click',function(){ window.location.href = rootURL + 'companies.html'; });
  $('#id_menu_customers').on('click',function(){ window.location.href = rootURL + 'customers.html'; });
  $('#id_menu_products').on('click',function(){ window.location.href = rootURL + 'products.html'; });
  //Menu-End

  // Start Logic =========================
  
  var resultObj = restCalls.getAllProducts();
  resultObj.done(function(dataProducts){
    //console.group('getAllProducts:done');
    //console.log(dataProducts);
    //console.groupEnd();
    productsSoldApp.onAppReadyWithProductsData(dataProducts);
  });
  //debugger;
  // End Logic ===========================
});//END: jQuery.ready()

// Application Logic

var productsSoldApp = {
  isFirstTime: true,
  allProducts:'Nothing',
  ready: function(){
    console.log('productsApp:ready');
  },
  onAppReadyWithProductsData: function(dataProducts){
    console.group('onAppReadyWithProductsData');
    console.log('products',dataProducts);
    console.log('allProducts',this.allProducts);
    this.allProducts = dataProducts;
    console.log('allProducts',this.allProducts);
    //console.log('companies',dataCompanies);
    //
    console.log('onGotAllCustomerData');
    // clear the old data / whole data
    $('#idProductsList').empty();
    // add new/fresh data
    var totalProduct = dataProducts.length;
    dataProducts.map(function(cValue,cIndex,cArray){
      //var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.id+'::'+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div><div id=cust_"+cValue.id+" class='btnDeleteProduct'>Delete</div></div>";
      /*
      // removed the DELETE button
      //var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.id+'::'+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div></div>";
      var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.name+":"+cValue.price+"</div></div>";
      $('#idProductsList').append(sHtml);
      */
      //$('#idCustomers').prepend(sHtml);
      var sHtml = '<option value="'+cValue.id+'">'+cValue.name+'</option>';
      $('#idProductNameId').append(sHtml);
    });
    //$("#idTotal").html(totalProduct);
    //var resultObj = restCalls.getAllProducts();
    var that = this;
    var resultForAllCustomers = restCalls.getAllCustomers(that);
    //
    if(this.isFirstTime===true){
      this.isFirstTime = false;
      console.log('============== Adding EventHandlers : Start ==============');
      // $("#idDate").val("2016-09-12");
      // saving SCOPE in a variable
      var that = this;
      //
      $("#idBtnAddSoldProduct").on('click',{scope:that},function(event){
        var scope = event.data.scope;
        var pId = $('#idProductNameId').val();
        var pPrice = $("#idPPrice").val();
        var pDate = $("#idDate").val();
        var pPersonId = $('#idPersonNameId').val();
        console.log( pId,pPrice,pDate,pPersonId );
        
        var ajaxResultObj = restCalls.addSellProduct({
          sold_id:pId,
          sold_to_person_id:pPersonId,
          sold_quantity:pPrice,
          sold_date:pDate
        });
        

      });
      //sending 'scope' to Jquery-event handler
      $('#idProductNameId').on('change',{scope:that},function(eventObject){
        var currentValue = this.value;
        var allEventData = eventObject.data;
        var scope = allEventData.scope;
        var allProducts = scope.allProducts;
        // UI updating the price
        allProducts.map(function(cValue,cIndex,cArray){
          if(cValue.id === currentValue){
            $('#idProductPrice').html(cValue.price);
            return true;
          }
        });
      });
      console.log('============== Adding EventHandlers : End ==============');
    }
    console.groupEnd();
  },
  onGotAllCustomerData: function(resultData){
    console.log('onGotAllCustomerData');
    console.log(resultData);
    resultData.map(function(cValue,cIndex,cArray){
      //var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.id+'::'+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div><div id=cust_"+cValue.id+" class='btnDeleteProduct'>Delete</div></div>";
      // removed the DELETE button
      //var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.id+'::'+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div></div>";
      //$('#idProductsList').append(sHtml);
      //$('#idCustomers').prepend(sHtml);
      var sHtml = '<option value="'+cValue.id+'">'+cValue.name+'</option>';
      $('#idPersonNameId').append(sHtml);
    });
  },
  onAppReadyWithCustomerData: function(){
    var infoCSS = 'background: #222; color: #bada55';
    console.log('%c onAppReadyWithCustomerData. ',infoCSS);
    console.log('%c Just a callback. Doing Nothing. ',infoCSS);
  },
  onSellSuccess: function(){
    console.log('onSellSuccess');
    alert('Successfuly Sold!');
  },
  end:function(){
    console.log('app_products : end');
  }
}