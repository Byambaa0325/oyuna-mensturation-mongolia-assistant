export const styles = {
    mainBox: {
        backgroundColor: 'background.default',
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    chatWindowContainer: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: 2,
    },
    title: {
        marginTop: 2,
        fontWeight: 'bold',
        color: 'primary.main', // This will use the primary color from your theme
    },
};
