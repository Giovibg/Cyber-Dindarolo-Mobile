import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828'
      },
      item: {
        backgroundColor: '#181818',
        marginVertical: 1,
        marginHorizontal: 1,
        padding:20
      },
      
      title: {
        fontSize: 20,
        color:'#FFFFFF'
      },
      title2: {
        fontSize: 13,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#282828',
        color:'white'
      },
      textHigh: {
          fontSize: 28,
          color: '#e71d37',
          backgroundColor:'#181818',
          justifyContent: 'center',
          fontWeight: 'bold'
      },

      touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 5,
      },
      floatingButtonStyle: {
        width: 100,
        height: 100,
        fontSize:65
        //backgroundColor:'black'
      },
      fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
        backgroundColor:'#e71d37'
      },
      
});