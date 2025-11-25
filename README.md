Amaysim Declined Payment Automation Test

Overview

This test automates the scenario where a user purchases a 7-day amaysim plan and enters a declined credit card. The system must show an appropriate “Credit card payment failed” message. This test ensures the previously fixed regression does not reappear.

Tech Stack

Playwright
TypeScript
Node.js

Setup
npm install
npx playwright install

Run Test
npx playwright test

Expected Outcome

1. Launches browser and go to amaysim home page
2. Customer purchase the 7-day SIM plan
3. Checkout order of new number and physical SIM
4. Purchase as new customer and enter customer details and enter declined card
5. Error message should display "Credit card payment failed"
6. Test fails if the site accepts the declined card (regression)
