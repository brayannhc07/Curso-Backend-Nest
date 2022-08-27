export let name: string = "Bryan";
export const age: number = 20;
export const isValid: boolean = true;

name = "Fer";
// name = 123;
// name = true;

export const templateString = `Esto es un string
multilinea
que puede tener
" dobles
' simples
inyectar valores ${name}
expresiones ${1 + 1}
números: ${age}
booleanos: ${isValid}`;

console.log(templateString);