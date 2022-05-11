// the old skill tree was a mess
// maybe this one will be better

function createNodes(){
    new TreeNode(0,"COMPUTER SCIENCE","static",false,0.15).activate();
    new TreeNode(0,"ENGINEERING","static",false,0.5).activate();
    new TreeNode(0,"AUDIO & VISUALS","static",false,0.85).activate();

    new TreeNode(1,"LEGO Technic","lego",["ENGINEERING"])
    .appendLine("The bricks with holes that put functionality over beauty.")
    .appendLine("Used and abused hard during childhood.").mass = 0;

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

    new TreeNode(2,"Expression 2","expression2",["Redstone"])
    .appendLine("My first true coding language.")
    .appendLine("Part of an addon for the popular sandbox game, Garry's Mod.").bias = 2;

    new TreeNode(3,"Adobe Illustrator","illustrator",["Adobe Photoshop"])
    .appendLine("Creates and edits vector graphics, which display crisply at all resolutions.")
    .appendLine("Most of these nodes use vector graphics.").bias = 1;

    new TreeNode(2,"GIMP","gimp",["Adobe Photoshop"])
    .appendLine("The GNU Image Manipulation Program.")
    .appendLine("Open-source, free, and 9 times out of 10 better than photoshop.").bias = -1;

    new TreeNode(2,"Autodesk<br>123D Design","autodesk",["Woodworking"])
    .appendLine("The deprecated predecessor to<br>Fusion 360.")
    .appendLine("Immensely powerful, easy to use, and free.");

    new TreeNode(4,"3D Printing","printing",["Autodesk<br>123D Design"])
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

    new TreeNode(3,"Java","java",["Code.org JavaScript","C"])
    .appendLine("Learned during AP Computer Science A.")
    .appendLine("I used this to extend my Discord relay to a Minecraft server.")
    .dx = 60;

    new TreeNode(3,"Arduino","arduino",["Expression 2","3D Printing"])
    .appendLine("A C-style language simplified enough for an amateur to pick up.")
    .appendLine("Used in Odyssey of the Mind in 2019 and helped us place second at world finals!");

    new TreeNode(4,"C","c",["Arduino"])
    .appendLine("Learned during second and third years of college.")
    .appendLine("Haven't mastered it, but I know the core concepts.");

    new TreeNode(4,"NodeJS","nodejs",["Code.org JavaScript"])
    .appendLine("ES6 JavaScript as a backend.")
    .appendLine("I designed a Discord relay for my Garry's Mod server with it.")
    .bias=-1;

    new TreeNode(4,"Vanilla JavaScript","js",["NodeJS","Code.org JavaScript"])
    .appendLine("ES6+ Specifications; modern JavaScript without frameworks.")
    .appendLine("I have yet to experience the power of a good framework.");

    new TreeNode(4,"Lua","lua",["Expression 2"])
    .appendLine("A common language of game scripting.")
    .appendLine("I learned the variant used in Garry's Mod.")
    .dx = -70;

    new TreeNode(4,"HTML 5","html",["Vanilla JavaScript"])
    .appendLine("The skeleton and structure of websites.")
    .appendLine("I'm actually getting worse at avoiding div soup 💀").bias=-2;

    new TreeNode(3,"Regex","regex",["Vanilla JavaScript","NodeJS"])
    .appendLine("CSS for lazy people.")
    .appendLine("Learned during my third year of college.")
    .appendLine("So far, I've only found it good for prototyping.").dx = -100;

    new TreeNode(4,"CSS 3","css",["Vanilla JavaScript"])
    .appendLine("Formatting the web with extravagant &lt;style&gt;")
    .appendLine("A constant source of frustration, but always worth the struggle.").bias=3;

    new TreeNode(3,"Blender Novice","blender",["Autodesk<br>123D Design","Adobe Illustrator","GIMP"])
    .appendLine("The 3D multipurpose program with a brutal learning curve")
    .appendLine("Used alongside other programs to customize my VRChat avatar.");

    new TreeNode(6,"Electron","electron",["CSS 3","Vanilla JavaScript",'HTML 5'])
    .appendLine("Desktop apps made by web developers!")
    .appendLine("Used to build an app for my dad that helps him automate patient data at work.").mass=4;

    new TreeNode(6,"Bootstrap","bootstrap",["CSS 3"])
    .appendLine("CSS for lazy people.")
    .appendLine("Learned during my third year of college.")
    .appendLine("So far, I've only found it good for prototyping.");

    for (let n = 3; n < AllNodes.length; n++) {
        setTimeout(() => AllNodes[n].activate(),n*50);
    }
  
}

const TEMPLATE_NODE = document.querySelector("#template-node");
const NODE_DISTANCE = 1.2;
const NODE_PADDING = 1.4;

const NodeContainer = document.querySelector(".node-container");
const LineContainer = document.querySelector(".line-container");
const ParallaxThing = document.querySelector(".grid");


let Distance = 120;
let Padding = 120;

let Nodes = {};
let RootNodes = [];
let ChildNodes = [];
let Lines = [];
let NodeGroups = [];
let AllNodes = [];

function getPos(el) {
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}
let ContainerPos = {x:0, y:0};

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
        line.render();
    }
}

function distance2(x1,y1,x2,y2){
    return (x1-x2)**2 + (y1-y2)**2;
}

function distance(x1,y1,x2,y2){
    return Math.sqrt( (x1-x2)**2 + (y1-y2)**2 );
}

function clamp(n,min,max){
    return (n > max ? max : (n < min ? min : n));
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
        this.render = this.renderWaiting;

        Lines.push(this);
    }

    cacheEndpoints(){
        this.startNode = Nodes[this.start];
        this.endNode = Nodes[this.end];
    }

    renderWaiting(){
        if( this.waiting ){
            if( distance(this.startNode.x,this.startNode.y,this.endNode.x,this.endNode.y) < Distance * 2.5 ){
                this.inner.classList.add("treeline");
                this.waiting = false;
                this.render = this.renderNormal;
            }
        }
        this.renderNormal();
    }

    renderNormal(){
        this.inner.setAttribute('x1',this.startNode.x);
        this.inner.setAttribute('y1',this.startNode.y);
        this.inner.setAttribute('x2',this.endNode.x);
        this.inner.setAttribute('y2',this.endNode.y);
    }

    activate(){
        this.waiting = true;
    }

}

let alternator = 1;

class TreeNode {
    /**
     * @param {String} name - node name; front
     * @param {String} desc - node description; back
     * @param {String} css - css class
     * @param {Array<String>} parents - parent node names
     */
    constructor(group,name,css,parents,x){

        alternator = -alternator;

        this.lines = [];
        this.parents = [];

        this.parentNames = parents;
        this.name = name;
        this.group = group;
        this.desc = "";

        this.active = false;
        this.mass = 1.5;
        this.bias = 0;
        this.canMouse = true;

        if( !NodeGroups[group] ) NodeGroups[group] = [];
        NodeGroups[group].push(this);

        this.html = TEMPLATE_NODE.cloneNode(true);
        this.html.hidden = false;

        this.html.querySelector(".front").innerHTML = name;
        this.html.style.opacity = 0;

        this.html.id = "";
        this.html.classList.add(css);

        if(css == "static") this.html.querySelector(".back").remove();

        this.style = this.html.style;

        if(parents){
            // make the lines
            for( let nodename of parents ){
                this.lines.push( new TreeLine(name,nodename) );
            }
            ChildNodes.push(this);
            let self = this;
            // register events
            this.html.addEventListener("mouseover",() => {
                if( self.canMouse ){
                    self.dy = self.dy - 6;
                    self.canMouse = false;
                    setTimeout(() => {self.canMouse = true;}, 100);
                }
            });
            this.html.addEventListener("mouseout",() => {
                if( self.canMouse ){
                    self.canMouse = false;
                    setTimeout(() => {self.canMouse = true;}, 100);
                }
            });
            this.html.addEventListener("mousedown",() => this.startDrag()); // closure because 'this' is horrible
            this.html.addEventListener("touchstart",() => this.startDrag());
            // setup position and starting vel
            this.x = NodeContainer.clientWidth/2;
            this.y = 30 - group * 100;
            this.dx = 5 * alternator;
            this.dy = 10 * group;
        }
        else{
            RootNodes.push(this);
            this.xrel = x;
            this.x = NodeContainer.clientWidth * x;
            this.y = 20;
            this.dx = 0;
            this.dy = 0;
        }

        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        NodeContainer.appendChild(this.html);
        Nodes[name] = this;
        AllNodes.push(this);
    }

    startDrag(){
        this.listener = ((e)=>this.setPos(e));
        this.html.classList.toggle("grabbed",true);
        document.addEventListener("mousemove",this.listener);
        document.addEventListener("touchmove",this.listener);
    }

    stopDrag(){
        document.removeEventListener("mousemove",this.listener);
        document.removeEventListener("touchmove",this.listener);
        this.html.classList.toggle("grabbed",false);
        this.listener = null;
    }

    setPos(e){
        // thanks random blog: https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/
        if(e.clientX){
            this.x = e.clientX - ContainerPos.x;
            this.y = e.clientY - ContainerPos.y + window.scrollY;
        }
        else{ // touch event
            this.x = e.changedTouches[0].clientX - ContainerPos.x;
            this.y = e.changedTouches[0].clientY - ContainerPos.y + window.scrollY;
        }
        
        this.x = clamp(this.x,0,NodeContainer.clientWidth);
        this.y = clamp(this.y,0,NodeContainer.clientHeight);

        this.dx = 0;
        this.dy = 0;
    }

    applyForce(x,y){
        if( this.xrel ) return;
        this.dx = this.dx + x;
        this.dy = this.dy + y;
    }

    cacheParents(){
        this.parents = [];
        for( let nodeName of this.parentNames ){
            this.parents.push(Nodes[nodeName]);
        }
    }

    appendLine(text){
        let newline = this.desc == "" ? "" : "<br><br>";
        this.desc = `${this.desc}${newline}${text}`;
        this.html.querySelector(".back").innerHTML = this.desc;
        return this;
    }

    activate(){
        this.html.style.opacity = 1;
        for( let line of this.lines ){
            line.activate();
        }
        this.active = true;
    }

    doElasticConstraint(that){
        const dist = distance(this.x,this.y,that.x,that.y) + 0.1;
        const nx = (that.x-this.x)/dist;
        const ny = (that.y-this.y)/dist;
        const fac = clamp((dist - Distance)*0.05,-4,10);
        let fac2 = this.group;
        if(this.listener){fac2 = 1;}
        this.applyForce(nx*fac,ny*fac);
        that.applyForce(-nx*fac,-ny*fac/fac2);
    }

    doRepulsionConstraint(that){
        const dist = distance(this.x,this.y,that.x,that.y)+0.1; // todo: don't compute this twice since we may find it in the above func
        const nx = (that.x-this.x)/dist;
        const ny = (that.y-this.y)/dist;
        const fac = clamp((dist - Distance*1.2)*0.05,-2,0);
        this.applyForce(nx*fac,ny*fac);
        that.applyForce(-nx*fac,-ny*fac);
    }

    doForces(){

        if(!this.active) return;

        this.applyForce(this.bias,this.mass);

        for( let that of this.parents ){ // elastic constraints
            if(!that.active) continue;
            this.doElasticConstraint(that);
        }

        for( let that of AllNodes ){ // repulsive forces
            if(!that.active) continue;
            this.doRepulsionConstraint(that);
        }

        if( this.x < Padding ){
            this.applyForce( ((Padding - this.x)**2)*0.00005, 0 );
        }
        if( this.x > NodeContainer.clientWidth - Padding ){
            this.applyForce( -((NodeContainer.clientWidth - Padding - this.x)**2)*0.00005, 0 );
        }
        if( this.y < Padding ){
            this.applyForce( 0, ((Padding - this.y)**2)*0.00005 );
        }
        if( this.y > NodeContainer.clientHeight - Padding ){
            this.applyForce( 0, -((NodeContainer.clientHeight - Padding - this.y)**2)*0.00005 );
        }

        this.x = clamp(this.x,0,NodeContainer.clientWidth);
        this.y = clamp(this.y,0,NodeContainer.clientHeight);

        // NaN protection in case I missed any
        if( this.x != this.x ) this.x = 0;
        if( this.y != this.y ) this.y = 0;
        if( this.dx != this.dx ) this.dx = 0;
        if( this.dy != this.dy ) this.dy = 0;

    }

    doPositioning(){
        if(!this.active) return;
        this.dx *= 0.9;
        this.dy *= 0.9;
        if(this.listener) return;
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }

    render(){
        this.style.left = `${Math.round(this.x)}px`;
        this.style.top = `${Math.round(this.y)}px`;
    }
}

createNodes(); 
prepLines();
prepNodes();

function frame(){
    for( let node of ChildNodes ){
        node.render();
    }
    renderLines();
}


setInterval( () => {
    for( let node of ChildNodes ){
        node.doForces();
    }
    for( let node of ChildNodes ){
        node.doPositioning();
    }
    requestAnimationFrame(frame);
} , 16);

let nolag = false;
function handleResize(){
    console.log("resize");
    ContainerPos = getPos(NodeContainer);
    if(nolag){ return; }
    nolag = true;
    setTimeout(()=>{nolag=false;},16);
    Distance = NODE_DISTANCE * RootNodes[0].html.clientWidth;
    Padding = NODE_PADDING * RootNodes[0].html.clientWidth;
    for( let node of ChildNodes ){
        node.x = (node.x/oldW)*NodeContainer.clientWidth;
        node.y = (node.y/oldH)*NodeContainer.clientHeight;
        node.render();
    }  
    for( let node of RootNodes ){
        node.x = node.xrel * NodeContainer.clientWidth;
        node.render();
    }  
    oldW = NodeContainer.clientWidth;
    oldH = NodeContainer.clientHeight;
    renderLines();
}

let oldW = NodeContainer.clientWidth;
let oldH = NodeContainer.clientHeight;

window.addEventListener("load",() => { // the fact I have to put this in here is really stupid
    window.addEventListener('resize', () => {
        handleResize();
    });
    handleResize();
});


document.addEventListener("mouseup",()=>{
    for( let node of ChildNodes ){
        node.stopDrag();
    } 
});

document.addEventListener("touchend",()=>{
    for( let node of ChildNodes ){
        node.stopDrag();
    } 
});