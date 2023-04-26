const vscode = require('vscode');
class CreateTicket {
    constructor(){}
    async createticket() {
        const ticket = await vscode.window.showInputBox({
            placeHolder: 'Entre com o numero do ticket. Ex.: MAXIMO-1234',
        });
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

        const fs = require('fs');
        const folderName = vscode.workspace.workspaceFolders[0].uri.fsPath + separador + ticket;
        console.log(folderName);
        try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
            fs.mkdirSync(folderName+separador+'dbc');
            fs.mkdirSync(folderName+separador+'jython');
            fs.mkdirSync(folderName+separador+'mxs');
            fs.mkdirSync(folderName+separador+'pacote');
            fs.mkdirSync(folderName+separador+'report');
            fs.mkdirSync(folderName+separador+'xml_alterado');
            fs.mkdirSync(folderName+separador+'xml_original');
            fs.writeFile(folderName+separador+'pacote'+separador+'README.txt',`Instalacao dos artefatos da solicitacao ${ticket}`+'\n\n'+
            `Para realizar a instalacao do Pacote ${ticket}-MX76-Instalacao_de_Pacote deve-se seguir os seguintes passos:\n`+
            "\n"+
            "1. Logar na maquina windows via remote DeskTop, essa maquina deve ser a mesma onde o MAXIMO foi instalado\n"+
            `2. Copiar o arquivo ${ticket}-MX76-Instalacao_de_Pacote-V001.zip para algum diretório dentro da maquina. (Ex: C:\\temp)\n`+
            `3. Extraia o arquivo ${ticket}-MX76-Instalacao_de_Pacote-V001.zip\n`+
            "4. Parar o servidor do MAXIMO\n"+
            "   a) Logar no WebSphere\n"+
            "   b) Percorrer o caminho Servers > Clusters > WebSePhere application server clusters\n"+
            "   c) Selecionar MXIFCluster, MXRPCluster e MXUICluster\n"+
            "   d) E então clicar em ‘Parar’\n"+
            "5. Executar o arquivo InstalPatch.bat como administrado na maquina windows\n"+
            "6. Durante a instalação será solitado o diretório onde o MAXIMO está instalado, insira o diretório (Ex: D:\\IBM\\smp\\maximo)\n"+
            "7. Apos finalizar a execução do instalador, inicie o MAXIMO\n"+
            "   a) Percorrer o mesmo caminho que foi citado no passo 4\n"+
            "   b) Selecionar os MXIFCluster, MXRPCluster e MXUICluster\n"+
            "   c) Clicar em ‘Start’\n\n"+
            "Instalação de relatórios\n\n"+     
            "8. Certifique-se que o arquivo reporttools.properties localizado no diretorio <maximo_home>\\reports\\birt\\tools esteja devidamente configurado\n"+
            "9. Depois que o servidor estiver on-line, deve-se executar o arquivo InstallPatchReport.bat para instalar os Reports\n"+
            "10. Novamente sera solicitado o diretorio onde o MAXIMO esta instalado\n"+
            "11. Apos o instalador de relatorio finalizar, deve-se entrar no MAXIMO e gerar as requests pages dos relatorios enviados no pacote.\n"          
            ,function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
              });
              fs.writeFile(folderName+separador+'dbc'+separador+'zregister_maxvars.dbc',
              '<?xml version="1.0" encoding="UTF-8"?>\n'+
              '<!DOCTYPE script SYSTEM "script.dtd">\n'+
              '<script author="maxadmin" scriptname="zregister_maxvars">\n'+
              '<description>Script para registar a aplicação do pacote</description>\n'+
              '	<statements>\n'+
              '        <freeform description="Registra que o pacote foi instalado">\n'+
              '            <sql target="all">delete from maxvars where varname = \'XXXXX\';</sql>\n'+
              '            <sql target="all">insert into MAXVARS (varname,varvalue,maxvarsid) values (\'XXXXX\',to_char(sysdate,\'dd/mm/yyyy hh:mm:ss\'),maxvarsseq.nextval);</sql>\n'+
              '        </freeform>\n'+
              '    </statements>\n'+        
              '</script>\n'              
              ,function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
              });

            vscode.window.showInformationMessage("Ticket "+ticket +" criado com sucesso!!! Verifique a pasta no projeto");
        }
        } catch (err) {
        console.error(err);
}
    }}
    module.exports = CreateTicket;