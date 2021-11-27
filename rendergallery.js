let processed, toDo = 0;
let CAROUSELS_256 = [];
let CAROUSELS_512 = [];
let CAROUSEL_1024;

const IMAGES_256 = [
    {
        url: "https://media.discordapp.net/attachments/672248280222138391/682434041890472100/curvybase256.png",
        name: "The Amazing Curvy Base",
        capt: "Speedeo's Bitmap Module"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/682434120906965026/shippingcontainersdemo.png",
        name: "Shipping Containers",
        capt: "Colored Shadows Dev Test"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683503317309063189/tracecluster.png",
        name: "Transparency Test",
        capt: "Colored Shadows Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682434193975672862/mellonsphere.png",
        name: "Mellon Sphere",
        capt: "Simple AO Update"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/682435823668690980/ballbin.png",
        name: "AO Ballpit",
        capt: "Colored AO Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690487677576937472/unknown.png",
        name: "Grass Test 1",
        capt: "Working on P-Gen Grass"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690486880105529354/unknown.png",
        name: "Grass Test 2",
        capt: "Working on P-Gen Grass"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690485623018094602/pgengrass.png",
        name: "Procedurally Generated Grass",
        capt: "Submaterials Update Rv.4"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/741403101982097528/unknown.png",
        name: "no u",
        capt: "Spectacular Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/749835707438334103/unknown.png",
        name: "Lights & Rain",
        capt: "Eye of the Storm: First Render"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/790286772969275423/terrain.png",
        name: "Custom Terrain",
        capt: "Eye of the Storm Rv.4"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682434374574014497/italianhouse.png",
        name: "Modern House",
        capt: "Colored AO Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682434521265733664/illuminatis.png",
        name: "Tetra Lattice",
        capt: "Soft-Shadow Point Lights"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683514966342631434/unknown.png",
        name: "Normal Mapped Bricks",
        capt: "Modular Shaders Update",
        size: 172
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682434264385585158/refraction_demo.png",
        name: "Refractive Wheel of Doom",
        capt: "First Attempt at Refraction"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435502132953142/car.png",
        name: "Unusual Hotrod",
        capt: "Simple Refraction Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683503148559630463/globgogabgolab_shiny.png",
        name: "Shiny Starfall Prop",
        capt: "Discovery of Starfall Custom Props"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690488340117717022/unknown.png",
        name: "Princess Peach",
        capt: "Submaterials Update Rv.4"
    },{
        url: "https://media.discordapp.net/attachments/590337814898671636/697091485945954304/unknown.png",
        name: "Angled Cube Rings",
        capt: "Quaternion Texture Rotation"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/741402790047252540/unknown.png",
        name: "Street Lamps",
        capt: "Spectacular Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/749835541880635412/unknown.png",
        name: "Wet",
        capt: "Creating the &quot;rain on the lens&quot; effect"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435652708466718/iconicbridge2.png",
        name: "The Overpass",
        capt: "Winds and Clouds Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682434982438109203/coloredlighttest.png",
        name: "Fence Shader vs. Point Lights",
        capt: "Winds and Clouds Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435535871934464/fenceshadows2.png",
        name: "Fence Shader vs. Sunlight",
        capt: "Winds and Clouds Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435463125925888/cubemapballs.png",
        name: "Cubemap Spheres",
        capt: "Winds and Clouds Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435040038092816/spookyemissives.png",
        name: "Cursed Emissive Textures",
        capt: "Discovery of a Useful Bug"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435140747788384/glowball.png",
        name: "Glowball",
        capt: "Emissive Textures Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682461029019549696/unnamed.jpg",
        name: "Garry's Splash Screen Robot",
        capt: "Emissive Textures Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/687585764506337320/unknown.png",
        name: "Fence Shader Test 3",
        capt: "Submaterials Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/697090777989513267/unknown.png",
        name: "Cool Airship Dupe",
        capt: "Feathered Spotlight Test"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/790286780187934731/fantasticvismeshprops.png",
        name: "Fantastic Vismesh Props!",
        capt: "Custom Props: The Final Frontier"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435564716556342/sunreflection.png",
        name: "Cheeky Breeki Peeki Sun",
        capt: "Only A Partly Cloudy Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435114994630658/finallysomegoodfuckingrefraction.png",
        name: "Sphere of True Refraction",
        capt: "Refraction Rework Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683538136021860352/unknown.png",
        name: "Submaterial Transparency I",
        capt: "Submaterial Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435420298149960/spacebuild.png",
        name: "Submaterial Transparency II",
        capt: "Submaterials Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435470784725188/cursed_shiny.png",
        name: "Recursion Torture Test",
        capt: "Submaterial Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682435431165460514/rhnb.png",
        name: "Red Hot Nickel Balls",
        capt: "Submaterial Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683536367195914257/refraction_reactor.png",
        name: "Fusion Refractor",
        capt: "Submaterial Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/697090873002819604/unknown.png",
        name: "Specular Highlights Test I",
        capt: "A Spectacular Update!"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/697091385857409054/cubespam.png",
        name: "Specular Highlights Test II",
        capt: "Spectacular Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/720347480029528254/lightingtest2.png",
        name: "Sideways Windows Test",
        capt: "Spectacular Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/790286771430096913/littleplanet.png",
        name: "A Small World",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/805513280957317150/indooooors.png",
        name: "TV Time",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/801372968407138304/causticsmain.png",
        name: "Caustics Testing",
        capt: "Specular Caustics Testing"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/807366334245240862/funnycans.png",
        name: "Glowy Cans",
        capt: "Caustics Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/807366343685832704/cursedcubes.png",
        name: "Dense Transparent Cubes",
        capt: "Influence-Based Limits"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/831164104281817108/shards.png",
        name: "Glass Shards",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/831163934530732042/horribleconstructbuilding.png",
        name: "Construct Tower A",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/831164001869496330/tinfoil_and_barrels.png",
        name: "Shiny Surface + Barrels",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/880941110871072839/cursedchairs.png",
        name: "Blue Chair Trefoil Knot",
        capt: "Point Light Improvements"
    }
    ,{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/914041137436704788/go-outside-already.png",
        name: "Wiremod Base Interior",
        capt: "Circular Soft Shadows"
    }

];

// Prime 256x Carousels - 8 of them
for (let i = 0; i < 8; i++) {
    CAROUSELS_256[i] = new ImageCarousel('#Carousel256_'+i,3000,256,300,18);
    CAROUSELS_256[i].autoScroll(i*3000/8);
}

// Dump in the images
processed = 0;        
toDo = IMAGES_256.length
while( processed < toDo ){
    let image = IMAGES_256[processed];
    CAROUSELS_256[ processed % 8 ].addImage(image.url,image.name,image.capt,image.size);
    processed++;
}  

const IMAGES_512 = [
    {
        url: "https://cdn.discordapp.com/attachments/672248280222138391/880939791917670510/latenightvibes.png",
        name: "Late Night Vibes",
        capt: "Point Light Improvements"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/880939794581041172/stairs.png",
        name: "Central Stair Unit",
        capt: "Point Light Improvements"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/854851748920295424/wirefacility.png",
        name: "Wire Facility",
        capt: "Point Light Improvements"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/842653803836735498/secretgarden.png",
        name: "Secret Garden",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/831162859068719104/office.png",
        name: "Mirror's Edge Style Office",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/831164226613542963/cabin.png",
        name: "Destructable Cabin",
        capt: "Caustics Update Rv.3"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/807366320252256326/roboengineer.png",
        name: "Robo-Engineer Vismesh w/ Caustics",
        capt: "Caustics Update Rv.2"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/805513368248123472/reflections.png",
        name: "Reflections: Visualized",
        capt: "Caustics Update Rv.2"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/790286777305923614/rainybase.png",
        name: "Wiremod Base",
        capt: "Eye of the Storm Update Rv.4"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/763646344933933066/zippubombu.png",
        name: "Zip Bomb Dupe",
        capt: "Eye of the Storm Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/749835107812114452/unknown.png",
        name: "Ready for Anything",
        capt: "Eye of the Storm Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/720347531770331136/bigspecular.png",
        name: "On the Edge",
        capt: "Spectacular Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/697114297003933767/pow.png",
        name: "💥⌁POW⌁💥",
        capt: "A Spectacular Update!"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690489176151556096/unknown.png",
        name: "Möbius Thicc",
        capt: "Submaterials Update Rv.4"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/687582360710938708/glasshouse.png",
        name: "Glass House",
        capt: "Submaterials Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683544113106386992/submaterials.png",
        name: "Multi-Material Masterpiece",
        capt: "Submaterials Update"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/671537834817093683/unknown.png",
        name: "Barrel Invasion",
        capt: "Material System Expansions"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/666088994903293962/greyhoundbuilding.png",
        name: "Greyhound Building",
        capt: "Starlit Skies Update Rv.1"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/661566280578498560/starlight.png",
        name: "Sleep Is For The Weak",
        capt: "Starlit Skies Update"
    },{
        url: "https://media.discordapp.net/attachments/590337814898671636/660927064320507935/garry_christmas.png",
        name: "Garry Christmas",
        capt: "Refractive Rework Update Rv.4"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/673480806181765130/icecubes512.png",
        name: "Ice Cubes",
        capt: "Material System Expansions"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/790296269724581938/dreary.png",
        name: "Dreary Interior",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/763647553967095828/picnic.png",
        name: "Picnic Party",
        capt: "Testing the &quot;Leaves&quot; Shader"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/752841447958511636/prop_penumbras.png",
        name: "Prop Penumbras",
        capt: "PNG Exporting w/ Vurv's pnglib"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/749835041848164472/unknown.png",
        name: "Barrel Annihilation",
        capt: "Eye of the Storm Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/741411014960087040/unknown.png",
        name: "Chair Matrix",
        capt: "Spectacular Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/720347460681072690/thefactory.png",
        name: "The Factory",
        capt: "Spectacular Update Rv.2"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/691982097648189480/unknown.png",
        name: "gm_tripcity",
        capt: "Submaterials Update Rv.4a"
    },{
        url: "https://cdn.discordapp.com/attachments/590337814898671636/687711497069396044/absolutelyhorriblehaystack.png",
        name: "Needles In A Haystack",
        capt: "Submaterials Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/690490305937670184/inthehaystack.png",
        name: "Needles In A Haystack: Needle POV",
        capt: "Submaterials Update Rv.3"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683544663541547013/unknown.png",
        name: "That Blue Chair Prop Everyone Spams",
        capt: "Submaterials Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/672251887910912040/wiremod.png",
        name: "Big Wiremod Props",
        capt: "Emissive Textures Update Rv.1"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/672251326645927947/cubeaids.png",
        name: "gm_triphouse",
        capt: "Winds and Clouds Update Rv.2"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/672251918499971073/toxic_goo.png",
        name: "Caution: Radioactive Floor",
        capt: "Emissive Textures Update"
    },{
        url: "https://media.discordapp.net/attachments/672248280222138391/672253383746256906/glowchess.png",
        name: "Glowy Chess",
        capt: "Refractive Rework Update"
    }
];

// Prime 512x Carousels - 2 of them
for (let i = 0; i < 2; i++) {
    CAROUSELS_512[i] = new ImageCarousel('#Carousel512_'+i,5000,512,700,18);
    CAROUSELS_512[i].autoScroll(i*5000/2);
}

// Dump in the images
processed = 0;        
toDo = IMAGES_512.length
while( processed < toDo ){
    let image = IMAGES_512[processed];
    CAROUSELS_512[ processed % 2 ].addImage(image.url,image.name,image.capt);
    processed++;
}  

const IMAGES_1024 = [
    {
        url: "https://media.discordapp.net/attachments/672248280222138391/673480836863098890/skybase_big.png",
        name: "Orange Skybase v8",
        capt: "Winds and Clouds Update Rv.1"
    },
    {
        url: "https://media.discordapp.net/attachments/672248280222138391/673486860466651136/debugbase.png",
        name: "Destructive E2 Testing Base",
        capt: "Refractive Rework Update"
    },
    {
        url: "https://media.discordapp.net/attachments/672248280222138391/673480866852241408/bluehallway.png",
        name: "Hi-Poly Glass Sphere",
        capt: "Refractive Rework Update"
    },
    {
        url: "https://cdn.discordapp.com/attachments/672248280222138391/914043247372926976/tracertag.png",
        name: "Tracer Tag",
        capt: "Refractive Rework Update Rv.4"
    },
    {
        url: "https://cdn.discordapp.com/attachments/672248280222138391/914045169228185640/ttt_poolparty.png",
        name: "ttt_poolparty",
        capt: "Starlit Skies Update"
    },
    {
        url: "https://cdn.discordapp.com/attachments/672248280222138391/683543175352418304/aerobase.png",
        name: "The Aerobase - Night",
        capt: "Submaterials Update Rv.3"
    },
    {
        url: "https://cdn.discordapp.com/attachments/672248280222138391/687582179915595794/aerobase2.png",
        name: "The Aerobase - Day",
        capt: "Submaterials Update Rv.3"
    },
]


// Prime 1024x Carousel - 1 of them
CAROUSEL_1024 = new ImageCarousel('#Carousel1024_0',7000,1024,700,18);

// Dump in the images
processed = 0;        
toDo = IMAGES_1024.length
while( processed < toDo ){
    let image = IMAGES_1024[processed];
    CAROUSEL_1024.addImage(image.url,image.name,image.capt);
    processed++;
}  


console.log("Fast's Image Carousels: population routine completed");
