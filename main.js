const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
const args = require('args');

args.option('dev', 'Dev mode', false);
const flags = args.parse(process.argv);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    // titleBarStyle: 'hidden',
    // frame: false,
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  if (flags.dev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '/dist/instacode/index.html'),
        protocol: 'file:',
        slashes: true
      })
    ); 
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
