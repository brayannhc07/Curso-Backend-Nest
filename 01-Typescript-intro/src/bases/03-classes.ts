import { Move, PokeapiResponse } from './../interfaces/pokeapi-response.interface';
import axios from 'axios';

export class Pokemon {

	get imageUrl(): string {
		return `htpps://pokemon.com/${this.id}.jpg`;
	}

	constructor(
		public readonly id: number,
		public name: string,
		// public imageUrl: string
	) { }

	scream() {
		console.log(`${this.name.toUpperCase()}!!!`);
	}

	speak() {
		console.log(`${this.name}, ${this.name}`);
	}

	async getMoves(): Promise<Move[]> {
		// const moves = 10;
		const { data } = await axios.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
		console.log(data.moves);

		return data.moves;
	}
}

export const charmander = new Pokemon(4, "charmander");

// charmander.id = 10;
// charmander.name = "mew";
// console.log(charmander)

// charmander.speak();
// charmander.scream();

// console.log(charmander.getMoves());
charmander.getMoves();