{

    // WARNING: LEGACY CODE
    // MAY BE CRINGE

    let isLetter = function (txt) {
        return txt.toUpperCase() != txt.toLowerCase() || txt=="_"
    }

    let isUppercase = function (txt) {
        return txt.toUpperCase() == txt && txt.toLowerCase() != txt
    }

    let isLowercase = function (txt) {
        return txt.toUpperCase() != txt && txt.toLowerCase() == txt
    }

    let isNumber = function (txt) {
        return !isNaN(txt) && !(txt.match(/\s/))
    }

    const types = [
        "entity",
        "quaternion",
        "angle",
        "vector2",
        "vector4",
        "number",
        "bone",
        "array",
        "table",
        "ranger",
        "string",
        "vector",
        "matrix",
    ];

    function highlightTypes(txt) {
        for (const type of types) {
            let matcher = new RegExp(`([,:])${type}([\\]\\s\\),])`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // general

            matcher = new RegExp(`(function\\s*?)${type}(\\s)`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // function return type

            matcher = new RegExp(`(function\\s*?.*?)${type}(:)`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // function type:thisKind()
        }
        return txt;
    }

    const directives = {
        "@name": true,
        "@inputs": false,
        "@outputs": false,
        "@persist": false,
        "@trigger": true,
        "@model": true,
    };

   let highlightDirectives = function(txt) {
        for (const dir in directives){
            if(directives[dir]){
                let matcher = new RegExp(`(${dir}.*?)(\n)`,"gm")
                txt = txt.replace(matcher,"<e2dir>$1</e2dir>$2")
            }
            else{
                txt = txt.replaceAll(dir,`<e2dir>${dir}</e2dir>`);
            }
        }
        return txt;
    }

    let highlightComments = function(txt) {
        txt = txt.replace(/(#.*?)(\n)/gm,"<e2comment>$1</e2comment>$2")
        return txt;
    }

    let highlightStrings = function(txt){
        const explodedtext = txt.split("");
        var len = explodedtext.length;
        var inside = false;
        for (var t = 0; t < len; t++) {
            var entry = explodedtext[t];
            if ( entry == '"' ) {
                inside = !inside;
                if (inside) {
                    entry = `<e2string>${entry}`
                } 
                else {
                    entry = `${entry}</e2string>`
                } 
                explodedtext[t] = entry;
            }
        }
        return explodedtext.join("")
    }

    let highlightMulti = function (txt) {
        const explodedtext = txt.split("");
        var len = explodedtext.length;
        var stage = 0;
        var last = 0;
        var infunction = 0;
        var ready = false;
        for (var t = 0; t < len; t++) {
            
            var entry = explodedtext[t];

            if ((stage == 0) && (entry == "<")) { // html opening tag?
                logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 1) && (entry == ">")) { // close of above tag?
                logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 2) && (entry == "<")) { // html opening tag?
                logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 3) && (entry == ">")) { // close of above tag?
                logSub(last,t,explodedtext,stage)
                stage = 0;
                last=t
                ready = false;
            }

            if (infunction == 0) {
                if (isLowercase(entry) && stage==0 && ready) { // definitely a function
                    infunction = 1;
                    entry = "<e2func>" + entry;
                }
                if (isNumber(entry) && stage==0 && ready) { // number
                    infunction = 2;
                    entry = "<e2num>" + entry;
                }
            } 
            else if (!isLetter(entry) && !isNumber(entry)) { // found the end of the thing!
                if (infunction == 1) {
                    entry = "</e2func>" + entry; // close it off and continue
                }
                else if (infunction == 2) {
                    entry = "</e2num>" + entry; // close it off and continue
                }
                infunction = 0;
            }

            explodedtext[t] = entry;
            ready = true;
        }
        return explodedtext.join("")
    }

    function logSurrounding(pos,arr,level){
        var asdf = ""
        for (let index = pos-5; index < pos+6; index++) {
            asdf = asdf + arr[index]
        }
        console.log(level,asdf)
    }

    function logSub(start,end,arr,level){
        console.log(level,arr.slice(start,end).join(''))
    }

    let highlightVariables = function (txt) {

        var stage = 0;
        var explodedtext = txt.split("");
        var len = explodedtext.length;
        var insideVariable = false;
        var outsideVariable = false;
        var prevInside = false;
        var last = 0
        var ready = false
        for (var t = 0; t < len; t++) {
            
            var entry = explodedtext[t];

            if ((stage == 0) && (entry == "<")) { // html opening tag?
                ready = true;
                stage++;
            }
            if ((stage == 1) && (entry == ">")) { // close of above tag?
                stage++;
            }
            if ((stage == 2) && (entry == "<")) { // html opening tag?
                stage++;
            }
            if ((stage == 3) && (entry == ">")) { // close of above tag?
                stage = 0;
                ready = false; // wait 1 iteration to purge the buffer of any tags
            }

            if((stage==0) && ready){
                prevInside = insideVariable;

                if (!insideVariable) {
                    if (isLowercase(entry)) {
                        outsideVariable = true;
                    }
                    if (!isLetter(entry)) {
                        outsideVariable = false;
                    }
                }

                if (!outsideVariable) {
                    if (isUppercase(entry)) {
                        insideVariable = true;
                    }
                    if (!isLetter(entry) && isNaN(entry)) {
                        insideVariable = false;
                    }
                }

                if ( (insideVariable != prevInside) ) { 
                    if (!prevInside ) {
                        entry = "<e2var>" + entry;
                    }
                    if (prevInside) {
                        entry = "</e2var>" + entry;
                    }
                }
            }
            else if((stage==1 && ready)){ // edge case: end of line
                if (insideVariable) {
                    entry = "</e2var>" + entry;
                }
                prevInside = false;
                insideVariable = false;
            }
            explodedtext[t] = entry;
            ready = stage==0;

        }
        txt = explodedtext.join("");
        return txt;
    }

    const keywords = [
        "for",
        "if",
        "while",
        "else",
        "break",
        "local",
        "function",
        "continue",
        "return",
        "try",
        "throw",
        "catch",
        "#include",
    ]

    let highlightKeywords = function (txt) {
        txt = txt.replaceAll("foreach", "___FOREACH"); // for and foreach overlap, must do this to avoid weirdness
        for (const keyword of keywords) {
            txt = txt.replaceAll(keyword, `<e2key>${keyword}</e2key>`);
        }
        txt = txt.replaceAll("___FOREACH", "<e2key>foreach</e2key>");
        return txt
    }

    /**
     * Apply E2 Syntax Highlighting to an element's contents
     * @param {Element} elem 
     * @returns 
     */
    function e2_syntax_highlight(elem) {
        let txt = elem.innerText; // innerhtml will break some characters
        txt = highlightStrings(txt);
        txt = highlightComments(txt);
        txt = highlightDirectives(txt);
        txt = highlightTypes(txt);
        txt = highlightKeywords(txt)
        txt = highlightVariables(txt);
        console.log(txt)
        txt = highlightMulti(txt); // has to be last
        elem.innerHTML = txt;
    }

}
