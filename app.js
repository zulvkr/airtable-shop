const base = require('airtable').base('appCj6xWpFMhImweh')
const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('views', path.join(__dirname, '.'))

let records

app.get('/', async (req, res) => {
  if (records) {
    res.render('page.html', { records })
  } else {
    records = await base('BUSSINESS HOURS')
      .select({
        view: 'Grid view'
      })
      .firstPage()

    res.render('page.html', { records })
  }
})

setTimeout(() => {
  records = null
}, 10 * 1000)

app.listen(3000, () => console.log('Server ready'))
