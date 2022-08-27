export const pokemonIds = [1, 2, 56, 13, 67];


interface Pokemon {
	id: number;
	name: string;
	age?: number;
}

export const bulbasaur: Pokemon = {
	id: 1,
	name: "Bulbasaur",
};

export const charmander: Pokemon = {
	id: 4,
	name: "Charmander"
}

export const pokemons: Pokemon[] = [];

pokemons.push(charmander, bulbasaur);

console.log(pokemons)