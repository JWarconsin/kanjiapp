/* FOR JEREMY */
class Kana {
    static list = [];
    static originHiraList = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"];
    static originKataList = ["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","二","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン"];
    constructor(pNormal, pSmall = "", pTenten = "", pMaru = "") {
        this.normal = pNormal;
        this.small = pSmall;
        this.tenten = pTenten;
        this.maru = pMaru;
    }

    static search(pKana, pbHiragana) { //? あ　ぁ　っ　づ　い etc.
        let kanaToReturn = "";
        if (pbHiragana) {
            Kana.originHiraList.forEach(k => {
                if (kanaToReturn == "") {
                    if (Kana.list[k].normal == pKana || Kana.list[k].small == pKana || Kana.list[k].tenten == pKana || Kana.list[k].maru == pKana) kanaToReturn = Kana.list[k].normal;
                }
            });
        } else {
            Kana.originKataList.forEach(k => {
                if (kanaToReturn == "") {
                    if (Kana.list[k].normal == pKana || Kana.list[k].small == pKana || Kana.list[k].tenten == pKana || Kana.list[k].maru == pKana) kanaToReturn = Kana.list[k].normal;
                }
            });
        }
        return kanaToReturn;
    }

    next(pKana) {
        if (pKana == this.normal) {
            if (this.small != "") return this.small;
            if (this.tenten != "") return this.tenten;
        } else if (pKana == this.small) {
            if (this.tenten != "") return this.tenten;
        } else if (pKana == this.tenten) {
            if (this.maru != "") return this.maru;
        }
        return this.normal;
    }

}

Kana.list["あ"] = new Kana("あ","ぁ");        // "a"
Kana.list["い"] = new Kana("い","ぃ");        // "i"
Kana.list["う"] = new Kana("う","ぅ");        // "u"
Kana.list["え"] = new Kana("え","ぇ");        // "e"
Kana.list["お"] = new Kana("お","ぉ");        // "o"
Kana.list["か"] = new Kana("か","が");       // "ka"
Kana.list["き"] = new Kana("き","ぎ");       // "ki"
Kana.list["く"] = new Kana("く","ぐ");       // "ku"
Kana.list["け"] = new Kana("け","げ");       // "ke"
Kana.list["こ"] = new Kana("こ","ご");       // "ko"
Kana.list["さ"] = new Kana("さ","ざ");       // "sa"
Kana.list["し"] = new Kana("し","じ");      // "shi"
Kana.list["す"] = new Kana("す","ず");       // "su"
Kana.list["せ"] = new Kana("せ","ぜ");       // "se"
Kana.list["そ"] = new Kana("そ","ぞ");       // "so"
Kana.list["た"] = new Kana("た","だ");       // "ta"
Kana.list["ち"] = new Kana("ち","ぢ");      // "chi"
Kana.list["つ"] = new Kana("つ","っ","づ"); // "tsu"
Kana.list["て"] = new Kana("て","で");       // "te"
Kana.list["と"] = new Kana("と","ど");       // "to"
Kana.list["な"] = new Kana("な");            // "na"
Kana.list["に"] = new Kana("に");            // "ni"
Kana.list["ぬ"] = new Kana("ぬ");            // "nu"
Kana.list["ね"] = new Kana("ね");            // "ne"
Kana.list["の"] = new Kana("の");            // "no"
Kana.list["は"] = new Kana("は","ば","ぱ");  // "ha"
Kana.list["ひ"] = new Kana("ひ","び","ぴ");  // "hi"
Kana.list["ふ"] = new Kana("ふ","ぶ","ぷ");  // "hu"
Kana.list["へ"] = new Kana("へ","べ","ぺ");  // "he"
Kana.list["ほ"] = new Kana("ほ","ぼ","ぽ");  // "ho"
Kana.list["ま"] = new Kana("ま");            // "ma"
Kana.list["み"] = new Kana("み");            // "mi"
Kana.list["む"] = new Kana("む");            // "mu"
Kana.list["め"] = new Kana("め");            // "me"
Kana.list["も"] = new Kana("も");            // "mo"
Kana.list["や"] = new Kana("や","ゃ");       // "ya"
Kana.list["ゆ"] = new Kana("ゆ","ゅ");       // "yu"
Kana.list["よ"] = new Kana("よ","ょ");       // "yo"
Kana.list["ら"] = new Kana("ら");            // "ra"
Kana.list["り"] = new Kana("り");            // "ri"
Kana.list["る"] = new Kana("る");            // "ru"
Kana.list["れ"] = new Kana("れ");            // "re"
Kana.list["ろ"] = new Kana("ろ");            // "ro"
Kana.list["わ"] = new Kana("わ");            // "wa"
Kana.list["を"] = new Kana("を");            // "wo"
Kana.list["ん"] = new Kana("ん");             // "n"

Kana.list["ア"] = new Kana("ア","ァ");        // "a"
Kana.list["イ"] = new Kana("イ","ィ");        // "i"
Kana.list["ウ"] = new Kana("ウ","ゥ");        // "u"
Kana.list["エ"] = new Kana("エ","ェ");        // "e"
Kana.list["オ"] = new Kana("オ","ォ");        // "o"
Kana.list["カ"] = new Kana("カ","ガ");       // "ka"
Kana.list["キ"] = new Kana("キ","ギ");       // "ki"
Kana.list["ク"] = new Kana("ク","グ");       // "ku"
Kana.list["ケ"] = new Kana("ケ","ゲ");       // "ke"
Kana.list["コ"] = new Kana("コ","ゴ");       // "ko"
Kana.list["サ"] = new Kana("サ","ザ");       // "sa"
Kana.list["シ"] = new Kana("シ","ジ");      // "shi"
Kana.list["ス"] = new Kana("ス","ズ");       // "su"
Kana.list["セ"] = new Kana("セ","ゼ");       // "se"
Kana.list["ソ"] = new Kana("ソ","ゾ");       // "so"
Kana.list["タ"] = new Kana("タ","ダ");       // "ta"
Kana.list["チ"] = new Kana("チ","ヂ");      // "chi"
Kana.list["ツ"] = new Kana("ツ","ッ","ヅ"); // "tsu"
Kana.list["テ"] = new Kana("テ","デ");       // "te"
Kana.list["ト"] = new Kana("ト","ド");       // "to"
Kana.list["ナ"] = new Kana("ナ");            // "na"
Kana.list["二"] = new Kana("二");            // "ni"
Kana.list["ヌ"] = new Kana("ヌ");            // "nu"
Kana.list["ネ"] = new Kana("ネ");            // "ne"
Kana.list["ノ"] = new Kana("ノ");            // "no"
Kana.list["ハ"] = new Kana("ハ","バ","パ");  // "ha"
Kana.list["ヒ"] = new Kana("ヒ","ビ","ピ");  // "hi"
Kana.list["フ"] = new Kana("フ","ブ","プ");  // "hu"
Kana.list["ヘ"] = new Kana("ヘ","べ","ぺ");  // "he"
Kana.list["ホ"] = new Kana("ホ","ボ","ポ");  // "ho"
Kana.list["マ"] = new Kana("マ");            // "ma"
Kana.list["ミ"] = new Kana("ミ");            // "mi"
Kana.list["ム"] = new Kana("ム");            // "mu"
Kana.list["メ"] = new Kana("メ");            // "me"
Kana.list["モ"] = new Kana("モ");            // "mo"
Kana.list["ヤ"] = new Kana("ヤ","ャ");       // "ya"
Kana.list["ユ"] = new Kana("ユ","ュ");       // "yu"
Kana.list["ヨ"] = new Kana("ヨ","ョ");       // "yo"
Kana.list["ラ"] = new Kana("ラ");            // "ra"
Kana.list["リ"] = new Kana("リ");            // "ri"
Kana.list["ル"] = new Kana("ル");            // "ru"
Kana.list["レ"] = new Kana("レ");            // "re"
Kana.list["ロ"] = new Kana("ロ");            // "ro"
Kana.list["ワ"] = new Kana("ワ");            // "wa"
Kana.list["ヲ"] = new Kana("ヲ");            // "wo"
Kana.list["ン"] = new Kana("ン");             // "n"

let keyboard_input = document.getElementById("keyboard_input");
let kanaList = ["a","ka","sa","ta","na","ha","ma","ya","ra","wa"];

let table_hira = [];
table_hira["a"] = ["あ","い","う","え","お"];
table_hira["ka"] = ["か","き","く","け","こ"];
table_hira["sa"] = ["さ","し","す","せ","そ"];
table_hira["ta"] = ["た","ち","つ","て","と"];
table_hira["na"] = ["な","に","ぬ","ね","の"];
table_hira["ha"] = ["は","ひ","ふ","へ","ほ"];
table_hira["ma"] = ["ま","み","む","め","も"];
table_hira["ya"] = ["や","ゆ","よ"];
table_hira["ra"] = ["ら","り","る","れ","ろ"];
table_hira["wa"] = ["わ","を","ん"];
let table_kata = [];
table_kata["a"] = ["ア","イ","ウ","エ","オ"];
table_kata["ka"] = ["カ","キ","ク","ケ","コ"];
table_kata["sa"] = ["サ","シ","ス","セ","ソ"];
table_kata["ta"] = ["タ","チ","ツ","テ","ト"];
table_kata["na"] = ["ナ","二","ヌ","ネ","ノ"];
table_kata["ha"] = ["ハ","ヒ","フ","ヘ","ホ"];
table_kata["ma"] = ["マ","ミ","ム","メ","モ"];
table_kata["ya"] = ["ヤ","ユ","ヨ"];
table_kata["ra"] = ["ラ","リ","ル","レ","ロ"];
table_kata["wa"] = ["ワ","ヲ","ン","ー"];
let currentBtn;
let currentIndex = 0;
let bCurrent = false;
let timeOutID;
let bHiragana = true;
let kanaBtnList = [];
kanaList.forEach(k => {
    kanaBtnList[k] = document.getElementById("btn_" + k);
});

function handleKeyboard(pKey) {
    let bClickOnKana = false;
    if (kanaList.includes(pKey)) {
        bClickOnKana = true;
        if (bCurrent && currentBtn == pKey) {
            currentIndex++;

            if (bHiragana) {
                if (currentIndex > table_hira[pKey].length-1) {
                    currentIndex = 0;
                }
                if (keyboard_input.value.length <= 1) {
                    keyboard_input.value = table_hira[pKey][currentIndex];
                } else if (keyboard_input.value.length >= 2) {
                    keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + table_hira[pKey][currentIndex];
                }
            } else {
                if (currentIndex > table_kata[pKey].length-1) {
                    currentIndex = 0;
                }
                if (keyboard_input.value.length <= 1) {
                    keyboard_input.value = table_kata[pKey][currentIndex];
                } else if (keyboard_input.value.length >= 2) {
                    keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + table_kata[pKey][currentIndex];
                }
            }
        } else {
            currentIndex = 0;
            currentBtn = pKey;
            if (bHiragana) {
                keyboard_input.value += table_hira[pKey][currentIndex];
            } else {
                keyboard_input.value += table_kata[pKey][currentIndex];
            }
        }
    }

    switch(pKey) {
        case "modif":
            bCurrent = false;
            currentIndex = 0;
            clearTimeout(timeOutId);            
            let last = keyboard_input.value[keyboard_input.value.length-1];
            let lastIndex = Kana.search(last, bHiragana);
            let kanaToWrite = Kana.list[lastIndex].next(last);

            if (keyboard_input.value.length <= 1) {
                keyboard_input.value = kanaToWrite;
            } else {
                keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + kanaToWrite;
            }
            break;
        case "return":
            bCurrent = false;
            currentIndex = 0;
            clearTimeout(timeOutId);
            if (keyboard_input.value.length <= 1) {
                keyboard_input.value = "";
            } else {
                keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1);
            }
            break;
        case "enter":
            
            break;
    }

    if (bClickOnKana) {
        if (!bCurrent) {
            bCurrent = true;
            timeOutId = setTimeout(() => {
                bCurrent = false;
                currentIndex = 0;
            }, 1000);
        } else {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                bCurrent = false;
                currentIndex = 0;
            }, 1000);
        }
    }

}

function switchKana() {
    if (bHiragana) {
        bHiragana = false;
        kanaList.forEach(k => {
            kanaBtnList[k].innerHTML = table_kata[k][0];
        });
    } else {
        bHiragana = true;
        kanaList.forEach(k => {
            kanaBtnList[k].innerHTML = table_hira[k][0];
        });
    }
}