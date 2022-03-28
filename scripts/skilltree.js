// the old skill tree was a mess
// maybe this one will be better

function distance2(x1,y1,x2,y2){
    return (x1-x2)**2 + (y1-y2)**2
}

function distance(x1,y1,x2,y2){
    return Math.sqrt( (x1-x2)**2 + (y1-y2)**2 )
}

function clamp(n,min,max){
    return (n > max ? max : (n < min ? min : n))
}

function createNodes(){
    new TreeNode(0,"COMPUTER SCIENCE","static",false,0.15).activate();
    new TreeNode(0,"ENGINEERING","static",false,0.5).activate();
    new TreeNode(0,"AUDIO & VISUALS","static",false,0.85).activate();

    new TreeNode(1,"LEGO Technic","lego",["ENGINEERING"])
    .appendLine("The bricks with holes that put functionality over beauty.")
    .appendLine("Used and abused hard during childhood.");

    new TreeNode(1,"LEGO Mindstorms","mindstorms",["COMPUTER SCIENCE", "LEGO Technic"])
    .appendLine("Simple block-style programming for LEGO robots.")
    .appendLine("Used as late as 2019 to drop plastic spiders on trick-or-treaters");

    new TreeNode(1,"Percussion","drums",["AUDIO & VISUALS"])
    .appendLine("A keeper of time and drummer of drums from 4th to 8th grade.")
    .appendLine("I can keep precise time up to around 770BPM.");
    
    new TreeNode(2,"Redstone","redstone",["LEGO Mindstorms"])
    .appendLine("Laid the foundations for my understanding of boolean logic.")
    .appendLine("Minecraft also started me memorizing my powers of two.");

    new TreeNode(1,"Woodworking","woodworking",["ENGINEERING"])
    .appendLine("Officially picked up in 8th grade.")
    .appendLine("I can use a variety of woodshop tools safely.");

    new TreeNode(2,"Audacity","audacity",["Percussion"])
    .appendLine("Does audio & waveform editing.")
    .appendLine("I'm capable of making song mashups that aren't actually terrible.");

    new TreeNode(1,"Adobe Photoshop","photoshop",["AUDIO & VISUALS"])
    .appendLine("Edits images in almost any way imaginable.")
    .appendLine("Can create from scratch too, but illustrator is usually better for that.");

    new TreeNode(3,"Expression 2","expression2",["Redstone"])
    .appendLine("My first true coding language.")
    .appendLine("Part of an addon for the popular sandbox game, Garry's Mod.").bias = 1

    new TreeNode(2,"Adobe Illustrator","illustrator",["Adobe Photoshop"])
    .appendLine("Creates and edits vector graphics, which display crisply at all resolutions.")
    .appendLine("Most of these nodes use vector graphics.").bias = 1;

    new TreeNode(2,"GIMP","gimp",["Adobe Photoshop"])
    .appendLine("The GNU Image Manipulation Program.")
    .appendLine("Open-source, free, and 9 times out of 10 better than photoshop.").bias = -1;

    new TreeNode(2,"Autodesk<br>123D Design","autodesk",["Woodworking"])
    .appendLine("The deprecated predecessor to<br>Fusion 360.")
    .appendLine("Immensely powerful, easy to use, and free.");

    new TreeNode(3,"3D Printing","printing",["Autodesk<br>123D Design"])
    .appendLine("Abused so badly in Odyssey of the Mind that a new policy was implemented to nerf my 3D printing.")
    .appendLine("The nerf was a feeble attempt to stop me.");

    new TreeNode(4,"Code.org JavaScript","code",["Expression 2"])
    .appendLine("Old ES1 JavaScript for AP Computer Science Principles.")
    .appendLine("These nodes use physics code from a project I made there.");

    new TreeNode(3,"Adobe After Effects","aftereffects",["Adobe Illustrator"])
    .appendLine("Photoshop for video; puts the FX in VFX.")
    .appendLine("Used for many disgraceful memes and edits.");

    new TreeNode(4,"Adobe Premiere","premiere",["Adobe After Effects"])
    .appendLine("For compiling audio and video clips.")
    .appendLine("I used this my senior year of high school for editing the school's news show.");

    new TreeNode(5,"Java","java",["Code.org JavaScript","C"])
    .appendLine("Learned during AP Computer Science A.")
    .appendLine("I used this to extend my Discord relay to a Minecraft server.");

    new TreeNode(4,"Arduino","arduino",["Expression 2","3D Printing"])
    .appendLine("A C-style language simplified enough for an amateur to pick up.")
    .appendLine("Used in Odyssey of the Mind in 2019 and helped us place second at world finals!");

    new TreeNode(4,"C","c",["Arduino"])
    .appendLine("Learned during second and third years of college.")
    .appendLine("Haven't mastered it, but I know the core concepts.").bias=1

    new TreeNode(4,"NodeJS","nodejs",["Code.org JavaScript"])
    .appendLine("ES6 JavaScript as a backend.")
    .appendLine("I designed a Discord relay for my Garry's Mod server with it.");

    new TreeNode(4,"Vanilla JavaScript","js",["NodeJS"])
    .appendLine("ES6+ Specifications; modern JavaScript without frameworks.")
    .appendLine("I have yet to witness where frameworks would be helpful.")

    let lua = new TreeNode(4,"Lua","lua",["Expression 2"])
    .appendLine("A common language of game scripting.")
    .appendLine("I learned the variant used in Garry's Mod.");
    lua.bias = -3;
    lua.mass = 3;

    new TreeNode(4,"HTML 5","html",["Vanilla JavaScript"])
    .appendLine("The skeleton and structure of websites.")
    .appendLine("I'm getting better at avoiding div soup.").bias=-2

    new TreeNode(4,"CSS 3","css",["Vanilla JavaScript"])
    .appendLine("Formatting the web with extravagant &lt;style&gt;")
    .appendLine("A constant source of frustration.").bias=2

    new TreeNode(1,"Blender Novice","blender",["Autodesk<br>123D Design","Adobe Illustrator","GIMP"])
    .appendLine("Used alongside other programs to customize my VRChat avatar.")
    .appendLine("A constant source of frustration.")

    new TreeNode(6,"Electron","electron",["CSS 3","Vanilla JavaScript",'HTML 5'])
    .appendLine("Desktop apps made by web developers!")
    .appendLine("Used to build an app for my dad that helps him automate patient data at work.").mass=4

    for (let n = 3; n < AllNodes.length; n++) {
        setTimeout(() => AllNodes[n].activate(),n*50)
    }
  
}

const TEMPLATE_NODE = document.querySelector("#template-node")
const NodeContainer = document.querySelector(".node-container")
const LineContainer = document.querySelector(".line-container")
const NODE_DISTANCE = 1.2;
const NODE_PADDING = 1.2;

let computedNodeDistance = 120;
let computedNodePadding = 120;

let Nodes = {};
let RootNodes = [];
let ChildNodes = [];
let Lines = [];
let NodeGroups = [];
let AllNodes = [];

function prepLines(){
    for( let line of Lines ){
        line.cacheEndpoints();
    }
}

function prepNodes(){
    for( let node of ChildNodes ){
        node.cacheParents();
    }
}

function renderLines(){
    for( let line of Lines ){
        line.render()
    }
}

class TreeLine {
    /**
     * @param {String} start - start node name
     * @param {String} end - end node name
     */
    constructor(start, end){
        this.html = document.createElementNS("http://www.w3.org/2000/svg","svg");
            this.inner = document.createElementNS("http://www.w3.org/2000/svg","line");
            this.html.appendChild(this.inner);
        this.html.classList.add("treesvg");
        LineContainer.appendChild(this.html);
        
        this.start = start;
        this.end = end;
        this.startNode = null;
        this.endNode = null;
        this.waiting = false;

        Lines.push(this);
    }

    cacheEndpoints(){
        this.startNode = Nodes[this.start];
        this.endNode = Nodes[this.end];
    }

    render(){

        if( this.waiting ){
            if( distance(this.startNode.x,this.startNode.y,this.endNode.x,this.endNode.y) < computedNodeDistance * 2.5 ){
                this.inner.classList.add("treeline");
                this.waiting = false;
            }
        }

        this.inner.setAttribute('x1',this.startNode.x);
        this.inner.setAttribute('y1',this.startNode.y);
        this.inner.setAttribute('x2',this.endNode.x);
        this.inner.setAttribute('y2',this.endNode.y);
    }

    activate(){
        this.waiting = true;
    }

}

let alternator = 1

class TreeNode {
    /**
     * @param {String} name - node name; front
     * @param {String} desc - node description; back
     * @param {String} css - css class
     * @param {Array<String>} parents - parent node names
     */
    constructor(group,name,css,parents,x){
        let self = this; // might need

        alternator = -alternator;

        this.parentNames = parents;
        this.x = NodeContainer.clientWidth/2;
        this.y = 30 - group * 20;
        this.dx = 5 * alternator;
        this.dy = NodeContainer.clientHeight * 0.01 * group;
        this.lines = [];
        this.parents = [];
        this.name = name;
        this.group = group
        this.desc = "";
        this.active = false;
        this.mass = 1.5;
        this.bias = 0;

        if( !NodeGroups[group] ){
            NodeGroups[group] = [];
        }
        NodeGroups[group].push(this)

        this.html = TEMPLATE_NODE.cloneNode(true);
        this.html.hidden = false;

        this.html.querySelector(".front").innerHTML = name;
        this.html.style.opacity = 0;

        this.html.id = "";
        this.html.classList.add(css)

        if(css == "static"){
            this.html.querySelector(".back").remove();
        }

        this.style = this.html.style

        if(parents){
            for( let nodename of parents ){
                this.lines.push( new TreeLine(name,nodename) )
            }
            ChildNodes.push(this);
            let self = this;
            this.html.addEventListener("mouseover",() => {
                self.dy = self.dy - 2
            })
        }
        else{
            RootNodes.push(this);
            this.xrel = x;
            this.x = NodeContainer.clientWidth * x;
            this.y = 0
            this.dx = 0
            this.dy = 0;
        }

        this.style.left = `${this.x}px`
        this.style.top = `${this.y}px`

        NodeContainer.appendChild(this.html)
        Nodes[name] = this;
        AllNodes.push(this)
    }

    cacheParents(){
        for( let nodeName of this.parentNames ){
            this.parents.push(Nodes[nodeName]);
        }
    }

    appendLine(text){
        let newline = this.desc == "" ? "" : "<br><br>"
        this.desc = `${this.desc}${newline}${text}`
        this.html.querySelector(".back").innerHTML = this.desc;
        return this;
    }

    applyForce(x,y){
        if( this.xrel ) return;
        this.dx = this.dx + x;
        this.dy = this.dy + y;
    }

    activate(){
        this.html.style.opacity = 1;
        for( let line of this.lines ){
            line.activate();
        }
        this.active = true;
        this.render();
    }

    compute(){

        if(!this.active) return;

        let a = this;

        a.applyForce(a.bias,a.mass)

        for( let b of a.parents ){ // elastic constraints
            if(!b.active) continue;
            // stolen from legacy project:
            // https://studio.code.org/projects/applab/ySRJTGoEPT4hfcIIyJLccn2yiPnzrM6ECTVHjl-uCFg/view
            let dist = distance(a.x,a.y,b.x,b.y) + 0.01;
            let nx = (b.x-a.x)/dist;
            let ny = (b.y-a.y)/dist;
            let fac = clamp((dist - computedNodeDistance)*0.05,-3,10);
            a.applyForce(nx*fac,ny*fac);
            b.applyForce(-nx*fac/a.group,-ny*fac/a.group);
        }

        for( let b of AllNodes ){ // repulsive forces
            if(!b.active) continue;
            let dist = distance(a.x,a.y,b.x,b.y);
            if(dist < 1) { // any nodes that get stuck this close probably need help
                a.applyForce(-1,0);
                b.applyForce(1,0);
                continue;
            }
            let nx = (b.x-a.x)/dist;
            let ny = (b.y-a.y)/dist;
            let fac = clamp((dist - computedNodeDistance*1.2)*0.05,-3,0);
            a.applyForce(nx*fac,ny*fac);
        }

        if( a.x < computedNodePadding ){
            a.applyForce( ((computedNodePadding - a.x)**2)*0.0001, 0 )
        }

        if( a.x > NodeContainer.clientWidth - computedNodePadding ){
            a.applyForce( -((NodeContainer.clientWidth - computedNodePadding - a.x)**2)*0.00005, 0 )
        }

        if( a.y < computedNodePadding ){
            a.applyForce( 0, ((computedNodePadding - a.y)**2)*0.0001 )
        }

        if( a.y > NodeContainer.clientHeight - computedNodePadding ){
            a.applyForce( 0, -((NodeContainer.clientHeight - computedNodePadding - a.y)**2)*0.00005 )
        }

        a.x = clamp(a.x,0,NodeContainer.clientWidth)
        a.y = clamp(a.y,0,NodeContainer.clientHeight)

        // NaN protection in case I missed any
        if( a.x != a.x ) a.x = 0;
        if( a.y != a.y ) a.y = 0;
        if( a.dx != a.dx ) a.dx = 0;
        if( a.dy != a.dy ) a.dy = 0;

    }

    render(){
        if(!this.active) return;

        let a = this;

        a.dx *= 0.9
        a.dy *= 0.9

        a.x = a.x + a.dx
        a.y = a.y + a.dy

        a.style.left = `${a.x}px`
        a.style.top = `${a.y}px`
    }
}

createNodes();
prepLines();
prepNodes();


setInterval( () => {
    for( let node of ChildNodes ){
        node.compute();
    }
    for( let node of ChildNodes ){
        node.render();
    }
    renderLines();
} , 16)

let nolag = false;
function handleResize(){
    if(nolag){ return }
    nolag = true;
    setTimeout(()=>{nolag=false},16)
    computedNodeDistance = NODE_DISTANCE * RootNodes[0].html.clientWidth
    computedNodePadding = NODE_PADDING * RootNodes[0].html.clientWidth
    for( let node of ChildNodes ){
        node.x = (node.x/oldW)*NodeContainer.clientWidth;
        node.y = (node.y/oldH)*NodeContainer.clientHeight;
        node.render();
    }  
    for( let node of RootNodes ){
        node.x = node.xrel * NodeContainer.clientWidth
        node.render();
    }  
    oldW = NodeContainer.clientWidth
    oldH = NodeContainer.clientHeight
    renderLines();
}

let oldW = NodeContainer.clientWidth
let oldH = NodeContainer.clientHeight
window.addEventListener('resize', () => {
    handleResize();
})
handleResize();