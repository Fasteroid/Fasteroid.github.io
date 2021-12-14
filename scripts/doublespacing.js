{
    let paragraphs = document.querySelectorAll("section")
    for( let paragraph of paragraphs ){
        paragraph.innerHTML = paragraph.innerHTML.replaceAll('.  ','.<div class=\"space\"> </div>');
        paragraph.innerHTML = paragraph.innerHTML.replaceAll('!  ','!<div class=\"space\"> </div>');
        paragraph.innerHTML = paragraph.innerHTML.replaceAll('?  ','?<div class=\"space\"> </div>');
        paragraph.innerHTML = paragraph.innerHTML.replaceAll('—','<div class=\"emdash\">—</div>');
    }
}