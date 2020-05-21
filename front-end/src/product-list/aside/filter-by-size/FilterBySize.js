import React from 'react';

class FilterBySize extends React.Component {
    state = {
        items: [],
        filterBySize: ''
    }

    getSizes = () => {
        fetch(`https://localhost:44376/api/customer/size/getDistinctSizes`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                items: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    filterBySize = (evt) => {
        this.props.filterBySize(evt.target.innerText);

        this.setState({
            filterBySize: evt.target.innerText
        })
    }

    renderListSizes = () => {
        let items = this.state.items.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={ idx }><a href=" #" onClick={this.filterBySize}>{item}</a></li>
        );

        return items;
    }

    componentDidMount = () => {
        this.getSizes();
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Kích cỡ</h3>
                <ul className="size-option">
                    {this.renderListSizes()}
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterBySize;