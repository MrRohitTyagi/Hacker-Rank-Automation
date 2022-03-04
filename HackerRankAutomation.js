const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require("puppeteer");
const codeFile = require('./codes')

console.log("Hacker Rank Automation -by Rohit Tyagi");

let email = "iuylkhp@midiharmonica.com";
let password = "11101999";

let page;

let browserWillLaunchPromise = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
}); // launch returns a promise to open Browser

browserWillLaunchPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
    // new Page method will open a new Tab in the Browser
  })
  .then(function (newTab) {
    page = newTab;
    let websiteWillbeOpenedPromise = newTab.goto(loginLink);
    return websiteWillbeOpenedPromise;
  })
  .then(function () {
    let emailWillbeEnteredPromise = page.type("input[id='input-1']", email, {
      delay: 100,
    });
    return emailWillbeEnteredPromise;
  })
  .then(function () {
    let passwordWillbeEnteredPromise = page.type(
      "input[id=input-2]",
      password,
      { delay: 100 }
    );
    return passwordWillbeEnteredPromise;
  })
  .then(function () {
    let loginButtonClickPromise = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 50 }
    );
    return loginButtonClickPromise;
  }).then(function(){
    
    let algoSectionSElectPromise = waitandclick('a[data-attr1="algorithms"]', page)
     return algoSectionSElectPromise
  }).then(function(){
    let warmUpSectionClicpPromise = waitandclick('input[value="warmup"]',page)
    return warmUpSectionClicpPromise

  }).then(function(){

    let allQuestionsArrPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allQuestionsArrPromise;
  })
  .then(function (TotalQuestions) {
    console.log("Number of Questions -> " + TotalQuestions.length);
    
    let questionwillbesolved = questionSolver(page,TotalQuestions[0],codeFile.answers[0])
    return questionwillbesolved
  })


  function waitandclick(selector , cPage){
      return new Promise( function(resolve,reject){
        let waitforMOdeulePromise = cPage.waitForSelector(selector)
        waitforMOdeulePromise.then(function(){
          let clickModel = cPage.click(selector,{delay : 50})
          return clickModel
        }).then(function(){resolve()}).catch(function(){reject()})
      })
  }


  function questionSolver (page,question,answer){
    return new Promise(function(resolve , reject){
      let QuestionCillbeClickedPRomise = question.click()
      QuestionCillbeClickedPRomise.then(function () {
        let waitForEditor = waitandclick(".monaco-editor.no-user-select.vs",page );

        return waitForEditor;
      }).then(function(){
        let custominputClicked = waitandclick('input[type="checkbox"]',page)
        return custominputClicked
      }).then(function(){
        return waitandclick('.input.text-area.custominput.auto-width',page)
      }).then(function(){
         return page.type('.input.text-area.custominput.auto-width',answer,{delay : 20})
         
      }).then(function(){
        let controlpress = page.keyboard.down("Control")
        return controlpress
      }).then(function(){
        let Apressed = page.keyboard.press("A")
        return Apressed
      }).then(function () {
        let XisPressedPromise = page.keyboard.press("X", { delay: 100 });
        return XisPressedPromise;
      }).then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;

      }).then(function () {
        let waitForEditor = waitandclick(".monaco-editor.no-user-select.vs",page );

        return waitForEditor;
      }).then(function(){
        let controlpress = page.keyboard.down("Control")
        return controlpress

      }).then(function(){
        let Apressed = page.keyboard.press("A")
        return Apressed
      }).then(function () {
        let XisPressedPromise = page.keyboard.press("V", { delay: 100 });
        return XisPressedPromise;
      }) .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      }).then(function(){
        let submitButtonClick = page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',{delay:50})
        return submitButtonClick
      }).then(function(){
        resolve()
      }).catch(function(err){
         console.log(err)
      });
    })
  }
 

