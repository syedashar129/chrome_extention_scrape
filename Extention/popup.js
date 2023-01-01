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
    alert('You clicked on the button')
}