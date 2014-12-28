var PSTTTWTR = (function() {
  "use strict";
  return {
    TWITTER_URL: "https://twitter.com/intent/tweet",
    textInput: null,
    textButton: null,

    init: function() {
      var it = this;
      navigator.mozSetMessageHandler("activity", function(arg) { it.handleActivity(arg); });
      window.addEventListener("load", this, false);
    },

    handleActivity: function(activityRequest) {
      this.disableUI(true);
      var option = activityRequest.source;
      if (option.name === "share") {
        var data = option.data;
        if (data && data.type === "url" && data.url) {
          this.tweet("", data.url);
        } else {
          console.warn("unexpected activityRequest", data);
        }
      }
      this.disableUI(false);
    },

    handleEvent: function(e) {
      if (e.type === "load") {
        this.disableUI(false);
        this.textButton.addEventListener("click", this, false);
      } else if (e.type === "click") {
        var text = "" + this.textInput.value;
        if (text !== "") {
          this.tweet(text, "");
        }
      }
    },

    tweet: function(text, url) {
      text = text || "";
      url = url || "";
      var tweet = new URL(this.TWITTER_URL);
      var params = tweet.searchParams;
      if (text !== "") {
        params.append("text", text);
      }
      if (url !== "") {
        params.append("url", url);
      }
      window.open(tweet.href, "_blank");
    },

    disableUI: function(disabled) {
      if (this.textButton === null) {
        this.textButton = document.getElementById("textButton");
      }
      this.textButton.disabled = disabled;
      if (this.textInput === null) {
        this.textInput = document.getElementById("textInput");
      }
      this.textInput.disabled = disabled;
    }
  };
})();
PSTTTWTR.init();
