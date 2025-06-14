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

# Visitor Counter Options

The current visitor counter on aligunes.dev displays a placeholder value. To implement a true visitor counter that shows the same count to all visitors, you'll need a server-side solution.

## Current Implementation

The current implementation simply displays a placeholder value ("1,337"). This is not a real count but demonstrates where the visitor count would appear.

## Options for a Real Visitor Counter

To implement a true visitor counter that all visitors see the same number, you have several options:

### 1. Firebase Realtime Database

**Pros:**
- Easy to set up
- Free tier available
- Real-time updates
- No server required

**Implementation Steps:**
1. Create a Firebase project
2. Set up Realtime Database
3. Add Firebase SDK to your site
4. Increment counter on new visits
5. Display the global count to all users

### 2. Server-side API

**Pros:**
- Complete control
- Can track more visitor data
- More secure

**Implementation Steps:**
1. Create a simple API endpoint (Node.js, Python, etc.)
2. Store count in a database
3. Call API from your site to increment/fetch count

### 3. Netlify/Vercel Functions

**Pros:**
- Integrates with your current hosting
- Serverless approach
- Free tier available

**Implementation Steps:**
1. Create a serverless function
2. Use a database like FaunaDB
3. Call function to increment/fetch count

### 4. Third-party Services

**Pros:**
- No coding required
- Quick to implement

**Options:**
- Google Analytics (free)
- Simple Analytics ($9/mo)
- Plausible ($9/mo)
- Fathom ($14/mo)

## Recommended Approach

For a simple portfolio site, the Firebase approach offers the best balance of ease of implementation, cost (free), and functionality. It requires no backend server while providing a real-time, global visitor count.

If you'd like to implement this solution, the following steps would be required:

1. Create a Firebase project
2. Set up Firestore or Realtime Database
3. Add Firebase SDK to your site
4. Update the visitor counter code to use Firebase

This would give all visitors the same, accurate count of total site visits. 