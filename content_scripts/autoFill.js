// get an email from emailfake.com
// to call fetch : some API, setup the permission for that url or use : <all_urls>
var emailBaseUrl = "https://emailfake.com"

var getEmail = async () => {

    const HTMLParser = new DOMParser()
    const response = await fetch(emailBaseUrl)
    const doc = HTMLParser.parseFromString(await response.text(), "text/html")

    const userName = doc.getElementById("userName").getAttribute("value")
    const domainName = doc.getElementById("domainName2").getAttribute("value")

    return `${userName}@${domainName}`

}

// open up the fake email page in another tab : used to receive emails there
var openEmailPage = () => {
    // TODO: don't redirect to the emailBaseUrl, instead stay on the same page
    // FIXME: redirect back
    window.open(emailBaseUrl, 'name', 'noopener=no')
}

// filling Helper function
var fillField = (field, value) => {
    if (!field)
        return

    field.value = value
}

var resetForm = (...fields) => {
    for (let field of fields){
        // just fill with nothing
        fillField(field, "")
    }
}

// find the form tag in the website and gets all the required fields
var fillForm = (data) => {
    const name = document.querySelector('input[type="text"]')
    const email = document.querySelector('input[type="email"]')
    const password = document.querySelector('input[type="password"]')
    const age = document.querySelector('input[type="number"]')


    // clearing the fields first
    resetForm(name, email, password, age)

    // filling the fields 
    fillField(name, data.name)
    fillField(email, data.email)
    fillField(password, data.password)
    fillField(age, data.age)
}


(async () => {
    // get the email from emailfake.com
    const data = {
        name : "testy testable",
        age  : 32,
        password : "StrongAssPass123!@#",
        email : await getEmail()
    }

    // if (window.hasRun) {
    //     return
    // }
    // window.hasRun = true;

    browser.runtime.onMessage.addListener((message) => {
        if (message.todo === "fill") {
            // open the tab
            openEmailPage()
            fillForm(data)
        } else if (message.todo === "reset") {
            resetForm()
        }else{
            console.log(message)
        }
    })
})()
