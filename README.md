# webapp
Forked Repository for CSYE6225 Network Structures and Cloud Computing

# User Management API with Express and Sequelize

This project employs Express.js and Sequelize ORM to create a health and user management APIs. The APIs offers endpoints for health checking, user creation, updating user information, and fetching user details.

## Getting Started

### Prerequisites

- Node.js with npm locally installed on your machine
- MySQL or another supported database system installed and running

## Prerequisites softwares and libraries
- MySQL
- bcryptjs
- express
- sequelize
- NodeJS
- Sequelize ORM
  
# Steps to deploy it locally.

To run all packages:
- run  npm install

- Once  node_modules is installed. create a .env file and add database details and port details.

# Details

Assignment01:

command+shift+. : show hidden files

Commands:

1. npm init
2. npm install dotenv —save
3. npm install express —save
4. npm install nodemon -g
5. npm install body-parser —save
6. npm install mysql2 —save
7. npm install sequelize —save
8. add .env file
9. package.json -> scripts -> “start” : “nodemon index.js”

For Demo: npm install


References
1. https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
2. https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
3. https://sequelize.org/docs/v6/getting-started/
4. https://www.youtube.com/watch?v=X5PygyNG71g
5. https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
6. https://codingcanvas.com/restful-crud-api-using-nodejsexpress-and-mysql-part-2-integrate-with-mysql-database-using-orm/
7. https://stackoverflow.com/questions/49547/how-do-we-control-web-page-caching-across-all-browsers
8. https://medium.com/@toakshay.official/how-to-secure-express-js-applications-eeef0c10588e
9. https://help.hcltechsw.com/commerce/9.1.0/admin/tasks/tseenablingx-content.html
10. https://stackoverflow.com/questions/40840852/difference-between-res-setheader-and-res-header-in-node-js
11. https://tutorialspage.com/understanding-x-content-type-options-and-nosniff-in-http-headers/
12. https://apidog.com/articles/call-rest-api-node-js/
13. https://www.reddit.com/r/node/comments/zxnvdu/how_to_properly_set_up_a_database_config_file_for/
14. https://everything.curl.dev/usingcurl/verbose
15. https://blog.bitsrc.io/a-gentle-introduction-to-env-files-9ad424cc5ff4
16. https://bobbyhadz.com/blog/javascript-cannot-convert-undefined-or-null-to-object
17. https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express#:~:text=When%20the%20req.,false%20even%20when%20it's%20empty.
18. https://github.com/expressjs/body-parser
19. https://blueprintsys.helpdocs.io/article/op16z26bcy-head-method
20. https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean
21. https://stackoverflow.com/questions/68559357/how-to-receive-postman-binary-files-in-express-js
22. https://stackoverflow.com/questions/38468896/how-to-use-bodyparser-raw-to-get-raw-body
23. https://snyk.io/advisor/npm-package/body-parser/functions/body-parser.raw

Assignment02:

Commands:
1. npm install basic-auth --save
2. npm install sequelize-cli --save
3. sequelize init

References:
1. https://www.youtube.com/watch?v=5m636rybfdg
2. https://www.youtube.com/watch?v=XJkB63Hrrjo&list=PL_OdF9Z6GmVZLkHKoSR6XZK6NArfyMxUB&index=2

Create User:

{
"firstName":"ajay",
"lastName":"devmane",
"password":"123",
"username":"adev@gmail.com"
}

Regular Expression:
Password:
This regex checks if the password contains 
- at least one digit, 
- one lowercase letter, 
- one uppercase letter, 
- one special character, 
- does not contain spaces, 
- and has a length between 8 and 16 characters.

/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

First Last Name:
- Start with an uppercase letter or accented uppercase letter.
- Followed by one or more occurrences of lowercase letters, comma, period, space, or single quote.
- Each word can be followed by zero or more spaces.
- The entire string must conform to this pattern.

/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/

Assignment03:

Commands:

References:
1.https://stackoverflow.com/questions/41283955/github-keeps-saying-this-branch-is-x-commits-ahead-y-commits-behind
