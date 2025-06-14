# Simple Visitor Counter Documentation

The visitor counter on aligunes.dev uses a simple localStorage-based implementation that doesn't rely on any external APIs.

## How It Works

1. **First Visit Detection**:
   - When a new visitor comes to your site, the script checks if they've visited before during this browser session
   - This is done using `sessionStorage`, which persists only for the current browser tab session

2. **Counting Process**:
   - The counter retrieves the current count from localStorage
   - For new visits (based on sessionStorage), it increments the count by 1
   - The updated count is saved back to localStorage for persistence

3. **Benefits of This Approach**:
   - No dependency on external APIs
   - Works completely offline
   - Fast and reliable
   - No network requests needed

## How the Counter Increases

The visitor counter will increase by 1 when:

1. A new visitor comes to your site for the first time
2. A returning visitor opens your site in a new browser or device
3. A returning visitor clears their browser data/localStorage
4. A returning visitor visits after their session expires (typically when they close their browser)

The counter will NOT increase when:

1. A visitor refreshes the page during the same session
2. A visitor navigates between different pages on your site during the same session

## Important Notes

- This counter is device/browser specific, meaning it counts unique browser sessions rather than truly unique visitors
- The count is stored in the visitor's browser, so each visitor will see a different count based on their own browsing history
- For a more accurate global counter visible to all visitors, you would need a server-side solution

## Technical Implementation

The simple visitor counter uses:

- **localStorage**: To store the total count persistently across browser sessions
- **sessionStorage**: To remember visitors during their current session and prevent duplicate counting

This implementation ensures a smooth user experience with no external dependencies. 