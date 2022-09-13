const listenForClicks = () => {
    const fillElement = document.getElementById("fill")
    const resetElement = document.getElementById("reset")

    fillElement.addEventListener("click", (e) => {
        const handleRes = (message) => {
            console.log(`Response Message is : ${message}`)
        }
        const handleErr = (error) => {
            console.error(`Error Message is : ${error}`)
        }

        // sending a signal
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    todo : "fill"
                })
            })
            .catch(handleErr)
    })

    resetElement.addEventListener("click", (e) => {
        console.log("Resetting the form now")
    })

}
const reportExecuteScriptError = (err) => {
    console.error(err)
}

browser.tabs
  .executeScript({ file: "/content_scripts/autoFill.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
