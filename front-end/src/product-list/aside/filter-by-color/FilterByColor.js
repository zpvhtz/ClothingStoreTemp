import React from 'react';

class FilterByColor extends React.Component {
    state = {
        items: [],
        error: null,
        filterByColor: '00000000-0000-0000-0000-000000000000'
    }
    
    componentDidMount() {
        fetch("https://localhost:44376/api/customer/color/getColors")
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

    filterByColor = (evt) => {
        this.props.filterByColor(evt.target.id);

        this.setState({
            filterByColor: evt.target.id
        })
    }

    renderItem = () => {
        let items = this.state.items.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={ idx }><a id={item.colorId} href=" #" style={{ backgroundColor: item.colorValue, border: "1px solid" }} onClick={this.filterByColor}></a></li>
        );

        return items;
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Màu sắc</h3>
                <ul className="color-option">
                    { this.renderItem() }
                    {/* <li><a href=" #" style={{ backgroundColor: "#475984" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#8A2454" }}></a></li>
                    <li className="active"><a href=" #" style={{ backgroundColor: "#BF6989" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#9A54D8" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#675F52" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#050505" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#D5B47B" }}></a></li> */}
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByColor;