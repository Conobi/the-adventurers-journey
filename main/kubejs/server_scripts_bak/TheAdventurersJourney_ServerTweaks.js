// priority: 0

console.info('Hello, World! (You will see this line every time server resources reload)')

ServerEvents.recipes(event => {
	// Change recipes here
	event.remove({ id: 'deeperdarker:echo_boat' }) // Removes Echo boat recipes
	event.remove({ id: 'deeperdarker:echo_chest_boat' }) // Removes Echo chest boat recipes

	// Creates Creative Blaze Cake Recipe
	event.recipes.create.mechanical_crafting(Item.of('create:creative_blaze_cake'), [
		'ADA',
		'CBC',
		'ACA'
	], {
		A: 'create:refined_radiance',
		B: 'create:blaze_cake',
		C: 'minecraft:nether_star',
		D: 'minecraft:dragon_head'
	})

	// Creates Chromatic Compound Recipe
	event.recipes.create.mixing('create:chromatic_compound', [
		'minecraft:glowstone_dust',
		'create:powdered_obsidian',
		'create:polished_rose_quartz'
	]).superheated()

	// Alternate Chest Recipes
	var wood_types = [
		['charm:oak_chest', 'minecraft:oak_log'],
		['charm:acacia_chest', 'minecraft:acacia_log'],
		['charm:birch_chest', 'minecraft:birch_log'],
		['charm:spruce_chest', 'spruce:oak_log'],
		['charm:dark_oak_chest', 'minecraft:dark_oak_log'],
		['charm:jungle_chest', 'minecraft:jungle_log'],
		['charm:mangrove_chest', 'minecraft:mangrove_log'],
		['charm:ebony_chest', 'charm:ebony_log'],
		['charm:azalea_chest', 'charm:azalea_log'],
		['charm:warped_chest', 'minecraft:warped_stem'],
		['charm:crimson_chest', 'minecraft:crimson_stem']
	]

	wood_types.forEach(wood_type => {
		event.shaped(
			Item.of(wood_type[0], 4),
			[
				'AAA',
				'A A',
				'AAA'
			],
			{
				A: wood_type[1]
			}
		)
	});

	// Alternate Stick Recipe
	event.shapeless(
		Item.of('minecraft:stick', 8),
		[
			'#minecraft:logs',
			'#minecraft:logs'
		]
	)

})

	ServerEvents.tags('item', event => {
		// Get the #forge:cobblestone tag collection and add Diamond Ore to it
		// event.get('forge:cobblestone').add('minecraft:diamond_ore')
	})
