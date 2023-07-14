import { database } from "../firebaseConfig";

// 初始化資料庫的資料格式



// 使用 add 新增資料到資料庫（不建議）

export async function getNoteDataFromDatabase() {
    try {
        const docRef = doc(database, "notes","cpYTwVexYQ3o0NNnt8vQ");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return setNotePackage(docSnap.data());
        }

    } catch (e) {
        console.error(e);
        return null;
    }
}


// 使用 set 新增資料到資料庫 （建議，可自行設定 id ）



// 使用 get 取得資料庫中的資料

export async function getNoteDataFromDatabase() {
    try {
        const docRef = doc(database, "notes", "cpYTwVexYQ3o0NNnt8vQ");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return setNotePackage(docSnap.data());
        }

    } catch (e) {
        console.error(e);
        return null;
    }
}

// 使用 update 更新資料庫指定資料


// 使用 delete 刪除資料庫指定資料