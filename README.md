# Customer Support Center 

The Customer Support Center wants to add, edit and remove Support Agents.
Customers want to be able to report a case for returning a product.
Your software should assign an available Support Agent to handle a case automatically
Support Agents should be able to list and resolve all the current active cases and Customers can add a new case. An agent can have only one case at a time. When the case is resolved, it should be marked so and the Support Agent should be free to take a new case


## Install

### Pre-Requisites

- Node.js version 12 or higher
#### Steps

1. Clone the repository
2. Run `npm install` 
3. Run `npm run dev` start the development server
4. If you need to change the base URL for the backend, you can modify the `utils/constants` file "For sure I have to read it from the environment variable"


## My Solution:

### What I did: 

1. Customers can create, view their cases
2. Support Agents can view, and resolve all cases

### to do

#### Requirement: 
- Admin user can create, update, and delete Support Agents
- Implement pagination for cases 
- Validation for inputs
- Implement a refresh token flow for authentication
- Write tests for the application

#### Security
- Token storage in local storage is not secure. Consider using server-side token storage or HTTP-only cookies.
- Implement environment variables and multi-environment configuration.
  
### Technologies:

1. Nextjs
2. Chakra-ui


