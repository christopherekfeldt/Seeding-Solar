var PythonShell = require('python-shell');
 
PythonShell.run('script.py', function (err) {
  if (err) throw err;
  console.log('finished');
});