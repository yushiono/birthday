document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  //コンストラクタ関数を定義
  function Birth() {
    this.init();
  };

  //コンストラクタ関数内での初期化処理
  Birth.prototype.init = function() {
    this.$year = $("#year");
    this.$month = $("#month");
    this.$date = $("#date");
    this.$btn = $("#btn");
    this.$error1 = $("#error1");
    this.$error2 = $("#error2");
    this.$result = $("#result");
    this.$result1 = $("#result1");
    this.$result2 = $("#result2");
    this.$result3 = $("#result3");
    this.$result4 = $("#result4");
    this.$today = new Date();
    this.handleEvents();
  };

  Birth.prototype.handleEvents = function() {
    let self = this;
    this.$btn.on("click", function() {
      self.errorCheck();
      return false;
    });
  };

  //入力値のエラーチェック
  Birth.prototype.errorCheck = function() {
    let yearError = this.$year.val() > this.$today.getFullYear();
    let monthError = 12 < this.$month.val();
    //入力された月の最終日を取得（以下3行）
    let birthday = new Date(this.$year.val(), this.$month.val()-1, this.$date.val());//入力された誕生日
    birthday.setMonth(birthday.getMonth())
    birthday.setDate(0);
    let dateError = birthday.getDate() < this.$date.val();
    if(this.$year.val() <= 0 || this.$month.val() <= 0 || this.$date.val() <= 0) {
      this.$result.hide();
      this.$error2.hide();
      this.$error1.fadeIn();
    } else if(yearError || monthError || dateError) {
      this.$result.hide();
      this.$error2.hide();
      this.$error1.fadeIn();
    } else if(isNaN(this.$year.val()) || isNaN(this.$month.val()) || isNaN(this.$date.val())) {
      this.$result.hide();
      this.$error1.hide();
      this.$error2.fadeIn();
    } else {
      this.$error1.hide();
      this.$error2.hide();
      this.showResults();
    }
  };

  //結果を表示
  Birth.prototype.showResults = function() {
    let birthday = new Date("", this.$month.val()-1, this.$date.val());//入力された誕生日
    birthday.setFullYear(this.$year.val());//西暦1~99年に対応
    let weekdayList = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
    let weekday = weekdayList[birthday.getDay()];//曜日を設定
    let diff = this.$today.getTime() - birthday.getTime();
    let yearDiff = Math.floor( diff / (1000*60*60*24*365));//年齢
    let dateDiff = Math.floor( diff / (1000*60*60*24));//誕生日から今日までの日数
    let hourDiff = Math.floor( diff / (1000*60*60));//誕生日から今日までの経過時間
    this.$result1.text("The day you were born was " + weekday + "day.");
    this.$result2.text("You are " + yearDiff + " years old.");
    this.$result3.text(dateDiff + " days have passed since you were born.");
    this.$result4.text("About " + hourDiff + " hours have passed since you were born.")
    this.$result.fadeIn();
  };

  let birth = new Birth();

});
