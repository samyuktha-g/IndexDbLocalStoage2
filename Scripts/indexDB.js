//const { read } = require("react-native-fs");

// Open the file exploerer to select the file from the list
let fileHandle;
document.getElementById("btn").addEventListener('click', async() => {
    // Destructure the one-element array.
    [fileHandle] = await window.showOpenFilePicker();
    console.log("fileHandler:  ", fileHandle); // <-- "fileHandle" Returns the file name

    //********************************Reads/Returns the contents of the file**************************************************** */
    const file = await fileHandle.getFile();
    const contents = await file.text();
    console.log("contents: ", contents);
    document.getElementById("here").innerText = contents;
    // or below code can also wok for file reading.
    // document.getElementById('btn2')
    //     .addEventListener('change', function() {

    //         var fr = new Filereader();
    //         fr.onload = function() {
    //             document.getElementById('output')
    //                 .textContent = fr.result;
    //         }

    //         fr.readAsText(this.files[0]);
    //     })

});

// ************************************ Creates a file ************************************//

function CreateFile() {
    // const options = {
    //     types: [{
    //         // description: 'Text Files',
    //         accept: {
    //             'text/plain': ['.txt'],
    //         },
    //     }, ],
    //     // async await
    // };
    const handle = window.showSaveFilePicker();
    console.log("handle: ", handle);
    return handle;
}

//**********************************  Writes a File   ****************************************************** */


//Upon clicking on the WriteFile button creates a table in indexedDB with table name as TExtEditorDB
function writeFile() {
    if (!'indexedDB' in window) {
        console.log(" your browser doesnt support indexDB");
        // return;
    }
    const databaseName = "TextEditorDB";
    const DBname = window.indexedDB.open(databaseName);
    DBname.onupgradeneeded = () => {
        let db = DBname.result;
        let store = db.createObjectStore("Files", { autoIncrement: true });
        // put method
        store.put({ name: "file1", format: "text" });
    }
    DBname.onsuccess = () => {
        if (DBname.readyState == "done") {
            console.log("Data is successfully loaded");
        }
    }
}
//Local Storage which deletes/clears the text entered by user upon clikcing on clear button, can view the Keyvalue in localstorage with Key=area and value as text entered
area.value = localStorage.getItem('area');
area.oninput = () => {
    localStorage.setItem('area', area.value)
};

// document.querySelector("#FileInput").addEventListener("change", function() {
//     const reader = new FileReader();

//     reader.addEventListener("load", () => {
//         console.log(load, reader.result);
//         localStorage.setItem("this-file", reader.result);
//     });
//     console.log("file: ", this.file[0]);
//     reader.readAsDataURL(this.file[0]);
// });
// document.addEventListener("DOMContentLoaded", () => {
//     const recentImageUrl = localStorage.getItem("this-file");
//     console.log("recent", recentImageUrl);
// })

//}

// var butOpenFile = document.getElementById("btn");
document.getElementById("btn2").addEventListener("click", CreateFile); //Update
document.getElementById("btn3").addEventListener("click", writeFile); //delete
// }