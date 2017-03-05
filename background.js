console.log('hi');
var urls = [];
var cleanUrls = [];

function getHistory(){
  console.log('inside getHistory');
  var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

  chrome.history.search({
    'text': '',              // Return every history item....
    'startTime': oneWeekAgo,  // that was accessed less than one week ago.
    'maxResults': 1000000
  },
  function (historyItems){
    for (var i = 0; i < historyItems.length; i++){
      // create object for urls
      var item = {}
      item.url = historyItems[i].url
      //create array for all the times a site has been visited
      item.visitTimes = []

      //get visit timestamp for all urls visited in the past x amount of time
      chrome.history.getVisits({
        url: historyItems[i].url
      },
      function (visitItems){
        for (var i = 0; i < visitItems.length; i++){
          //push visit times to url object
          item.visitTimes.push(visitItems[i].visitTime);
          urls.push(item)
          console.log(item)
        }
      });
    }
    // console.log(urls);
    //console.log(urls.length)
    //urlCleanup(urls);

  });



}

getHistory();


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   //getHistory();
// });

function urlCleanup(urls) {
  console.log('inside urlCleanup');
  var parser = document.createElement('a');
  //console.log(parser);
  //parser.href =


  for (var i = 0; i < urls.length; i++){
    parser.href = urls[i];
    cleanUrls.push(parser.hostname);
  }
console.log(cleanUrls);

//call categorizeSites

} //end of urlCleanup




function categorizeSites() {
  $.getJSON( "ajax/test.json", function( data ) {

  });
}
