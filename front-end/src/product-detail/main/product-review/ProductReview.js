import React from 'react';

class ProductReview extends React.Component{
    render() {
        return (
            <div className="col-md-12">
                <div className="product-tab">
                    <ul className="tab-nav">
                        <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                        <li><a data-toggle="tab" href="#tab1">Details</a></li>
                        <li><a data-toggle="tab" href="#tab2">Reviews (3)</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="tab1" className="tab-pane fade in active">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div id="tab2" className="tab-pane fade in">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="product-reviews">
                                        <div className="single-review">
                                            <div className="review-heading">
                                                <div><a href=" #"><i className="fa fa-user-o"></i> John</a></div>
                                                <div><a href=" #"><i className="fa fa-clock-o"></i> 27 DEC 2017 / 8:0 PM</a></div>
                                                <div className="review-rating pull-right">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o empty"></i>
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute
                                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            </div>
                                        </div>

                                        <div className="single-review">
                                            <div className="review-heading">
                                                <div><a href=" #"><i className="fa fa-user-o"></i> John</a></div>
                                                <div><a href=" #"><i className="fa fa-clock-o"></i> 27 DEC 2017 / 8:0 PM</a></div>
                                                <div className="review-rating pull-right">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o empty"></i>
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute
                                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            </div>
                                        </div>

                                        <div className="single-review">
                                            <div className="review-heading">
                                                <div><a href=" #"><i className="fa fa-user-o"></i> John</a></div>
                                                <div><a href=" #"><i className="fa fa-clock-o"></i> 27 DEC 2017 / 8:0 PM</a></div>
                                                <div className="review-rating pull-right">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o empty"></i>
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute
                                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            </div>
                                        </div>

                                        <ul className="reviews-pages">
                                            <li className="active">1</li>
                                            <li><a href=" #">2</a></li>
                                            <li><a href=" #">3</a></li>
                                            <li><a href=" #"><i className="fa fa-caret-right"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="text-uppercase">Write Your Review</h4>
                                    <p>Your email address will not be published.</p>
                                    <form className="review-form">
                                        <div className="form-group">
                                            <input className="input" type="text" placeholder="Your Name" />
                                        </div>
                                        <div className="form-group">
                                            <input className="input" type="email" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="input" placeholder="Your review"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-rating">
                                                <strong className="text-uppercase">Your Rating: </strong>
                                                <div className="stars">
                                                    <input type="radio" id="star5" name="rating" value="5" />
                                                    <input type="radio" id="star4" name="rating" value="4" />
                                                    <input type="radio" id="star3" name="rating" value="3" />
                                                    <input type="radio" id="star2" name="rating" value="2" />
                                                    <input type="radio" id="star1" name="rating" value="1" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="primary-btn">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductReview;