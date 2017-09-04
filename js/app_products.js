console.log('app_products.js');
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
  //$('#id_menu_products').on('click',function(){ window.location.href = rootURL + 'products.html'; });
  //Menu-End

  // Start Logic =========================
  var resultObj = restCalls.getAllProducts();
  resultObj.done(function(dataProducts){
    console.group('getAllProducts:done');
    console.log(dataProducts);
    console.groupEnd();
    //productsApp.ready();
    //productsApp.onAppReadyWithProductsData(data);

    var resultObjCompanies = restCalls.getAllCompanies();
    resultObjCompanies.done(function(dataCompanies){
      console.group('getAllCompanies:done');
      console.log(dataCompanies);
      console.groupEnd();

      productsApp.onAppReadyWithProductsData(dataProducts, dataCompanies);
    });

  });

  
  //debugger;
  // End Logic ===========================
});//END: jQuery.ready()

// Application Logic

var productsApp = {
  isFirstTime: true,
  ready: function(){
    console.log('productsApp:ready');
  },
  onAppReadyWithProductsData: function(dataProducts, dataCompanies){
    console.group('onAppReadyWithProductsData');
    console.log('products',dataProducts);
    console.log('companies',dataCompanies);
    //
    console.log('onGotAllCustomerData');
    // clear the old data / whole data
    $('#idProductsList').empty();
    // add new/fresh data
    var total = dataProducts.length;
    dataProducts.map(function(cValue,cIndex,cArray){
      //console.log(cValue,cIndex,cArray);
      //console.log(cValue.name);
      var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.name+":"+cValue.price+"</div><div>Company Id:"+cValue.id_company+"</div><div id=cust_"+cValue.id+" class='btnDelete'>Delete</div></div>";
      $('#idProductsList').append(sHtml);
      //$('#idCustomers').prepend(sHtml);
    });
    $("#idTotal").html(total);
    //
    if(this.isFirstTime===true){
      this.isFirstTime = false;
      console.log('============== Adding EventHandlers : Start ==============');

      // Filling out the Company Selections
      console.log('==========================');
      var totalCompanies = dataCompanies.length;
      console.log('totalCompanies',totalCompanies);
      $('#idTotalCompanies').html(totalCompanies);
      dataCompanies.map(function(cValue,cIndex,cArray){
        var sHtml = '<option value="'+cValue.id+'">'+cValue.name+'</option>';
        $('#idPCompanyNameId').append(sHtml); 
      });

      $("#idBtnAddProduct").on('click',function(event){
        var pName = $("#idPName").val();
        var pPrice = $("#idPPrice").val();
        //var pCompanyId = $("#idPCompanyId").val();
        var pCompanyId = $("#idPCompanyNameId").val();
        console.log( pName,pPrice,pCompanyId );
        
        var ajaxResultObj = restCalls.addNewProduct({
          product_name:pName,
          product_price:pPrice,
          company_id:pCompanyId
        });

        /*
        var aaa = $("#idPCompanyNameId");
        aaa.append("<option value="value1">Value 1</option>");
        */

      });
      console.log('============== Adding EventHandlers : End ==============');
    } 

    //
    $(".btnDeleteProduct").on('click',function(eventObj){
      //debugger;
      //console.log('shortDetail:click:',eventObj);
      //console.log(eventObj.currentTarget);
      
      var tID = eventObj.currentTarget.id; // cust_234
      var productID = tID.substr(5); //cust_ , 234
      console.log('productID',productID);
      restCalls.deleteProduct({id:productID});
      //var resultObjProducts = restCalls.deleteProduct({id:productID});
      //resultObjProducts.success(function(){});
    });
    //
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
  onProductRemoved: function(){
    console.log('onProductRemoved');
    var resultObj = restCalls.getAllProducts();
    resultObj.done(function(dataProducts){
      console.group('getAllProducts:done');
      console.log(dataProducts);
      console.groupEnd();
      //productsApp.ready();
      //productsApp.onAppReadyWithProductsData(data);
  
      var resultObjCompanies = restCalls.getAllCompanies();
      resultObjCompanies.done(function(dataCompanies){
        console.group('getAllCompanies:done');
        console.log(dataCompanies);
        console.groupEnd();
  
        productsApp.onAppReadyWithProductsData(dataProducts, dataCompanies);
      });
  
    });
  },
  end:function(){
    console.log('app_products : end');
  }
}