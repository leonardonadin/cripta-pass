import { ipcMain } from 'electron';
import fs from 'fs';

ipcMain.handle('export-file', async (event, { data }) => {
	return new Promise((resolve, reject) => {
		const stream = fs.createWriteStream(filePath, {
			encoding: 'utf-8'
		});
		
	});
});
