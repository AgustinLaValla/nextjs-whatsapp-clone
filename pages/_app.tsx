import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from '../hooks/useAuthState'
import Login from './login';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading, error] = useAuthState();

  if(!user) return <Login />;

  return <Component {...pageProps} />
}
export default MyApp
