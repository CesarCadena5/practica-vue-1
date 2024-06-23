import { getAuth } from "firebase/auth";

const isAuthenticated = async (to, from, next) => {
    const authenticated = localStorage.getItem('authenticated');
    const auth = getAuth();
    const user = auth.currentUser;

    if (!authenticated && !user) {
        return next({
            name: 'login'
        });
    }

    return next();
};

export default isAuthenticated