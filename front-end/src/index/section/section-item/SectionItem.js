import React from 'react';

class SectionItem extends React.Component {
    render() {
        let imgUrl = "/assets/img/banner1" + this.props.id + ".jpg";

        return (
            <div className="col-md-4 col-sm-6">
                <a className="banner banner-1" href=" #">
                    <img src={ imgUrl } alt="" />
                    <div className="banner-caption text-center">
                        <h2 className="white-color">THỜI TRANG MỚI</h2>
                    </div>
                </a>
            </div>
        )
    }
}

export default SectionItem;
