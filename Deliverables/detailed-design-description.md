**7.0	Detailed Design Specification**

**7.1	Introduction**

This document presents a detailed description of the software for the OrgSoft database as described in the [*Requirements Specification*](https://github.com/cjdellomes/OrgSoft/blob/master/Deliverables/software-requirements-specifications.md). The OrgSoft Database allows users to store and retrieve data over the Internet from any platform, be it a desktop computer, tablet, or smartphone.

**7.2 Detailed Design Description**

**7.2.1 Frontend CSC Description**

**7.2.1.1 Register Page CSU Description**

Description: The register page includes fields for the user to type their first name, last name, username, password, confirmed password, and organization name. The page also includes a button to submit the typed information. The enter key also acts as a way of submiting the data. When data is submited, each field is checked to ensure it contains valid data. When registration is successful, the user is notified when the page loads the main dashboard page.

Attributes: first name field, last name field, username field, password field, confirm password, organization field, submit button

**7.2.1.2 Login Page CSU Description**

Description: The login page includes fields for the user to type their username and password as well as a button for submiting input information. The enter key also acts as a way of submiting input information. The fields are checked to make sure valid data is input. Once submited, the input information is checked against data in the database. Upon successful login, the user is granted access to the application and navigated to the main dashboard page.

Attributes: username field, password field, submit button

**7.2.1.3 Main Dashboard Page CSU Description**

Description: The main dashboard page provides icon links to the other components of the system, such as timecard and employee review handling. The dashboard provides 4 icons, one for each component of the system, which are used to access the rest of the system.

Attributes: Timecard link, add new user link, reviews link, manage users link

**7.2.1.4 Review Dashboard Page CSU Description**

Description: The employee review dashboard provides a table containing information of the user's subordinate employees. The table provides relevant employee information, such as name, last review date, and days until next scheduled review date. The table also includes link icons for each employee to view their review history, add a new review record, and edit their most recent review record. The review dashboard also contains a chart detailing the number of reviews in each possible status, such as past due or due next month.

Attributes: Review overview table, charts, employee details links

**7.2.1.5 Review History Page CSU Description**

Description: The review history page includes a table containing all review records pertaining to the employee of interest. The table includes links to edit or delete previous review records as well as a link to add a new review record.

Attributes: Review history table, add / edit /delete links

**7.2.1.7 Timecard Management Page CSU Description**

Description: The timecard management page includes a table containing the current and all previous time cards. Each timecard record has an associated link to view the details of the specific record. The table includes relevant timecard information, such as record number and time frame.

Attributes: Timecard history table, detail links

**7.2.1.8 Timecard Recording Page CSU Description**

Description: The timecard recording page includes data pertaining to a specific timecard. The page includes a table containing all clock in and out times entered during the timecard period. The page also provides buttons for clocking in and out for work and lunch break along with supervisor only buttons for enabling manual time entries.

Attributes: Clock in / out buttons, time recordings, manual edit buttons

**7.2.2 Server CSC Description**

**7.2.2.1 API CSU Description**

Description: The API consists of a series of files passing the payload from the front end AJAX call to the database. The appropriate function is called, which executes the corresponding SQL query. If needed, the files then pass the retrieved data back up to the frontend AJAX call.

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

Attributes: id (primary key), name (varchar 100), register_date (date)


**7.3.2 User CSU Description**

Description: Table containing information pertaining to application users

Attributes: id (primary key), org_id (reference key), username (varchar 45), hashed_password (varchar 70), first_name (varchar 45), last_name (varchar 45), display_name (varchar 90), is_admin (boolean)


**7.3.3 Timecard CSU Description**

Description: Table containing timecard related information

Attributes: id (primary key), user_id (reference key), start_date (date), end_date (date), employee_signed(boolean), admin_signed(boolean)


**7.3.4 Time Record CSU Description**

Description: Table containing time recording related information

Attributes: id (primary key), timecard_id (reference key), date (date), time (time), type (varchar 25)


**7.3.5 File CSU Description**

Description: Table containing file related data

Attributes: id (primary key), user_id (reference key), name (varchar 45), type (varchar 30), date (date), base_64_string (varchar)


**7.3.6 Setting CSU Description**

Description: Table containing user setting data

Attributes: id (primary key), user_id (reference key), settings_data (jsonb)


**7.3.7 Review CSU Description**

Description: Table containing employee review data

Attributes: id (primary key), user_id (reference key), reviewer (varchar 90), review_date (date), next_review_date (date), is_late (boolean), is_confirmed (boolean), days_until_review (int), review_status (varchar 25)


**7.4 Detailed Interface Description**

**7.4.1 Socket CSC Description**
		- Frontend to backend communication
	OrgSoft application uses NodeJS server to handle any requests that the frontend sends, so the frontend pages initiate requests which are received and processed by the NodeJS server.

- The NodeJS server initiates connections with the Postgres Database server
	The frontend utilizes ajax calls to pass JSON data to the server, which retrieves the payload data and utilizes it for API calls. During API calls, the NodeJS server initializes a connection to the Postgres database server and executes a query string along the established connection. 

- Types of data passed between the database and server and frontend
	The Postgres database server retrieves the queried data and passes it back to the NodeJS server, which converts it to JSON. The NodeJS server passes the necessary JSON data, along with a response code, back to the frontend to be displayed in the page. 

- How does the browser handle frontend pages/files?
	All CSS is compiled into one screen.css file from the screen.scss file, which is made up of various imports of modularized SASS, including Bootstrap 4. Compass is used to automatically compile these files.

