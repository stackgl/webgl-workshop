function nothing() {
  return nothing
}

(function() {
  if (localStorage.getItem('webgl-workshop-analytics-disable')) {
    console.log('Google Analytics: disabled')
    return module.exports = nothing
  } else {
    console.log('Google Analytics: enabled')
  }

  /* TODO: also keep count of the number of attempts made per exercise */

  ;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-54792490-2', 'auto')
  ga('send', 'pageview')

  //
  // Send uncaught exceptions to Analytics.
  // This allows us to better catch common or unreported bugs.
  //
  window.addEventListener('error', function(e) {
    ga('send', 'exception', {
        exDescription: e.error.message
      , exFatal: false
    })
  }, false)

  //
  // Count the number of clicks made to test/stop/edit/view buttons.
  // This lets us improve the UI.
  //
  module.exports = function(params) {
    var ui = params.ui

    ui.on('test', clicked('Test'))
    ui.on('stop', clicked('Play/Pause'))
    ui.on('edit', clicked('Edit Submission'))
    ui.on('view solution', clicked('View Solution'))

    return function() {
      return ga
    }

    function clicked(name) {
      return function() {
        ga('send', {
            hitType: 'event'
          , eventCategory: 'UI buttons'
          , eventAction: 'Clicked Button'
          , eventLabel: name
        })
      }
    }
  }

})()
