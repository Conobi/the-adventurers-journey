// priority: 0
/*
console.info('Hello, World! (You will see this line every time client resources reload)')


// Hides items from REI
REIEvents.hide('item', event => {
    const itemsToHide = [
        'deeperdarker:echo_boat',
        'deeperdarker:echo_chest_boat',
        'create:creative_motor',
        'create:creative_fluid_tank',
        'create:creative_crate',
        'create:handheld_worldshaper',
        'createaddition:creative_energy',
        '@lootr',
        'kubejs:rei_groups/creativeitems',
        'minecraft:spawner',
        'minecraft:dragon_egg',
        'minecraft:command_block',
        'minecraft:barrier',
        'minecraft:light',
        'minecraft:repeating_command_block',
        'minecraft:chain_command_block',
        'minecraft:structure_block',
        'minecraft:structure_void',
        'minecraft:jigsaw',
        'minecraft:command_block_minecart',
        'minecraft:written_book',
        'minecraft:command_block_minecart',
        'minecraft:knowledge_book',
        'minecraft:debug_stick',
        'minecraft:filled_map',
        'create:copper_backtank_placeable',
        'create:netherite_backtank_placeable',
        'creategoggles:chainmail_backtank_placeable',
        'creategoggles:diamond_backtank_placeable',
        'creategoggles:golden_backtank_placeable',
        'creategoggles:iron_backtank_placeable',
        'creategoggles:leather_backtank_placeable',
    ];

    itemsToHide.forEach(item => event.hide(item));
});

// Groups Items in REI
REIEvents.groupEntries(event => {

    // Groups Vanilla Minecraft Building Blocks
    event.groupItems("kubejs:rei_groups/buildingblocks", "Building Blocks", [
        InputItem.of('%building_blocks'),
    ]);

    // Groups Vanilla Minecraft Decoration Blocks
    event.groupItems("kubejs:rei_groups/decoration", "Decoration Blocks", [
        InputItem.of('%decorations'),
    ]);

    // Groups Vanilla Minecraft Redstone Blocks
    event.groupItems("kubejs:rei_groups/redstone", "Redstone", [
        InputItem.of('%redstone'),
    ]);

    // Groups Vanilla Minecraft Transportation Blocks
    event.groupItems("kubejs:rei_groups/transportation", "Transportation", [
        InputItem.of('%transportation'),
    ]);

    // Groups Vanilla Minecraft Misc. Blocks
    event.groupItems("kubejs:rei_groups/misc", "Miscellaneous", [
        InputItem.of('%misc'),
    ]);

    // Groups Vanilla Minecraft Food Items
    event.groupItems("kubejs:rei_groups/foodstuffs", "Foodstuffs", [
        InputItem.of('%food'),
        'minecraft:suspicious_stew',
    ]);

    // Groups Vanilla Minecraft Tools
    event.groupItems("kubejs:rei_groups/tools", "Tools", [
        InputItem.of('%tools'),
        'minecraft:bundle',
    ]);

    // Groups Vanilla Minecraft Combat Items
    event.groupItems("kubejs:rei_groups/combat", "Combat", [
        InputItem.of('%combat'),
    ]);

    // Groups Vanilla Minecraft Brewing Items
    event.groupItems("kubejs:rei_groups/brewing", "Brewing", [
        InputItem.of('%brewing'),
    ]);

    // Groups Charm Items
    event.groupItems("kubejs:rei_groups/charm", "Charm", [
        InputItem.of('@charm'),
    ]);

    // Groups Chipped Items
    event.groupItems("kubejs:rei_groups/chipped", "Chipped Blocks", [
        InputItem.of('@chipped'),
    ]);

    // Groups Deeper and Darker Items
    event.groupItems("kubejs:rei_groups/deeperdarker", "Deeper and Darker", [
        InputItem.of('@deeperdarker'),
        'farmersknives:warden_knife',
    ]);

    // Groups Supplementary Items
    event.groupItems("kubejs:rei_groups/supplementaries", "Supplementaries", [
        InputItem.of('@supplementaries'),
    ]);

    // Groups Villager Plus Items
    event.groupItems("kubejs:rei_groups/villagers", "Villagers Plus", [
        InputItem.of('@villagersplus'),
    ]);

    // Groups Deepslate Cutting Items
    event.groupItems("kubejs:rei_groups/deepslatecutting", "Deepslate Cutting", [
        InputItem.of('@deepslatecutting'),
    ]);

    // Groups Base Create Items
    event.groupItems("kubejs:rei_groups/create", "Create and Addons", [
        InputItem.of('@create'),
        InputItem.of('@railways'),
        InputItem.of('@create_crystal_clear'),
        InputItem.of('@createaddition'),
        InputItem.of('@elitia'),
        InputItem.of('@sliceanddice'),
        InputItem.of('@creategoggles'),
        'create:chromatic_compound',
        'create:create_manual',
        InputItem.of('@create_enchantment_industry'),
        InputItem.of('@createutilities'),
        InputItem.of('@createdeco'),
        InputItem.of('@createchunkloading'),
    ]);

    // Groups Fabric Waystone Items
    event.groupItems("kubejs:rei_groups/fabric_waystones", "Fabric Waystones", [
        InputItem.of('@fwaystones'),
    ]);

    // Groups Naturalist Items Together
    event.groupItems("kubejs:rei_groups/naturalist", "Naturalist", [
        InputItem.of('@naturalist'),
    ]);

    // Groups Angling Items Together
    event.groupItems("kubejs:rei_groups/angling", "Angling", [
        InputItem.of('@angling'),
    ]);

    // Groups Copper Pipe Items Together
    event.groupItems("kubejs:rei_groups/pipes", "Simple Copper Pipes", [
        InputItem.of('@lunade'),
    ]);

    // Groups Immersive Aircraft Items Together
    event.groupItems("kubejs:rei_groups/immersive_aircrafts", "Immersive Aircrafts", [
        InputItem.of('@immersive_aircraft'),
    ]);

    // Groups Enchanted Vertical Slabs Together
    event.groupItems("kubejs:rei_groups/enchanted_slabs", "Enchanted Vertical Slabs", [
        InputItem.of('@enchanted-vertical-slabs'),
    ]);

    // Groups Beautify Items Together
    event.groupItems("kubejs:rei_groups/beautify", "Beautify", [
        InputItem.of('@beautify')
    ])

    // Groups Bountiful Items Together
    event.groupItems("kubeks:rei_groups/bountiful", "Bountiful", [
        InputItem.of('@bountiful')
    ])

    // Groups Universal Ores Together
    event.groupItems("kubjes:rei_groups/Universal_Ores", "Universal Ores", [
        InputItem.of('@universal_ores')
    ])

    // Groups Adorn Items Together
    event.groupItems("kubjes:rei_groups/adorn", "Adorn", [
        InputItem.of('@adorn')
    ])

    // Groups items with NBT data
    const useNbt = [
        'potion',
        'enchanted_book',
        'splash_potion',
        'tipped_arrow',
        'lingering_potion',
        'supplementaries:bamboo_spikes_tipped',
        'goat_horn',
        'angling:roe'
    ];

    useNbt.forEach(id => {
        const item = Item.of(id)
        const { namespace, path } = Utils.id(item.id)
        event.groupSameItem(`kubejs:rei_groups/${namespace}/${path}`, getID(id), item)
    });

    // Groups Fluids
    event.groupFluids('kubejs:rei_groups/fluid_tagged_as_water', 'Fluids', [
        'minecraft:water',
        'minecraft:lava',
    ]);

    // Groups Create Fluids
    event.groupFluids('kubejs:rei_groups/create_fluids', 'Create Fluids', [
        'create:honey',
        'create:chocolate',
        'milk:still_milk',
        'createaddition:bioethanol',
        'createaddition:seed_oil',
        'create_enchantment_industry:ink'
    ]);
})

function getID(id) {
    if (id == 'splash_potion') {
        return "Splash Potions";
    } else if (id == 'lingering_potion') {
        return "Lingering Potions";
    } else if (id == 'potion') {
        return "Potions";
    } else if (id == 'enchanted_book') {
        return "Enchanted Books";
    } else if (id == 'tipped_arrow') {
        return "Tipped Arrows";
    } else if (id == 'supplementaries:bamboo_spikes_tipped') {
        return "Tipped Bamboo Spikes";
    } else if (id == 'goat_horn') {
        return "Goat Horn";
    }
    else if (id == 'angling:roe') {
        return "Angling Roe Items";
    }
    return id;
};

*/
