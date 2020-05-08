
const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const menu = require('./menu.ts');

// import { MAX_DATA_SIZE } from '../app/app.config';
// console.log(MAX_DATA_SIZE);

// const args = require('args');
// args.option('dev', 'Dev mode', false);
// const flags = args.parse(process.argv);
const flags = {dev: process.argv.slice(2).indexOf('--dev') !== -1};

let mainWindow;

app.allowRendererProcessReuse = true;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: { nodeIntegration: true },
    show: false,
  });

  const splash = (() => {
    const splash = new BrowserWindow({width: 220, height: 220, transparent: true, frame: false, alwaysOnTop: true});
    const splashIcon = fs.readFileSync(
      path.join(__dirname, '../assets/iconfinder_21_icons_2191531.svg')
    ).toString('base64');
    splash.loadURL(`data:image/svg+xml;base64,${splashIcon}`);
    return splash;
  })();

  if (flags.dev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200/scratchpad');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../../dist/instacode/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  ipcMain.once('web-app-loaded', (event, arg) => {
    splash.destroy();
    mainWindow.show();
  });

  mainWindow.webContents.once('dom-ready', () => {
    // redirect to scratchpad route
    mainWindow.webContents.send('redirect', 'scratchpad');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  menu.init(mainWindow);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.on('uncaughtException', error => {
  console.log(error);
});
