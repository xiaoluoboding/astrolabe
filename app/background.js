// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} from 'electron'
import path from 'path'

let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800
  })

  // Load the HTML file directly from the webpack dev server if
  // hot reload is enabled, otherwise load the local file.
  const mainURL = process.env.HOT ?
    'http://localhost:8888/main.html' :
    'file://' + path.join(__dirname, 'main.html')

  mainWindow.loadURL(mainURL)

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

// exit event
ipcMain.on('exit', function(event, arg) {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'Cancel'],
    title: 'Closing Astrolabe',
    cancelId: 99,
    message: 'Are you sure you want close Astrolabe?'
  }, function(response) {
    console.log('Exit: ' + response)
    if (!response) app.quit()
  })
})
