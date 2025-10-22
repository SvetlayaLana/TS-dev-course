(function () {
    class Singleton {
        private static instance: Singleton

        private constructor() {
            console.log("Singleton class instantiated")
        }

        static getInstance() {
            if (!Singleton.instance) {
                Singleton.instance = new Singleton()
            }

            return Singleton.instance
        }
    }

    const singleton = Singleton.getInstance()
    const singleton2 = Singleton.getInstance()

    console.log("Are both the same?", singleton === singleton2)

    class Bike {
        drive() {
            console.log("Ride a bike")
        }
    }

    class Car {
        drive() {
            console.log("Drive a car")
        }
    }

    class VehicleFactory {
        static createVehicle(type: "car" | "bike") {
            switch (type) {
                case "car":
                    return new Car()
                case "bike":
                    return new Bike()
                default:
                    throw new Error("Unknown vehicle type")
            }
        }
    }

    const myCar = VehicleFactory.createVehicle("car")
    myCar.drive()

    const myBike = VehicleFactory.createVehicle("bike")
    myBike.drive()

    interface Observer {
        update(data: string): void
    }

    class ObserverA implements Observer {
        update(data: string) {
            console.log(`Observer A received data: ${data}`)
        }
    }

    class Subject {
        private observers: Observer[] = []

        subscribe(observer: Observer) {
            this.observers.push(observer)
        }

        notify(data: string) {
            this.observers.forEach(observer => observer.update(data))
        }
    }

    const subject = new Subject()
    const observer1 = new ObserverA();
    const observer2 = new ObserverA();
    const observer3 = new ObserverA();

    subject.subscribe(observer1)
    subject.subscribe(observer2)
    subject.subscribe(observer3)

    subject.notify("NEW DATA available")

    class Chatroom {
        private users: Observer[] = []

        join(observer: Observer) {
            this.users.push(observer)
        }

        sendMessage(message: string): void {
            this.users.forEach(user => user.update(message))
        }
    }

    const chatroom = new Chatroom();
    const user1 = new ObserverA();
    const user2 = new ObserverA();

    chatroom.join(user1)
    chatroom.join(user2)

    chatroom.sendMessage("Hello everyone")

    type User = {
        name: string,
        role: "admin" | "user",
    }

    function withAdminPrivileges(user: User) {
        return {
            ...user,
            role: "admin",
            promote: () => console.log("Promoted to admin"),
        }
    }
})()