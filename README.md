# FFiller

Fill register/signup pages with some fake data : 
    - Email (actually working : provided by `emailfake.com`)
    - Strong password which passes all validations.
    - Fake name
    - more

# How does it work ?

The extension looks for `input` tags in the page with some attributes like password, name, username, email, etc, then fills it with some fake data.

# TODO

The extension doesn't work for all signup forms.

- [ ] Find a way to accurately detect required input tags
- [ ] Don't open the email-url page multiple times
- [ ] Error handling
