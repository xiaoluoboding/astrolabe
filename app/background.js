// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

let mainWindow = null
let authWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768
  })

  // Load the HTML file directly from the webpack dev server if
  // hot reload is enabled, otherwise load the local file.
  const mainURL = process.env.HOT
    ? 'http://localhost:8888/main.html'
    : 'file://' + path.join(__dirname, 'main.html')

  mainWindow.loadURL(mainURL)

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.openDevTools()
  }

  ipcMain.on('open-auth-window', function (event, arg) {
    if (authWindow) {
      return
    }

    // Build the OAuth consent page URL
    authWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      show: true,
      'web-preferences': {
        'node-integration': false
      }
    })

    authWindow.loadURL(arg)

    authWindow.webContents.on('will-navigate', function (event, url) {
      mainWindow.webContents.send('getCode', url)
    })

    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      mainWindow.webContents.send('getCode', newUrl)
    })

    // If "Done" button is pressed, hide "Loading"
    authWindow.on('close', function () {
      authWindow.destroy()
    })
  })

  ipcMain.on('destroy-auth-window', function (event, arg) {
    authWindow.destroy()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
