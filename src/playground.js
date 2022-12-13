
// Primitive Types//

// let firstname: string = "Themis"
// let age: number = 30
// let isHandsome: boolean = true
// let und: undefined = undefined
// let n: null = null

// type Inference //

// let firstname = "Themis"
// firstname * 4
// let isHandsome: boolean

// The Any Type //

// let chameleon: any = 5
// chameleon = "hello"
// chameleon = true
// chameleon = []
// chameleon = {}
// chameleon.push(4)

// The Unknown Type & Type Guarding //

// let chameleon: unknown = 5
// if(typeof chameleon === "string") {
//  chameleon.toUpperCase()
// }

// Array Type Declarations //

// const foods: string[] = []
// foods.push("test")
// foods.push(5)
// const numbers: number[] = []
// numbers.push(true)

// Object Type Decalrations //

// const plumber: {
//     name: string;
//     skill: string;
//     likesMushrooms: boolean;
// } = {
//     name: "Mario",
//     skill: "Jumping",
//     likesMushrooms: true
// }

// plumber.name = 7
// plumber.likesMushrooms = false

// Type Literals //

// let isSmart = true
// const isHandsome = true

// isSmart = false
// isHandsome = false

// Type Literals And Objects //

// const plumber: {
//     name: string;
//     skill: string;
//     likesMushrooms: boolean;
// } = {
//     name: "Mario",
//     skill: "Jumping",
//     likesMushrooms: true
// }

// plumber = {}
// plumber.name = "Wario"

// Optional Properties //

// let character: {
//     name: string;
//     skill: string;
//     likesMushrooms?: boolean
// }

// character = {
//     name: "Mario",
//     skill: "Jumping"
// }

// Interfaces And Types //

// interface Character {
//     name: string;
//     skill: string;
//     likesMushrooms ?: boolean
// }

// type Character = {
//     name: string;
//     skill: string;
//     likesMushrooms ?: boolean
// }

// const characterOne: Character = {
//     name: "Link",
//     skill: "Swordfighting"
// }
// const characterTwo: Character = {
//     name: "Mario",
//     skill: "Jumping",
//     likesMushrooms: true
// }

// Types For Functions //

// function multiply(a: number ,b:number): number {
//     return a * b;
// }

// const multiply = (a:number, b:number): number => a * b;

// multiply(4, "6")

// Interfaces For Functions //

// interface TwoNumberMathFunc {
//     (a: number, b:number):number;
// }

// const multiply: TwoNumberMathFunc  = ( a, b ) => a * b
// const add = ( a:number, b:number ): number => a + b

// Generics //

// const copyArray = (array: string[]) => [...array]
// const copyArray2 = (array: number[]) => [...array]

// const copyGenericArray = <T>(array: T[]): T[] => [...array]

// copyGenericArray<number>([1,2])
// copyGenericArray<string>(["1","2"])
