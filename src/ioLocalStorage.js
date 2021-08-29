export const GET = (key) => { try { return JSON.parse(localStorage.getItem(key)) } catch (error) { return null } }
export const SET = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const DB = "POSTS_DB"
export const GET_DB = () => GET(DB)
export const SET_DB = (value) => SET(DB, value)

const defaultPostsContent = [
    { id: 1, title: "JS", body: "JAVASCRIPT" },
    { id: 2, title: "Any script", body: "SCRIPT" },
    { id: 3, title: "Running ... many devices", body: "JAVA" },
    { id: 4, title: "TS", body: "TYPESCRIPT" },
]



export const checkOrInit_DB = () => {
    try {
        const storage = window['localStorage'];
        const x = '__storage_test_1__';
        const y = '__storage_test_2__';
        storage.setItem(x, x);
        storage.removeItem(x);
        storage.y = y;
        delete storage.y;
        console.log("Object 'localStorage' available. Success.");
    } catch (error) {
        alert("Objest 'loacalStorage' is unavailable due to error:" + error)
        console.log("Object 'localStorage' is unavailable due to error: " + error);
    }

    // deem it as our "server", we communicate with to store data (create, update & delete new posts)
    if (!GET_DB()) {
        console.log("setting up default posts content");
        SET_DB(defaultPostsContent);
        console.table(GET_DB());
    } else if (GET_DB().length === 0) {
        if (window.confirm
            (
                "The database seems to be present, but it is empty.\n" +
                "\nDo you wish to fill datatbase with default posts content?\n" +
                "Default posts content is:\n" +
                defaultPostsContent.reduce((accumulator, currentValue) => accumulator += JSON.stringify(currentValue) + "\n   ", "   ")
            )
        ) {
            console.log("setting up default posts content...");
            SET_DB(defaultPostsContent)
            
        }
    } else {
        console.log(`posts content is present in localStorage: `)
    }
}
