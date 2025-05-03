import { render } from 'preact'
import './index.css'


import SidebarLayout from './components/layout/sidebarLayout'

import './i18n/i18n';
// import App from './app';



//render( <App />, document.getElementById('app')!)


render(
    <>
        <SidebarLayout />
    </>, 
document.body);