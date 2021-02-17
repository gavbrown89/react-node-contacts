# React & Node.js CRUD Application

### MySQL DB setup
Create a database with the following table columns:

```sql
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT; 
```
Update your DB connection settings in server/index.js

```javascript
const db = mysql.createPool({
    host: '<your-hostname>',
    user: '<your-username>',
    password: '<your-password>',
    database: '<your-db-name>'
});
```

### Running the application

Start the node.js server, open terminal and type the following
```console
cd server/
npm install && npm run dev
```

Start running React, open new terminal window and type the following

```console
cd client/
npm install && npm start
```