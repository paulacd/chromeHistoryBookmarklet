console.log('hi');
var urls = [];

chrome.browserAction.onClicked.addListener(function() {
    console.log('registered click');
    getHistory();
})

function getHistory() {
    console.log('inside getHistory');
    var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - millisecondsPerWeek;
    var twoWeeksAgo = (new Date).getTime() - millisecondsPerWeek * 2;

    chrome.history.search({
                'text': '', // Return every history item....
                'startTime': twoWeeksAgo, // that was accessed less than one week ago.
                'endTime': oneWeekAgo,
                'maxResults': 1
            },
            function(historyItems) {
                //debugger;
                var firstItem = historyItems[0];
                if (firstItem) {
                    var url = firstItem.url;
                    //alert(url);
                    chrome.tabs.create({
                        'url': url,
                    });
                }
                alert ("You were looking at this page on" + new Date(oneWeekAgo));
            });

          }
