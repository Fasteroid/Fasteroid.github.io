
import {TreeLine, TreeNode} from "./objects.js"

// the old skill tree was a mess
// maybe this one will be better


// TODO: move into external json file
// TODO: add a "compile" step to bake node positions so they find equilibrium faster
function createNodes(){

    new TreeNode("COMPUTER SCIENCE","static",false,0.3666);
    new TreeNode("ENGINEERING","static",false,0.6333);
    new TreeNode("AUDIO & VISUALS","static",false,0.9);

    new TreeNode("LEGO Technic","lego",["ENGINEERING"])
    .appendLine("The bricks with holes that put functionality over beauty.")
    .appendLine("Used and abused hard during childhood.")
    .mass = 0;

    new TreeNode("LEGO Mindstorms","mindstorms",["COMPUTER SCIENCE", "LEGO Technic"])
    .appendLine("Simple block-style programming for LEGO robots.")
    .appendLine("Used as late as 2019 to drop plastic spiders on trick-or-treaters");

    new TreeNode("Percussion","drums",["AUDIO & VISUALS"])
    .appendLine("A keeper of time and drummer of drums from 4th to 8th grade.")
    .appendLine("I can keep precise time up to around 770BPM.");
    
    new TreeNode("Redstone","redstone",["LEGO Mindstorms"])
    .appendLine("Laid the foundations for my understanding of boolean logic.")
    .appendLine("Minecraft also started me memorizing my powers of two.");

    new TreeNode("Woodworking","woodworking",["ENGINEERING"])
    .appendLine("Officially picked up in 8th grade.")
    .appendLine("I can use a variety of woodshop tools safely.");

    new TreeNode("Audacity","audacity",["Percussion"])
    .appendLine("Does audio & waveform editing.")
    .appendLine("I'm capable of making song mashups that aren't actually terrible.");

    new TreeNode("Adobe Photoshop","photoshop",["AUDIO & VISUALS"])
    .appendLine("Edits images in almost any way imaginable.")
    .appendLine("Can create from scratch too, but illustrator is usually better for that.");

    new TreeNode("Expression 2","expression2",["Redstone"])
    .appendLine("My first true coding language.")
    .appendLine("Part of an addon for the popular sandbox game, Garry's Mod.")
    .bias = 2;

    new TreeNode("Adobe Illustrator","illustrator",["Adobe Photoshop"])
    .appendLine("Creates and edits vector graphics, which display crisply at all resolutions.")
    .appendLine("Most of these nodes use vector graphics.")
    .bias = 3;

    new TreeNode("GIMP","gimp",["Adobe Photoshop"])
    .appendLine("The GNU Image Manipulation Program.")
    .appendLine("Open-source, free, and 9 times out of 10 better than photoshop.")
    .bias = -3;

    new TreeNode("Autodesk<br>123D Design","autodesk",["Woodworking"])
    .appendLine("The deprecated predecessor to<br>Fusion 360.")
    .appendLine("Immensely powerful, easy to use, and free.");

    new TreeNode("Adobe After Effects","aftereffects",["Adobe Illustrator"])
    .appendLine("Photoshop for video; puts the FX in VFX.")
    .appendLine("Used for many disgraceful memes and edits.");

    new TreeNode("Blender","blender",["Autodesk<br>123D Design","Adobe Illustrator","GIMP"])
    .appendLine("The 3D multipurpose program with a brutal learning curve")
    .appendLine("Used here and there in multiple different projects.");

    new TreeNode("3D Printing","printing",["Autodesk<br>123D Design","Blender"])
    .appendLine("Abused so badly in Odyssey of the Mind that a new policy was implemented to nerf my 3D printing!") // true story, this did happen, see page 45 of https://www.odysseyofthemind.com/p/wp-content/uploads/2018/08/2021-Program-Guide.pdf
    .appendLine("The nerf was a feeble attempt to stop me.");

    new TreeNode("Code.org /<br>ES1 JavaScript","code",["Expression 2"])
    .appendLine("ES1 JavaScript from Code.org's App Lab.")
    .appendLine("These nodes use modified physics code from an App Lab project.");

    new TreeNode("Arduino","arduino",["Expression 2","3D Printing"])
    .appendLine("A C-style language simplified enough for an amateur to pick up.")
    .appendLine("Used in Odyssey of the Mind in 2019 and helped us place second at world finals!");

    new TreeNode("C","c",["Arduino"])
    .appendLine("Learned during second and third years of college.")
    .appendLine("Haven't mastered it, but I know the core concepts.")
    .bias = 3;

    new TreeNode("Java","java",["Code.org /<br>ES1 JavaScript","C"])
    .appendLine("Learned during AP Computer Science A.")
    .appendLine("I used it to extend my Discord relay to a Minecraft server, but it sucked.")
    .bias = 1;

    new TreeNode("Adobe<br>Premiere","premiere",["Adobe After Effects"])
    .appendLine("For compiling audio and video clips.")
    .appendLine("I used this my senior year of high school for editing the school's news show.");

    const MathRoot = new TreeNode("ADVANCED MATHEMATICS","static",false,0.1);
    MathRoot.y = 750;
    MathRoot.group = 3;

    new TreeNode("Calculus","calculus",["ADVANCED MATHEMATICS"])
    .appendLine("Learned During<br>AP Calc AB.")
    .appendLine("I'm self taught on some concepts from Calc C!");  
    
    new TreeNode("Desmos","desmos",["Calculus"])
    .appendLine("An inspiring, free, and turing-complete online graphing calculator.")
    .appendLine("Anything is possible if you're determined enough!");   

    const LuaNode = new TreeNode("Lua","lua",["Expression 2"])
    .appendLine("A common language of game scripting.")
    .appendLine("I know the variant used in Garry's Mod.");
    LuaNode.dx = -200;
    LuaNode.bias = -1;
    
    new TreeNode("NodeJS","nodejs",["Code.org /<br>ES1 JavaScript","Lua"])
    .appendLine("ES6 JavaScript as a backend.")
    .appendLine("Runs the peripherals of my Garry's Mod server and auto-restarts it when it crashes.");

    new TreeNode("JavaScript","js",["NodeJS","Code.org /<br>ES1 JavaScript"])
    .appendLine("ES6+ Specifications; modern JavaScript without frameworks.")
    .appendLine("I have yet to experience the power of a good framework.");
    
    new TreeNode("jsext","invisible",["JavaScript"])

    new TreeNode("CSS","css",["jsext"])
    .appendLine("Formatting the web with extravagant &lt;style&gt;")
    .appendLine("A constant source of frustration, but usually worth the struggle.").bias = 3;

    new TreeNode("HTML","html",["jsext"])
    .appendLine("The skeleton and structure of websites,")
    .appendLine("and a subset of the wider XML family.")
    .bias=-2;

    const RegexNode = new TreeNode("Regex","regex",["JavaScript","NodeJS"])
    .appendLine('Forbidden pattern-matching runes with immense power.')
    .appendLine('Most familiar with the EMCAScript variant.');
    RegexNode.bias = -2;
    RegexNode.dx = 5000;

    new TreeNode("Ubuntu/Linux","ubuntu",["C"])
    .appendLine("𝚜𝚞𝚍𝚘 𝚌𝚑𝚘𝚠𝚗 -𝚁<br>𝚏𝚊𝚜𝚝𝚎𝚛𝚘𝚒𝚍 / ")
    .appendLine('wait frick 💀') 
    .appendLine("I recovered in 4 hours with no real backups!");

    new TreeNode("Bash","bash",["Ubuntu/Linux"])
    .appendLine('The beloved Bourne Again Shell.')
    .appendLine('After the above incident, I wrote a bash script for automated backups.');

    new TreeNode("Electron","electron",['HTML', 'CSS', 'jsext'])
    .appendLine("Desktop apps made by web developers!")
    .appendLine("Used to build an app for my dad that helps him automate patient data at work.")
    .mass=3;

    new TreeNode("Bootstrap","bootstrap",["CSS"])
    .appendLine("CSS for lazy people.")
    .appendLine("Learned during my third year of college.") 
    .appendLine("So far, I've only found it good for prototyping.")
    .group+=2;

    new TreeNode("TypeScript","ts",["NodeJS","Desmos"])
    .appendLine("It's JavaScript, but BETTER!")
    .appendLine("It has types and helps you write better code!")
    .bias=-1;

    new TreeNode("WebGL","webgl",["TypeScript","Desmos"])
    .appendLine("A terrifying low-level GPU API for the web.")
    .appendLine("Do NOT approach outside of Shadertoy.")
    .bias=-1;

    new TreeNode("ColdFusion","coldfusion",["HTML"])
    .appendLine("What if XML was<br>turing-complete?")
    .appendLine("Yeah, me either, who's idea was this?")
    .appendLine("Currently in-use at my first internship!")
    .group+=2;


    TreeLine.Dynamic_Lines_Refs["Lua"]["NodeJS"].lengthModifier = 75;

    TreeLine.Dynamic_Lines_Refs["Desmos"]["WebGL"].lengthModifier = 70;

    TreeLine.Dynamic_Lines_Refs["JavaScript"]["jsext"].lengthModifier = -100;
    TreeLine.Dynamic_Lines_Refs["jsext"]["Electron"].lengthModifier = 50;

    TreeLine.Dynamic_Lines_Refs["HTML"]["Electron"].lengthModifier = 50;
    TreeLine.Dynamic_Lines_Refs["CSS"]["Electron"].lengthModifier = 50;
  
}

function initNodes(){
    for (let n = 0; n < TreeNode.All_Nodes.length; n++) {
        setTimeout(() => TreeNode.All_Nodes[n].activate(),n*80);
    }
}

createNodes(); 
TreeLine.prepLines();
TreeNode.prepNodes();

function frame(){
    for( let node of TreeNode.Dynamic_Nodes ){
        node.render();
    }
    for( let line of TreeLine.Dynamic_Lines ){
        line.render();
    }
}

setInterval( () => {

    for( let node of TreeNode.Dynamic_Nodes ){
        node.doForces();
    }
    for( let node of TreeNode.Dynamic_Nodes ){
        node.doPositioning();
    }

    requestAnimationFrame(frame);
} , 16);


document.addEventListener("mouseup",()=>{
    for( let node of TreeNode.Dynamic_Nodes ){
        node.stopDrag();
    } 
});

document.addEventListener("touchend",()=>{
    for( let node of TreeNode.Dynamic_Nodes ){
        node.stopDrag();
    } 
});

addEventListener("load",initNodes)