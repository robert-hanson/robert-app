import React from 'react';

export class NasaNavbar extends React.Component {

    getNavItems(){
        const navItems = this.props.items.map((navBarItem) => {
            return  <li key={navBarItem} className="nav-item">
                        <button 
                            className="nav-link btn btn-link btn-sm" 
                            id={navBarItem}
                            onClick={this.props.onSelectionChange}
                        >
                            {navBarItem}
                        </button>
                    </li>;
        });
        return navItems;
    }

    render(){
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <button className="navbar-brand btn btn-link btn-sm" href="#">Diagnostics</button>
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