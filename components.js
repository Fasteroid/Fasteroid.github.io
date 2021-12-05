
// thx stackoverflow - code below based on https://stackoverflow.com/a/31837264/15204995
// now with less JQuery since I'm a vanilla purist!
let extractURL = /[^\/]*$/;
let postprocessors = {

    /** 
     * The postprocessor for the navbar.
     * It finds the page we're on and perma-highlights it.
     * @param {Element} self - imported navbar
     */
    navbar: function(self){

        let pages = self.querySelector("#pages");
        
        let url = window.location.href.match(extractURL)[0]; // I'd be a fool to recompute this repeatedly in the for loop
        for(let page of pages.children){

            // check normal links
            let type = page.getAttribute("class");
            if( type==null && page.getAttribute("href")?.match(extractURL)[0] == url ){ // null safety
                page.classList.add("cwd");
                return; // there can only be one
            }

            // check dropdowns
            if( type!=null ){
                let subpages = page.querySelector(".dropdown-content");
                for(let subpage of subpages.children){
                    if( subpage.getAttribute("href")?.match(extractURL)[0] == url ){
                        subpage.classList.add("cwd");
                        page.querySelector(".dropdown-head").classList.add("cwd");
                        return; // there can only be one
                    }
                }
            }
        }
    }

};


let includes = document.querySelectorAll("component");
$.each(includes, function () {
    let name = this.getAttribute("class");
    let file = `components/${name}.html`;
    let self = this; // horrible
    $(this).load(file, 
        function(){ postprocessors[name](self); }    
    );
});
