function applyHoverTap(){}

{

    let tapCounter = 0;

    /**
     * Intercepts and stops clicks if they're for the first time on an element
     * @param {HTMLElement} element
     * @param {PointerEvent} event
    */
    function handleHoverTap(element,event){
        if( element.hoverTap && element.blocking < 2 ){
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }

    function primeHoverTap(element){
        element.blocking = 0;
        element.hoverTap = true;
    }

    /**
     * Attach hovertap handlers to the element
     * @param {HTMLElement} element
    */
    applyHoverTap = function(element){
        element.addEventListener("touchstart", (event) => primeHoverTap(element), {once: true} ); // prime on first tap then remove
        element.addEventListener("touchstart", (event) => element.blocking++ ); // increment blocking state
        element.addEventListener("mouseleave", (event) => element.blocking = 0 ); // reset blocked state
        element.addEventListener("click", (event) => handleHoverTap(element,event), {capture: true, passive: false})
        
    }
    
}