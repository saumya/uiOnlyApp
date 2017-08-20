console.log('first.js');
//START - Application Object
var appFirstObj = {
  isFirstTime:true,
  onGotAllCustomerData: function(dataObj){
    console.log('onGotAllCustomerData');
    var total = dataObj.length;
    dataObj.map(function(cValue,cIndex,cArray){
      //console.log(cValue,cIndex,cArray);
      //console.log(cValue.name);
      var sHtml = "<div class='shortDetail'><div>"+cValue.id+":"+cValue.name+":"+cValue.phone+"</div><div>"+cValue.address+"</div></div>";
      $('#idCustomers').append(sHtml);
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
      console.log('============== Adding EventHandlers : End ==============');
    }
    
    
    console.groupEnd();
  },
  onNewCustomerAdded: function(){
    restCalls.getAllCustomers();
  },
  endApp: function(){
    console.log('End Application');
  }
};
//END - Application Object