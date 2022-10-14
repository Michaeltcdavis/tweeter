# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

It has a mobile version that has the user's profile header and list of tweets rendered from the server in a single column, and, using media queries, can render a desktop version which has the user's profile and tweet list in separate columns.

I added some nifty design features to the site, including an animated icon which bounces up and down beneath the "write a new tweet" button. When the button is clicked, the write-new-tweet form appears in a slide down animation and the text area comes in focus. If the user scrolls down the list of tweets, a small button appears in the bottom right corner to allow the user to immediately scroll to the top, and the write-new-tweet form appears.

The style sheets use SASS for readability and maintainability.

## The final Product

### Mobile Layout
!["Mobile1"](/public/images/mobile.png?raw=true "Mobile1")

### Mobile Layout with Write-a-Tweet Form Open
!["Mobile2"](/public/images/mobile-new-tweet.png?raw=true "Mobile2")

### Mobile Layout after Scrolling
!["Mobile3"](/public/images/mobile-scrolled.png?raw=true "Mobile3")

### Desktop Layout
!["Desktop1"](/public/images/desktop-new-tweet.png?raw=true "Desktop1")

### Invalid Tweet Message
!["Desktop2"](/public/images/tweet-error.png?raw=true "Desktop2")

### Desktop Layout after Scrolling
!["Desktop3"](/public/images/desktop-scrolled.png?raw=true "Desktop3")

## Start-up Instructions

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5
- timeago.js
