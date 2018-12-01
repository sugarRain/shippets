/**
 * 接收文件上传
 */

app.post('/upload', function (req, res) {
  let filename = ''
  let suffix = ''
  // create an incoming form object
  var form = new formidable.IncomingForm()
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads')

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    filename = file.name
    let suffixs = filename.split('.')
    if (suffixs.length > 1) {
      suffix = suffixs.pop()
      filename = (new Date()).getTime() + '.' + suffix
    }
    fs.rename(file.path, path.join(form.uploadDir, filename))
  })

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err)
  })

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    let obj = {
      name: filename,
      state: 'SUCCESS',
      type: suffix,
      url: '/uploads/' + filename
    }
    res.send(JSON.stringify(obj))
  })

  // parse the incoming request containing the form data
  form.parse(req)
})
