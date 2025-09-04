# Logout Fix Debug Guide

## What was fixed:

### 1. Cookie Attribute Consistency
- **Problem**: Cookie attributes when setting vs clearing were different
- **Fix**: Created `getCookieConfig()` function to ensure identical attributes across signup, login, and logout

### 2. Environment-specific Configuration
- **Problem**: Using production cookie settings (`secure: true`, `sameSite: "none"`) in development
- **Fix**: Dynamic cookie configuration based on NODE_ENV:
  - Development: `secure: false`, `sameSite: "lax"`, `partitioned: false`
  - Production: `secure: true`, `sameSite: "none"`, `partitioned: true`

### 3. Path Attribute Missing
- **Problem**: No explicit path in cookie operations
- **Fix**: Added `path: "/"` to all cookie operations

### 4. Client-side State Management
- **Problem**: RTK Query cache and Redux state not properly cleared
- **Fix**: Enhanced logout mutation with `onQueryStarted` hook to:
  - Clear user info from Redux state
  - Reset entire API cache
  - Force navigation to register page

### 5. Navigation After Logout
- **Problem**: No programmatic navigation after successful logout
- **Fix**: Added `useNavigate` hook with `replace: true` to prevent back navigation

### 6. App.jsx Authentication Check
- **Problem**: Only checked `isError` and `data`, missed `myInfo` state
- **Fix**: Added checks for:
  - Loading state
  - Explicit `myInfo === null` check
  - Better error handling

## Code Changes:

### Server-side: user.controller.js

**BEFORE:**
```javascript
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",     // ❌ MISMATCH: "lax" vs "none"
            secure: false,       // ❌ MISMATCH: false vs true  
            partitioned: true
        });
    
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Login function
res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",     // Different from logout
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,         // Different from logout
});

// Signup function  
res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    partitioned: true     // Missing in login
});
```

**AFTER:**
```javascript
// Cookie configuration for consistent settings across login/signup/logout
const getCookieConfig = () => {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    return {
        httpOnly: true,
        sameSite: isDevelopment ? "lax" : "none",
        secure: !isDevelopment, // false in development, true in production
        path: "/",
        partitioned: !isDevelopment // only in production with secure
    };
};

export const logoutUser = async (req, res) => {
    try {
        // Clear the cookie with EXACT same attributes as when it was set
        const cookieConfig = getCookieConfig();
        res.clearCookie("accessToken", cookieConfig);
    
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Login and Signup now use:
const cookieConfig = getCookieConfig();
res.cookie("accessToken", accessToken, {
    ...cookieConfig,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
});
```

### Client-side: serviceAPI.js

**BEFORE:**
```javascript
logout: builder.mutation({
    query: () => ({
        url: "user/logout",
        method: "POST",
    }),
    invalidatesTags: ["Me"],
})
```

**AFTER:**
```javascript
logout: builder.mutation({
    query: () => ({
        url: "user/logout",
        method: "POST",
    }),
    invalidatesTags: ["Me"],
    async onQueryStarted(params, {dispatch, queryFulfilled}){
        try {
            await queryFulfilled;
            // Clear user info from Redux state
            dispatch(addUserInfo(null));
            // Reset the entire API state to clear all cached data
            dispatch(serviceApi.util.resetApiState());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
})
```

### Client-side: MainMenu.jsx

**BEFORE:**
```javascript
import { Link } from 'react-router-dom';

const MainMenu = () => {
    const [logoutUser, logoutUserData] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        handleClose();
        await logoutUser();
        dispatch(serviceApi.util.resetApiState(['Me']));
    }

    useEffect(()=>{
        if(logoutUserData.isSuccess){
            dispatch(addUserInfo(null))
            console.log("User logged out successfully");
        }
    },[logoutUserData.isSuccess])
```

**AFTER:**
```javascript
import { Link, useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const [logoutUser, logoutUserData] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        handleClose();
        try {
            await logoutUser().unwrap();
            // The onQueryStarted in serviceAPI will handle state clearing
            console.log("User logged out successfully");
            // Force navigation to register page
            navigate('/register', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    useEffect(()=>{
        if(logoutUserData.isSuccess){
            console.log("Logout successful, redirecting...");
            // Additional check to ensure navigation happens
            navigate('/register', { replace: true });
        }
    },[logoutUserData.isSuccess, navigate])
```

### Client-side: App.jsx

**BEFORE:**
```javascript
function App() {
  const { DarkMode } = useSelector(state=>state.service);
  const bg = DarkMode ? "#121212" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";
  const { data, isError } = useMyInfoQuery();

  if (isError || !data) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
```

**AFTER:**
```javascript
function App() {
  const { DarkMode, myInfo } = useSelector(state=>state.service);
  const bg = DarkMode ? "#121212" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";
  const { data, isError, isLoading } = useMyInfoQuery();

  // If we're loading, show a loading state
  if (isLoading) {
    return (
      <Box 
        minHeight={'100vh'} 
        sx={{ 
          bgcolor: bg, 
          color: textPrimary, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        Loading...
      </Box>
    );
  }

  // If there's an error, no data, or myInfo is explicitly null, show register page
  if (isError || !data || myInfo === null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
```

## Test Steps:

1. **Login/Signup** - Verify cookies are set correctly
2. **Check Cookie in Browser DevTools** - Application → Cookies
3. **Click Logout** - Should see console message and redirect
4. **Try to access protected route** - Should redirect to register
5. **Check Network Tab** - Logout request should be successful (200)
6. **Check Cookie after logout** - Should be removed from browser

## Common Issues:

- **Development vs Production**: Make sure NODE_ENV is set correctly
- **HTTPS Requirements**: `sameSite: "none"` requires `secure: true` which needs HTTPS
- **Browser Cache**: Clear browser cache if cookies persist
- **Network Errors**: Check if logout API call is successful

## Verification:
Run the app and test the complete auth flow. The logout should now work properly and redirect to the register page.
