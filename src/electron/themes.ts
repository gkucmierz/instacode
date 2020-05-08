
const { ipcMain } = require('electron');

const themes = require('../themes.json');

function getThemesFromNodeModules() {
  const fs = require('fs');
  const themes = (fs
    .readdirSync('./node_modules/codemirror/theme')
    .map(filename => filename.replace(/\.css$/, ''))
    .map(theme => ({ theme, use: true })));

  fs.writeFileSync('./src/themes.json', JSON.stringify(themes, null, '  '));

  const scss = themes.map(({theme}) => `@import "~codemirror/theme/${theme}";\n`).join``;
  fs.writeFileSync('./src/themes.scss', scss);
}
// getThemesFromNodeModules();

const sanityThemeName = theme => {
  return theme.replace(/\-/g, ' ');
};

exports.getThemesMenu = (mainWindow, selectedTheme, refreshMenu) => {
  const themesMenu = {
    label: 'Themes',
    submenu: themes.filter(({use}) => use).map(({theme}) => {
      const submenu = {
        label: sanityThemeName(theme),
        type: 'radio',
        click: () => mainWindow.webContents.send('changeTheme', theme)
      };
      if (selectedTheme === theme) {
        submenu.checked = true;
      }
      return submenu;
    })
  };

  ipcMain.once('changeTheme', (event, theme) => {
    refreshMenu(theme);
  });

  return themesMenu;
};
