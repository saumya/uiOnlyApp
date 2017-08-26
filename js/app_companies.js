console.log('app_products.js');
//jQuery Entry - jQuery.ready()
$(function(){
  console.log('loaded');
  
  //Menu-Start
  var rootURL = "http://localhost:8888/slim/ui_app_1/";

  $('#id_menu_home').on('click',function(){ window.location.href = rootURL + 'home.html'; });
  //$('#id_menu_companies').on('click',function(){ window.location.href = rootURL + 'companies.html'; });
  $('#id_menu_customers').on('click',function(){ window.location.href = rootURL + 'customers.html'; });
  $('#id_menu_products').on('click',function(){ window.location.href = rootURL + 'products.html'; });
  //Menu-End

  // Start Logic =========================

  var resultObj = restCalls.getAllCompanies();

  resultObj.done(function(dataProducts){
    console.group('getAllCompanies:done');
    console.log(dataProducts);
    console.groupEnd();
    //productsApp.ready();
    //productsApp.onAppReadyWithProductsData(data);

    var resultObjCompanies = restCalls.getAllCompanies();
    resultObjCompanies.done(function(dataCompanies){
      console.group('getAllCompanies:done');
      console.log(dataCompanies);
      console.groupEnd();
      //companiesApp.onAppReadyWithProductsData(dataProducts, dataCompanies);
      companiesApp.onAppReadyWithCompaniesData(dataCompanies);
    });
  });
  //debugger;
  // End Logic ===========================
});//END: jQuery.ready()

// Application Logic

var companiesApp = {
  isFirstTime: true,
  ready: function(){
    console.log('productsApp:ready');
  },
  onAppReadyWithCompaniesData: function(dataCompanies){
    console.group('onAppReadyWithCompaniesData');
    console.log('companies',dataCompanies);
    console.groupEnd();

    $('#idCompaniesList').empty();
    var total = dataCompanies.length;
    dataCompanies.map(function(cValue,cIndex,cArray){
      var sHtml = "<div class='shortDetail'><div>"+cValue.id +':'+ cValue.name+"<div></div>"+cValue.note+"</div><div id=comp_"+cValue.id+" class='btnDeleteCompany'>Delete</div></div>";
      $('#idCompaniesList').append(sHtml);
    });
    $("#idTotalCompanies").html(total);
    // ===============================
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

      $("#idBtnAddCompany").on('click',function(event){
        var cName = $("#idUName").val();
        var cNote = $("#idUNote").val();
        console.log( cName,cNote );
        
        var ajaxResultObj = restCalls.addNewCompany({ cname:cName, cnote:cNote });
        
      });
    // ===============================
    }
    //
    $(".btnDeleteCompany").on('click',function(eventObj){
      //debugger;
      //console.log('shortDetail:click:',eventObj);
      //console.log(eventObj.currentTarget);
      
      var tID = eventObj.currentTarget.id; // cust_234
      var companyID = tID.substr(5); //cust_ , 234
      console.log('companyID',companyID);
      //restCalls.deleteProduct({id:productID});
      //var resultObjProducts = restCalls.deleteProduct({id:productID});
      //resultObjProducts.success(function(){});
      var resultObj = restCalls.deleteCompany({id:companyID});
    });
    //
  },
  onNewCompanyAdded: function(){
    console.log('onNewCompanyAdded');

    var resultObj = restCalls.getAllCompanies();
    resultObj.done(function(data){
      console.group('getAllProducts:done');
      console.log(data);
      console.groupEnd();
      //productsApp.ready();
      companiesApp.onAppReadyWithCompaniesData(data);
    })
  },
  onCompanyRemoved: function(){
    console.log('onCompanyRemoved');
    var resultObj = restCalls.getAllCompanies();
    resultObj.done(function(dataCompanies){
      console.group('getAllCompanies:done');
      console.log(dataCompanies);
      console.groupEnd();
      companiesApp.onAppReadyWithCompaniesData(dataCompanies);
    });
  },
  end:function(){
    console.log('app_products : end');
  }
}