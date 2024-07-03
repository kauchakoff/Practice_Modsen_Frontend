import { Button, Col, Row } from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo';
import './Header.css';
import CartButton from './CartButton';
import OrdersHistoryButton from './OrdersHistoryButton';
import {useRef} from "react";
import ViewCategoryEditorButton from "../Categories/ViewCategoryEditorButton";
import {logout} from "../../utils/auth/auth";

export function updateHeader  (itemsCount, totalCost)  {
    // Здесь ваш код для обновления header
    // Например, изменение текста в элементе header
    const element = document.querySelector('.item-count');
    const costElement = document.querySelector('.price-text');
    if(element!=null) element.textContent = itemsCount;
    if(costElement!=null) costElement.textContent = totalCost;
}

function Header() {


    return (
        <header>
            <Row className='header-container'>
                <Col>
                    <Link to={"/products"}><Logo/></Link>
                </Col>
                <Col>
                    <Col>
                        <Link to={"/categories"}><ViewCategoryEditorButton/></Link>
                    </Col>
                    <Col>
                        <Link to={"/cart"}><CartButton /></Link>
                    </Col>
                    <Col>
                        <Link to={"/orders"}><OrdersHistoryButton/></Link>
                    </Col>
                    <Col>
                        <div class="header-menu">
                            <div class="menu-trigger">
                                {localStorage.getItem("user") && (<p>Hello, <b>{localStorage.getItem("user")}</b></p>)}
                                <ul class="menu-list">
                                    <li><Link  to={"/login"} onClick={()=>{logout()}}>Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Col>            
            </Row>    
        </header>
    );
}

export default Header;