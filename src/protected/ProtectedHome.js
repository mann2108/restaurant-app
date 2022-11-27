import Home from "../components/Home";
import Protected from ".";


function ProtectedHome() {
    return (
        <Protected>
            <Home />
        </Protected>
    );
}

export default ProtectedHome;