export default theme => ({
    divStyle: () => ({
        height: '55px',
        backgroundColor: 'skyBlue',
        bottom: '0px',
        position: 'fixed', // Changed from absolute to fixed
        width: '100%',
        textAlign: 'center',
        zIndex: 1000 // Removed 'px'
    })
})