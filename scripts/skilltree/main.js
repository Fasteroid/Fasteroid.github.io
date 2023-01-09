
import {TreeLine, TreeNode} from "./objects.js"

// the old skill tree was a mess
// maybe this one will be better


// TODO: move into external json file
// TODO: add a "compile" step to bake node positions so they find equilibrium faster
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

    new TreeNode(2,"Expression 2","expression2",["Redstone","Calculus"])
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
    .appendLine("Abused so badly in Odyssey of the Mind that a new policy was implemented to nerf my 3D printing!") // true story, this did happen, see page 45 of https://www.odysseyofthemind.com/p/wp-content/uploads/2018/08/2021-Program-Guide.pdf
    .appendLine("The nerf was a feeble attempt to stop me.");

    new TreeNode(4,"Code.org /<br>ES1 JavaScript","code",["Expression 2"])
    .appendLine("Old ES1 JavaScript from Code.org's App Lab.")
    .appendLine("These nodes use physics code from a project I made there.");

    new TreeNode(3,"Adobe After Effects","aftereffects",["Adobe Illustrator"])
    .appendLine("Photoshop for video; puts the FX in VFX.")
    .appendLine("Used for many disgraceful memes and edits.");

    new TreeNode(4,"Calculus","calculus",["ENGINEERING"])
    .appendLine("Learned during<br>AP Calc AB.")
    .appendLine("I'm self-taught on vectors from Calc C!");   

    new TreeNode(4,"Adobe Premiere","premiere",["Adobe After Effects"])
    .appendLine("For compiling audio and video clips.")
    .appendLine("I used this my senior year of high school for editing the school's news show.");

    new TreeNode(3,"Java","java",["Code.org /<br>ES1 JavaScript","C"])
    .appendLine("Learned during AP Computer Science A.")
    .appendLine("I used it to extend my Discord relay to a Minecraft server, but it sucked.")
    .bias = 1;

    new TreeNode(3,"Arduino","arduino",["Expression 2","3D Printing"])
    .appendLine("A C-style language simplified enough for an amateur to pick up.")
    .appendLine("Used in Odyssey of the Mind in 2019 and helped us place second at world finals!");

    new TreeNode(4,"C","c",["Arduino"])
    .appendLine("Learned during second and third years of college.")
    .appendLine("Haven't mastered it, but I know the core concepts.")
    .bias = 3;

    new TreeNode(4,"NodeJS","nodejs",["Code.org /<br>ES1 JavaScript","Lua"])
    .appendLine("ES6 JavaScript as a backend.")
    .appendLine("Runs the peripherals of my Garry's Mod server and auto-restarts it when it crashes.")
    .bias=-1;

    // this node is unusually cluttered, so it needs extra constraint length
    new TreeNode(4,"JavaScript","js",["NodeJS","Code.org /<br>ES1 JavaScript"])
    .appendLine("ES6+ Specifications; modern JavaScript without frameworks.")
    .appendLine("I have yet to experience the power of a good framework.");

    new TreeNode(4,"JS Extender","invisible",["JavaScript"])

    new TreeNode(4,"Lua","lua",["Expression 2"])
    .appendLine("A common language of game scripting.")
    .appendLine("I know the variant used in Garry's Mod.")
    .dx = -70;

    new TreeNode(4,"HTML 5","html",["JS Extender"])
    .appendLine("The skeleton and structure of websites.")
    .appendLine("I'm actually getting worse at avoiding div soup 💀").bias=2;

    new TreeNode(4,"CSS 3","css",["JS Extender"])
    .appendLine("Formatting the web with extravagant &lt;style&gt;")
    .appendLine("A constant source of frustration, but usually worth the struggle.").bias=-3;

    new TreeNode(3,"Blender Modeling","blender",["Autodesk<br>123D Design","Adobe Illustrator","GIMP"])
    .appendLine("The 3D multipurpose program with a brutal learning curve")
    .appendLine("Used alongside other programs to customize my VRChat avatar.");

    new TreeNode(6,"Electron","electron",["CSS 3","JS Extender",'HTML 5'])
    .appendLine("Desktop apps made by web developers!")
    .appendLine("Used to build an app for my dad that helps him automate patient data at work.").mass=4;

    new TreeNode(3,"Regex","regex",["JavaScript","NodeJS"])
    .appendLine('Forbidden pattern-matching runes with immense power.')
    .appendLine('Most familiar with the EMCAScript variant.').bias = -2;

    new TreeNode(9,"Bootstrap","bootstrap",["CSS 3"])
    .appendLine("CSS for lazy people.")
    .appendLine("Learned during my third year of college.")
    .appendLine("So far, I've only found it good for prototyping.");

    new TreeNode(8,"Ubuntu/Linux","ubuntu",["C"])
    .appendLine("𝚜𝚞𝚍𝚘 𝚌𝚑𝚘𝚠𝚗 -𝚁<br>𝚏𝚊𝚜𝚝𝚎𝚛𝚘𝚒𝚍 / ")
    .appendLine('wait frick 💀')
    .appendLine("I recovered in 4 hours with no real backups!")

    new TreeNode(10,"Bash","bash",["Ubuntu/Linux"])
    .appendLine('The beloved Bourne Again Shell.')
    .appendLine('After the above incident, I wrote a bash script for automated backups.')

    new TreeNode(8,"TypeScript","ts",["JavaScript"])
    .appendLine("It's JavaScript, but BETTER!")
    .appendLine("It has types and helps you write better code!");

    TreeLine.Dynamic_Lines_Refs["Lua"]["NodeJS"].lengthModifier = 75;

    TreeLine.Dynamic_Lines_Refs["Expression 2"]["Lua"].lengthModifier = 75;

    TreeLine.Dynamic_Lines_Refs["JavaScript"]["JS Extender"].lengthModifier = -100;

    for (let n = 3; n < TreeNode.All_Nodes.length; n++) {
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