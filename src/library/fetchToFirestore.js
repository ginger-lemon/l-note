import React from "react";
import { collection, doc, deleteDoc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";

// ＝＝＝＝ 初始化資料庫的資料格式 ＝＝＝＝//
class Note{
    constructor (
        title, 
        author, 
        date, 
        texts, 
        password,
        timeStamp,
        id,
    ) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.texts = texts;
        this.password = password;
        this.timeStamp = timeStamp;
        this.id = id;
    }
}

// Firestore data converter
export const noteConverter = {
    // js => firestore
    toFirestore: (note) => {
        return {
            title: note.title,
            author: note.author,
            date: note.date, 
            texts: note.texts, 
            password: note.password,
            timeStamp: note.timeStamp,
            id: note.id,
        };
    },
    // firestore => js
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Note(
            data.title,
            data.author,
            data.date, 
            data.texts,
            data.password,
            data.timeStamp,
            data.id,
        );
    }
}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//


// ＝＝＝＝ 使用 set 新增資料到資料庫 ＝＝＝＝

   // 使用 custom class 增加資料，可能要放參數在 () 內
    export async function setNoteToDatabase(noteUID, {
        noteTitle, 
        noteAuthor, 
        noteDate, 
        noteTexts, 
        encryptedPassword,
        noteTimeStamp,
        noteID,
    }) {
        try {
            const ref = doc(database, "note", noteUID).withConverter(noteConverter);

            // console.log('noteUID:' ,noteUID);

            // TO DO: 確認整包資料、 noteID 的傳入方式
            // 整個 id.... 應該可以直接放在一個物件直接代入
            await setDoc(ref, new Note(
                noteTitle, 
                noteAuthor, 
                noteDate, 
                noteTexts, 
                encryptedPassword,
                noteTimeStamp,
                noteID,
            ))
        } catch (error) {
            // console.log('id.noteTitle: ', noteTitle)
            console.error("Error: ", error);

        }
    }

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//

// ＝＝＝＝ 使用 update 更新資料庫指定資料 ＝＝＝＝

    // 設定指定欄位的資料
    export async function updateNoteToDatabase(noteUID, {
        noteTitle, 
        noteAuthor,
        noteTexts,
        availableDays,
        encryptedPassword,
    }) {
        try {
            // TO DO: filedName 到時候可能要替換成樣板 `${variable}` 去抓名字
            const ref = doc(database, "note", noteUID);
            await updateDoc(ref, {
                title: noteTitle, 
                author: noteAuthor,
                texts: noteTexts,
                password:  encryptedPassword,
            });

        } catch (error) {
            console.error("Error: ", error);
            // console.log('更新資料時有問題');
        }
    }

    // 只更新密碼
    export async function updatePasswordToDatabase(noteUID, {
        notePassword,
    }) {
        try {
            // TO DO: filedName 到時候可能要替換成樣板 `${variable}` 去抓名字
            const ref = doc(database, "note", noteUID);
            await updateDoc(ref, {
                password: notePassword,
            });

        } catch (error) {
            console.error("Error: ", error);
            console.log('Password is uncorrect!');
        }
    }

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//

// ＝＝＝＝ 使用 delete 更新資料庫指定資料 ＝＝＝＝

    export async function deleteNoteOnDatabase(noteID) {
        // 刪除 noteID 的 doc
        await deleteDoc(doc(database, "note", noteID));
    }

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//

// ＝＝＝＝ 使用 get 更新資料庫指定資料 ＝＝＝＝

    export async function getNoteFromDatabase(noteID) {
        const ref = doc(database, "note", noteID).withConverter(noteConverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            // Convert to Note Object
            const note = docSnap.data();
            return note;
            // If there has some instance method
        } else {
            console.log('No such document!');
            return null;
        }
    }

    // 只取得密碼的資料
    export async function getPasswordFromDatabase(noteID) {
        const ref = doc(database, "note", noteID).withConverter(noteConverter);
        // console.log(ref);
        const docSnap = await getDoc(ref);
        
        if (docSnap.exists()) {
            // Convert to Note Object
            const passwordData = docSnap.data().password;
            return passwordData;
            // If there has some instance method
        } else {
            console.log('No such document!');
            return null;
        }
    }

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//

