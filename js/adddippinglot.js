let app = new Vue({
    el: '#crudApp',
    data: {
        allDataR: [],
        allData:[],
        $totalGlove:[],
        filtering: "",
        myModal: false,
        hiddenId: null,
        actionButton: 'Insert',
        dynamicTitle: 'Add data',
   
    },
    methods: {
        fetchAllDataR() {
            axios.post('../control/actioneditdiplot.php', {
                actions: 'fetchalldata'
                
            }).then(res => {
                app.allDataR = res.data;
            })
        },
        fetchAllData() {
            axios.post('../control/actioneditdiplot.php', {
                actions: 'fetchall'
                
            }).then(res => {
                app.allData = res.data;
            })
        },
              
      
        openModal(){
      
            app.dipping_lot='';
            app.Batch_1='';
            app.amt_1='';
            app.Batch_2='';
            app.amt_2='';
            app.Batch_3='';
            app.amt_3='';
            app.Batch_4='';
            app.amt_4='';
            app.Batch_5='';
            app.amt_5='';
            app.Batch_6='';
            app.amt_6='';
            app.total_glove='';
        app.actionButton='Insert';
        app.dynamicTitle ='Add Data';
        app.myModal = true;
       },
       submitData:function(){
        if(app.Batch_1 == '' || app.amt_1 == '')
        {
            alert('กรุณากรอกข้อมูล Batch_1 && AMT_1');

            window.location.reload(); 
        }
        else
        {      
                if(app.actionButton == 'Update'){
                    axios.post('../control/actioneditdiplot.php',{
                        actions: 'update',
                       
                        dipLot:app.dipping_lot,
                        Batch1:app.Batch_1,
                        Amt1:app.amt_1,
                        Batch2:app.Batch_2,
                        Amt2:app.amt_2,
                        Batch3:app.Batch_3,
                        Amt3:app.amt_3,
                        Batch4:app.Batch_4,
                        Amt4:app.amt_4,
                        Batch5:app.Batch_5,
                        Amt5:app.amt_5,
                        Batch6:app.Batch_6,
                        Amt6:app.amt_6,
                        TotalGlove:app.total_glove,
                        hiddenId: app.hidden_id
                    }).then(res => {
                        app.myModal = false;
                        app.fetchAllData();
                        app.Production_Lot='';
                        app.dipping_lot='';
                        app.Batch_1='';
                        app.amt_1='';
                        app.Batch_2='';
                        app.amt_2='';
                        app.Batch_3='';
                        app.amt_3='';
                        app.Batch_4='';
                        app.amt_4='';
                        app.Batch_5='';
                        app.amt_5='';
                        app.Batch_6='';
                        app.amt_6='';
                        app.total_glove='';
                        app.hidden_id='';
                        alert(res.data.message);
                        window.location.reload();
                    })
                }
               
        }
       },
       fetchDataR(id){
           axios.post('../control/actioneditdiplot.php',{
               actions: 'fetchSingleR',
               id: id
           }).then(res => {
                app.ProductionLot=res.data.ProductionLot;
                app.dipping_lot=res.data.dipping_lot;
                app.Batch_1=res.data.Batch_1;
                app.amt_1=res.data.amt_1;
                app.Batch_2=res.data.Batch_2;
                app.amt_2=res.data.amt_2;
                app.Batch_3=res.data.Batch_3;
                app.amt_3=res.data.amt_3;
                app.Batch_4=res.data.Batch_4;
                app.amt_4=res.data.amt_4;
                app.Batch_5=res.data.Batch_5;
                app.amt_5=res.data.amt_5;
                app.Batch_6=res.data.Batch_6;
                app.amt_6=res.data.amt_6;
                app.total_glove=res.data.total_glove;
               app.hidden_id = res.data.id;
               app.myModal = true;
               app.actionButton = 'Update';
               app.dynamicTitle = 'Edit Data';
           })
       },
       fetchData(id){
        axios.post('../control/actioneditdiplot.php',{
            actions: 'fetchSingle',
            id: id
        }).then(res => {
             app.ProductionLot=res.data.ProductionLot;
             app.dipping_lot=res.data.dipping_lot;
             app.Batch_1=res.data.Batch_1;
             app.amt_1=res.data.amt_1;
             app.Batch_2=res.data.Batch_2;
             app.amt_2=res.data.amt_2;
             app.Batch_3=res.data.Batch_3;
             app.amt_3=res.data.amt_3;
             app.Batch_4=res.data.Batch_4;
             app.amt_4=res.data.amt_4;
             app.Batch_5=res.data.Batch_5;
             app.amt_5=res.data.amt_5;
             app.Batch_6=res.data.Batch_6;
             app.amt_6=res.data.amt_6;
             app.total_glove=res.data.total_glove;
            app.hidden_id = res.data.id;
            app.myModal = true;
            app.actionButton = 'Update';
            app.dynamicTitle = 'Edit Data';
        })
    },

       deleteData(id){
           if(confirm('Are you sure you want to delete')){
               axios.post('../control/actioneditdiplot.php',{
                   actions: 'delete',
                   id: id
               }).then(res => {
                   app.fetchAllData();
                //    alert(res.data.message);
               });
           }
       },
       getJulianDate(){
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        this.julian = day.toString().padStart(3, '0');
        return this.julian;
    }
   
  
       
   
    },
    created() {
        this.fetchAllDataR();
        this.fetchAllData();
        // this.callproductlot();
        // this.calltimeshift();
       
    },
    mounted(){
        // console.log(app.allData.length);
    },
    computed: {
      
  


        filteredRows()
        {
        return this.allDataR.filter(row => 
            {
            const productLot = row.ProductionLot.toLowerCase();
            const dippingLotR = row.DippingLot_R.toLowerCase();
           

            const searchTerm = this.getJulianDate();

        return (
            productLot.includes(searchTerm)      ||
            dippingLotR.includes(searchTerm)      
           
               );
            
            });
        },
        filteredRowsL()
        {
        return this.allData.filter(row => 
            {
            const productLot = row.ProductionLot.toLowerCase();
            const dippingLotL = row.DippingLot_L.toLowerCase();
           

            const searchTerm = this.getJulianDate();

        return (
            productLot.includes(searchTerm)      ||
            dippingLotL.includes(searchTerm)      
            
               );
            
            });
        }
      
    }
   
})