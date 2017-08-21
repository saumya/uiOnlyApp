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
  // Start Logic =========================
  var resultObj = restCalls.getAllProducts();
  resultObj.done(function(data){
    console.group('getAllProducts:done');
    console.log(data);
    console.groupEnd();
    //productsApp.ready();
    productsApp.onAppReadyWithProductsData(data);
  })
  //debugger;
  // End Logic ===========================
});//END: jQuery.ready()

// Application Logic

var productsApp = {
  isFirstTime: true,
  ready: function(){
    console.log('productsApp:ready');
  },
  onAppReadyWithProductsData: function(dataObj){
    console.group('onAppReadyWithProductsData');
    //
    console.log('onGotAllCustomerData');
    // clear the old data / whole data
    $('#idProductsList').empty();
    // add new/fresh data
    var total = dataObj.length;
    dataObj.map(function(cValue,cIndex,cArray){
      //console.log(cValue,cIndex,cArray);
      //console.log(cValue.name);
      var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div><div id=cust_"+cValue.id+" class='btnDeleteCustomer'>Delete</div></div>";
      $('#idProductsList').append(sHtml);
      //$('#idCustomers').prepend(sHtml);
    });
    $("#idTotal").html(total);
    //this.onAppReadyWithCustomerData();
    //
    if(this.isFirstTime===true){
      this.isFirstTime = false;
      console.log('============== Adding EventHandlers : Start ==============');
      $("#idBtnAddProduct").on('click',function(event){
        var pName = $("#idPName").val();
        var pPrice = $("#idPPrice").val();
        var pCompanyId = $("#idPCompanyId").val();
        console.log( pName,pPrice,pCompanyId );
        
        var ajaxResultObj = restCalls.addNewProduct({
          product_name:pName,
          product_price:pPrice,
          company_id:pCompanyId
        });

      });
      console.log('============== Adding EventHandlers : End ==============');
    } 
    console.groupEnd();
  },
  onProductAdded: function(){
    console.log('onProductAdded');

    var resultObj = restCalls.getAllProducts();
    resultObj.done(function(data){
      console.group('getAllProducts:done');
      console.log(data);
      console.groupEnd();
      //productsApp.ready();
      productsApp.onAppReadyWithProductsData(data);
    })

  },
  end:function(){}
}