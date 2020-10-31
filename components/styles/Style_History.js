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
    padding:20,
  },
  
  title: {
    fontSize: 20,
    color:'#FFFFFF'
  },
  title2: {
    fontSize: 13,
    marginLeft:'40%',
    marginRight:10,
    color:'white'
  },
  sub_pos: {
    fontSize: 13,
    marginLeft:'40%',
    marginRight:10,
    color:'lightgreen'
  },
  sub_neg: {
    fontSize: 13,
    marginLeft:'40%',
    marginRight:10,
    color:'#e71d37'
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
});