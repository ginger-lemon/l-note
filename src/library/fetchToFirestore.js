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
        availableDays, 
        password,
        timeStamp,
        id,
    ) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.texts = texts;
        this.availableDays = availableDays;
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
            availableDays: note.availableDays,
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
            data.availableDays,
            data.password,
            data.timeStamp,
            data.id,
        );
    }
}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//


// ＝＝＝＝ 使用 set 新增資料到資料庫 （建議，可自行設定 id ）＝＝＝＝

    // await setDoc(doc(database, "collection name", "document name"), datas(fields), { merge: true });
    // merge: 是否覆蓋修改的資料？ true:避免原有資料整筆被覆蓋或刪除，類似 update

   // 使用 custom class 增加資料，可能要放參數在 () 內
    export async function setNoteToDatabase(noteUID, {
        noteTitle, 
        noteAuthor, 
        noteDate, 
        noteTexts, 
        availableDays, 
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
                availableDays, 
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
                availableDays: availableDays,
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
        // console.log('要準備來刪 noteID 了！')
        await deleteDoc(doc(database, "note", noteID));
    }

    // 刪除特定欄位
    // TO DO: 確定是否可以只刪除某個 doc 下的欄位
    export async function deleteOneFieldInNote(field) {
        const ref = doc(database, "note", field);
        
        // 從文擋中移除指定的欄位
        await updateDoc(ref, { 
            field: deleteField()
        })
}

    // 使用 TTL 策略指定過期時間與毫秒（ timestamp ）
    // 注意，使用 TTL 可以刪除文擋但還是可以讀取欄位的資料

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

// ＝＝＝＝ 查詢指定資料 ＝＝＝＝

    // 主要用於查詢密碼欄位：先找到對應的 doc 、再去找密碼對不對
    // TO DO: 可能 collection 要改成 doc 
    export async function SearchNotePasswordInDatabase(noteUID, password) {
        // 建立指定資料的參考
        const notesRef = doc(database, "note", noteUID);
        // 建立查詢集合的查詢（ password 是使用者設定的密碼）ㄤ
        const q = query(notesRef. where ("password", "==", password));

        // 回傳搜尋結果
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // 在 doc 快照中 doc.data() 不會是 undefined
            return doc.data();
        });
    }


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//