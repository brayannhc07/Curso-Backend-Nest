import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from '../api/pokeApi.adapter';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';

export class Pokemon {

	get imageUrl(): string {
		return `https://pokemon.com/${this.id}.jpg`;
	}

	constructor(
		public readonly id: number,
		public name: string,
		private readonly http: HttpAdapter
	) { }

	scream() {
		console.log(`${this.name.toUpperCase()}!!!`);
	}

	speak() {
		console.log(`${this.name}, ${this.name}`);
	}

	async getMoves(): Promise<Move[]> {
		// const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
		const data = await this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
		console.log(data.moves);

		return data.moves;
	}

}
const pokeApiFetch = new PokeApiFetchAdapter();
const pokeApiAxios = new PokeApiAdapter();

export const charmander = new Pokemon(4, 'Charmander', pokeApiFetch);
export const bulbasaur = new Pokemon(1, 'Bulbasaur', pokeApiAxios);

charmander.getMoves();
bulbasaur.getMoves();