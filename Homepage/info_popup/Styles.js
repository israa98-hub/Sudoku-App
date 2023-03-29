import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrap: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
        backgroundColor: 'orange',
        shadowColor: 'grey',
        shadowOffset: {width: 8.4, height: 8.4},
        shadowOpacity: 0.74,
        shadowRadius: 30,
        elevation: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 15
    },
    paragraphs: {
        marginTop: 15
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderColor: '#ffffff',
        marginTop: 20,
        borderWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 25,
        paddingRight: 25,
        marginHorizontal: 5,
        flex: 1
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '-2400%',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { styles };