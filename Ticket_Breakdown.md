# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add custom_id field to Agents table
---
Description: 
Add a new field 'custom_id' to the Agents table that will store the custom id provided by the Facility.

Acceptance Criteria:
- The Agents table should have a new field called 'custom_id'.
- The 'custom_id' can be unique for each Facility and Agent pairing.
- The 'custom_id' field should accept strings as its value.

Implementation Details:
- Update the database schema for the Agents table to include a 'custom_id' field.
- Update any existing queries that insert or update data in the Agents table to account for the new 'custom_id' field.

Ticket 2: Create a function to update Agent's custom_id
---
Description:
Create a function to update the 'custom_id' of an Agent for a specific Facility.

Acceptance Criteria:
- The function should take in parameters for Facility id, Agent id, and custom_id.
- The function should update the 'custom_id' field in the Agents table with the new value.

Implementation Details:
- Implement a function called updateAgentCustomId that accepts Facility id, Agent id, and custom_id as inputs.
- The function will find the Agent record for the provided Agent id and Facility id and update the 'custom_id' field with the new value.

Ticket 3: Modify getShiftsByFacility function to include custom_id
---
Description:
Modify the existing getShiftsByFacility function to include the Agent's custom_id in the returned Shift data.

Acceptance Criteria:
- The custom_id of each Agent should be included in the Shift data returned by the getShiftsByFacility function.

Implementation Details:
- Update the query inside the getShiftsByFacility function to fetch the custom id of each agent alongside their metadata.
- Modify the function's output to include the custom_id in the Agent metadata.

Ticket 4: Modify generateReport function to use Agent's custom_id
---
Description:
Modify the existing generateReport function to use the Agent's custom_id instead of the internal database id when generating PDF reports.

Acceptance Criteria:
- The generateReport function should use the custom_id of each Agent in the report instead of the internal database id.

Implementation Details:
- Update the function generateReport to iterate through the Shift records provided and look for the custom_id in the Agent metadata.
- If the custom_id exists, use it in the report. If not, continue using the internal database id.

Ticket 5: Add unit tests
---
Description:
Create unit tests for the updateAgentCustomId function, modifications to the getShiftsByFacility and generateReport functions, and any new helper functions.

Acceptance Criteria:
- Test the updateAgentCustomId function to ensure that it properly updates the custom_id field in the Agents table for the given Facility and Agent ids.
- Test the getShiftsByFacility function to ensure that it retrieves the correct custom_id data for Agents.
- Test the generateReport function to ensure that it uses the custom_id where available in the report PDF.

Implementation Details:
- Create test cases covering various scenarios to ensure the correct functionality.
- Use a JavaScript testing library, such as Jest, to create and run the tests. 