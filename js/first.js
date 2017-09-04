console.log('first.js : Customers');
// ================== Customers =======================
//START - 
var appFirstObj = {
  isFirstTime:true,
  init: function(){
    var that = this;
    restCalls.getAllCustomers(that);
  },
  onGotAllCustomerData: function(dataObj){
    console.log('onGotAllCustomerData');
    // clear the old data / whole data
    $('#idCustomersList').empty();
    // add new/fresh data
    var total = dataObj.length;
    dataObj.map(function(cValue,cIndex,cArray){
      //console.log(cValue,cIndex,cArray);
      //console.log(cValue.name);
      var sHtml = "<div id=cust_"+cValue.id+" class='shortDetail'><div>"+cValue.name+":"+cValue.phone+"</div><div>"+cValue.address+"</div><div id=cust_"+cValue.id+" class='btnDelete'>Delete</div></div>";
      $('#idCustomersList').append(sHtml);
      //$('#idCustomers').prepend(sHtml);
    });
    $("#idTotalCustomers").html(total);
    //this.onAppReadyWithCustomerData();
  },
  onAppReadyWithCustomerData: function(){
    console.group('onAppReadyWithCustomerData');
    
    if(this.isFirstTime===true){
      this.isFirstTime = false;
      console.log('============== Adding EventHandlers : Start ==============');
      $("#idBtnAddCustomer").on('click',function(event){
        var uName = $("#idUName").val();
        var uPhone = $("#idUPhone").val();
        var uAddress = $("#idUAddress").val();
        console.log( uName,uPhone,uAddress );
        restCalls.addNewCustomer({
          customerName:uName,
          customerPhone:uPhone,
          customerAddress:uAddress
        });
      });
      /*
      $(".shortDetail").on('click',function(eventObj){
        //debugger;
        //console.log('shortDetail:click:',eventObj);
        //console.log(eventObj.currentTarget);
        var tID = eventObj.currentTarget.id; // cust_234
        var customerID = tID.substr(5); //cust_ , 234
        console.log('customerID',customerID);
        restCalls.deleteCustomer({ id:customerID }); 
      });
      */
      console.log('============== Adding EventHandlers : End ==============');
    }

    //$(".shortDetail").on('click',function(eventObj){
    $(".btnDeleteCustomer").on('click',function(eventObj){
      //debugger;
      //console.log('shortDetail:click:',eventObj);
      //console.log(eventObj.currentTarget);
      
      var tID = eventObj.currentTarget.id; // cust_234
      var customerID = tID.substr(5); //cust_ , 234
      console.log('customerID',customerID);
      restCalls.deleteCustomer({ id:customerID }); 
    });
    
    
    console.groupEnd();
  },
  onNewCustomerAdded: function(){
    var that = this;
    restCalls.getAllCustomers(that);
  },
  onCustomerRemoved: function(){
    var that = this;
    restCalls.getAllCustomers(that);
  },
  endApp: function(){
    console.log('End Application');
  }
};
//END - Application Object