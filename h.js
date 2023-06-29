let kanji_list = [];
let popup;
let section_kanji = document.getElementById("kanji")
popup = document.getElementById("PopUp")
console.log(popup)
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
      kanji_list.push(kanji)
       //list.push(row[i][0]);
       
    }
    console.log(kanji_list);
}

function OpenPopUp(id){
    popup.style.display = "block";
    popup.innerHTML = "";
    let innerHTML;
    innerHTML = `
    <div id = "divkanji"><p>${kanji_list[id].kanji}</p></div>
    <p class = "popupkanji_p"><span>音読み : </span>${kanji_list[id].onyomi}</p> 
    <p class = "popupkanji_p"><span>訓読み : </span>${kanji_list[id].kunyomi}</p>
    <p class = "popupkanji_p"><span>れい : </span>${kanji_list[id].rei}</p> 
    <p class = "popupkanji_p"><span>例 : </span>${kanji_list[id].exemple}</p> 
    <p class = "popupkanji_p"><span>フランス語 : </span>${kanji_list[id].Francais}</p> 
    `;
popup.innerHTML = innerHTML;
    // popup.innerHTML = kanji_list[id].kanji
    console.log(kanji_list[id].kanji);



}
function closepopup(){
    popup.style.display = "none";
}
function kanji_search(){
    section_kanji.innerHTML = "";
    let innerHTML;
    innerHTML = `<div class="button_kanji">`
    for(let i = 0;i < kanji_list.length-1 ; i++){
        innerHTML += `<button id = "${i}" onclick="OpenPopUp(${i})">${kanji_list[i].kanji}</button>`
       
        console.log(kanji_list[i].kanji);
    }
    innerHTML += "</div>"
    section_kanji.innerHTML = innerHTML;
}