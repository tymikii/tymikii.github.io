"use strict";
{
  // LocalStorageに単語を保存する関数
  function saveWordsToLocalStorage(words) {
    localStorage.setItem("words", JSON.stringify(words));
  }

  // LocalStorageから単語を読み込む関数
  function loadWordsFromLocalStorage() {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      return JSON.parse(storedWords);
    } else {
      return [];
    }
  }
  loadWordsFromLocalStorage();
  const wordTable = document.querySelector(".word_table");
  const words = loadWordsFromLocalStorage();
  const tbody = document.createElement("tbody");

  // 単語を削除する
  function deleteWord(index) {
    let words = JSON.parse(localStorage.getItem("words") || "[]");
    words.splice(index, 1);
    localStorage.setItem("words", JSON.stringify(words));
    createTable(loadWordsFromLocalStorage());
  }

  // 単語を表に追加する
  function createRow(word, index, tbody) {
    const row = document.createElement("tr");
    const englishCell = document.createElement("td");
    englishCell.textContent = word.en;
    row.appendChild(englishCell);
    const japaneseCell = document.createElement("td");
    japaneseCell.textContent = word.ja;
    row.appendChild(japaneseCell);
    tbody.appendChild(row);
    const correctCell = document.createElement("td");
    correctCell.textContent = word.correct;
    row.appendChild(correctCell);
    tbody.appendChild(row);
    const incorrectCell = document.createElement("td");
    incorrectCell.textContent = word.incorrect;
    row.appendChild(incorrectCell);
    tbody.appendChild(row);

    // 単語を削除する
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.setAttribute("data-index", index);
    deleteBtn.addEventListener("click", function () {
      row.parentNode.removeChild(row);
      const index = parseInt(this.getAttribute("data-index"), 10);
      deleteWord(index);
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);
    tbody.appendChild(row);
  }

  //テーブルを作成する関数
  function createTable(words) {
    tbody.innerHTML = "";
    words.forEach((word, index) => {
      createRow(word, index, tbody);
    });
    wordTable.appendChild(tbody);
  }
  saveWordsToLocalStorage(words);

  // 新しい単語を追加する
  function setupAddWord(words) {
    const addButton = document.querySelector(".add_button");
    addButton.addEventListener("click", () => {
      let words = loadWordsFromLocalStorage();
      const enInput = document.querySelector(".en_input").value.trim();
      const jaInput = document.querySelector(".ja_input").value.trim();
      // 両方の値が入っているかどうかを確認
      if (!enInput || !jaInput) {
        alert("両方のフィールドに値を入力してください。");
        return;
      }
      // 英語と日本語の判定
      const isEnglish = /^[A-Za-z0-9\s]+$/.test(enInput);
      const isJapanese =
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(
          jaInput
        );
      if (!isEnglish || !isJapanese) {
        alert("英語の列には英語を、日本語の列には日本語を入力してください。");
        return;
      }
      const newWord = {
        en: enInput,
        ja: jaInput,
        correct: 0,
        incorrect: 0,
      };
      words.push(newWord);
      saveWordsToLocalStorage(words);
      createTable(words); // テーブルを更新

      // 入力フィールドをクリア
      document.querySelector(".en_input").value = "";
      document.querySelector(".ja_input").value = "";
    });
  }
  (function main() {
    const words = loadWordsFromLocalStorage();
    createTable(words);
    setupAddWord(words);
  })();
}
