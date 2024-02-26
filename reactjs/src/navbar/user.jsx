import AuthUser from '../components/AuthUser';
import AdminNav from './admin';
import Guest from './guest';
import UserNav from './usesr1';


export default function Auth() {
    if (AuthUser().user.role == 'admin') {
        return <AdminNav />
    }
    else if (AuthUser().user.role == 'user') {
        return <UserNav />
    }
    else if(AuthUser().user.role == 'starter'){
        return 
    }
    else
    {
        return <Guest />
    }
}
