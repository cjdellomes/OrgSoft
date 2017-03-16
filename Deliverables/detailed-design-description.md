**7.0	Detailed Design Specification**

**7.1	Introduction**

This document presents a detailed description of the software for the OrgSoft database as described in the [*Requirements Specification*](https://github.com/cjdellomes/OrgSoft/blob/master/Deliverables/software-requirements-specifications.md). The OrgSoft Database will allow users to store and retrieve data over the Internet from any platform, be it a desktop computer, tablet, or smartphone.

**7.2 Detailed Design Description**

**7.2.1 Frontend CSC Description

**7.2.1.1 Register Page CSU Description**

Description: Page for registering organization in system

Attributes: username field, password field, organization field

**7.2.1.2 Login Page CSU Description**

Description: Page for existing user to login

Attributes: username field, password field, submit button

**7.2.1.3 Main Dashboard Page CSU Description**

Description: Page with icon links to other portions of the system

Attributes: Timecard link, add new user link, reviews link, manage users link

**7.2.1.4 Review Dashboard Page CSU Description**

Description: Page containing an overview of employee reviews

Attributes: Review overview table, charts, employee details links

**7.2.1.5 Review History Page CSU Description**

Description: Page containing a history of input reviews

Attributes: Review history table, add / edit /delete links

**7.2.1.6 Pay Increase History Page CSU Description**

Description: Page containing a history of input payment increases

Attributes: Pay increase history table, add / edit / delete links

**7.2.1.7 Timecard Management Page CSU Description**

Description: Page containing a history of timecards

Attributes: Timecard history table, detail links

**7.2.1.8 Timecard Recording Page CSU Description**

Description: Page containing current timecard details

Attributes: Clock in / out buttons, time recordings 

**7.2.2 Server CSC Description**

**7.2.2.1 API CSU Description**

Description: Chronological routing to communicate with frontend and database

Attributes: API -> Service -> Query -> Queries -> Respond

**7.2.2.2 Routes CSU Description**

Description: Module that implements the addresses, or paths, associated with HTTP requests. Each route contains a path, a request method (GET, POST, PUT, DELETE), and a reference to a function handler that is called when the request is made for that route.

Attributes: GET POST PUT DELETE

**7.2.2.3 Server Response CSU Description**

Description: Module responsible for sending responses, or replies, from the client-side server back to the frontend of the SPY Database Application.

Attributes: api connection, postgresql connection

**7.2.2.4 Query CSU Description**

Description: Responsible for connecting to the database server from within the client-side server and initiating a query to the database.

Attributes: postgres connection, query


**7.2.2.5 Queries CSU Descripton**

Description: Returns the appropriate query string to be run against the database

Attributes: query string


**7.3 Database CSC Design Description**
		
**7.3.1 Organization CSU Description**

Description: Table containing organization relevant information

Attributes: id, name, register_date


**7.3.2 User CSU Description**

Description: Table containing information pertaining to application users

Attributes: id, org_id, username, hashed_password, first_name, last_name, display_name, is_admin


**7.3.3 Timecard CSU Description**

Description: Table containing timecard related information

Attributes: id, user_id, start_date, end_date, employee_signed, admin_signed


**7.3.4 Time Record CSU Description**

Description: Table containing time recording related information

Attributes: id, timecard_id, date, time, type


**7.3.5 File CSU Description**

Description: Table containing file related data

Attributes: id, user_id, name, type, date, base_64_string


**7.3.6 Setting CSU Description**

Description: Table containing user setting data

Attributes: id, user_id, settings_data


**7.3.7 Review CSU Description**

Description: Table containing employee review data

Attributes: id, user_id, reviewer, review_date, next_review_date, is_late, is_confirmed, days_until_review, review_status


**7.3.8 Payment CSU Description**

Description: Table containing employee pay increase data

Attributes: id, user_id, pay_increase_date


**7.4 Detailed Interface Description**

**7.4.1 Socket CSC Description**
		- Frontend to backend communication
	OrgSoft application uses NodeJS server to handle any requests that the frontend sends, so the frontend pages will initiate requests which are received and processed by the NodeJS server.

- The NodeJS server initiates connections with the Postgres Database server
	The frontend utilizes ajax calls to pass JSON data to the server, which retrieves the payload data and utilizes it for API calls. During API calls, the NodeJS server initializes a connection to the Postgres database server and executes a query string along the established connection. 

- Types of data passed between the database and server and frontend
	The Postgres database server retrieves the queried data and passes it back to the NodeJS server, which converts it to JSON. The NodeJS server passes the necessary JSON data, along with a response code, back to the frontend to be displayed in the page. 

- How does the browser handle frontend pages/files?
	All CSS is compiled into one screen.css file from the screen.scss file, which is made up of various imports of modularized SASS, including Bootstrap 4. Compass is used to automatically compile these files.
