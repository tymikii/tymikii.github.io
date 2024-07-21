"use strict";

{
  const card = document.querySelector(".card");
  const cardFront = document.querySelector(".front");
  const cardBack = document.querySelector(".back");
  const buttonCorrect = document.querySelector(".button_correct");
  const buttonIncorrect = document.querySelector(".button_incorrect");

  // 前回選んだ単語のインデックスを保存する変数
  let lastIndex = -1;

  // 現在表示されている単語のインデックスを追跡
  let currentIndex = -1;

  // LocalStorageから単語リストを読み込む
  function loadWordsFromLocalStorage() {
    const storedWords = localStorage.getItem("words");
    return storedWords ? JSON.parse(storedWords) : [];
  }

  //新しい単語をカードに反映する
  function setCard() {
    const words = loadWordsFromLocalStorage();
    if (words.length === 0) {
      alert("単語を追加してください");
      return; // 単語がない場合はここで処理を終了
    }
    const num = getNextWordIndex(words, lastIndex);
    lastIndex = num; // 更新されたインデックスを保存
    currentIndex = num; // 現在の単語のインデックスを更新
    cardFront.innerHTML = words[num]["en"];
    cardBack.innerHTML = words[num]["ja"];
  }

  //次に表示する単語のインデックスを取得
  function getNextWordIndex(words, lastIndex) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * words.length);
    } while (words.length > 1 && newIndex === lastIndex);
    return newIndex;
  }

  // 正解の回数をカウント
  function updateWordCorrect(index) {
    let words = JSON.parse(localStorage.getItem("words") || "[]");
    if (words[index]) {
      words[index].correct += 1;
      localStorage.setItem("words", JSON.stringify(words));
    }
  }
  buttonCorrect.addEventListener("click", () => {
    if (currentIndex !== -1) {
      updateWordCorrect(currentIndex);
    }
  });

  // 不正解の回数をカウント
  function updateWordinCorrect(index) {
    let words = JSON.parse(localStorage.getItem("words") || "[]");
    if (words[index]) {
      words[index].incorrect += 1;
      localStorage.setItem("words", JSON.stringify(words));
    }
  }
  buttonIncorrect.addEventListener("click", () => {
    if (currentIndex !== -1) {
      updateWordinCorrect(currentIndex);
    }
  });

  buttonCorrect.addEventListener("click", () => {
    setCard();
  });
  buttonIncorrect.addEventListener("click", () => {
    setCard();
  });
  function turnover() {
    card.className = card.className === "card" ? "card active" : "card";
  }

  card.addEventListener("click", () => {
    turnover();
  });
  setCard();
}
