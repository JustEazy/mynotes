import Dexie from 'dexie';
import store from './index'
import moment from 'moment';
moment.locale('ru')


export let db = new Dexie('notesdb');
db.version(1).stores({
    notes: '++id, date, title, text, category',
})

export async function addNewNote(title, text, category) {
    let newNote = await db.notes.add({
        date: moment().format('llll'),
        title: title,
        text: text,
        category: category
    })
    let data = await newNote;
    console.log("Got id " + data);
    initializeDataBase()

}

export async function getAllNotes() {
    let note = await db.notes.where('id').above(0).toArray();
    let data = await note;
    store.dispatch('getAllNotes', data);
}
export async function getImportantNotes() {
    let note = await db.notes.where('category').equals('Важные').toArray();
    let data = await note;
    store.dispatch('getImportantNotes', data)
}

export async function getUrgentNotes() {
    let note = await db.notes.where('category').equals('Срочные').toArray();
    let data = await note;
    store.dispatch('getUrgentNotes', data)
}

export async function getLaterNotes() {
    let note = await db.notes.where('category').equals('На потом').toArray();
    let data = await note;
    store.dispatch('getLaterNotes', data)
}

export async function editNote(title, category, text, noteId) {
    await db.notes.update(noteId, { title: title, text: text, category: category });
    initializeDataBase()
}

export async function deleteNote(noteId) {
    await db.notes.delete(noteId);
    initializeDataBase()
}

export function initializeDataBase() {
    getAllNotes();
    getImportantNotes();
    getUrgentNotes();
    getLaterNotes();
}



