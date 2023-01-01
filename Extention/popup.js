let emailScraper = document.getElementById("scrapeEmail")

emailScraper.addEventListener("click", async () => {

    // get the active tab
    let [tab] = await chrome.tabs.query(
        {
            active : true,
            currentWindow : true
        }
    );

    // execute the script
    chrome.scripting.executeScript(
{
            target: {tabId: tab.id},
            func: scrapingEmailsOnPage
        }
    );

})

// function that scrapes
function scrapingEmailsOnPage() {

    // create regex to recognize email
    const emailsRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    // match words that appear as the emailsregex
    let emails = document.body.innerHTML.match(emailsRegex);

    // alert
    alert(emails)


}