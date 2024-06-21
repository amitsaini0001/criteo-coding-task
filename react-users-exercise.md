**Prerequisites & Notes:**
- Create a new project using `vite` and the `react-ts` template: 
`npm create vite@latest criteoCodeTemplate -- --template react-ts`  
- Create a public repository which can be shared via a link
- Styling is not mandatory or important for this task, only the quality of your code.
- Project must use React 18^ and Typescript 5.2^
- Whilst there is no time limit for this task, we would expect no more than 2 hours is required to complete it.
- If you have any questions or want clarification, don't be afraid to ask!
- It is likely that your follow-up interview will include questions about your submission.

---
**Functional Requirements:** 

- Create a single page that:
	- Displays a single table which renders a list of users.
	- Page will fetch a list of users using the endpoint listed in **Integration Points**

- Table must display a list of users with the following columns:
	 - ID
	 - Name
	 - Username
	 - Company Name
	 - Email
	 - Address - ***render only the following data***:
		 - Street
		 - City
		 - Postcode/Zipcode
- Table must be paginated with only 5 records per page
- Table must provide an option to view all records
- Table must be sortable by name in alphabetical order
- Table must display a loader, or placeholder when fetching data
- Table must display a button which lets me re-fetch the latest data.

---
**Integration Points:**
User Endpoint: https://jsonplaceholder.typicode.com/users

- **This endpoint is not paginated, which means all pagination must be completed within the component state.**

---
**Important Notes:**
- Feel free to complete this task in anyway you'd like, you have complete creative freedom.
- We ***encourage*** you to regularly commit your work as you complete the task.
- You're free to use any package(s) you'd like to complete your task, as long as the ***Functional Requirements*** are met.
- A friendly reminder - Styling is not mandatory or important for this task, only the quality of your code.
- Whilst certain non-functional requirements like security and performance are not important (outside of anything egregious), try to write the code in a way where it is potentially production shippable. 