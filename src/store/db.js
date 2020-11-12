import Dexie from 'dexie';
import store from './index'
import moment from 'moment';
moment.locale('ru')


export let db = new Dexie('notesdb');
db.version(1).stores({
    notes: '++id, date, title, text'
})

export async function addNewNote(){
    let id = await db.notes.put({
        date:  moment().format('llll'),
        title: 'My first note',
        text: 'Hello world!'
    })
    console.log("Got id " + id );
}

export async function getAllNotes(){
    let note = await db.notes.where('id').above(0).toArray()
    let data = await note;
    store.dispatch('getAllNotes', data)
}

// addNewNote().catch(err => {
//     console.error("Error");
// })
