import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282828',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    textHigh: {
        color: 'white',
        fontSize: 30,
        padding: 30,
        margin:20,
        fontWeight: 'bold'
    },
    label: {
        
        fontSize: 20,
        color: 'white',
        padding: 10
    },
    input: {
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        padding: 10,
        margin: 20,
        width:300
    },
    viewText: {
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        margin:60
    },
    caption: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    captionText: {
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 15,
        padding: 2
    },
    button:{
        backgroundColor: '#b91d37',
        margin:40,
        width:200,
        borderRadius:30,
        alignItems: 'center'
    },
    error: {
        color:'red'
    },
    created:{
        color:'lightgreen'
    },
    numeric_form:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width: 60, 
        margin:30
    }
});
