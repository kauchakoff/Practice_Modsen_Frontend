import { Col, Image, Row } from "react-bootstrap";
import './Logo.css';

function Logo() {
    return (
        <Row className='logo-container'>
            <div className='logo-img-container'>
                <Image src="/assets/images/capybara.svg"></Image>
            </div>
            <div className='logo-titles'>
                <h3>CAPYZZA</h3>
                <h5>Capybaras are <span>everywhere</span></h5>
            </div>                                                        
        </Row>
    );
}

export default Logo;