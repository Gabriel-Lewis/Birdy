import { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET_KEY } from './const';
// var OAuth = require('../lib/oauth.js').OAuth;
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyByLjukv0gKP6VqG9xMa_mnkBQDjICwNhA",
  authDomain: "birdy-be190.firebaseapp.com",
  databaseURL: "https://birdy-be190.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "363079142573"
};
firebase.initializeApp(config);

/**
 * Function called when clicking the Login/Logout button.
 */
// [START buttoncallback]
function toggleSignIn() {
  debugger
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.TwitterAuthProvider();
    // [END createprovider]
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      // [START_EXCLUDE]
      document.getElementById('quickstart-oauthtoken').textContent = token;
      document.getElementById('quickstart-oauthsecret').textContent = secret;
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  // [START_EXCLUDE]
  document.getElementById('quickstart-sign-in').disabled = true;
  // [END_EXCLUDE]
}
// [END buttoncallback]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listener:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in with Twitter';
      document.getElementById('quickstart-account-details').textContent = 'null';
      document.getElementById('quickstart-oauthtoken').textContent = 'null';
      document.getElementById('quickstart-oauthsecret').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function() {
  initApp();
};



//
// var clientID = CONSUMER_KEY;
// var clientSecret = CONSUMER_SECRET;
// // var callbackURL = chrome.extension.getURL('main.html');
// var twitterAccessToken = ACCESS_TOKEN_KEY;
// var twitterAccessTokenSecret = ACCESS_TOKEN_SECRET_KEY;
//
// let oa = new OAuth(
//     'https://api.twitter.com/oauth/request_token',
//     'https://api.twitter.com/oauth/access_token',
//     clientID,
//     clientSecret,
//     '1.0',
//     null,
//     'HMAC-SHA1'
// );
//
// console.log(oa)
//
//
// // oa.post(
// //   "http://api.twitter.com/1/statuses/update.json",
// //   twitterAccessToken, twitterAccessTokenSecret,
// //   {"status":"TESTING TWITTER API PLS IGNORE"},
// //   function(error, data) {
// //     debugger
// //     if(error) console.log(require('sys').inspect(error))
// //     else console.log(data)
// //   }
// // );
