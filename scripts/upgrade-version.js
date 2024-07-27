const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
console.log("Nueva version: ", process.argv);

if (!newVersion) {
  console.error('Por favor, proporciona una nueva versión.');
  process.exit(1);
}

const filePathBuildGradle = path.join(__dirname, '../android/app/build.gradle');
const filePathPackageJson = path.join(__dirname, '../package.json');


function changeVersion(path, patternVersion) {
	
	// Leer el contenido del archivo build.gradle
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error('Error leyendo el archivo:', err);
			process.exit(1);
		}

		// Reemplazar la versión antigua con la nueva versión
		const updatedData = data.replace(patternVersion[0] , patternVersion[1]);

		// Escribir el contenido actualizado de nuevo en el archivo build.gradle
		fs.writeFile(path, updatedData, 'utf8', (err) => {
			if (err) {
				console.error('Error escribiendo el archivo:', err);
				process.exit(1);
			}

			console.log('Versión actualizada en '+path+' a:', newVersion);
		});
	});

}

changeVersion(filePathBuildGradle, [/versionName ".*?"/, `versionName "${newVersion}"`])
changeVersion(filePathPackageJson, [/"version": ".*?",/, `"version": "${newVersion}",`])