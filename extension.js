function setProperties(filename,key,value) {
	var PropertiesReader = require('properties-reader');

	const properties = PropertiesReader(filename,'UTF-8',{writer: { saveSections: false }});
	
	properties.set(key, value)
	
	properties.save(filename, function then(err, data) {
		if (err) {
			console.log("error in write a properties file")
	
		}
		console.log("saved data to properties file")
	
	});

  }

async function copyFile(
	vscode,
	context,
	outputChannel,
	sourcePath,
	destPath,
	callBack
  ) {
	try {
	  const wsedit = new vscode.WorkspaceEdit();
	  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
	  console.log(wsPath);
	  const data = await vscode.workspace.fs.readFile(
		vscode.Uri.file(context.asAbsolutePath(sourcePath))
	  );
	  const filePath = vscode.Uri.file(wsPath + destPath);
	  wsedit.createFile(filePath, { ignoreIfExists: true });
	  await vscode.workspace.fs.writeFile(filePath, data);
	  let isDone = await vscode.workspace.applyEdit(wsedit);
	  if(isDone) {
		outputChannel.appendLine(`File created successfully: ${destPath}`);
		callBack(null, true);
	  }
	} catch (err) {
	  outputChannel.appendLine(`ERROR: ${err}`);
	  callBack(err, false);
	}
  }

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const RunScriptFile = require('./src/runscriptfile.js')
const CreateTicket = require('./src/createticket.js')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "MDS" is now active!');

	let testChannel = vscode.window.createOutputChannel("TestChannel");
	// copy tasks.json file from vs code extension to the destination workspace
	copyFile(vscode, context, testChannel, 
			 'assets/tasks.json', '.vscode/tasks.json', function(err, res) {});
	
	const { spawn } = require('node:child_process');
	const comando = spawn('mkdir', ['-p','$HOME/maximo_developer_script']);
	comando.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	const comando2 = spawn('cd', ['$HOME/maximo_developer_script']);
	const comando3 = spawn('git', ['clone','https://github.com/ricardo-loschi/MDS.git']);
	comando3.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('MDS.helloWorld', async function () {
		vscode.window.showInformationMessage('Hello World from MaxDevScript!');
	}
	);
	let disposable1 = vscode.commands.registerCommand('MDS.runscriptfile', async function () {
		let runscript = new RunScriptFile();
		runscript.run_script_dbc();
	});
	let disposable2 = vscode.commands.registerCommand('MDS.createticket', async function () {
		let createticket = new CreateTicket();
		createticket.createticket();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
