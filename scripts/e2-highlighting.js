

// WARNING: LEGACY (ish) CODE
// MAY BE CRINGE

// WARNING: CURSED REGEX

const ignoreTagsPreproc = /(\<.*?\>.*?\<.*?\>)/.source
/**
 * disgusting apple regex workaround function
 * it will run string.replace without replacing any text inside html entities
 * @param {String} text
 * @param {RegExp} innerRegex
 * @param {Function} replace
*/
let replaceIgnoreTags = function replaceIgnoreTags( text, innerRegex, replace ){
    
    let matcher = new RegExp(`${ignoreTagsPreproc}|${innerRegex.source}`,"g")
    return text.replace(matcher, function(){
        shiftedArguments = [...arguments].slice(2,arguments.length-2); // we'll pass these on to replace
        if( !arguments[1] ){
            // console.log("replace",shiftedArguments)
            return replace.call(this,...shiftedArguments)
        }
        else{
            // console.log("default",arguments[0])
            return arguments[0]
        }
    })

}

const E2SyntaxHighlighter = {

    isLetter(txt) {
        return txt.toUpperCase() != txt.toLowerCase() || txt=="_"
    },

    isUppercase(txt) {
        return txt.toUpperCase() == txt && txt.toLowerCase() != txt
    },

    isLowercase(txt) {
        return txt.toUpperCase() != txt && txt.toLowerCase() == txt
    },

    isNumber(txt) {
        return !isNaN(txt) && !(txt.match(/\s/))
    },

    types: [
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
    ],

    directives: {
        "@name": true,
        "@inputs": false,
        "@outputs": false,
        "@persist": false,
        "@trigger": true,
        "@model": true,
    },

    keywords: [
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
        "catch"
    ],

    highlightTypes(txt) {
        for (const type of this.types) {
            let matcher = new RegExp(`([,:])${type}([\\]\\s\\),])`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // general
    
            matcher = new RegExp(`(function\\s*?)${type}(\\s)`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // function return type
    
            matcher = new RegExp(`(function\\s*?.*?)${type}(:)`,"gm");
            txt = txt.replace(matcher,`$1<e2type>${type}</e2type>$2`); // function type:thisKind()
        }
        return txt;
    },

    highlightDirectives(txt) {
        for (const dir in this.directives){
            if(this.directives[dir]){
                let matcher = new RegExp(`(${dir}.*?)(\n)`,"gm")
                txt = txt.replace(matcher,"<e2dir>$1</e2dir>$2")
            }
            else{
                txt = txt.replaceAll(dir,`<e2dir>${dir}</e2dir>`);
            }
        }
        return txt;
    },

    highlightComments(txt) {

        // Damn it apple, fix your regex libraries.  I spent 5 hours on this crap!
        // txt = txt.replace(/(?<!#\[.*?)#include(?!\]#.*?)/g,"<e2key>#include</e2key>")
    
        txt = txt.replaceAll("#[","<e2comment>#[");
        txt = txt.replaceAll("]#","]#</e2comment>");
    
        txt = replaceIgnoreTags(txt, /(#include)/, () => "<e2key>#include</e2key>")
    
        txt = replaceIgnoreTags(txt, /(#.*?)(\n)/g, (a,b) => `<e2comment>${a}</e2comment>${b}`)
    
        return txt;
    },

    highlightStrings(txt){
        const explodedtext = txt.split("");
        var len = explodedtext.length;
        var inside = false;
        var comment = false;
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
    },

    highlightMulti(txt) {
        const explodedtext = txt.split("");
        var len = explodedtext.length;
        var stage = 0;
        var last = 0;
        var infunction = 0;
        var ready = false;
        for (var t = 0; t < len; t++) {
            
            var entry = explodedtext[t];
    
            if ((stage == 0) && (entry == "<")) { // html opening tag?
                // logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 1) && (entry == ">")) { // close of above tag?
                // logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 2) && (entry == "<")) { // html opening tag?
                // logSub(last,t,explodedtext,stage)
                last=t
                stage++;
            }
            if ((stage == 3) && (entry == ">")) { // close of above tag?
                // logSub(last,t,explodedtext,stage)
                stage = 0;
                last=t
                ready = false;
            }
    
            if (infunction == 0) {
                if (this.isLowercase(entry) && stage==0 && ready) { // definitely a function
                    infunction = 1;
                    entry = "<e2func>" + entry;
                }
                if (this.isNumber(entry) && stage==0 && ready) { // number
                    infunction = 2;
                    entry = "<e2num>" + entry;
                }
            } 
            else if (!this.isLetter(entry) && !this.isNumber(entry)) { // found the end of the thing!
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
    },

    highlightVariables(txt) {

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
                    if (this.isLowercase(entry)) {
                        outsideVariable = true;
                    }
                    if (!this.isLetter(entry)) {
                        outsideVariable = false;
                    }
                }
    
                if (!outsideVariable) {
                    if (this.isUppercase(entry)) {
                        insideVariable = true;
                    }
                    if (!this.isLetter(entry) && isNaN(entry)) {
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
    },

    highlightKeywords(txt){
        txt = replaceIgnoreTags(txt, /foreach/, () => "___FOREACH"); // for and foreach overlap
        for (const keyword of this.keywords) {
            txt = replaceIgnoreTags(txt, new RegExp(keyword), () => `<e2key>keyword</e2key>`); // for and foreach overlap
        }
        txt = txt.replaceAll("___FOREACH", "<e2key>foreach</e2key>");
        return txt
    }

}

/**
 * Apply E2 Syntax Highlighting to an element's contents
 * @param {Element} elem 
 * @returns 
 */
function e2_syntax_highlight(elem) {
    let txt = elem.innerText; // innerhtml will break some characters
    txt = txt.replaceAll("<","\u1000") // use weird bullshit sentinels we can replace at the end
    txt = txt.replaceAll(">","\u1001")
    txt = E2SyntaxHighlighter.highlightComments(txt);
    txt = E2SyntaxHighlighter.highlightStrings(txt);
    txt = E2SyntaxHighlighter.highlightDirectives(txt);
    txt = E2SyntaxHighlighter.highlightTypes(txt);
    txt = E2SyntaxHighlighter.highlightVariables(txt);
    txt = E2SyntaxHighlighter.highlightKeywords(txt);
    txt = E2SyntaxHighlighter.highlightMulti(txt); // has to be last
    txt = txt.replaceAll("\u1000","&lt;")
    txt = txt.replaceAll("\u1001","&gt;")
    elem.innerHTML = txt;
}

