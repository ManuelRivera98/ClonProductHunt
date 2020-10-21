import App from 'next/app'
import firebase, { FirebaseContext } from '../firebase/index';
import useAuth from '../hooks/useAuth';

function MyApp({ Component, pageProps }) {
  const user = useAuth();
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}

    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp