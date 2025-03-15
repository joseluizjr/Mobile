import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#4A4A4A',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#66CDAA',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#66CDAA',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
