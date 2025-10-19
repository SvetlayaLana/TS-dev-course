function Person(name: string, age: number) {
    // @ts-ignore
    this.name = name;
    // @ts-ignore
    this.age = age;
}

// @ts-ignore
const person = new Person("Lana", 26);

/*class User {
    name!: string
}*/

/*class Car {
    brand: string;
    year: number;

    constructor(brand: string, year: number) {
        this.brand = brand;
        this.year = year;
    }
}

const car = new Car("toyota", 2012)
console.log(car)*/

class Vehicle {
    type = "car"
}

const vehicle = new Vehicle();
console.log(vehicle)

class Human {
    constructor(public name: string, public age: number) {}
}

const human = new Human("Lana", 26);
console.log(human)

class Engine {
    start() {
        console.log("Starting Engine");
    }
}

/*class Car {
    constructor(public engine: Engine) {}

    start() {
        this.engine.start();
    }
}

const engine = new Engine();
const car = new Car(engine);
car.start();*/

class User {
    name: string;
    age: number;

    constructor(name: string)
    constructor(name: string, age: number)

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age ?? 0;
    }
}

const user = new User("Lana");
const user1 = new User("Lana", 27);

class Square {
    readonly side: number = 1;

    constructor(side: number) {
        this.side = side;
    }

  /*  area() {
        this.side = 2;
    }*/
}

// public members
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`)
    }
}

const animal = new Animal("Dog")
animal.name = "Cat"
animal.speak()

// private members
class Employee {
    private salary: number

    constructor(salary: number) {
        this.salary = salary;
    }

    getSalary() {
        console.log(this.salary);
    }
}

const employee = new Employee(4000)
// employee.salary = 300 // error
employee.getSalary()

// static members

class User1 {
    static role = "admin"

    static getRole() {
        console.log(this.role)
    }
}

User1.role = "not admin"
User1.getRole()

class Rectangle {
    constructor(private _width: number, private _height: number) {}

    set width(value: number) {
        if (value <= 0) throw Error("Width must be greater than 0");
        this._width = value;
    }

    get height() {
        return this._height;
    }

    get area() {
        return this._width * this._height;
    }
}

const rectangle = new Rectangle(100, 100);
rectangle.width = 50
// rectangle.height = 50 // read-only
console.log(rectangle.area)

class Thing {
    _size = 0

    get size(): number {
        return this._size
    }

    set size(value: number | string) {
        if (typeof value === "string") {
            const parsed = parseInt(value)
            this._size = isNaN(parsed) ? 0 : parsed
        }
    }
}

class Car {
    constructor(protected make: string, protected model: string) {}

    drive() {
        console.log(`Driving a ${this.make} ${this.model}`);
    }

    protected displayInfo() {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}

class ElectricCar extends Car {
    constructor(make: string, model: string, public batteryCapacity: number = 100) {
        super(make, model);
        this.batteryCapacity = batteryCapacity;
    }

    charge() {
        console.log(`Charging a ${this.make} ${this.model} at ${this.batteryCapacity}`);
    }

    getDetails() {
        this.displayInfo()
    }

    drive() {
        super.drive();
        console.log(`Driving an electric car ${this.make} ${this.model} at ${this.batteryCapacity}`);
    }
}

const tesla = new ElectricCar("Tesla", "Model S")
tesla.charge()
tesla.drive()
tesla.getDetails()
// tesla.displayInfo() // error
tesla.drive()