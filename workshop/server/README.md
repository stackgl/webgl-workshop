# @workshop/server

The main server that runs the workshop, pulling all of the "sub-servers"
together into a single module.

You shouldn't need to touch this directly unless you want to override the
routing behaviour – for adding exercises, you should add it to `exercises.json`
as specified in the main README and this package will handle the rest for you.
