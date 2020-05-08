
const themes = require('../themes.json');

function getThemesFromNodeModules() {
  const fs = require('fs');
  const themes = (fs
    .readdirSync('./node_modules/codemirror/theme')
    .map(filename => filename.replace(/\.css$/, ''))
    .map(theme => ({ theme, use: true })));
  fs.writeFileSync('./src/themes.json', JSON.stringify(themes, null, '  '));
}
// getThemesFromNodeModules();

const sanityThemeName = theme => {
  return theme.replace(/\-/g, ' ');
};

exports.getThemesMenu = mainWindow => {
  return {
    label: 'Themes',
    submenu: themes.filter(({use}) => use).map(({theme}) => {
      return {
        label: sanityThemeName(theme),
        click: () => mainWindow.webContents.send('changeTheme', theme)
      };
    })
  };
};
