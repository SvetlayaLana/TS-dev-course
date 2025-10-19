import "reflect-metadata";

interface Person {
    name: string;
}

interface Phone {
    phone: string;
}

interface Address {
    address: string;
}

interface User extends Person, Phone, Address {
    email: string;
}

interface Logger {
    (message: string): void
}

interface NumberArray {
    [index: number]: number;
}

interface Person {
    name: string;
    getFullName(): string;
}

class Employee implements Person {
    constructor(public name: string) {}

    getFullName() {
        return this.name
    }
}

interface Movable {
    move: () => void
}

interface Speakable {
    speak: () => void
}

interface ObeyCommand {
    obey: () => void
}

class Robot implements Movable, Speakable, ObeyCommand {
    move() {
        console.log("Robot move")
    }

    speak() {
        console.log("Robot speak")
    }

    obey() {
        console.log("Robot obey")
    }
}

const robot = new Robot()
robot.move()
robot.speak()
robot.obey()

interface Something {
    name: string
}

interface Something {
    age: number
}

const something: Something = {
    name: "Lana",
    age: 27
}

interface Point2D {
    x: number
    y: number
}

interface Point3D {
    x: number
    y: number
    z: number
}

const p2: Point2D = { x: 0, y: 0 };
const p3: Point3D = { x: 1, y: 2, z: 3 };

const anotherPoint: Point2D = p3

interface Quackable {
    quack: () => void
}

class Duck {
    quack () {
        console.log("Quack")
    }
}

class Human {
    quack () {
        console.log("I'm quacking like a duck")
    }
}

function makeItQuack(thing: Quackable) {
    thing.quack()
}

const duck = new Duck()
const human = new Human()
makeItQuack(duck);
makeItQuack(human);

abstract class Vehicle {
    constructor(public brand: string) {}
    abstract honk(): void
    abstract sound: string

    start() {
        console.log(`${this.brand} is starting`)
    }
}

class Car extends Vehicle {
    sound = "Vroom"
    honk() {
        console.log("Beep beep!")
    }
}
class Bike extends Vehicle {
    sound = "Ring"
    honk() {
        console.log("Ring ring!")
    }
}

const car = new Car("Tesla")
const bike = new Bike("Hoverla")

car.start()
bike.start()
// const vehicle = new Vehicle() // error
car.honk()
bike.honk()
console.log(bike.sound)
console.log(car.sound)

interface PaymentProvider {
    pay: (amount: number) => void
}

class StripeProvider implements PaymentProvider {
    pay(amount: number) {
        console.log("Stripe pay", amount)
    }
}

class PayPalProvider implements PaymentProvider {
    pay(amount: number) {
        console.log("PayPal pay", amount)
    }
}

class PaymentService {
    constructor(private provider: PaymentProvider) {}

    processPayment(amount: number) {
        this.provider.pay(amount);
    }
}

const payPalProvider = new PayPalProvider()
const stripeProvider = new StripeProvider()

const paymentService = new PaymentService(stripeProvider)
paymentService.processPayment(1100)

function Logger(prefix: string = "") {
    return function Logger(constructor: Function) {
        console.log(`Class ${prefix}-${constructor.name} is created`)
    }
}

@Logger("info")
class Someone {
    constructor(public name: string) {}
}

function LogSomething(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Method ${propertyKey} is called with args: ${args.join(",")}`)
        return originalMethod.apply(this, args)
    }
}

class Calculator {
    @LogSomething
    sum(a: number, b: number) {
        return a + b;
    }
}

const calculator = new Calculator()
console.log(calculator.sum(2, 5))

function PositiveNumberOnly(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;
    descriptor.set = function (value: number) {
        if (value < 0) {
            throw new Error(`Value of ${propertyKey} is negative`)
        }
        originalSet?.call(this, value)
    }
}

class BankAccount {
    private _balance: number = 0;

    get balance() {
        return this._balance;
    }

    @PositiveNumberOnly
    set balance(amount: number) {
        this._balance = amount;
    }
}

const bankAccount = new BankAccount()
bankAccount.balance = 10
console.log(bankAccount.balance)

function LogProperty(target: Object, propertyKey: string) {
    console.log(`Property ${propertyKey} was created`)
}

class SomeoneElse {
    @LogProperty
    name: string = "Lana"
}

function LogParameter(target: Object, propertyKey: string, parameterIndex: number) {
    console.log(`Parameter with index ${parameterIndex} was created in ${propertyKey}`)
}

class AnotherPerson {
    name: string
    constructor(name: string) {
        this.name = name;
    }

    greet(@LogParameter greeting: string) {
        console.log(`${greeting}, I'm ${this.name}`)
    }
}

function LogType(target: Object, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log(`${propertyKey.toUpperCase()} type is ${type.name}`)
}

class YetAnotherPerson {
    @LogType
    name: string = "YetAnotherPerson"
}

function Permission(permission: string) {
    return function (target: Object, propertyKey: string) {
        Reflect.defineMetadata("permission_key", permission, target, propertyKey);
    }
}

class UserController {
    @Permission("admin")
    deleteUser() {
        console.log("User deleted")
    }
}

console.log(Reflect.getMetadata("permission_key", UserController.prototype, "deleteUser"));