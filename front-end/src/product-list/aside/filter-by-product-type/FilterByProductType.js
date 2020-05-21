import React from 'react';

class FilterByProductType extends React.Component {
    state = {
        items: [],
        error: null,
        filterByProductType: '00000000-0000-0000-0000-000000000000'
    }

    componentDidMount() {
        fetch(`https://localhost:44376/api/customer/ProductType/getProductTypes`)
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        items: res
                    });
                },
                (err) => {
                    this.setState({
                        isLoaded: true,
                        error: err
                    });
                }
            )
    }

    filterByProductType = (evt) => {
        this.props.filterByProductType(evt.target.id);

        this.setState({
            filterByProductType: evt.target.id
        })
    }

    renderItem = () => {
        let items = this.state.items.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={ idx }><a id={item.typeProductId} href=" #" onClick={this.filterByProductType}>{ item.name }</a></li>
        );

        return items;
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Loại</h3>
                <ul className="list-links">
                    {/* <li className="active"><a href=" #">Men</a></li> */}
                    { this.renderItem() }
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByProductType;