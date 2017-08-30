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
  deleteProduct: function(productObj){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.removeProduct,
      data:productObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:deleteProduct:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        productsApp.onProductRemoved();
      },
    })
    .done(function(data){
      console.group('AJAX:deleteProduct:done');
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
  // ========================== / PRODUCTS =============================
  // ========================== COMPANIES =============================
  getAllCompanies: function(){
    return $.ajax({
      method: "GET",
      url: uRESTConfig.apiRootURI+uRESTConfig.allCompanies,
      cache: false,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:getAllCompanies:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
      },
    })
    .done(function(data){
      console.group('AJAX:getAllCompanies:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:getAllCompanies:fail:',error);
    });
  },
  addNewCompany: function(dataObj){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.addCompany,
      data:dataObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:addNewCompany:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
        //appFirstObj.onNewCustomerAdded();
        companiesApp.onNewCompanyAdded();
      },
    })
    .done(function(data){
      console.group('AJAX:addNewCompany:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:addNewCompany:fail:',error);
    });
  },
  deleteCompany: function(companyObj){
    console.log('deleteCompany: ',companyObj);
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.removeCompany,
      data:companyObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:deleteCompany:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //
        companiesApp.onCompanyRemoved();
      },
    })
    .done(function(data){
      console.group('AJAX:deleteCompany:done');
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
  // ========================== / COMPANIES =============================
  // ==========================  BUY Product =============================
  addBuyProduct: function(dataObj){
    $.ajax({
      method: "POST",
      async: true,
      url: uRESTConfig.apiRootURI+uRESTConfig.buyProduct,
      data:dataObj,
      dataType:'json',
      success: function(data, textStatus, jqXHR){
        console.group('AJAX:addBuyProduct:Success');
        console.log(data);
        console.log('textStatus',textStatus);
        console.log('jqXHR',jqXHR);
        console.groupEnd();
        //appFirstObj.onGotAllCustomerData(data);
        //appFirstObj.onNewCustomerAdded();
        //companiesApp.onNewCompanyAdded();
      },
    })
    .done(function(data){
      console.group('AJAX:addBuyProduct:done');
      console.log(data);
      console.groupEnd();
      //appFirstObj.onAppReadyWithCustomerData();
    })
    .fail(function(error){
      console.log('AJAX:addBuyProduct:fail:',error);
    });
  },
  // ========================== / BUY Product =============================
  end: function(){
    console.log('end : restCalls');
  }
};