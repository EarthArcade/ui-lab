# ui-lab

Automated UI testing lab for ITDS362. Test case QP-01 (a custom pizza reaches the admin list on QuickPizza) is automated with two tools.

Tool parts that I chose: **Part 3, Robot Framework** and **Part 4, Cypress**.

Results, versions and the reflection are in [RESULTS.md](RESULTS.md).

## robot/ (Part 3, Robot Framework)

Robot Framework 7.5.1 with SeleniumLibrary 6.9.0. `first.robot` and `web_form.robot` test Selenium's web form, and `pizza_scenario.robot` runs QP-01 with the keywords in `resources/quickpizza.resource`. `results/run1` and `results/run2` hold the log, report and screenshots of two full runs.

Needs ChromeDriver in the environment variable `CHROMEDRIVER`. Set up once, then run from the `robot` folder:

```
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
robot -d results/run1 -v BROWSER:headlesschrome pizza_scenario.robot
```

## cypress/ (Part 4, Cypress)

Cypress 16.2.1. `cypress/e2e/web-form.cy.js` tests Selenium's web form, and `cypress/e2e/pizza-scenario.cy.js` runs QP-01 with the custom command `adminLogin` from `cypress/support/commands.js`. `cypress/videos` and `cypress/screenshots` hold the evidence of the last full run.

Run from the `cypress` folder:

```
npm install
npx cypress run --browser chrome
```
