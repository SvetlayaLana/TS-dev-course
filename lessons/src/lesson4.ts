let user = {
    name: "John",
    greet: (age: number) => {
        console.log("Hello", this, age)
    }
}

user.greet(9)

function greet(this: { name: string }, age: number) {
    console.log(this, age)
}

user.greet = greet;
user.greet(10);

function introduce(this: { name: string }, age: number, city: string) {
    console.log(`Hello, I'm ${this.name}, I'm ${age} years old from ${city}`)
}

introduce.call({ name: "Linda" }, 29, "Kharkiv")
introduce.apply({ name: "Linda" }, [29, "Kharkiv"])

const boundIntroduce = introduce.bind({ name: "Linda" }, 29, "Kharkiv")

boundIntroduce()

const withLogging = (performAction: (x: number) => number) => {
    return function (x: number) {
        console.log("input: ", x);
        const result = performAction(x);
        console.log("output: ", result);
        return result;
    }
}

const double = (x: number) => x * 2;
withLogging(double)(5);

type Trinity<T, U, V> = {
    first: T,
    second: U,
    third: V,
}

const trinity: Trinity<string, number, boolean> = {
    first: "sdfs",
    second: 23,
    third: true
}

type GenericMap<K = string, V = number> = Map<K, V>;

const map: GenericMap = new Map();
map.set("12", 33)
// map.set(23, 33)

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

console.log(merge({ name: "Lana" }, { age: 28 }));

type User = {
    name: string;
    age: number;
    email: string;
}

type PartialUser = {
    [K in keyof User]?: User[K]
}

const partialUser: PartialUser = {
    name: "Lana"
}

type ExtractString<T> = T extends string ? T : never;
type OnlyString = ExtractString<string | number | boolean>

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

const func = (x: number) => x * 2;
type FuncReturnType = ReturnType<typeof func>

type Values = string | number | boolean;
type ExcludedValues = Exclude<Values, boolean>
type ExtractedValues = Extract<Values, string | number>