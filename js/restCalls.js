console.log('restCalls.js');
var restCalls = {
  // GET: All customers
  getAllCustomers: function(){
    $.ajax({
      method: "GET",
      url: uRESTConfig.apiRootURI+uRESTConfig.customersURI,
      cache: false,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:getAllCustomers:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        appFirstObj.onGotAllCustomerData(data);
      },
    })
    .done(function(data){
      console.group('AJAX:getAllCustomers:done');
      console.log(data);
      console.groupEnd();
      appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:getAllCustomers:fail:',error);
    });
  },
  // POST: add new customer
  addNewCustomer: function(dataObj){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.addCustomer,
      data:dataObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:addNewCustomer:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
        appFirstObj.onNewCustomerAdded();
      },
    })
    .done(function(data){
      console.group('AJAX:addNewCustomer:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:addNewCustomer:fail:',error);
    });
  },
  updateCustomerProfile: function(customerID){ /* TODO */ },
  deleteCustomer: function(customerID){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.removeCustomer,
      data:customerID,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:deleteCustomer:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        appFirstObj.onCustomerRemoved();
      },
    })
    .done(function(data){
      console.group('AJAX:deleteCustomer:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
      //appFirstObj.onCustomerRemoved();
    })
    .fail(function(error){
      // First time it came here because of API problem
      // It is expecting JSON data but previous API was returning only a String
      // Once API returned JSON, it now goes to .done() and "success:"
      // :)
      console.log('AJAX:deleteCustomer:fail:',error);
    });
  },
  // ========================== PRODUCTS =============================
  getAllProducts: function(){
    return $.ajax({
      method: "GET",
      url: uRESTConfig.apiRootURI+uRESTConfig.allProducts,
      cache: false,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:getAllProducts:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
      },
    })
    .done(function(data){
      console.group('AJAX:getAllProducts:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:getAllProducts:fail:',error);
    });
  },
  addNewProduct: function(dataObj){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.addProduct,
      data:dataObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:addNewProduct:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
        //appFirstObj.onNewCustomerAdded();
        productsApp.onProductAdded();
      },
    })
    .done(function(data){
      console.group('AJAX:addNewProduct:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:addNewProduct:fail:',error);
    });
  },
  // ========================== / PRODUCTS =============================
  end: function(){
    console.log('end : restCalls');
  }
};