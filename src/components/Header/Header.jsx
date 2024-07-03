import { Button, Col, Row } from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo';
import './Header.css';
import CartButton from './CartButton';
import OrdersHistoryButton from './OrdersHistoryButton';
import {useEffect, useRef, useState} from "react";
import ViewCategoryEditorButton from "../Categories/ViewCategoryEditorButton";
import {logout} from "../../utils/auth/auth";
import Category from "../../entity/Category";
import {getAllCategories} from "../Categories/CategoryAction";

export function updateHeader  (itemsCount, totalCost)  {

    const element = document.querySelector('.item-count');
    const costElement = document.querySelector('.price-text');
    if(element!=null) element.textContent = itemsCount;
    if(costElement!=null) costElement.textContent = totalCost;
}

function Header() {

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const defaultAllCategoryId = -1;
  const defaultAllCategoryName = "ALL";
  const defaultCategory = new Category()
  defaultCategory.id = defaultAllCategoryId;
  defaultCategory.name = defaultAllCategoryName;

  const [categoriesArray, setCategoriesArray] = useState([defaultCategory]);
  let [selectedCategoryId, setSelectedCategoryId] = useState(defaultAllCategoryId)

  useEffect(() => {
    const requestData = {
      pageNumber: page,
      pageSize: itemsPerPage,
      sortBy: "id",
      sortOrder: "desc",
    }
    getAllCategories(requestData).then((value) => {
      setCategoriesArray([...categoriesArray, ...value]);
      if (value.length > 0) {
        setPage(page + 1);
      }
    });
  }, [page]);

  let handleSelectedCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value)
  }

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
          <Row className='header-container'>
            <select value={selectedCategoryId} onChange={handleSelectedCategoryChange}>
              {categoriesArray.map((category) => <option
                                                         value={category.id}>{category.name}</option>)}
            </select>
            <p>{`selectedCategoryId = ${selectedCategoryId}`}</p>
          </Row>

        </header>
    );
}

export default Header;