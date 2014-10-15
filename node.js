require('@workshop/server')({}, function(err, address) {
  if (err) throw err
  console.log(address)
})
