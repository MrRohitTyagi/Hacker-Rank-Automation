const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require("puppeteer");
const codeFile = require('./codes')

console.log("Hacker Rank Automation -by Rohit Tyagi");

let email = "iuylkhp@midiharmonica.com";
let password = "11101999";



(async function () {
  try {
    let browserWillLaunch = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });
    let newTab = await browserWillLaunch.newPage();

    await newTab.goto(loginLink);

    await newTab.type("input[id='input-1']", email, {
      delay: 10
    });

    await newTab.type("input[id=input-2]", password, {
      delay: 10
    });

    newTab.click('button[data-analytics="LoginPassword"]', {
      delay: 50
    });
    await waitandclick('a[data-attr1="algorithms"]', newTab)

    await waitandclick('input[value="warmup"]', newTab)
    let allQuestionsArr = await newTab.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    await questionSolver(newTab, allQuestionsArr[0], codeFile.answers[0])

  } catch (error) {
    console.log(error);
  }
})();


async function waitandclick(selector, cPage) {
  try {
    await cPage.waitForSelector(selector)
    await cPage.click(selector, {delay: 50
    })

  } catch (error) {
    console.log(error);
  }

}

async function questionSolver(page, question, answer) {
  try {
    await question.click()
    await waitandclick(".monaco-editor.no-user-select.vs", page);
    await waitandclick('input[type="checkbox"]', page)
    await waitandclick('.input.text-area.custominput.auto-width', page)
    await page.type('.input.text-area.custominput.auto-width', answer, {
      delay: 20
    })
    await page.keyboard.down("Control")
    await page.keyboard.press("A")
    await page.keyboard.press("X", {
      delay: 100
    });
    await page.keyboard.up("Control");
    await waitandclick(".monaco-editor.no-user-select.vs", page);
    await page.keyboard.down("Control")
    await page.keyboard.press("A")
    await page.keyboard.press("V", {
      delay: 100
    });
    await page.keyboard.up("Control");
    await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', {
      delay: 50
    })


  } catch (error) {
    console.log(error);
  }
}