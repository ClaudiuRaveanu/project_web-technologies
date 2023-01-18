import Navigation from './Screens/Navigation'
import { ProvideAuth } from './Screens/AuthContext'
import { CookiesProvider } from 'react-cookie'

function App() {
    return (
        <CookiesProvider>
            <ProvideAuth>
                <Navigation/>
            </ProvideAuth>
        </CookiesProvider>
    );
}
    
export default App;