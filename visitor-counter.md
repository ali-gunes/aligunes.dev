# Visitor Counter Documentation

The visitor counter on aligunes.dev uses a Vercel serverless function to track and display the number of visitors to the site.

## How It Works

1. **Serverless Function**:
   - A Vercel serverless function (`/api/visitor-count.js`) maintains the visitor count
   - The function responds to both GET and POST requests
   - POST requests increment the counter (new visitors)
   - GET requests simply return the current count (returning visitors)

2. **First Visit Detection**:
   - When a new visitor comes to your site, the script checks if they've visited before during this browser session
   - This is done using `sessionStorage`, which persists only for the current browser tab session
   - New visitors send a POST request to increment the counter
   - Returning visitors send a GET request to just retrieve the current count

3. **Benefits of This Approach**:
   - All visitors see the same count
   - No external API dependencies
   - Integrated with your Vercel hosting
   - No additional costs

## Important Notes

1. **In-Memory Storage Limitation**:
   - The current implementation uses in-memory storage in the serverless function
   - This means the count will reset whenever the function is redeployed or goes cold
   - For a persistent count, you would need to add a database like FaunaDB or MongoDB

2. **Future Enhancements**:
   - Add a database for persistent storage
   - Implement IP-based unique visitor tracking
   - Add analytics for more detailed visitor information

## How to Implement Persistent Storage

To make the visitor counter persist across deployments, you can modify the serverless function to use a database:

1. **FaunaDB** (recommended for Vercel):
   - Sign up for a free FaunaDB account
   - Create a database and collection for the visitor count
   - Update the serverless function to use the FaunaDB JavaScript driver
   - Store and retrieve the count from FaunaDB instead of in-memory

2. **MongoDB Atlas**:
   - Sign up for a free MongoDB Atlas account
   - Create a cluster and collection
   - Update the serverless function to use the MongoDB driver
   - Store and retrieve the count from MongoDB

## Technical Implementation

The visitor counter uses:

- **Vercel Serverless Functions**: To track and serve visitor counts
- **sessionStorage**: To remember visitors during their current session
- **Fetch API**: To make asynchronous requests to the counting service

This implementation ensures all visitors see the same count while providing a smooth user experience.

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