let kanji_list = [];
let popup;
let section_kanji = document.getElementById("section_kanji");
let search_input = document.getElementById("search_input");
let button_kanji = document.getElementById("button_kanji");
let bminna = document.getElementById("bminna");
search_input.addEventListener("keydown",e=>{
    if (e.code == "Enter"){
        kanji_search();
    }
});
// e.code="Enter"
let search_list = [];
popup = document.getElementById("PopUp");
readKANJIFile("日本語 - ぼＢ.tsv");


function readKANJIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                
                    createKanji(tsvFile);
                
            }
        }
    }
    rawFile.send(null);    
}

function createKanji(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
       // test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5]);
       let kanji = {
        id : i-1,
        kanji: row[i][0],
        onyomi: row[i][1],
        kunyomi: row[i][2],
        rei: row[i][3],
        exemple: row[i][4],
        Francais:row[i][5]
      };
      kanji_list.push(kanji);
       //list.push(row[i][0]);
       
    }
    kanji_search();
}

function OpenPopUp(id, liste){
    popup.style.display = "block";
    popup.innerHTML = "";
    let innerHTML;
    innerHTML = `
    <div id = "divkanji"><p>${liste[id].kanji}</p></div>
    <p class = "popupkanji_p"><span>音読み : </span>${liste[id].onyomi}</p> 
    <p class = "popupkanji_p"><span>訓読み : </span>${liste[id].kunyomi}</p>
    <p class = "popupkanji_p"><span>れい : </span>${liste[id].rei}</p> 
    <p class = "popupkanji_p"><span>例 : </span>${liste[id].exemple}</p> 
    <p class = "popupkanji_p"><span>フランス語 : </span>${liste[id].Francais}</p>
    `;
    popup.innerHTML = innerHTML;
    // popup.innerHTML = kanji_list[id].kanji

}
function closepopup(){
    popup.style.display = "none";
}

function kanji_search(){
    if(search_input.value == "")
    {
        button_kanji.innerHTML = "";
        let innerHTML = "";
        for(let i = 0;i < kanji_list.length-1 ; i++)
        {
            innerHTML += `<button id = "${i}" onclick="OpenPopUp(${i},kanji_list)">${kanji_list[i].kanji}</button>`

        }
        button_kanji.innerHTML = innerHTML;
    }
    else
    {
        search_list = [];
        for(let i = 0; i < kanji_list.length-1 ; i++)
        {
            if(kanji_list[i].kanji.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].onyomi.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].kunyomi.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].Francais.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }

        }
        button_kanji.innerHTML = "";
        let innerHTML = "";
        for(let i = 0;i < search_list.length ; i++)
        {
            innerHTML += `<button id = "${i}" onclick="OpenPopUp(${i},search_list)">${search_list[i].kanji}</button>`
        }
        button_kanji.innerHTML = innerHTML;

    }

}

function minna(){
    section_kanji.style.display = "none";

}

function All(){
    section_kanji.style.display = "flex";

}