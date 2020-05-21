import React from 'react';
import ListItem from './list-item/ListItem';

class List extends React.Component {
    state = {
        items: []
    };

    renderItem = () => {
        const listItems = this.state.items.map((item, idx) =>
            <ListItem key={idx} itemProductId={item.productId} itemName={item.name} itemPrice={item.price} itemDiscount={item.discount} itemImage={item.imageUrl}></ListItem>
        );

        return listItems;
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            items: nextProps.items
        });
    }

    render() {
        return (
            // {/* <!-- STORE --> */}
            <div id="store">
                {/* <!-- row --> */}
                <div className="row">
                    { this.renderItem() }
                </div>
                {/* <!-- /row --> */}
            </div>
            // {/* <!-- /STORE --> */}
        );
    }
}

export default List;