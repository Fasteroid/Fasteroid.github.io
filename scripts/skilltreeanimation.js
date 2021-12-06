const container = document.querySelector(".grid")
container.querySelectorAll(".grid > div").forEach( (child,n) => {

    console.log(child)

    if(n > 0){
        child.style.opacity = 0;
        setTimeout(()=>{child.style.opacity = 1}, n*10)
    }
    
} )