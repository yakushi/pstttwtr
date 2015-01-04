var PSTTTWTR = (function() {
  "use strict";
  return {
    TWITTER_URL: "https://twitter.com/intent/tweet",

    init: function() {
      navigator.mozSetMessageHandler("activity", (arg) => {
        this.handleActivity(arg);
      });
    },

    handleActivity: function(activityRequest) {
      var option = activityRequest.source;
      if (option.name === "share") {
        var data = option.data;
        if (data && data.type === "url" && data.url) {
          this.tweet("", data.url);
          activityRequest.postResult(null);
        } else {
          console.warn("unexpected activityRequest", data);
          activityRequest.postError(null);
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
    }
  };
})();
PSTTTWTR.init();
