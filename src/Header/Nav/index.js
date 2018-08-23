import './Nav.css';

let React = require('react');
let NavLink = require('react-router-dom').NavLink;

function Nav() {
    return (
        <ul className={"nav"}>
            <li>
                <NavLink exact activeClassName={'active'} to={'/'}>Home</NavLink>
            </li>
            <li>
                <NavLink exact activeClassName={'active'} to={'/MA'}>MA</NavLink>
            </li>
        </ul>
    )
}

export default Nav;