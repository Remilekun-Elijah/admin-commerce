const path = require('path'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GithubStrategy = require('passport-github2').Strategy,
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    config = require(path.resolve("utils/config"));
const User = require(path.resolve('modules/users/model'));


passport.serializeUser(function(user, done) {
    // console.log('serialized User');
    // save user email to session when authentication is successful
    done(null, user.id);

});

passport.deserializeUser(function(email, done) {
    console.log('deserialized User Email: ', email);
    new User().get({ email, password: "123456789" }, function(err, user) {
        // console.log('deserialized User', user);
        // retrieve user from session and database when authentication is successful
        done(null, email);
    });
});

function createOrLoginUser(profile, done) {
    //  create new user ready to be saved
    const user = new User({
        name: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        },
        login_id: profile.emails[0].value,
        profile_picture: profile.photos[0].value
    });
    // find user by email
    User.findOne({ email: profile.emails[0].value }, (err, userExist) => {
        // return error if any
        if (err) {
            console.log(err);
            return done(err);
        }
        //  if user exist
        else if (userExist) {
            console.log('user found', userExist);
            // respond with user data
            return done(null, userExist);
        } else {
            // if user doesn't exist, save user
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done(null, user);
            })
        }
    })
}

class MFA {

    google(scopeOrRedirectUri) {
        const { googleClientId, googleSecret, googleRedirectUri } = config;
        passport.use(new GoogleStrategy({
                clientID: googleClientId,
                clientSecret: googleSecret,
                callbackURL: googleRedirectUri
            },
            (accessToken, refreshToken, profile, done) => {

                done(null, profile);
                // console.log('profile', profile);

                // createOrLoginUser(profile, done)

            }))
        return passport.authenticate('google', scopeOrRedirectUri);
    }

    facebook(scopeOrRedirectUri) {
        const { facebookClientId, facebookSecret, facebookRedirectUri } = config;
        passport.use(new FacebookStrategy({
                clientID: facebookClientId,
                clientSecret: facebookSecret,
                callbackURL: facebookRedirectUri,
                profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
                enableProof: true
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
                // console.log('profile', profile);
            }))
        return passport.authenticate('facebook', scopeOrRedirectUri);
    }

    github(scopeOrRedirectUri) {
        const { githubClientId, githubSecret, githubRedirectUri } = config;
        passport.use(new GithubStrategy({
                clientID: githubClientId,
                clientSecret: githubSecret,
                callbackURL: githubRedirectUri
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
                // console.log('profile', profile); 
            }))
        return passport.authenticate('github', scopeOrRedirectUri);
    }

    linkedin(scopeOrRedirectUri) {
        const { linkedinClientId, linkedinSecret, linkedinRedirectUri } = config;
        passport.use(new LinkedInStrategy({
                clientID: linkedinClientId,
                clientSecret: linkedinSecret,
                callbackURL: linkedinRedirectUri,
                scope: ['r_emailaddress', 'r_liteprofile'],
                state: true
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
                // console.log('profile', profile); 
            }))
        return passport.authenticate('linkedin', scopeOrRedirectUri);
    }
}

module.exports = MFA;