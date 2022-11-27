import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Protected = ({ children }) => {
    const history = useHistory();
    const [cookies] = useCookies(['user_session']);
    if (cookies.user_session === undefined) {
        history.push("/");
    }
    return children;
};
export default Protected;