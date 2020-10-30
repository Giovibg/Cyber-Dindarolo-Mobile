import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.80,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: '5%',
      },
      modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.9)'
      },
      textLogin: {
        color: 'white',
        fontSize: 30,
        padding: 30,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 20,
        color: 'white',
    },
    input: {
        fontSize: 15,
        padding: 10,
        margin: 20,
        width:300,
        color:'white',
        backgroundColor: '#181818'
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        margin:15
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
    error: {
        color:'red'
    },
    created:{
        color:'lightgreen'
    },
    btn_text:{
      color:'white'
  },
  });