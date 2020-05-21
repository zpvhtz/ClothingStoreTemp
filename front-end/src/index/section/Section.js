import React from 'react';
import SectionItem from './section-item/SectionItem';

class Section extends React.Component {
    state = {
        numberOfItem: 3
    };

    renderItem = () => {
        let items = [];

        for(let i = 1; i <= this.state.numberOfItem; i++) {
            items.push(<SectionItem key={i} id={i}></SectionItem>);
        }

        return items;
    }

    render() {
        return (
            // <!-- section -->
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        { this.renderItem() }
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /section --> */}
        )
    }
}

export default Section;
