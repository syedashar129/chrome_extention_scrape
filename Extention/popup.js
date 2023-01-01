let emailScraper = document.getElementById("scrapeEmail")
let emailList = document.getElementById("emailList")

// add listener for chrome message (to display the emails on extention)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let emails = request.emails;

    if (emails == null || emails.length == 0){
        let li = document.createElement("li");
        li.innerText = "No emails found";
        emailList.appendChild(li);
    }
    else{
        emails.forEach((email) => {
            let li = document.createElement("li");
            li.innerText = email;
            emailList.appendChild(li);
        })

    }

})

// button listener on click
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

// function that finds the emails
function scrapingEmailsOnPage() {

    // create regex to recognize email
    const emailsRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    // match words that appear as the emails regex
    let emails = document.body.innerHTML.match(emailsRegex);

    //alert(emails);


    chrome.runtime.sendMessage({emails});

}