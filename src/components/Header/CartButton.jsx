import { Button, Image } from 'react-bootstrap';
import './CartButton.css';
import { useState } from 'react';

class CartState {
    itemsCount: number;
    totalPrice: number;

    constructor(itemsCount: number, totalPrice: number) {
        this.itemsCount = itemsCount;
        this.totalPrice = totalPrice;
    }
}

function CartButton() {
    const [cartState, setCartState] = useState(new CartState(0, 0));
    
    return (
        <Button className="header-btn">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.9375 2.75H2.977C3.3595 2.75 3.69325 3.00725 3.79225 3.37625L4.0795 4.454M5.875 11.1875C5.27826 11.1875 4.70597 11.4246 4.28401 11.8465C3.86205 12.2685 3.625 12.8408 3.625 13.4375H15.4375M5.875 11.1875H14.2885C15.1293 9.4625 15.8635 7.6745 16.4815 5.834C12.4315 4.80136 8.25748 4.33692 4.0795 4.454M5.875 11.1875L4.0795 4.454M4.75 15.6875C4.75 15.8367 4.69074 15.9798 4.58525 16.0852C4.47976 16.1907 4.33668 16.25 4.1875 16.25C4.03832 16.25 3.89524 16.1907 3.78975 16.0852C3.68426 15.9798 3.625 15.8367 3.625 15.6875C3.625 15.5383 3.68426 15.3952 3.78975 15.2898C3.89524 15.1843 4.03832 15.125 4.1875 15.125C4.33668 15.125 4.47976 15.1843 4.58525 15.2898C4.69074 15.3952 4.75 15.5383 4.75 15.6875V15.6875ZM14.3125 15.6875C14.3125 15.8367 14.2532 15.9798 14.1477 16.0852C14.0423 16.1907 13.8992 16.25 13.75 16.25C13.6008 16.25 13.4577 16.1907 13.3523 16.0852C13.2468 15.9798 13.1875 15.8367 13.1875 15.6875C13.1875 15.5383 13.2468 15.3952 13.3523 15.2898C13.4577 15.1843 13.6008 15.125 13.75 15.125C13.8992 15.125 14.0423 15.1843 14.1477 15.2898C14.2532 15.3952 14.3125 15.5383 14.3125 15.6875V15.6875Z" stroke="#FAFAF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p>
                <span className='price-text'> {cartState?.totalPrice}</span> | <span className="item-count" >{cartState?.itemsCount}</span>
            </p>
        </Button>
    );
}

export default CartButton;