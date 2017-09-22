class Page {
    constructor(opt){
        this.data = JSON.parse($("#DataSet").val());
        this.init();
        this.bdSet();
    }

    init(){
        console.log(this.data);
    }

    bdSet(){
        
    }
}

var page = new Page();



