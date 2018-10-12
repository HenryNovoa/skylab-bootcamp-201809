function SearchComponent(title, tag) {
    Panel.call(this, title, tag);
    
    var self = this;

    this.viewEngine = new viewSearchComponent(this);
    
    this.viewEngine.render($("#wrap").first());

    this.getList = function(val){

        var service = new ServiceFactory();
        service.getList(val, function(resp){
    
            if (resp instanceof Error)
                listBeers.setList([]);
                     
            
            listBeers.setList(resp);

        });
    }

    this.deleteSearch = function(){

        listBeers.deleteSearch();
        this.viewEngine.resetForm();
       
    }
}

SearchComponent.prototype = Object.create(Panel.prototype);
SearchComponent.prototype.constructor = SearchComponent;