# jupiter-planit-automation
Automated tests for jupiter planit website

# Setup Instructions
1. Prerequisites - Make sure that the following are installed on your machine Node.js >= 18 npm Git.
2. Clone the Git repository - git clone https://github.com/priyamohanty0405/jupiter-planit-automation
3. Install the dependencies - npm install
4. install playwright browsers - npx playwright install
# 5. How to run tests locally? 
Tests are located under tests.
# Run all tests
npm run test
# Run test on Chromium browser
npm run test:chromium
# Run test with a specific tag
TEST_TAG=@jupiterPlanit npm run test
# Run tests in headed mode
npm run test:headed
# Run with Playwright UI
npm run test:ui
# View Test Execution Reports
# View Playwright HTML report
npm run report
# Generate allure report
npm run generate:allure:report
# Open allure report
npm run open:allure:report
