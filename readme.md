# ICook

#### instale todas as dependencias
``` javascript
npm install
```
#### instale o ts-node na sua maquina para poder rodar os arquivos typescript
``` javascript
npm install ts-node --save
```
#### rode as migrations
``` javascript
npm run typeorm migration:run
```

#### rode o comando abaixo para criar/alterar uma migration
``` javascript
npm run typeorm migration:generate -- -n migrationname
```
<p>
Esse comando é utilizado para criar uma nova funcionalidade que exige alguma nova tabela no seu banco de dados. 
</p>

<p>
Ex.: preciso criar uma tabela de usuários, então executo o comando acima com o nome da tabela desejada
</p>

<p>
É importante que ja tenha sido criado uma classe com essa entidade da migration que você quer criar, na pasta: /src/models/modelModelo.ts
</p>

<p>
Depois de criar uma migration, execute o comando para rodar/executar ela, para que as alterações sejam aplicadas no seu banco de dados
</p>

#### rodar a API
``` javascript
npm run dev
```