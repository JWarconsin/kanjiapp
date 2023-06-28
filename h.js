let list = [];

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
        kanji: row[i][0],
        onyomi: row[i][1],
        kunyomi: row[i][2],
        rei: row[i][3],
        exemple: row[i][4],
        Francais:row[i][5]
      };
      list.push(kanji)
       //list.push(row[i][0]);
       
    }
    console.log(list);
}