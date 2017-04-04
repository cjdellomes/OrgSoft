##OrgSoft

[Read the Project Proposal](Deliverables/project-proposal-document.md)

[Read the Requirements Specification](Deliverables/software-requirements-specifications.md)

### Requirements
Install `npm` and `postgres` if you don't already have them installed
```
brew install node
brew install postgresql
```

### Installation
download and install packages
```
git clone https://github.com/cjdellomes/OrgSoft.git
cd OrgSoft
npm install
```

configure database with user and database for project by having `config/create_orgsoft.sql`
```
CREATE USER {user} WITH PASSWORD '{password}';
CREATE DATABASE {db, default orgsoft} OWNER {user};
ALTER USER {user} WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE "{db, default orgsoft}" to "{user}";
```

configure server with database access by having `config/set_env.sh`
```
echo 'postgres://{user}:{password}@{host, default localhost}:{port, default 5432}/{db, default orgsoft}'
```

Alternately, get the most recent config folder from Team member/Slack.
The most recent config is from _Oct, 30_.

### Using Database

Initialize PostgreSQL for OrgSoft
```
npm run db-init
```

Start Database
```
npm run db-start
```

Stop Database
```
npm run db-stop
```
Reset Database (stop, initialize, start)
```
npm run db-reset
```

### Running & Development

Start server
```
npm start
```

Alternately, start server to auto restart when a file changes, _provided by [nodemon](https://github.com/remy/nodemon/)_
```
npm run nodemon
```

_Note that since_ `authorization` _now is partially functional, you will most likely have to login to try out the site._

Run Tests
```
npm test
npm run lint
```