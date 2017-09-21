var filterTable = document.getElementById("filter");
    var filterInput = document.getElementById("table-filter");
    var rows = filterTable.childNodes;
    
    var start = 0;
    var offset = 25;
    var page = 1;
    
    function pagination(){
        
        var n = 1
        var bg = "#eee";
        var c = 1;
        
        for(var i = 0; i < rows.length; i++) {
            
            if(rows[i].dataset.on==="true") { n++; }
            
            if((n>start) && (n<offset) && rows[i].dataset.on==="true"){
                if(bg=="#eee") { bg = "#fff"; } else { bg = "#eee"; }
                rows[i].style.display = '';
                rows[i].style.backgroundColor = bg;
            } else {
                rows[i].style.display = 'none';
            }
        }
                
        var n = Math.ceil(n/25);
        var html = "";
        
        for(var i=1; i < n+1; i++) { 
            
            if(i==page) { var style = 'style="background:SteelBlue;color:#fff;text-decoration:underline;border:none;padding:7px;margin-right:3px;"'; } 
            else { var style = "style='background:#eee;border:none;padding:7px;margin-right:3px;'"; }
            html += "<button class='paginator' data-page='"+i+"' "+style+">"+i+"</button>"; 
        }
        
        var pages = document.getElementById("pagination");
        pages.innerHTML = html;
        
        for(var i=0; i < pages.childNodes.length; i++) {
            pages.childNodes[i].onclick = function(e){
                e.preventDefault();
                page = this.dataset.page
                start = (page*25)-25;
                offset = (page*25);
                pagination();
            };
        }
        return false;
        
    }
    
    
    
    
    filterInput.onkeyup = function(){
        
        var q = this.value;
        
        for(var i = 0; i < rows.length; i++) {
            var testHTML = rows[i].innerHTML.replace(/<[^>]*>/g, " ").toLowerCase();
            
            if((testHTML.indexOf(q.toLowerCase()) !== -1)) {
                rows[i].dataset.on = "true";
                // rows[i].style.display = '';
                
            } else {
                // rows[i].style.display = 'none';
                rows[i].dataset.on = "false";
            }
        }
        
        pagination();
    }
    
    function load(){
        for(var i = 0; i < rows.length; i++) {
            rows[i].dataset.on="true"
        }
        pagination();
    }
    
    load();
