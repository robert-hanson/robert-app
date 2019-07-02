import React from 'react';

export class NasaNavbar extends React.Component {
    constructor(props){
        super(props);
    }


    getNavItems(){
        const navItems = this.props.items.map((navBarItem) => {
            return  <li key={navBarItem} className="nav-item">
                        <a href='javascript:void(0)' 
                            className="nav-link" 
                            id={navBarItem}
                            onClick={this.props.onSelectionChange}
                        >
                            {navBarItem}
                        </a>
                    </li>;
        });
        return navItems;
    }

    render(){
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <a className="navbar-brand" href="#">Diagnostics</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        {this.getNavItems()}
                    </ul>
                </div>  
            </nav>
        );
    }
}