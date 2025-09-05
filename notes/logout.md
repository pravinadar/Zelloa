## Logout Flow:

### 1. Frontend Trigger
When you click logout in `MainMenu.jsx`:
```jsx
const handleLogout = async () => {
    handleClose();
    await logoutUser().unwrap(); // This calls the RTK Query mutation
}
```

### 2. RTK Query Mutation
The `logoutUser()` function uses `useLogoutMutation` which is defined as:
```js
logout: builder.mutation({
    query: () => ({
        url: "user/logout",    // ✅ This matches your understanding
        method: "POST"         // ✅ This matches your understanding
    }),
    invalidatesTags: ["Me"]
})
```

### 3. Backend Route
The request goes to `routes.js`:
```js
router.post("/user/logout", authMiddleware, logoutUser)
```

### 4. Controller Function
Finally calls `logoutUser` in `user.controller.js`:
```js
export const logoutUser = async (req, res) => {
    try {
        // Clear the cookie with EXACT same attributes as when it was set
        const cookieConfig = getCookieConfig();
        res.clearCookie("accessToken", cookieConfig);

        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        // Error handling...
    }
}
```

### 5. Additional Client-side Cleanup
The RTK Query mutation also has an `onQueryStarted` hook that:
- Clears user info from Redux state
- Resets API cache
- Handles navigation

## RTK Query Syntax Explanation
RTK Query is a powerful data fetching and caching tool built into Redux Toolkit. Here's a breakdown of the syntax used:

### `builder.mutation`
- This defines a mutation endpoint, which is used for creating, updating, or deleting data.

### `query`
- This function returns an object that specifies the request details:
  - `url`: The endpoint to which the request is sent.
  - `method`: The HTTP method used for the request (e.g., POST, GET).

### `invalidatesTags`
- This is used to specify which cache tags should be invalidated when this mutation is executed, allowing for automatic cache updates.

In summary, RTK Query simplifies data fetching and state management by providing a structured way to define API interactions, handle caching, and manage side effects in your application.