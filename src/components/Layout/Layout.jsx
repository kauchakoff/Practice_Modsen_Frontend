import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import {useRef} from "react";

function Layout() {

    const headerRef = useRef(null);

    return (
        <div>
            <Header ref={headerRef}/>
            <Outlet/>
        </div>
    );
}

export default Layout;