import MathUtils from "./mathutils.js"

const NODE_DISTANCE = 1.2;
const NODE_PADDING = 1.4;
const NODE_MAX_VEL = 80;
const NODE_BOB_FORCE = 2

let Relative_Node_Distance = 120;
let Relative_Node_Padding  = 120;



class TreeLine {
    
    static Dynamic_Lines  = [];
    static Dynamic_Lines_Refs = {}; // for global reference
    static LINE_CONTAINER = document.querySelector(".line-container");

    /**
     * @param {String} child - end node name
     * @param {String} parent - start node name
     */
    constructor(child, parent){
        this.html = document.createElementNS("http://www.w3.org/2000/svg","svg");
            this.inner = document.createElementNS("http://www.w3.org/2000/svg","line");
            this.html.appendChild(this.inner);
        this.html.classList.add("treesvg");
        TreeLine.LINE_CONTAINER.appendChild(this.html);
        
        this.start = child;
        this.end = parent;
        this.parentNode = null;
        this.childNode = null;
        this.waiting = false;
        this.lengthModifier = 0;
        this.render = this.renderWaiting;

        TreeLine.Dynamic_Lines.push(this);

        TreeLine.Dynamic_Lines_Refs[parent] = TreeLine.Dynamic_Lines_Refs[parent] || {};
        TreeLine.Dynamic_Lines_Refs[parent][child] = this;
        
    }

    forceFalloff(n){
        return n<0?n*0.05:n*(0.05 + (n/500)*0.45)
    }

    cacheEndpoints(){
        this.childNode = TreeNode.Named_Nodes[this.start];
        this.parentNode = TreeNode.Named_Nodes[this.end];
    }

    doElasticConstraint(){
        const childNode = this.childNode;
        const parentNode = this.parentNode;
        const dist = MathUtils.distance(childNode.x,childNode.y,parentNode.x,parentNode.y) + 0.1;
        const nx = (parentNode.x-childNode.x)/dist;
        const ny = (parentNode.y-childNode.y)/dist;
        const fac = MathUtils.clamp(this.forceFalloff(dist - Relative_Node_Distance - this.lengthModifier),-4,200);
        childNode.applyForce(nx*fac,ny*fac);
        parentNode.applyForce(-nx*fac,-ny*fac);
    }

    renderWaiting(){
        if( this.waiting ){
            if( MathUtils.distance(this.parentNode.x,this.parentNode.y,this.childNode.x,this.childNode.y) < (Relative_Node_Distance + this.lengthModifier) * 2.5 ){ // link up!
                this.inner.classList.add("treeline");
                this.waiting = false;
                this.render = this.renderNormal;
            }
        }
        this.renderNormal();
    }

    renderNormal(){
        this.inner.setAttribute('x1',this.parentNode.x);
        this.inner.setAttribute('y1',this.parentNode.y);
        this.inner.setAttribute('x2',this.childNode.x);
        this.inner.setAttribute('y2',this.childNode.y);
    }

    activate(){
        this.waiting = true;
    }

    static prepLines(){
        for( let line of TreeLine.Dynamic_Lines ){
            line.cacheEndpoints();
        }
    }

}

let launchDir = 1;

class TreeNode {

    static TEMPLATE_NODE  = document.querySelector("#template-node");
    static NODE_CONTAINER = document.querySelector(".node-container");

    static Static_Nodes   = [];
    static Dynamic_Nodes  = [];
    static Named_Nodes    = {};
    static All_Nodes      = [];

    static getGroup(parents, self){
        if(!parents) return 0;
        let group = 0;
        for(let parentName of parents){
            let parent = TreeNode.Named_Nodes[parentName]
            if(!parent){
                console.warn(`${self}: Attempt to access node ${parentName} before instantiation!`)
                continue
            };
            group = Math.max(group, parent.group);
        }
        return group + 1;
    }

    static flipLaunchDirection(){
        launchDir = -launchDir;
    }

    /**
     * @param {String} name - node name; front
     * @param {String} desc - node description; back
     * @param {String} css - css class
     * @param {Array<String>} parentNames - parent node names
     */
    constructor(name,css,parentNames,x, y){

        TreeNode.flipLaunchDirection();

        const group = TreeNode.getGroup(parentNames, name);

        this.parentNames = parentNames;
        this.name        = name;
        this.group       = group;
        this.css         = css
        this.desc        = "";

        this.active = false;
        this.mass = 1.5;
        this.bias = 0;
        this.canMouse = true;
        this.bob = 0;

        this.lines = [];
        this.parentNodes = [];

        this.setupHTML(name, css)

        if(parentNames){
            TreeNode.Dynamic_Nodes.push(this);
            this.setupDynamicNode(group, name, parentNames);
        }
        else{
            TreeNode.Static_Nodes.push(this);
            this.xrel = x;
            this.setPos(TreeNode.NODE_CONTAINER.clientWidth * x, y || 30)
            this.dx = 0;
            this.dy = 0;
        }

        TreeNode.Named_Nodes[name] = this;
        TreeNode.All_Nodes.push(this);
    }

    setupDragEvents(){
        let self = this;
        this.html.addEventListener("mouseover",() => {
            if( self.canMouse ){
                this.bob = NODE_BOB_FORCE;
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
        this.html.addEventListener("mousedown",() => this.startDrag()); // create closures because 'this' is horrible
        this.html.addEventListener("touchstart",() => this.startDrag());
    }

    setupDynamicNode(group, name, parentNames){
        this.setupDragEvents();

        for( let nodename of parentNames ){
            this.lines.push( new TreeLine(name,nodename) );
        }
        
        this.setPos( TreeNode.NODE_CONTAINER.clientWidth/2, 10 * group);
        this.applyForce(5 * launchDir, 10 * group);
    }

    /** Sets up this node's internal HTML */
    setupHTML(name, css){
        this.html = TreeNode.TEMPLATE_NODE.cloneNode(true);
        this.html.hidden = false;

        this.html.querySelector(".front").innerHTML = name;
        this.html.style.opacity = 0;

        this.html.id = "";
        this.html.classList.add(css);

        if(css == "static") this.html.querySelector(".back").remove();

        this.style = this.html.style;

        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        TreeNode.NODE_CONTAINER.appendChild(this.html);
    }

    startDrag(){
        this.listener = ((e)=>this.dragEvent(e));
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
    dragEvent(e){
        // thanks random blog: https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/
        if(e.clientX){ // mouse event
            this.setPos( e.clientX - Container_Pos.x, e.clientY - Container_Pos.y + window.scrollY);
        }
        else{ // touch event
            this.setPos(e.changedTouches[0].clientX - Container_Pos.x, e.changedTouches[0].clientY - Container_Pos.y + window.scrollY);
        }
        this.dx = 0;
        this.dy = 0;
    }

    setPos(x,y){
        this.x = MathUtils.clamp(x,0,TreeNode.NODE_CONTAINER.clientWidth);
        this.y = MathUtils.clamp(y,0,TreeNode.NODE_CONTAINER.clientHeight);       
    }

    applyForce(x,y){
        if( this.xrel ) return; // static
        this.dx = this.dx + x;
        this.dy = this.dy + y;
    }

    cacheParents(){
        this.parentNodes = [];
        for( let nodeName of this.parentNames ){
            this.parentNodes.push(TreeNode.Named_Nodes[nodeName]);
        }
    }

    appendLine(text){
        let newline = this.desc == "" ? "" : "<br><br>";
        this.desc = `${this.desc}${newline}${text}`;
        this.html.querySelector(".back").innerHTML = this.desc;
        return this;
    }

    addChild(that){
        this.childNodes.push(that);
    }

    activate(){
        this.html.style.opacity = 1;
        for( let line of this.lines ){
            line.activate();
        }
        this.active = true;
    }

    doRepulsionConstraint(that){
        const dist = MathUtils.distance(this.x,this.y,that.x,that.y)+0.1; // todo: don't compute this twice since we may find it in the above func
        const nx = (that.x-this.x)/dist;
        const ny = (that.y-this.y)/dist;
        const fac = MathUtils.clamp((dist - Relative_Node_Distance*NODE_DISTANCE)*0.03,-2,0);
        this.applyForce(nx*fac,ny*fac);
        that.applyForce(-nx*fac,-ny*fac);

        if(dist < Relative_Node_Distance*0.8){ // if two nodes intersect, nudge them in the right directions
            const diff = (this.group - that.group) * 0.5;
            this.applyForce(0, diff);
            that.applyForce(0, -diff);            
        }
    }

    doWallConstraints(){
        if( this.x < Relative_Node_Padding ){
            this.applyForce( ((Relative_Node_Padding - this.x)**2)*0.00005, 0 );
        }
        if( this.x > TreeNode.NODE_CONTAINER.clientWidth - Relative_Node_Padding ){
            this.applyForce( -((TreeNode.NODE_CONTAINER.clientWidth - Relative_Node_Padding - this.x)**2)*0.00005, 0 );
        }
        if( this.y < Relative_Node_Padding ){
            this.applyForce( 0, ((Relative_Node_Padding - this.y)**2)*0.00005 );
        }
        if( this.y > TreeNode.NODE_CONTAINER.clientHeight - Relative_Node_Padding ){
            this.applyForce( 0, -((TreeNode.NODE_CONTAINER.clientHeight - Relative_Node_Padding - this.y)**2)*0.00005 );
        }

        this.setPos(
            MathUtils.clamp(this.x,0,TreeNode.NODE_CONTAINER.clientWidth), 
            MathUtils.clamp(this.y,0,TreeNode.NODE_CONTAINER.clientHeight)
        );
    }

    doForces(){
        if(!this.active) return;

        this.applyForce(this.bias,this.mass); // gravity

        this.bob = MathUtils.clamp(this.bob-0.1,0,Infinity)
        this.applyForce(0, -this.bob);

        for( let line of this.lines ){ // elastic constraints
            line.doElasticConstraint();
        }

        for( let that of TreeNode.All_Nodes ){ // repulsive forces
            if(!that.active) continue;
            this.doRepulsionConstraint(that);
        }

        this.doWallConstraints();

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

        let vel = MathUtils.length(this.dx,this.dy) + 0.01;
        this.dx /= vel;
        this.dy /= vel;
        vel = MathUtils.clamp(vel,0,NODE_MAX_VEL); // hard speed cap
        this.dx *= vel;
        this.dy *= vel;

        if(this.listener) return;
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }

    render(){
        this.style.left = `${Math.round(this.x)}px`;
        this.style.top = `${Math.round(this.y)}px`;
    }

    static prepNodes(){
        for( let node of TreeNode.Dynamic_Nodes ){
            node.cacheParents();
        }
    }
}

function getPos(el) { // cursed function from stackoverflow
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}
let Container_Pos = {x:0, y:0};

let nolag = false;
function handleResize(){

    console.log("resize");
    Container_Pos = getPos(TreeNode.NODE_CONTAINER);

    if(nolag){ return; }
    nolag = true;
    setTimeout(()=>{nolag=false;},16);

    Relative_Node_Distance = NODE_DISTANCE * TreeNode.Static_Nodes[0].html.clientWidth;
    Relative_Node_Padding = NODE_PADDING * TreeNode.Static_Nodes[0].html.clientWidth;

    for( let node of TreeNode.Dynamic_Nodes ){
        node.setPos( (node.x/oldW)*TreeNode.NODE_CONTAINER.clientWidth, (node.y/oldH)*TreeNode.NODE_CONTAINER.clientHeight );
        node.render();
    }  

    for( let node of TreeNode.Static_Nodes ){
        node.x = node.xrel * TreeNode.NODE_CONTAINER.clientWidth;
        node.render();
    }  

    oldW = TreeNode.NODE_CONTAINER.clientWidth;
    oldH = TreeNode.NODE_CONTAINER.clientHeight;

    for( let line of TreeLine.Dynamic_Lines ){
        line.render();
    }  

}

let oldW = TreeNode.NODE_CONTAINER.clientWidth;
let oldH = TreeNode.NODE_CONTAINER.clientHeight;

window.addEventListener("load",() => { // the fact I have to put this in here is really stupid
    window.addEventListener('resize', () => {
        handleResize();
    });
    handleResize();
});

export {TreeLine as TreeLine}
export {TreeNode as TreeNode}