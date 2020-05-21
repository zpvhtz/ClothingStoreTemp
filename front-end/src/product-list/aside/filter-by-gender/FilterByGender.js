import React from 'react';

class FilterByGender extends React.Component {
    state = {
        items: [],
        error: null,
        filterByProductGender: '00000000-0000-0000-0000-000000000000'
    }

    componentDidMount() {
        fetch("https://localhost:44376/api/customer/productgender/getProductGenders")
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

    filterByProductGender = (evt) => {
        this.props.filterByProductGender(evt.target.id);

        this.setState({
            filterByProductGender: evt.target.id
        })
    }

    renderItem = () => {
        let items = this.state.items.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={ idx }><a id={item.productGenderId} href=" #" onClick={this.filterByProductGender}>{ item.name }</a></li>
        );

        return items;
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Giới tính</h3>
                <ul className="list-links">
                    {/* <li className="active"><a href=" #">Men</a></li> */}
                    { this.renderItem() }
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByGender;