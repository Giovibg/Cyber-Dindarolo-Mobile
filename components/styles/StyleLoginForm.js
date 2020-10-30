import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#282828',
        padding: 10
    },
    textLogin: {
        color: 'white',
        fontSize: 30,
        padding: 30,
        margin:20
    },
    label: {
        fontSize: 20,
        color: 'white',
        padding: 10
    },
    input: {
        fontSize: 15,
        backgroundColor: '#181818',
        padding: 10,
        margin: 20,
        width:300,
        color:'white'
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        margin:50
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
        alignItems: 'center',
        justifyContent:'center',
        height:30,
    },
    btn_text:{
        color:'white'
    },
    error: {
        color:'red'
    }
});
