# UI lab results

Tool parts that I chose: Part 3, Robot Framework, and Part 4, Cypress

## Part 0
- Step 0.1, Chrome version: Google Chrome 157.0.8103.78 (Official Build) (64-bit), Windows 11
- Step 0.3, ChromeDriver version: ChromeDriver 157.0.8103.78
- Step 0.4, locator of Pizza, Please!: `button[name="pizza-please"]` (1 element)
- Step 0.4, locator of Excluded tools: `select` (1 element)
- Step 0.4, locator of Must be vegetarian: `#default-checkbox` (1 element)
- Step 0.4, locator of Custom Pizza Name: `input#pizza-name` (1 element; `#pizza-name` alone finds 2 after Pizza, Please!)
- Step 0.4, `$$("#floating_filled").length` gave 3; `//label[normalize-space()='Max Calories per Slice']/preceding-sibling::input` gives 1
- Step 0.5, pizza name, tool and calories of the run by hand: TODO

| Step | Actual result | Pass or fail |
|------|---------------|--------------|
| 1 | TODO | |
| 2 | TODO | |
| 3 | TODO | |
| 4 | TODO | |
| 5 | TODO | |
| 6 | TODO | |
| 7 | TODO | |

## Part 3: Robot Framework
- robot --version: Robot Framework 7.5.1 (Python 3.14.0 on win32)
- Step 3.2, failure message for the wrong title: `Title should have been 'Web Form' but was 'Web form'.`
- Step 3.8, run 1, result, elapsed time and pizza name: PASS, 9.48 s, Lab Pizza 20261115-134011 (tool Scissors, 400 calories per slice)
- Step 3.8, run 2, result, elapsed time and pizza name: PASS, 9.78 s, Lab Pizza 20261115-134021 (tool Scissors, 475 calories per slice)

## Part 4: Cypress
- node --version, npm --version and npx cypress version: v22.20.0, 10.9.3, Cypress 16.2.1
- Step 4.3, failure message for the wrong title: `Timed out retrying after 10000ms` with `-'Web form'` (actual) and `+'Web Form'` (expected)
- Step 4.6, tool and calories in the answer of POST /api/pizza: run 2, tool Scissors, calories 350 (the test checks that the page shows the same values)
- Step 4.7, the line of the admin list that shows your pizza: `Lab Pizza 20261115-134746 (tool=Scissors, ingredients_number=5) (newest)`
- Step 4.8, run 1, result, duration and pizza name: All specs passed, 00:16 (pizza-scenario 00:12, web-form 00:04), Lab Pizza 20261115-134703 (Scissors, 375)
- Step 4.8, run 2, result, duration and pizza name: All specs passed, 00:16 (pizza-scenario 00:12, web-form 00:03), Lab Pizza 20261115-134746 (Scissors, 350)
- Step 4.9 (optional), browser and result: not done

## Part B
1. The three number boxes of QuickPizza share the id `floating_filled`. In the Console, `$$("#floating_filled").length` returned 3, so an id locator would always pick the first box, which happens to be Max Calories but could change if the boxes were reordered. The tests therefore go through the visible label text, which names exactly one box. I would give each box its own id, for example `id="max-calories"`, `id="min-toppings"` and `id="max-toppings"`, or a `data-testid` attribute. A unique id is short, fast and does not break when the label text is reworded or translated, so the tests become simpler and less fragile.

2. Step 7 is a consistency check: it compares two outputs of the same system with each other (the tool on the recommendation and the tool stored in the admin list) instead of with a value known in advance. The tool is random, so there is no fixed expected value, but both places must agree. In my runs the recommendation said Scissors and the admin line said `(tool=Scissors, ...)`. It would catch a fault where the server saves a different pizza than the one it returns, for example if it generated a new random tool when writing the recommendation to the database, or if the admin list showed a stale pizza.

3. A check could read the ingredients of the recommendation and assert that none of them is meat or fish. The page only lists ingredient names (for example Mozzarella, Spinach, Olive oil), so the test needs an extra source that says which ingredients are vegetarian, such as a fixed list in the test data or the ingredient data from the QuickPizza API. A simpler but weaker check is the JSON answer of `POST /api/pizza`, which Cypress already intercepts and which contains `"vegetarian": true`; the test could assert that field, but that only trusts the server's own claim.

4. Robot Framework waited only where I wrote a wait keyword, such as `Wait Until Element Is Visible css:h1` and `Wait Until The Page Is Ready` before the admin login, with a 10 s timeout set on the library. Cypress waited by itself: every `cy.get` and `should` retried for up to 10 s, so I wrote no waits except the `svelte-announcer` check in `adminLogin`; the downside was that a wrong check took the full 10 s to fail (12 s for the wrong title). Writing QP-01 was quicker in Cypress because there were no waits to place, but the Robot test reads closer to the written test case because of keywords like `Turn On Advanced`. The Robot log.html shows every keyword with its message and embeds the screenshots, while Cypress gives a video (about 1.6 MB for QP-01) that shows the Command Log beside the page. A full QP-01 run took about 9.5 s in Robot and about 12 s per spec in Cypress including the video.

5. For Project 2 I would choose Cypress. First, it records a video of every headless run with one setting (`video: true`), which directly gives the evidence of a full run that Project 2 asks for. Second, its automatic retrying removed the need for explicit waits, and `cy.intercept` let me check both what the page showed and what the server returned (tool and calories), which catches more faults than the page alone. If my group already uses Robot Framework, I would follow the group, because the resource file keeps locators in one place just as well.

6. (Part 3) The locator of the calories box is the variable `${MAX CALORIES}` in the Variables section of `resources/quickpizza.resource`, used by `Turn On Advanced` and `Fill In The Pizza Request`. If QuickPizza changed the box, I would change only that one line. `pizza_scenario.robot` only calls keywords such as `Fill In The Pizza Request 600 Knife ${name}` and never sees a locator, so the test file stays the same and every other test that uses the resource is repaired at the same time.

7. (Part 4) Cypress clears cookies, local storage and aliases before each test. QuickPizza runs on several servers and a cookie keeps one browser on one server, and the admin list only shows pizzas of that server. If steps 6 and 7 were a second test, it would start with no cookie, could land on another server whose list does not contain my pizza, and `cy.contains('li', pizzaName)` would time out. The second test would also lose `pizzaName` and the `@tool` alias from the first test, so it could not check the tool at all.
