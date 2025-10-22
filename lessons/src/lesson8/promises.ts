const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 0);
})

promise.then((value) => console.log(`Promise resolved with value ${value}`));

type Actor = {
    id: number;
    name: string
}
const actors = [
    { id: 1, name: 'Leonardo DiCaprio' },
    { id: 2, name: 'Kate Winslet' },
    { id: 3, name: 'Brad Pitt' },
]

function fetchActorById(id: number): Promise<Actor> {
    const actor = actors.find(actor => actor.id === id)
    return new Promise((resolve, reject) => {
        if (actor) {
            setTimeout(() => resolve(actor), 1000)
        } else {
            setTimeout(() => reject(new Error('Actor not found')), 1000)
        }
    })
}

fetchActorById(3)
    .then(actor => console.log('Fetched actor:', actor))
    .catch(error => console.error('Error fetching actor:', error.message))

const successfulPromises = [
    fetchActorById(1),
    fetchActorById(2),
    fetchActorById(3)
]

Promise.all(successfulPromises)
    .then(actors => console.log('All actors fetched:', actors))
    .catch(error => console.error('Error fetching actors:', error.message))

const notAllSuccessfulPromises = [
    fetchActorById(1),
    fetchActorById(2),
    fetchActorById(4)
]

Promise.allSettled(notAllSuccessfulPromises)
    .then(results => console.log(results))

async function getValue() {
    return 42
}

getValue().then(value => console.log('Async function returned:', value))

async function getActors() {
    try {
        const actor1 = await fetchActorById(1)
        console.log("actor1", actor1)
        const actor2 = await fetchActorById(2)
        console.log("actor2", actor2)
        const actor3 = await fetchActorById(4)
        console.log("actor3", actor3)
        return [actor1, actor2, actor3]
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Error fetching actors:', error.message)
        } else {
            console.log("Unknown error", error)
        }

    }
}

getActors().then(actors => console.log('All actors:', actors))