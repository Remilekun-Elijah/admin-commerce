<!-- CHANGES -->
##     What's new ?
1. The email template files in **mail/templates**.
* The **/files/partials folder:** They are reusable components that'd be used across all the templates.
* To use them: Just import the index.js file in the **services/mail/templates** you can even skip the */index.js* filename and it'd still work fine because its literally the index file in the folder.
* The index.js file contains one function called **use**, its what you're always going to be using
* It accepts 2 parameter; first is the template fileName plus it extension **.ejs**, next is an object containing the dynamic data that would be parsed in the template.

2. **dynamic-template:** helps to make email dynamic, and it accepts a couple of informations
> Here is how to use it below 👇
```javascript
	async resetPasswordEmail(email, user){
        // adds extra security
        const secure = email.concat(":"+config.secret) 
        let encryptedLink = helper.encrypt(secure);
        /**
         * In the data which is the params of the .use() function of the template
         * only **text** property is required
         * **buttonText** won't display if **buttonLink** is not present 
         **/
        const data = {
               userName: user,
               buttonText: "Reset Password",
               buttonLink: `${config.host}resetPasswordPage/?secure=${encryptedLink}`,
               header: true, // it's true by default
               headerText: "Welcome to Learnguage", // won't display if *header* is set to false
               text: "You requested for a password reset link.", // only this field is mandatory
               additionalText: "Kindly use the button below to reset your password.",
            };
            
        mail.sendMail({
            from: config.sendgrid_from,
            to: email,
            subject: "Reset your password",
            body: await template.use("dynamic-template.ejs", data)
        });
    }
```
