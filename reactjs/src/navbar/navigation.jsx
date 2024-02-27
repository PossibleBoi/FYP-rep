import AuthUser from '../components/AuthUser';
import AdminNav from './admin';
import GuestNav from './guest';
import UserNav from './user';


export default function Auth() {
    if (AuthUser().user.role === 'admin') {
        return <AdminNav />
    }
    else if (AuthUser().user.role === 'user') {
        return <UserNav />
    }
    else if(AuthUser().user.role === 'starter'){
        return (
            <div>
                <h1>Starter</h1>
            </div>)
    }
    else
    {
        return <GuestNav />
    }
}
