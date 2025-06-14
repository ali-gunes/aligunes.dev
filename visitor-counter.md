# Visitor Counter Documentation

The visitor counter on aligunes.dev uses [CountAPI](https://countapi.xyz/) with an improved implementation that includes timeout handling and robust fallback mechanisms.

## How It Works

1. **First Visit Detection**:
   - When a new visitor comes to your site, the script checks if they've visited before during this browser session
   - This is done using `sessionStorage`, which persists only for the current browser tab session

2. **Counting Process**:
   - For new visitors: The script calls `https://api.countapi.xyz/hit/aligunes.dev/visits` which increments the counter by 1
   - For returning visitors: The script calls `https://api.countapi.xyz/get/aligunes.dev/visits` which just retrieves the current count

3. **Enhanced Reliability**:
   - The script uses a timeout mechanism to prevent hanging if the API is slow
   - If the CountAPI service is unavailable or times out, the counter falls back to using localStorage
   - This ensures visitors always see a number instead of an error or infinite loading

## Testing vs. Production

- When testing locally (localhost), the counter uses a separate namespace (`aligunes.dev.test`)
- This prevents your testing from affecting the real visitor count on your live site
- When deployed to aligunes.dev, it will use the actual counter namespace

## How the Counter Increases

The visitor counter will increase by 1 when:

1. A new visitor comes to your site for the first time
2. A returning visitor opens your site in a new browser or device
3. A returning visitor clears their browser data/cookies
4. A returning visitor visits after their session expires (typically when they close their browser)

The counter will NOT increase when:

1. A visitor refreshes the page during the same session
2. A visitor navigates between different pages on your site during the same session

## Viewing Your Real Count

You can check your current visitor count directly through the API:
- Visit: `https://api.countapi.xyz/get/aligunes.dev/visits` in your browser

## Technical Implementation

The improved visitor counter uses:

- **CountAPI**: For centralized counting across all visitors
- **Promise with timeout**: To handle API failures gracefully and prevent hanging
- **sessionStorage**: To remember visitors during their current session
- **localStorage**: As a fallback if the API is unavailable
- **Fetch API**: To make asynchronous requests to the counting service

This implementation ensures accurate counting while providing a smooth user experience even if the external API has issues or is slow to respond. 