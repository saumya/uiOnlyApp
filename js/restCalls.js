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
  updateCustomerProfile: function(customerID){},
  deleteCustomer: function(customerID){},
  end: function(){
    console.log('end : restCalls');
  }
};