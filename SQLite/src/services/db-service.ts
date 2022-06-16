import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { TodoItem } from '../models';

const tableName = "todo";

// Buat method untuk connection ke DB
export const getDBconnection = async () => {
    return openDatabase({name: 'todo-data.db', location: 'default'});
}

export const createTable = async (db: SQLiteDatabase) => {
    // Buat table kalau belum dibuat
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

    await db.executeSql(query);
}

export const getTodoItems = async (db:SQLiteDatabase):Promise<TodoItem[]> => {
    try{
        const todoItems: TodoItem[] = [];
        const results = await db.executeSql(`SELECT rowid as id, value FROM ${tableName}`);
        results.forEach(result => {
            for(let index = 0; index < result.rows.length; index++) {
                todoItems.push(result.rows.item(index));
            }
        });
        return todoItems;
    } catch(error) {
        console.log(error);
        throw Error('Failed to get todoItems !!!');
    }
}
export const saveTodoItems = async (db:SQLiteDatabase, todoItems: TodoItem[]) => {
    const insertQuery = 
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` + 
    todoItems.map(i => `${i.id}, ${i.value}`).join(',');

    return db.executeSql(insertQuery);
}

export const deletTodoItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
}

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;

    await db.executeSql(query);
}