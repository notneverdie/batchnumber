
let app = new Vue({
    el: '#crudApp',
    data: {
        allData: [],
        allDataR:[],
        prodata:[],
        glovecolor:[],
        size:[],
        machine:[],
        machinedip:[],
        time:[],
        julian: '',
        dipR: [],
        dipL: [],
        checkedNames: [],
        message:'',
        getTwodigitYear: '',
        selectedDipL: [],
        selectedDipR: [],
    },
    methods: {
        async fetchAllData() {
            const res = await axios.post('control/actiongendiplot.php', {actions: 'fetchall'});  
            app.allData = res.data;
        },
        selectDipL(index){
            let found = false;
            for (let i = 0; i < this.selectedDipL.length; i++) {
                if(this.selectedDipL[i].DippingLot_L == this.allData[index].DippingLot_L){
                    this.selectedDipL.splice(i, 1);
                    found = true;
                } 
            }
            if(!found) this.selectedDipL.push(this.allData[index]);
        },
        validateDipL(index){
            if(this.allData[index].Batch1 == '') return true;
            if(this.allData[index].amt1 == '') return true;
            if(this.allData[index].Batch2 == '') return true;
            if(this.allData[index].amt2 == '') return true;
            if(this.allData[index].Batch3 == '') return true;
            if(this.allData[index].amt3 == '') return true;
            if(this.allData[index].Batch4 == '') return true;
            if(this.allData[index].amt4 == '') return true;
            if(this.allData[index].Batch5 == '') return true;
            if(this.allData[index].amt5 == '') return true;
            if(this.allData[index].Batch6 == '') return true;
            if(this.allData[index].amt6 == '') return true;
            return false;
        },
        lockIt(ex){
            let locked = false;
            this.selectedDipL.forEach(res => {
                if(res.DippingLot_L == ex) locked = true;
            });
            return locked;
        },
        async fetchAllDataR() {
            const res = await axios.post('control/actiongendiplot.php', {actions: 'fetchalldata'});  
            app.allDataR = res.data;
        },
        selectDipR(index){
            let found = false;
            for (let i = 0; i < this.selectedDipR.length; i++) {
                if(this.selectedDipR[i].DippingLot_R == this.allDataR[index].DippingLot_R){
                    this.selectedDipR.splice(i, 1);
                    found = true;
                } 
            }
            if(!found) this.selectedDipR.push(this.allDataR[index]);
        },

        calTotal(index)
        {
            var a = this.allDataR[index].amt1 != '' ? parseInt(this.allDataR[index].amt1) : 0;
            var b = this.allDataR[index].amt2 != '' ? parseInt(this.allDataR[index].amt2) : 0;
            var c = this.allDataR[index].amt3 != '' ? parseInt(this.allDataR[index].amt3) : 0;
            var d = this.allDataR[index].amt4 != '' ? parseInt(this.allDataR[index].amt4) : 0;
            var e = this.allDataR[index].amt5 != '' ? parseInt(this.allDataR[index].amt5) : 0;
            var f = this.allDataR[index].amt6 != '' ? parseInt(this.allDataR[index].amt6) : 0;
            this.allDataR[index].TotalPcs =  a + b + c + d + e + f;
        },
        calTotalR(index)
        {
            var a = this.allData[index].amt1 != '' ? parseInt(this.allData[index].amt1) : 0;
            var b = this.allData[index].amt2 != '' ? parseInt(this.allData[index].amt2) : 0;
            var c = this.allData[index].amt3 != '' ? parseInt(this.allData[index].amt3) : 0;
            var d = this.allData[index].amt4 != '' ? parseInt(this.allData[index].amt4) : 0;
            var e = this.allData[index].amt5 != '' ? parseInt(this.allData[index].amt5) : 0;
            var f = this.allData[index].amt6 != '' ? parseInt(this.allData[index].amt6) : 0;
            this.allData[index].TotalPcs =  a + b + c + d + e + f;
        },
        validateDipR(index){
            if(this.allDataR[index].Batch1 == '') return true;
            if(this.allDataR[index].amt1 == '') return true;
            if(this.allDataR[index].Batch2 == '') return true;
            if(this.allDataR[index].amt2 == '') return true;
            if(this.allDataR[index].Batch3 == '') return true;
            if(this.allDataR[index].amt3 == '') return true;
            if(this.allDataR[index].Batch4 == '') return true;
            if(this.allDataR[index].amt4 == '') return true;
            if(this.allDataR[index].Batch5 == '') return true;
            if(this.allDataR[index].amt5 == '') return true;
            if(this.allDataR[index].Batch6 == '') return true;
            if(this.allDataR[index].amt6 == '') return true;
            return false;
        },
        lockItR(ex){
            let lockedR = false;
            this.selectedDipR.forEach(res => {
                if(res.DippingLot_R == ex) lockedR = true;
            });
            return lockedR;
        },
        sendDipL(){          
            for (let i = 0; i < this.selectedDipR.length; i++)
            {
                localStorage.setItem('dipL',this.selectedDipL)
            }
             console.log(this.selectedDipL)
            // window.location.href = 'genproductlot.html';
        },
        sendDipR(){
            this.dipR = [];
            for (let i = 0; i < this.selectedDipR.length; i++)
            {
                this.dipR.push(this.selectedDipR)
                console.log(this.dipR)
            }
            window.location.href = 'genproductlot.html';

        },
        callmachinedip(){
       
            axios.post('control/actiongendiplot.php', 
            {
                actions: 'callmachinedip'
                
            }).then(res => {
                app.machinedip = res.data;
            })
        
            },
        calltime(){
       
            axios.post('control/actiongendiplot.php', 
            {
                actions: 'calltime'
                    
            }).then(res => {
                app.time = res.data;
            })
            },
            callproductdata(){
       
                axios.post('control/actiongendiplot.php', 
                {
                    actions: 'callproductdata'
                    
                }).then(res => {
                    app.prodata = res.data;
                })
            
           },
           callglovecolor(){
            axios.post('control/actiongendiplot.php', 
            {
                actions: 'callglovecolor'
                
            }).then(res => {
                app.glovecolor = res.data;
            })
        
            },
            callmachine(){
           
                axios.post('control/actiongendiplot.php', 
                {
                    actions: 'callmachine'
                    
                }).then(res => {
                    app.machine = res.data;
                })
            
                },
            callsize(){
           
                axios.post('control/actiongendiplot.php', 
                {
                    actions: 'callsize'
                        
                }).then(res => {
                    app.size = res.data;
                })
                },
       getJulianDate(){
            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            this.julian = day.toString().padStart(3, '0');
            return this.julian;
        },
         getYears()
        {
            var date = new Date(); // date object
            var getYear =  date.getFullYear(); // get current year
            this.getTwodigitYear = getYear.toString().substring(2); // get last two digits from year
            return this.getTwodigitYear; 
        },
       
        deleteData(id){
            if(confirm('Are you sure you want to delete')){
                axios.post('../control/actiongendiplot.php',{
                    actions: 'delete',
                    id: id
                }).then(res => {
                    app.fetchAllData();
                });
            }
        }
    },
    created()
    {
        this.fetchAllData();
        this.fetchAllDataR();
        this.callmachinedip();
        this.calltime();
        this.callproductdata();
        this.callglovecolor();
        this.callmachine();
        this.callsize();
        // if(localStorage.getItem('dipL'))
        // this.selectedDipL = localStorage.getItem('dipL').toString().split(',')
    },
})