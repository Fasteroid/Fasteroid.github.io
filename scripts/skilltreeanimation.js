const container = document.querySelector(".grid")
container.childNodes.forEach( (child) => {

    console.log(child)

    if(child.firstChild.innerText != "START"){
        child.style.opacity = 0;
    }
    
} )