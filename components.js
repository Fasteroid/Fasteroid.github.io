
// thx stackoverflow - code below based on https://stackoverflow.com/a/31837264/15204995
// now with less JQuery since I'm a vanilla purist!

let postprocessors = {
    /** 
     * The postprocessor for the navbar.
     * It finds the page we're on and perma-highlights it.
     * @param {Element} self - imported navbar
     */
    navbar: function(self){
        let pages = self.querySelector("#pages")
        let url = window.location.href.match(/[^\/]*$/)[0]; // I'd be a fool to recompute this repeatedly in the for loop
        for(let page of pages.children){
            if( page.getAttribute("href")?.match(/[^\/]*$/)[0] == url ){ // null safety
                page.className = "cwd";
                break; // there can only be one
            }
        }
    }
}


let includes = document.querySelectorAll("component")
$.each(includes, function () {
    let name = this.getAttribute("class");
    let file = `components/${name}.html`
    let self = this; // horrible
    $(this).load(file, 
        function(){ postprocessors[name](self) }    
    )
})
