import { Button, Stack, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ErrorPage = () => {
    const navigate = useNavigate()
    const { DarkMode } = useSelector(state => state.service);
    const bg = DarkMode ? "#121212" : undefined;

    const handleGoHome = () => {
        navigate(-1) // Navigate back to the previous page
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: DarkMode ? bg : 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: DarkMode ? "#f5f5f5" : "inherit",
                transition: "background .25s,color .25s"
            }}
        >
            <Stack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                sx={{
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 300,
                        marginBottom: 2,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                >
                    Oops! Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: '500px',
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        px: 2,
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                >
                    The page you're looking for doesn't exist or has been moved.
                    Don't worry, let's get you back on track!
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleGoHome}
                    sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        border: 0,
                        borderRadius: '25px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        color: 'white',
                        height: 48,
                        padding: '0 30px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 10px 2px rgba(255, 105, 135, .4)',
                            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                        }
                    }}
                >
                    🏠 Take Me Home
                </Button>
            </Stack>
        </Box>
    )
}

export default ErrorPage
