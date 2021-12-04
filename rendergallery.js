let processed, toDo = 0;
let CAROUSELS_256 = [];
let CAROUSELS_512 = [];
let CAROUSEL_1024;

const IMAGES_256 = [
    {
        url: "assets/raytracer/curvybase256.png",
        name: "The Amazing Curvy Base",
        capt: "Speedeo's Bitmap Module"
    },{
        url: "assets/raytracer/shippingcontainersdemo.png",
        name: "Shipping Containers",
        capt: "Colored Shadows Dev Test"
    },{
        url: "assets/raytracer/tracecluster.png",
        name: "Transparency Test",
        capt: "Colored Shadows Update"
    },{
        url: "assets/raytracer/mellonsphere.png",
        name: "Mellon Sphere",
        capt: "Simple AO Update"
    },{
        url: "assets/raytracer/ballbin.png",
        name: "AO Ballpit",
        capt: "Colored AO Update"
    },{
        url: "assets/raytracer/pgengrass1.png",
        name: "Grass Test 1",
        capt: "Working on P-Gen Grass"
    },{
        url: "assets/raytracer/pgengrass2.png",
        name: "Grass Test 2",
        capt: "Working on P-Gen Grass"
    },{
        url: "assets/raytracer/pgengrass.png",
        name: "Procedurally Generated Grass",
        capt: "Submaterials Update Rv.4"
    },{
        url: "assets/raytracer/urmomgay.png",
        name: "no u",
        capt: "Spectacular Update Rv.3"
    },{
        url: "assets/raytracer/glowyspheresrain.png",
        name: "Lights & Rain",
        capt: "Eye of the Storm: First Render"
    },{
        url: "assets/raytracer/terrain.png",
        name: "Custom Terrain",
        capt: "Eye of the Storm Rv.4"
    },{
        url: "assets/raytracer/italianhouse.png",
        name: "Modern House",
        capt: "Colored AO Update"
    },{
        url: "assets/raytracer/illuminatis.png",
        name: "Tetra Lattice",
        capt: "Soft-Shadow Point Lights"
    },{
        url: "assets/raytracer/bricks.png",
        name: "Normal Mapped Bricks",
        capt: "Modular Shaders Update",
        size: 172
    },{
        url: "assets/raytracer/refraction_demo.png",
        name: "Refractive Wheel of Doom",
        capt: "First Attempt at Refraction"
    },{
        url: "assets/raytracer/car.png",
        name: "Unusual Hotrod",
        capt: "Simple Refraction Update"
    },{
        url: "assets/raytracer/globgogabgolab_shiny.png",
        name: "Shiny Starfall Prop",
        capt: "Discovery of Starfall Custom Props"
    },{
        url: "assets/raytracer/pgengrass3.png",
        name: "Princess Peach",
        capt: "Submaterials Update Rv.4"
    },{
        url: "assets/raytracer/quatcubes.png",
        name: "Angled Cube Rings",
        capt: "Quaternion Texture Rotation"
    },{
        url: "assets/raytracer/streetlights.png",
        name: "Street Lamps",
        capt: "Spectacular Update Rv.2"
    },{
        url: "assets/raytracer/wet.png",
        name: "Wet",
        capt: "Creating the &quot;rain on the lens&quot; effect"
    },{
        url: "assets/raytracer/iconicbridge2.png",
        name: "The Overpass",
        capt: "Winds and Clouds Update"
    },{
        url: "assets/raytracer/coloredlighttest.png",
        name: "Fence Shader vs. Point Lights",
        capt: "Winds and Clouds Update Rv.1"
    },{
        url: "assets/raytracer/fenceshadows2.png",
        name: "Fence Shader vs. Sunlight",
        capt: "Winds and Clouds Update Rv.1"
    },{
        url: "assets/raytracer/cubemapballs.png",
        name: "Cubemap Spheres",
        capt: "Winds and Clouds Update Rv.2"
    },{
        url: "assets/raytracer/spookyemissives.png",
        name: "Cursed Emissive Textures",
        capt: "Discovery of a Useful Bug"
    },{
        url: "assets/raytracer/glowball.png",
        name: "Glowball",
        capt: "Emissive Textures Update"
    },{
        url: "https://cdn.discordapp.com/attachments/672248280222138391/682461029019549696/unnamed.jpg",
        name: "Garry's Splash Screen Robot",
        capt: "Emissive Textures Update Rv.1"
    },{
        url: "assets/raytracer/shadowtest.png",
        name: "Fence Shader Test 3",
        capt: "Submaterials Update Rv.3"
    },{
        url: "assets/raytracer/coolairship.png",
        name: "Cool Airship Dupe",
        capt: "Feathered Spotlight Test"
    },{
        url: "assets/raytracer/fantasticvismeshprops.png",
        name: "Fantastic Vismesh Props!",
        capt: "Custom Props: The Final Frontier"
    },{
        url: "assets/raytracer/sunreflection.png",
        name: "Cheeky Breeki Peeki Sun",
        capt: "Only A Partly Cloudy Update"
    },{
        url: "assets/raytracer/finallysomegoodfuckingrefraction.png",
        name: "Sphere of True Refraction",
        capt: "Refraction Rework Rv.1"
    },{
        url: "assets/raytracer/spacebuild.png",
        name: "Submaterial Transparency II",
        capt: "Submaterials Update Rv.2"
    },{
        url: "assets/raytracer/cursed_shiny.png",
        name: "Recursion Torture Test",
        capt: "Submaterial Update Rv.3"
    },{
        url: "assets/raytracer/rhnb.png",
        name: "Red Hot Nickel Balls",
        capt: "Submaterial Update Rv.3"
    },{
        url: "assets/raytracer/refraction_reactor.png",
        name: "Fusion Refractor",
        capt: "Submaterial Update Rv.3"
    },{
        url: "assets/raytracer/spectest.png",
        name: "Specular Highlights Test I",
        capt: "A Spectacular Update!"
    },{
        url: "assets/raytracer/cubespam.png",
        name: "Specular Highlights Test II",
        capt: "Spectacular Update Rv.1"
    },{
        url: "assets/raytracer/lightingtest2.png",
        name: "Sideways Windows Test",
        capt: "Spectacular Update Rv.2"
    },{
        url: "assets/raytracer/littleplanet.png",
        name: "A Small World",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "assets/raytracer/indooooors.png",
        name: "TV Time",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "assets/raytracer/causticsmain.png",
        name: "Caustics Testing",
        capt: "Specular Caustics Testing"
    },{
        url: "assets/raytracer/funnycans.png",
        name: "Glowy Cans",
        capt: "Caustics Update Rv.2"
    },{
        url: "assets/raytracer/cursedcubes.png",
        name: "Dense Transparent Cubes",
        capt: "Influence-Based Limits"
    },{
        url: "assets/raytracer/shards.png",
        name: "Glass Shards",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/horribleconstructbuilding.png",
        name: "Construct Tower A",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/tinfoil_and_barrels.png",
        name: "Shiny Surface + Barrels",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/cursedchairs.png",
        name: "Blue Chair Trefoil Knot",
        capt: "Point Light Improvements"
    }
    ,{
        url: "https://assets/raytracer/already.png",
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
        url: "assets/raytracer/latenightvibes.png",
        name: "Late Night Vibes",
        capt: "Point Light Improvements"
    },{
        url: "assets/raytracer/stairs.png",
        name: "Central Stair Unit",
        capt: "Point Light Improvements"
    },{
        url: "assets/raytracer/wirefacility.png",
        name: "Wire Facility",
        capt: "Point Light Improvements"
    },{
        url: "assets/raytracer/secretgarden.png",
        name: "Secret Garden",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/office.png",
        name: "Mirror's Edge Style Office",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/cabin.png",
        name: "Destructable Cabin",
        capt: "Caustics Update Rv.3"
    },{
        url: "assets/raytracer/roboengineer.png",
        name: "Robo-Engineer Vismesh w/ Caustics",
        capt: "Caustics Update Rv.2"
    },{
        url: "assets/raytracer/reflections.png",
        name: "Reflections: Visualized",
        capt: "Caustics Update Rv.2"
    },{
        url: "assets/raytracer/rainybase.png",
        name: "Wiremod Base",
        capt: "Eye of the Storm Update Rv.4"
    },{
        url: "assets/raytracer/zippubombu.png",
        name: "Zip Bomb Dupe",
        capt: "Eye of the Storm Update Rv.2"
    },{
        url: "assets/raytracer/stormarrives.png",
        name: "Ready for Anything",
        capt: "Eye of the Storm Update Rv.1"
    },{
        url: "assets/raytracer/bigspecular.png",
        name: "On the Edge",
        capt: "Spectacular Update Rv.2"
    },{
        url: "assets/raytracer/pow.png",
        name: "💥⌁POW⌁💥",
        capt: "A Spectacular Update!"
    },{
        url: "assets/raytracer/mobiusloop.png",
        name: "Möbius Thicc",
        capt: "Submaterials Update Rv.4"
    },{
        url: "assets/raytracer/glasshouse.png",
        name: "Glass House",
        capt: "Submaterials Update Rv.3"
    },{
        url: "assets/raytracer/submaterials.png",
        name: "Multi-Material Masterpiece",
        capt: "Submaterials Update"
    },{
        url: "assets/raytracer/barrelinvasion.png",
        name: "Barrel Invasion",
        capt: "Material System Expansions"
    },{
        url: "assets/raytracer/greyhoundbuilding.png",
        name: "Greyhound Building",
        capt: "Starlit Skies Update Rv.1"
    },{
        url: "assets/raytracer/starlight.png",
        name: "Sleep Is For The Weak",
        capt: "Starlit Skies Update"
    },{
        url: "assets/raytracer/garry_christmas.png",
        name: "Garry Christmas",
        capt: "Refractive Rework Update Rv.4"
    },{
        url: "assets/raytracer/icecubes512.png",
        name: "Ice Cubes",
        capt: "Material System Expansions"
    },{
        url: "assets/raytracer/dreary.png",
        name: "Dreary Interior",
        capt: "Eye of the Storm Rv. 4"
    },{
        url: "assets/raytracer/picnic.png",
        name: "Picnic Party",
        capt: "Testing the &quot;Leaves&quot; Shader"
    },{
        url: "assets/raytracer/prop_penumbras.png",
        name: "Prop Penumbras",
        capt: "PNG Exporting w/ Vurv's pnglib"
    },{
        url: "assets/raytracer/lightning.png",
        name: "Barrel Annihilation",
        capt: "Eye of the Storm Update"
    },{
        url: "assets/raytracer/fibosphere.png",
        name: "Chair Matrix",
        capt: "Spectacular Update Rv.3"
    },{
        url: "assets/raytracer/thefactory.png",
        name: "The Factory",
        capt: "Spectacular Update Rv.2"
    },{
        url: "assets/raytracer/triphousecubes.png",
        name: "gm_tripcity",
        capt: "Submaterials Update Rv.4a"
    },{
        url: "assets/raytracer/absolutelyhorriblehaystack.png",
        name: "Needles In A Haystack",
        capt: "Submaterials Update Rv.3"
    },{
        url: "assets/raytracer/inthehaystack.png",
        name: "Needles In A Haystack: Needle POV",
        capt: "Submaterials Update Rv.3"
    },{
        url: "assets/raytracer/bluechair.png",
        name: "That Blue Chair Prop Everyone Spams",
        capt: "Submaterials Update"
    },{
        url: "assets/raytracer/wiremod.png",
        name: "Big Wiremod Props",
        capt: "Emissive Textures Update Rv.1"
    },{
        url: "assets/raytracer/cubeaids.png",
        name: "gm_triphouse",
        capt: "Winds and Clouds Update Rv.2"
    },{
        url: "assets/raytracer/toxic_goo.png",
        name: "Caution: Radioactive Floor",
        capt: "Emissive Textures Update"
    },{
        url: "assets/raytracer/glowchess.png",
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
        url: "assets/raytracer/skybase_big.png",
        name: "Orange Skybase v8",
        capt: "Winds and Clouds Update Rv.1"
    },
    {
        url: "assets/raytracer/debugbase.png",
        name: "Destructive E2 Testing Base",
        capt: "Refractive Rework Update"
    },
    {
        url: "assets/raytracer/bluehallway.png",
        name: "Hi-Poly Glass Sphere",
        capt: "Refractive Rework Update"
    },
    {
        url: "assets/raytracer/tracertag.png",
        name: "Tracer Tag",
        capt: "Refractive Rework Update Rv.4"
    },
    {
        url: "assets/raytracer/ttt_poolparty.png",
        name: "ttt_poolparty",
        capt: "Starlit Skies Update"
    },
    {
        url: "assets/raytracer/aerobase.png",
        name: "The Aerobase - Night",
        capt: "Submaterials Update Rv.3"
    },
    {
        url: "assets/raytracer/aerobase2.png",
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
