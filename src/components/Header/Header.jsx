import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo';
import './Header.css';
import CartButton from './CartButton';
import OrdersHistoryButton from './OrdersHistoryButton';

export function updateHeader  (itemsCount,totalCost)  {
    // Здесь ваш код для обновления header
    // Например, изменение текста в элементе header
    const element = document.querySelector('.item-count');
    const costElement = document.querySelector('.price-text');
    if(element!=null) element.textContent = itemsCount;
    if(costElement!=null) costElement.textContent = totalCost ;
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
                        <Link to={"/cart"}><CartButton/></Link>
                    </Col>
                    <Col>
                        <Link to={"/orders"}><OrdersHistoryButton/></Link>
                    </Col>
                </Col>            
            </Row>    
        </header>
    );
}

export default Header;