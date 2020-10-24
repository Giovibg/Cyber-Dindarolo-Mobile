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
      marginTop: 40,
      textAlign: "center",
      fontSize:25,
      color:'white'
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
      nameProd: {
        color: 'gray',
        fontSize: 35,
        padding: 60,
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
    
    sub_pos: {
        fontSize: 32,
        marginTop:40,
        color:'lightgreen'
      },
      sub_neg: {
        fontSize: 32,
        marginTop:40,
        color:'#e73434'
      },
  });