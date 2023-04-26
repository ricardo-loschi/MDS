const vscode = require('vscode');
class RunScriptFile {
    constructor(){}
    run_script_dbc() {
        const valor =vscode.workspace.getConfiguration().get("MDS.workspaceFolder");
		const mdshome = vscode.workspace.getConfiguration().get("MDS.mdshome");
		const filename = mdshome+"/maximo76_dev/applications/maximo/properties/maximo.properties";
		/*const wsedit = new vscode.WorkspaceEdit();
		const filePath = vscode.Uri.file(filename);
		wsedit.createFile(filePath,{ ignoreIfExists: true });*/
		const hostname = vscode.workspace.getConfiguration().get("MDS.serverSettings.hostname");
		const urljdbc = vscode.workspace.getConfiguration().get("MDS.mxe.db.url");
		const user = vscode.workspace.getConfiguration().get("MDS.mxe.db.user");
		const password = vscode.workspace.getConfiguration().get("MDS.mxe.db.password");
		const schemaowner = vscode.workspace.getConfiguration().get("MDS.mxe.db.schemaowner");

		var PropertiesReader = require('properties-reader');
		const properties = PropertiesReader(filename,'UTF-8',{writer: { saveSections: false }});
		properties.set('maximo.hostname',hostname)
		properties.set('mxe.db.url',urljdbc);
		properties.set('mxe.db.user',user);
		properties.set('mxe.db.password',password);
		properties.set('mxe.db.schemaowner',schemaowner);

		properties.save(filename, function then(err, data) {
			if (err) {
				console.log("error in write a properties file")
		
			}
			console.log("saved data to properties file")
		
		});
		const editor = vscode.window.activeTextEditor;
        if (editor){
			//vscode.window.showInformationMessage(vscode.window.activeTextEditor.document.uri.fsPath);
			const dbc_file=vscode.window.activeTextEditor.document.uri.fsPath;
			if  (dbc_file.endsWith('.dbc') === false){
				vscode.window.showErrorMessage("Favor selecionar um arquivo DBC ou SQL para executar essa tarefa");}
			else {
				let rumscriptfile="";
				let cdm_copy="";
				let separador="";
				let prod_name="scriptmaxinst";
				if (process.platform === 'linux' || process.platform==='darwin'){
					rumscriptfile="./runscriptfile.sh";
					cdm_copy="cp";
					separador="/";
				}
				else{
					rumscriptfile="runscriptfile.bat";
					cdm_copy="copy";
					separador="\\";
				}
				const palavra=dbc_file.split(separador);
				console.log(palavra);
				console.log(palavra.length)
				const dbc_file_name=palavra[palavra.length-1];
				const tools_path = mdshome+separador+"maximo76_dev"+separador+"tools"+separador+"maximo"+separador+"internal";
				const dbc_path = mdshome+separador+"maximo76_dev"+separador+"tools"+separador+"maximo"+separador+"en"+separador+prod_name;
				const { spawn } = require('node:child_process');
			
				console.log(`cd ${tools_path}`);
				console.log(`${cdm_copy} ${dbc_file} ${dbc_path}`);
				console.log(`${rumscriptfile} -f${dbc_file_name} -c${prod_name}`);
				var scriptOutput = "";
				//const OPEN_OR_NOT = await vscode.window.showInformationMessage("Aguarde executando runscriptfile....");
				vscode.window.showInformationMessage("Aguarde executando runscriptfile....");
				const comando2 = spawn(cdm_copy, [dbc_file, dbc_path]);
				const comando3 = spawn(rumscriptfile,['-f'+dbc_file_name.split('.')[0],'-c'+prod_name],{cwd:tools_path});
				//const comando3 = spawn('ls', ['-l'],{cwd:'/home/ricardo/workspace/maximo_developer_script/maximo76_dev/tools/maximo/en'});
				comando3.stdout.on('data', (data) => {
					console.log(`stdout: ${data}`);
					data=data.toString();
					scriptOutput+=data;
				});
				comando3.stderr.on('data', (data) => {
					console.error(`stderr: ${data}`);
					vscode.window.showErrorMessage(`stdout: ${data}`);
				  });
				  
				comando3.on('close', (code) => {
					console.log(`child process exited with code ${code}`);
					console.log(`resultado ${scriptOutput}`);
					vscode.window.showInformationMessage(scriptOutput);
				  });				
			}
		}
    }}
    module.exports = RunScriptFile;