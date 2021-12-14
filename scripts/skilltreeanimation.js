
{
    const container = document.querySelector(".grid");
    container.querySelectorAll(".grid > div").forEach( (child,n) => {
        if(n > 2){
            child.style.opacity = 0;
            setTimeout(()=>{child.style.opacity = 1}, n*50 + 400);
        }
        else{
            child.style.transition = "0.5s transform";
            setTimeout(()=>{
                child.style.transition = "";
            }, 1500)
        }
        applyHoverTap(child)
    } )
}