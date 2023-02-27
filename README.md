# Ferramentas para auxiliar no desenvolvimento - IBM Maximo Asset Mangement
Essa extensão tem com finalidade auxiliar na construção e empacotamento de artefatos gerados durante o processo de desenvolvimento de melhorias no IBM MAXIMO.

Os scripts do repositório foram desenvolvidos para serem executados no Eclipse ou no VS Code. Também e possível executar os scripts de forma manual, a utilização de IDEs é sugerida para facilitar o uso.


----
## Índice
[[_TOC_]]

----

# Configuração

## Pré-requisitos

1. O cliente git deve ser estar instalado na máquina. Para instalar o git no windows deve ser baixado o .exe no site https://gitforwindows.org/. Para o linux deve ser executado o comando `sudo apt install git`

2. O python3 e o java 1.8 ou superior devem estar instalados na máquina. 
Para instalar o java siga os passos do site https://www.java.com
Para instalar o python3 siga os passos https://www.python.org/downloads/

> Importante: na instalação do python no windows selecionar a opção customizada para realizar a instalação do pip

Depois do python3 instalado, deve ser instalado os pacotes `tqdm,requests,pdfkit,lxml e jsoncomment`. Os comandos abaixo exemplifição como instalar os módulos:

```bash
pip install tqdm
pip install requests
pip install pdfkit
pip install lxml
pip install jsoncomment
```

3. O vscode deve estar instalado na máquina. Para instalar o vscode siga os procedimentos do site https://code.visualstudio.com

4. Verifique se o wkhtmltopdf esta devidamente instalado. Entre no em um propmt shell e digite wkhtmltopdf, caso o comando retorne o help, significa que o mesmo esta instalado, caso contrário siga os passos a seguir. Para windows, baixe o instaldor

https://wkhtmltopdf.org/downloads.html

apos a instalação certifique que o caminho do arquivo wkhtmltopdf.exe foi inserido na variavel de ambiente path

Para Linux, execute a comando abaixo para instalar o patoce wkhtmltopdf

```bash
sudo apt-get install wkhtmltopdf
```
## Clonando repositório pelo Visual Studio Code

<ul>
<li>Abra o Visual Studio Code.</li>
<li>Aperte Ctrl+Shift+P, digite "clone" e aperte enter. Se der algum erro, espere um pouco e tente novamente.</li>
<li>O Code vai pedir que entre com a url do repo (https://gitlab.maxinst.intra/maxinst/maximo_developer_script.git)</li>
<li>Aperte enter para confirmar e escolher uma pasta para baixar o projeto.</li>
<li>O projeto vai ser clonado nessa pasta.</li>
<li>Clique em "Open Repository"</li>
<li>Abra qualquer arquivo que aparecer e espere até que apareça um botão azul "master" e outros controles no canto inferior esquerdo da janela.</li>
<li>Obs.: no caso do windows, pode ser que nomento de finalizar o clone, uma mensagem de erro apareça. Clique em OK e verifique se o arquivo <MDS_HOME>\.git\config tem o parametro longpaths = true na sessão [CORE]. Apos alterar o arquivo, sincronize o projeto novamente.</li>

## Configurando o Visual Studio Code para chamar os scripts (Linux)

Certifique que a variável de ambiente $MDS_HOME esteja setada no ambiente. Para criar variável de ambiente, basta criar o arquivo mds.sh no diretorio /etc/profile.d com o seguinete conteúdo:

```shell
export MDS_HOME=/<caminho>/maximo_developer_script
```

obs.:Para criar um arquivo nesse diretório é necessário permissão de super usuário. Não esqueça de alterar o caminho para a estrutura de diretorio onde o maximo_developer_script foi clonado.

Após criar o arquivo mds.sh execute o comando abaixo para que as mudanças sejam efetivadas

```shell
source /etc/profile.d/mds.sh
```

Feche todos os vscode abertos. Para confirmar que a variável foi criada com sucesso execute o comando abaixo no terminal integrado do vscode.

```shell
echo $MDS_HOME
```
Deverá ser exibido o caminho completo do diretório maximo_developer_script

## Configurando o Visual Studio Code para chamar os scripts (Windows)

1. Criação da variavel de ambiente MDS_HOME

Certifique que a variável de ambiente $MDS_HOME esteja setada no ambiente. Para criar variável de ambiente via linha de comando, basta abrir o cmd com administrador e executar o seguinte comando: 

```
setx MDS_HOME <caminho>\maximo_developer_script -m
```
obs.: Não esqueça de alterar o caminho para a estrutura de diretório onde o maximo_developer_script foi clonado.

Feche o todos os vscode abertos. Abra um novo vscode. Para confirmar que a variável foi criada com sucesso execute o comando abaixo no terminal integrado do vscode.

```shell
echo %MDS_HOME%
```
Deverá ser exibido o caminho completo do diretório maximo_developer_script

2. Selecionando o cmd como shell padrao 

Precione ctrl+shipt+p e procure por `Terminal:Select default profile`, selecione `Comand Prompt`


## Configurando o uso de snippets no VS Code

Para configurar o snippets de tag para os arquivos *dbc*, copie o arquivo `dbc_snippets.code-snippets` da pasta `vscode` para dentro
da pasta `.vscode` do seu projeto.

Para mais detalhes consultar a documentação técnica da IBM:
[https://developer.ibm.com/static/site-id/155/maximodev/dbcguide/script.xsd.html]

# Atualização das Novas Releases

Para baixar as novas releases do projeto com correções ou novas funcionalidades siga os procedimentos abaixo:

1. Abra o projeto do MDS no seu VS Code

2. Certifique de estar na branch master

![Projeto Master](/source/images/sync_proj1.png)

3. Clique em sincronizar

![Sinc Projeto Master](/source/images/sync_proj2.png)

4. Caso tenha algum problema abra um ticket por aqui: [http://gitlab.maxinst.com/maxinst/maximo_developer_script/-/issues]. 

# Utilização das Tasks


## Estrutura de Pastas do Projeto

O projeto inicia-se na pasta MaximoProjetos. Sua estrutura é composta pelas seguintes pastas e arquivos:

```
+-- jython
+-- TICKETID
|   +-- dbc
|   +-- doc
|   +-- jython
|   +-- mxs
|   +-- pacote
|       +-- README.txt
|       +-- [TICKETID]-MX76-Instalacao_de_Pacote-[VERSAO].zip
|   +-- xml_alterado
|   +-- xml_original
|   +-- config.properties
+-- .gitignore
```

Segue um descritivo da finalidade de cada pasta:

**TICKETID/dbc** reuni todos os scripts dbc's criados para atender o ticket.

**TICKETID/doc** armazena arquivos de documentação do ticket. (ex.: especificação funcional, modelos de carga csv entre outros arquivos)

**TICKETID/jython** reuni todos os links simbólicos dos arquivos jythons criados ou alterados para atender o chamado. Todos os scripts de automação deverão ser criados dentro da pasta *jython* e **não** na pasta *TICKETID/jython*.

> Para gerar o link simbólico via windows o comando é `mklink`. A geração do link simbólico via linux é feita pelo comando `ln`. Para facilitar a geração do link simbolico deve-se usar a task DownloadJython.    

**TICKETID/mxs** reuni todos os arquivos de modificações de telas referente ao ticket. (o arquivo .mxs ṕe gerado pela task mxdiff)

**TICKETID/pacote** conterá um arquivo .zip ([TICKETID]-MX76-Instalacao_de_Pacote-[VERSAO].zip) com os artefatos compactados e o arquivo README.txt que poderá ser alterado conforme necessidade.

**TICKETID/xml_alterado** conterá o arquivo .xml com as alterações das telas. (para extrair o xml de tela pode ser utilizado a aplicação Editor de Telas do MAXIMO)

**TICKETID/xml_original** conterá o arquivo .xml salvo antes da alteração. (para extrair o xml de tela pode ser utilizado a aplicação Editor de Telas do MAXIMO)


## Arquivo config.properties

O arquivo config.properties possue os parametros de conexão com o banco do Maximo e da Aplicação.

> O arquivo **`config.properties`** será utilizado como o arquivo `maximo.properties` do **Maximo**, então é importante conferir para qual ambiente o arquivo está configurado.

```properties
[MaximoConfigSection]
#************************************************************************************************
#** Usuario e senha do banco de dados
#************************************************************************************************
mxe.db.user=
mxe.db.password=

#************************************************************************************************
#** Owner of the database schema. Must be dbo for SQLServer and same as mxe.db.user
#** for Oracle.
#************************************************************************************************
mxe.db.schemaowner=maximo

#************************************************************************************************
#** Java class name of the JDBC driver.
#************************************************************************************************
mxe.db.driver=oracle.jdbc.OracleDriver
#mxe.db.driver=com.ibm.db2.jcc.DB2Driver

#************************************************************************************************
#** Url JDBC do banco de dados
#************************************************************************************************
mxe.db.url=jdbc:oracle:thin://@host:port/maxdb76
mxe.db.url=jdbc:db2://server_name:50000/database_name

#************************************************************************************************
#** Nome do servidor ou ip onde o Maximo esta sendo executado
#************************************************************************************************
maximo.hostname=

#************************************************************************************************
#** Porta Http onde o Maximo esta sendo executado
#************************************************************************************************
maximo.port=

#************************************************************************************************
#** Usuario da aplicação Maximo
#************************************************************************************************
maximo.username=maxadmin

#************************************************************************************************
#** Senha do usuário da aplicação Maximo
#************************************************************************************************
maximo.password=

#************************************************************************************************
#** Cliente do atentimento da SR (ex: Ocyan,Engie,cep)
#** esse parametro é  utilizado para gerar o logo no documento tecnico
#************************************************************************************************
maximo.cliente=
```


## Como executar uma Task

Para iniciar uma task no VSCode, clique no menu `Terminal-->Run Task`. Uma caixa de seleção será apresentada com as opções de tarefas.

![Executar uma tarefa](/source/images/Runtask.gif)

## Tasks disponíveis

### Runscriptfile

Para utilizar essa task, você precisa selecionar primeiro um arquivo `.dbc` ou `.sql` e depois escolher a opção de `runscriptfile`.

### UploadScriptJython

Para utilizar essa task, você precisa selecionar primeiro um arquivo `.py` ou um link simbólico `.lnk` que está dentro da pasta jython e depois escolher a opção de `UploadScriptJython`.

Ao executar esse comando, a task irá ler o cabeçalho do arquivo jython aberto, conectar ao servidor do Maximo e fazer o upload do arquivo já executando o reload do cache.

**Cabeçalho:**
```python
#AUTOSCRIPT: [NOME DO SCRIPT]
#DESCRIPTION: [DESCRIÇAO]
#LOGLEVEL: ERROR
#VERSION: 1
```

> Durante o desenvolvimento o atributo LOGLEVEL poderá ser alterado para DEBUG para fazer o uso da classe de debug nos logs. Entretando, é importante alterar novamente para ERROR e fazer o upload para fazer o fechamento do pacote

### Gerar DBC com ctrlgroup

Essa task irá extrar os dados da tabela de ctrlgroup, utilizado na configuração de tela condicional.

Como parametro obrigatório, deverá ser informado uma instrução json para seleção dos registros. Com exemplo, extrair todas as assinaturas avançadas das apliações Ordem de Serviço e Solicitação de Serviço. O parametro abaixo extrai essas informações:

```
app:WOTRACK,SR
```

Um outro exemplo, extrair todas as assinaturas avançadas com o nome SHOW_FIELD:

```
optionname:SHOW_FIELD
```

### Gerar DBC com Jythons

Essa task irá ler todos os nomes do arquivos `.py` e `.lnk` da pasta `jython` do projeto, conectar ao servidor do Maximo e gerar um arquivo `.dbc` na pasta `dbc` do projeto.

> **NOTA 1:** Nessa task, é importante que todos os cabeçalhos estejam com o **LOGLEVEL: ERROR**

>>>
**NOTA 2:** O task não pega dos arquivos python na pasta do projeto, ele irá baixar do servidor Maximo configurado no `config.properties`, por isso, 
caso alguma alteração esteja somente nos arquivos do projeto, faça primeiro o upload para o Maximo usando o [UploadScriptJython](#uploadscriptjython)
>>>

### Mxdiff de Telas

Essa task executa o diff entre o xml original de uma aplicação e o xml alterado dessa aplicação. Será gerado o arquivo `.mxs` na pasta `mxs`
para todos os arquivos contidos nessas pastas.

Para uma tela nova, basta colocar o arquivo na pasta `xml_original` que será gerado o `.mxs` de toda a tela.

> Importante: Caso o mxs esteja sendo gerado em uma maquina windows e o pacote sera aplicado em uma maquina windows, apos a execucao da tarefa mxdiff deve-se converter o arquivo para ANSI e Windows CR LF. No Notepad++ é possivel de se fazer essa conversão. Pode ser que no momento de salvar o arquivo, seja apresentado uma mensagem de erro de XML parssing.

### Extair Dominio
Essa task tem como finalidade extrair os domínios informados. A principal vantagem em utilizar essa task é que são extraídos os as tabelas de linguagem dos domínios (ex.:l_alndomain) e caso exista as condições dos domínios tambem. Após a execução dessa task um arquivo DBC será gerado com os deletes e inserts necessários para a criação dos domínios. É importante lembra que caso exista expressões condicionais associadas, o código das mesmas não serão extraído por essa task, mas as condições serão inserida na respectivas linhas dos domínios.

### Gerar Pacote

Essa task irá criar o arquivo ZIP da implementação. Essa task tem como finalidade extrair os domínios informados. A principal vantagem em utilizar essa task é que são extraídos os as tabelas de linguagem dos domínios (ex.:l_alndomain) e caso exista as condições dos domínios tambem. Após a execução dessa task um arquivo DBC será gerado com os deletes e inserts necessários para a criação dos domínios. É importante lembra que caso exista expressões condicionais associadas, o código das mesmas não serão extraído por essa task, mas as condições serão inserida na respectivas linhas dos domínios.Opcionalmente, algumas subtarefas de geração de dbc dos jythons, dos arquivos mxs e outros poderão ser utilizados durante a geração do Pacote.

Ao final, um arquivo `.zip` com a versão escolhida durante a execução da tarefa será criado no diretório `pacote` do TICKET/SR.

> Importante: Antes de rodar essa tarefa certifique-se que o arquivo config.properties esteja selecionado, caso contrário o script irá emitir a mensagem `Favor selecionar o arquivo config.properties para empacotar os artefatos...` 

### Gerar Documento Tecnico

Essa tarefa irá gerar um documento `.pdf` na pasta Pacote, com os detalhes das alterações dos arquivos `.dbc`

> Importante: Antes de rodar essa tarefa certifique-se que o arquivo config.properties esteja selecionado, caso contrário o script irá emitir a mensagem `Favor verificar se o arquivo config.properties esta selecionado...`

### Extrair Workflows

Essa tarefa irá se conectar ao banco de dados do Maximo e extrair todas as informações do Workflow informado.

Ao executar a task de Extrair Workflow, será solicitado qual a pasta do Ticket você está trabalhando.

![Informar nome de Pasta](/source/images/RuntaskFolder.gif)

No terminal do VSCode, irá aparecer as perguntas para pegar os dados do Workflow e extrair.

![Terminal do Extrair WF](/source/images/extractWF_terminal.png)

Ao término da extração, um arquivo `.sql` será gerado na basta `dbc` da Pasta selecionada do Projeto.

### Extrair Relatórios

Essa tarefa irá se conectar ao Maximo e extrair o relatório informado nos parâmetros.

Ao executar a task `Extrair Relatório` será solicitado:

1.  Pasta do Ticket que está trabalhando
2.  ID da Aplicação (Ex. WOTRACK)
3.  Nome do Relatório (Ex. woprint.rptdesign)

> É importante informa o nome do relatório completo para poder fazer a extração corretamente. A extração já pega todos os 
parâmetros configurados para o relatório selecionado.

Ao término da execução, o relatório sera movido para a pasta `reports` do seu desenvolvimento.

> Importante: Essa funcionalidade não extrai as permissões do relatório, para isso deve ser criado um arquivo `.dbc` à parte e 
colocá-lo na mesma pasta do relatório extraido em `reports`

### Importar Relatórios

Essa tarefa irá se conectar ao Maximo e importar o relatório selecionado

Para utilizar a task `Importar Relatório` você deverá selecionar o arquivo de `.rptdesign` e selecionar a task no menu terminal.

Ao término o relatório irá será importado para o Maximo.

> Importante: Essa funcionalidade não importa as permissões do relatório, para isso deve ser utilizado a task 
[Runscriptfile](#runscriptfile) com o `.dbc` criado com as permissões do relatório.

### Gerar novo Ticket

Essa tarefa irá criar uma na estrutura de diretórios para o Ticket informado. A estrutura de diretório criada será a mesma descrita no tópico [Estrutura de Pastas do Projeto](#estrutura-de-pastas-do-projeto). Essa tarefa atualiza o arquivo tasks.json com a ultima versão do repositorio local Maximo Developer Script

> Importante: Essa funcionalidade necessita que o pacote jsoncomment esteja instalado no python. Para instalar o pacote basta executar o seguinte comando `pip install jsoncomment`

### Gerar merge DBC

Essa tarefa irá criar uma arquivo chamado dbc_completo.dbc no diretório dbc do projeto. Esse arquivo conterá o merge de todos os arquivos .dbc que estão localizados no diretorio dbc do projeto. 
O script junta as tags: 
```
modify_attribute
specify_aln_domain
specify_numeric_domain
specify_table_domain
specify_index
add_attributes
define_table
create_relationship
freeform
create_app
add_sigoption
create_module
insert
```
de todos os DBCs e coloca em um unico arquivo chamado dbc_completo.dbc

> Importante: Antes de rodar essa tarefa certifique-se que o arquivo config.properties esteja selecionado.

### Extrair Start Center

Essa tarefa irá se conectar ao Maximo e extrair o Start Center informado nos parâmetros.

Ao executar a task `Extrair Start Center` será solicitado:

1.  O nome do Start Center que se deseja extrair. (Ex. name:Template-20200507140430)
2.  Responder se o Template já existe no ambiente de destino. ([s] caso já exista / [n] caso seja novo)
3.  Caso ele já exista, não inserir nada. Caso seja novo, informar os nomes dos Grupos que terão o Template no ambiente de destino.

> É importante informar o nome do Start Center completo para poder fazer a extração corretamente.

Ao término da execução, o Start Center sera criado na pasta `dbc` do seu desenvolvimento.

### DownloadScriptJython

> Importante: Antes de executar essa tarefa o script de automação deve existir no MAXIMO e o arquivo config.properties deve estar selecionado. 

Tarefa responsável por recuperar um ou todos os arquivos de automation script configurado no IBM MAXIMO. Basicamente a tarefa loga no banco de dados do MAXIMO, (via rest utilizando as credenciais do config.properties) recupera o conteúdo do jython passado como parâmetro e grava em uma arquivo local. O arquivo jython é criado em uma estrutura de diretório que corresponde ao ponto de ativação do script. Quando é informado o nome do arquivo, a tarefa cria um link simbólico (.lnk) com o mesmo nome do script de automação dentro da pasta `jython` do projeto, esse link simbólico aponta para o arquivo gravado na estrutura de diretórios `<MaximoProjetos>/jython`
Abaixo um detalhamento da estrutura de diretório criada para representar os pontos de ativação:

```
+-- MAXIMOPROJETOS
|   +-- jython
|   |   ACTIONS
|   |   CUSTOMCONDITION
|   |   SCRIPT_INTEGRACAO
|   |   OBJECT_NAME (ex.: WOTRACK)
|   |   +-- ACTION
|   |   +-- att_INITIALIZE_ACCESS_RESTRICTION
|   |       +-- att_name
|   |   +-- att_INITIALIZE_VALUE
|   |       +-- att_name
|   |   +-- att_RETRIEVE_LIST
|   |       +-- att_name (ex.: ASSETNUM)   
|   |   +-- att_RUN_ACTION
|   |       +-- att_name
|   |   +-- att_VALIDADE
|   |       +-- att_name
|   |   +-- obj_ADD_BS
|   |   +-- obj_ADD_AS
|   |   +-- obj_ADD_AC
|   |   +-- obj_DELETE_BS
|   |   +-- obj_DELETE_AS
|   |   +-- obj_DELETE_AC
|   |   +-- obj_ADD&UPDATE_BS
|   |   +-- obj_ADD&UPDATE_AS
|   |   +-- obj_ADD&UPDATE_AC
|   |   +-- obj_ADD&DELETE_AS
|   |   +-- obj_ADD&DELETE_BS
|   |   +-- obj_ADD&DELETE_AC
|   |   +-- obj_UPDATE&DELETE_BS
|   |   +-- obj_UPDATE&DELETE_AS
|   |   +-- obj_UPDATE&DELETE_AC
|   |   +-- obj_ALL_BS
|   |   +-- obj_ALL_AS
|   |   +-- obj_ALL_AC
|   |   +-- obj_INITIALIZE_VALUE
|   |   +-- obj_VALIDATE
|   |   +-- obj_ALLOW_OBJECT_DELETION
|   |   +-- obj_ALLOW_OBJECT_CREATION
|   +-------------------------------------------------  
|   +-- TICKETID
+-----------------------------------------------------
```
Somente serão criados na máquina local os diretórios que tiverem os pontos de ativações criados no MAXIMO, os pontos de ativação que não existirem no MAXIMO não serão criados no ambiente local. Caso um arquivo seja usado em mais de um ponto de ativação, a tarefa DownlodScriptJython irá criar somente um arquivo com extensão .py e os respectivos links dentro das pastas de ponto de ativação.

### Extrair objetos MIF

Essa task tem como finalidade gerar scripts sql que correspondam ao objeto MIF escolhido. É possivel exportar os seguintes artefatos MIF:

```
Object Structure
End Point
Web Service
Enterprise Service
External System
Publish Channel
ALL
Invocation Channel
OSLC Resources
JSON Resources
```
Após escolhida essa task será apresenda as opções para a escolha do usuario.

### Extrair Escalação

Essa task tem como finalidade extrair a escalação que será informada. Após a execução dessa task um arquivo sql será gerado com os deletes e inserts necessários para a instalação da crontask. É importante lembra que as notificações usadas na escalação não são extraida por essa tarefa. 

### Extrair Dominios

Essa task tem como finalidade extrair os domínios informados. A principal vantagem em utilizar essa task é que são extraídos os as tabelas de linguagem dos domínios (ex.:l_alndomain) e caso exista as condições dos domínios tambem. Após a execução dessa task um arquivo DBC será gerado com os deletes e inserts necessários para a criação dos domínios. É importante lembra que caso exista expressões condicionais associadas, o código das mesmas não serão extraído por essa task, mas as condições serão inserida na respectivas linhas dos domínios.
