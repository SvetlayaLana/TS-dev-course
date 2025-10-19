/* створити клас Library для зберігання книг та інших видів друкованих матеріалів (журнали, брошури).
   реалізувати наступний функціонал:
   1. метод getInfo для отримання інформації про матеріал в залежності від його типу
   2. додавання нового матеріалу
   3. перегляд списку всіх матеріалів
   4. фільтрування матеріалів за різними критеріями (автор, рік видання, тип матеріалу)
   5. отримання інформації за унікальним ідентифікатором
   6. видалення елементу
   7. оновлення інформації про елемент
*/

class LibraryItem {
    id: number
    title: string
    author: string
    year: number

    constructor(id: number, title: string, author: string, year: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getInfo() {
        console.log(`Title: ${this.title}, Author:${this.author} Year: ${this.year}`);
    }
}

class Book extends LibraryItem {
    genre: string
    pages: number

    constructor(id: number, title: string, author: string, year: number, genre: string, pages: number) {
        super(id, title, author, year);
        this.genre = genre;
        this.pages = pages;
    }

    getInfo() {
        super.getInfo();
        console.log(`Genre: ${this.genre}, Pages: ${this.pages}`);
    }
}

class Magazine extends LibraryItem {
    issueNumber: number

    constructor(id: number, title: string, author: string, year: number, issueNumber: number) {
        super(id, title, author, year);
        this.issueNumber = issueNumber;
    }

    getInfo() {
        super.getInfo();
        console.log(`Issue Number: ${this.issueNumber}`);
    }
}

class Brochure extends LibraryItem {
    topic: string

    constructor(id: number, title: string, author: string, year: number, topic: string) {
        super(id, title, author, year);
        this.topic = topic;
    }

    getInfo() {
        super.getInfo();
        console.log(`Topic: ${this.topic}`);
    }
}

class Library {
    private items: LibraryItem[] = []

    addItem(item: LibraryItem) {
        this.items.push(item);
    }

    getAllItems() {
        console.log("Items: ", this.items);
    }

    getItemsByAuthor(author: string) {
        console.log("Author: ", author);
        console.log("Items: ", this.items.filter((item) => item.author === author));
    }

    getItemsByType(type: "book" | "magazine" | "brochure") {
        console.log("Type: ", type);
        switch (type) {
            case "book":
                console.log("Items: ", this.items.filter((item) => item instanceof Book));
                break;
            case "magazine":
                console.log("Items: ", this.items.filter((item) => item instanceof Magazine));
                break;
            case "brochure":
                console.log("Items: ", this.items.filter((item) => item instanceof Brochure));
                break;
            default:
                console.log("No Items Found");
        }
    }
}

const library = new Library();
const book = new Book(1, "The Hunger games", "Susane Collins", 2010, "sci-fi", 300)
const magazine = new Magazine(2, "National Geographic", "Various", 2023, 12);
library.addItem(book)
library.addItem(magazine)
library.getAllItems()
library.getItemsByAuthor("Susane Collins")
library.getItemsByType("magazine")