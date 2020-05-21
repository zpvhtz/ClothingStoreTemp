import React from 'react';
import './login.css';
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Information extends React.Component {
    state = {
        gender: [],
        information: [],
        address: '',
        token: '',
        isLoggedIn: false,
        provinces: [],
        provinceId: 0,
        districts: [],
        districtId: 0,
        wards: [],
        wardCode: ''
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation()
            });
        } else {
            this.props.history.push('/');
        }
    }

    renderSnowEffect = () => {
        let items = [];

        for(let i = 0; i < 10; i++) {
            items.push(<div className='snowflake' key={i}>❆</div>);
        }

        return items;
    }

    getDistrictsByProvinceId = () => {
        if(this.state.provinceId !== null) {
            fetch(`https://localhost:44376/api/customer/delivery/getDistrictsByProvinceId?provinceId=${this.state.provinceId}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    districts: res
                },() => {
                    if(this.state.districtId === 0) {
                        let address = this.state.address;
                        if(address !== "blank") {
                            let provinceName = address.substring(address.lastIndexOf("TT.") + 3, address.length);
                            let districtName = address.substring(address.lastIndexOf("QH.") + 3, address.lastIndexOf("TT.") - 1);
    
                            fetch(`https://localhost:44376/api/customer/delivery/getDistrictByProvinceAndDistrictName?provinceName=${provinceName}&districtName=${districtName}`)
                            .then(res => res.json())
                            .then(res => {this.setState({
                                    districtId: res.districtId
                                }, () => {
                                    window.$("#district").val(this.state.districtId);
                                    this.onChangeDistrict();
                                });
                            })
                            .catch(error =>{
                                console.log(error)
                            })
                        }
                    }
                });
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }

    getProvinces = () => {
        fetch(`https://localhost:44376/api/customer/delivery/getProvinces`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                provinces: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getWards = () => {
        fetch(`https://localhost:44376/api/customer/delivery/getWards?provinceId=${this.state.provinceId}&districtId=${this.state.districtId}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                wards: res
            }, () => {
                if(this.state.wardCode === '') {
                    let address = this.state.address;
                    if(address !== "blank") {
                        let wardName = address.substring(address.lastIndexOf("PX.") + 3, address.lastIndexOf("QH.") - 1);
                        let wards = this.state.wards;
                        let wardCode = wards.find(w => w.wardName.includes(wardName)).wardCode;

                        window.$("#ward").val(wardCode);
                        this.setState({
                            wardCode: wardCode
                        })
                    }
                }
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getGender = () => {
        fetch(`https://localhost:44376/api/customer/gender/getGenders`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                gender: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getUserInformation = () => {
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token
            })
        })
        .then(res => res.json())
        .then(res => {
            let information = res;
            let address = res.address;
            information.address = information.address.substring(0, information.address.lastIndexOf("PX") - 1);

            this.setState({
                information: information,
                address: address
            }, () => {
                this.getProvinceToRender()
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getProvinceToRender = () => {
        let address = this.state.address;
        if(address !== "blank") {
            let provinceName = address.substring(address.lastIndexOf("TT.") + 3, address.length);
            fetch(`https://localhost:44376/api/customer/delivery/getProvinceByProvinceName?provinceName=${provinceName}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    provinceId: res.provinceId
                }, () => {
                    window.$("#province").val(this.state.provinceId);
                    // this.onChangeProvince();
                    this.getDistrictsByProvinceId();
                });
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }

    onChangeProvince = () => {
        let provinceId = window.$("#province").val();

        this.setState({
            provinceId: provinceId
        }, () => {
            window.$("#district").val("blank");
            window.$("#ward").val("blank");
            this.getDistrictsByProvinceId();
        })
    }

    onChangeDistrict = () => {
        let districtId = window.$("#district").val();

        this.setState({
            districtId: districtId
        }, () => {
            window.$("#ward").val("blank");
            this.getWards();
        });
    }

    renderProvinces = () => {
        if(this.state.provinces.length !== 0) {
            const provinces = this.state.provinces.map((item, idx) =>
                <option key={idx} value={item.provinceId} style={{color: "black"}}>{item.provinceName}</option>
            );

            return provinces;
        }
    }

    renderDistricts = () => {
        if(this.state.districts.length !== 0) {
            const districts = this.state.districts.map((item, idx) =>
                <option key={idx} value={item.districtId} style={{color: "black"}}>{item.districtName}</option>
            );
            
            return districts;
        }
    }

    renderWards = () => {
        if(this.state.wards.length !== 0) {
            const wards = this.state.wards.map((item, idx) =>
                <option key={idx} value={item.wardCode} style={{color: "black"}}>{item.wardName}</option>
            );
            
            return wards;
        }
    }

    renderGender = () => {
        let list = this.state.gender;
        let listOption = [];

        list.forEach((g, index) => {
            listOption.push(<option key={index} value={g.genderId}>{g.name}</option>);
        })

        return listOption;
    }

    renderBirthday = () => {
        if(this.state.information.birthday !== undefined) {
            let value = new Date(this.state.information.birthday);
            
            let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
            let year = value.getFullYear();

            let fullDate = `${year}-${month}-${date}`;
            const birthday = <input className="input--style-3 js-datepicker" type="date" placeholder="Birthdate" id="birthday" name="birthday" ref="birthday" defaultValue={fullDate} required style={{borderBottom: "1px solid rgba(255, 255, 255, 0.2)", width: "60%", padding: "0"}}/>;
            
            return birthday
        }
    }

    handleSubmit = (event) => { 
        event.preventDefault();

        //check birthday validity
        let birthdayValidity = this.checkBirthdayValidity(window.$("#birthday").val());
        if(birthdayValidity === false) {
            return;
        }

        //check phone validity
        let phoneValidity = this.checkPhoneValidity(window.$("#phone").val());
        if(phoneValidity === false) {
            return;
        }

        //check name validity
        let nameValidity = this.checkNameValidity(window.$("#name").val());
        if(nameValidity === false) {
            return;
        }

        //check province
        let provinceNameValidity = window.$("#province option:selected").val();
        if(provinceNameValidity === "blank") {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng chọn tỉnh thành</p>"
            })

            return;
        }

        //check district
        let districtNameValidity = window.$("#district option:selected").val();
        if(districtNameValidity === "blank") {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng chọn quận huyện</p>"
            })

            return;
        }

        //check ward
        let wardNameValidity = window.$("#ward option:selected").val();
        if(wardNameValidity === "blank") {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng chọn phường xã</p>"
            })

            return;
        }

        //check Email
        if(this.state.information.email === "blank") {
            //check email validity
            let emailAvailability = false;
            fetch(`https://localhost:44376/api/customer/account/checkEmailAvailability?email=${window.$("#email").val()}`)
            .then(res => res.json())
            .then(res => {
                emailAvailability = res;
            }).then(() => {
                if(emailAvailability === false) {
                    MySwal.fire({
                        title: 'Thông báo',
                        width: 300,
                        padding: '2em',
                        html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Email đã được sử dụng</p>"
                    })

                    return;
                }
            })
            .catch(error =>{
                console.log(error)
            });
        }

        //substring
        let provinceName = window.$("#province option:selected").text();
        let districtName = window.$("#district option:selected").text();
        let wardName = window.$("#ward option:selected").text();

        if(districtName.includes("Huyện")) {
            districtName = districtName.substring(districtName.indexOf("Huyện") + 6, districtName.length);
        }
        if(districtName.includes("Thị xã")) {
            districtName = districtName.substring(districtName.indexOf("Thị xã") + 7, districtName.length);
        }
        if(districtName.includes("Thành phố")) {
            districtName = districtName.substring(districtName.indexOf("Thành phố") + 10, districtName.length);
        }
        if(districtName.includes("Quận")) {
            districtName = districtName.substring(districtName.indexOf("Quận") + 5, districtName.length);
        }
        if(districtName.includes("Huyện")) {
            districtName = districtName.substring(districtName.indexOf("Huyện") + 6, districtName.length);
        }

        if(wardName.includes("Phường")) {
            wardName = wardName.substring(wardName.indexOf("Phường") + 7, wardName.length);
        }
        if(wardName.includes("Xã")) {
            wardName = wardName.substring(wardName.indexOf("Xã") + 3, wardName.length);
        }
        if(wardName.includes("Thị trấn")) {
            wardName = wardName.substring(wardName.indexOf("Thị trấn") + 9, wardName.length);
        }
        
        //updateInformation
        let address = this.refs.address.value;
        address += ` PX.${wardName} QH.${districtName} TT.${provinceName}`
        fetch('https://localhost:44376/api/customer/customer/updateCustomerInformation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                customerId: this.state.information.customerId,
                name: this.refs.name.value,
                genderId: this.refs.gender.value,
                birthday: this.refs.birthday.value,
                address: address,
                email: this.refs.email.value,
                phone: this.refs.phone.value
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === true) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    icon: 'success',
                    html: "<p style='font-size: 15px'>Cập nhật thông tin thành công</p>"
                }).then((res) => {
                   window.location.href = "/"; 
                });
            } else {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Lỗi</p>"
                })
            }
        })
        .catch(error =>{
            console.log(error)
        })
    };

    checkBirthdayValidity = (birthday) => {
        let date = Date.parse(birthday);
        let now = Date.now();
        
        if(date >= now) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng nhập ngày sinh hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    checkNameValidity = (name) => {
        let nameLength = name.length;
        
        if(nameLength < 2) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Họ tên không hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    checkPhoneValidity = (phone) => {
        let phoneLength = phone.length;
        
        if(phoneLength < 8 || phoneLength > 10) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Số điện thoại không hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    validateInput() {
        let name = window.$("#name").val();
        let birthday = window.$("#birthday").val();
        let phone = window.$("#phone").val();
        let address = window.$("#address").val();
        let email = window.$("#address").val();
        
        //check blank
        if(name === "") {
            document.getElementById("name").setCustomValidity("Vui lòng nhập vào họ tên!");
            return;
        } else {
            document.getElementById("name").setCustomValidity("");
        }

        if(birthday === "") {
            document.getElementById("birthday").setCustomValidity("Vui lòng chọn ngày tháng năm sinh!");
            return;
        } else {
            document.getElementById("birthday").setCustomValidity("");
        }

        if(phone === "") {
            document.getElementById("phone").setCustomValidity("Vui lòng nhập vào số điện thoại!");
            return;
        } else {
            document.getElementById("phone").setCustomValidity("");
        }

        if(address === "") {
            document.getElementById("address").setCustomValidity("Vui lòng nhập vào địa chỉ!");
            return;
        } else {
            document.getElementById("address").setCustomValidity("");
        }

        if(email === "") {
            document.getElementById("email").setCustomValidity("Vui lòng nhập vào email!");
            return;
        } else {
            document.getElementById("email").setCustomValidity("");
        }
    }

    componentDidMount() {
        this.getGender();
        this.checkLoggedIn();
        this.getProvinces();
    }

    render()
    {
        return(
            <div className="register">
                { this.renderSnowEffect() }
                <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
                    <div className="wrapper wrapper--w780">
                        <div className="card card-3">
                            <div className="card-heading">
                                <a href="/"><img src="./assets/img/logo.png" alt="logo.png"></img></a>
                            </div>
                            <div className="card-body">
                                <h2 className="title"><center>Thông tin</center></h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Họ tên" id="name" name="Name" ref="name" defaultValue={this.state.information.name} required/>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Giới tính</span>
                                        <select className="input--style-3" ref="gender" required style={{padding: "4px 0"}}>
                                            Giới tính { this.renderGender() }
                                        </select>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Ngày sinh</span>
                                        {/* <input className="input--style-3 js-datepicker" type="date" placeholder="Birthdate" id="birthday" name="birthday" ref="birthday" defaultValue="01/01/2013" required style={{borderBottom: "1px solid rgba(255, 255, 255, 0.2)", width: "60%", padding: "0"}}/> */}
                                        {this.renderBirthday()}
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Số điện thoại" id="phone" name="phone" ref="phone" defaultValue={this.state.information.phone === "blank" ? "" : this.state.information.phone} required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Địa chỉ" id="address" name="Address" ref="address" defaultValue={this.state.information.address === "blank" ? "" : this.state.information.address} required/>
                                    </div>
                                    <div className="input-group">
                                        <select className="input--style-3" id="province" ref="province" defaultValue="blank" onChange={this.onChangeProvince} required>
                                            <option value="blank" disabled style={{color: "black"}}>Vui lòng chọn tỉnh thành</option>
                                            {this.renderProvinces()}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className="input--style-3" id="district" ref="district" defaultValue="blank" onChange={this.onChangeDistrict} required>
                                            <option value="blank" disabled style={{color: "black"}}>Vui lòng chọn quận huyện</option>
                                            {this.renderDistricts()}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className="input--style-3" id="ward" ref="ward" defaultValue="blank" required>
                                            <option value="blank" disabled style={{color: "black"}}>Vui lòng chọn phường xã</option>
                                            {this.renderWards()}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        { this.state.information.email === "blank" ?
                                            <input className="input--style-3" type="text" placeholder="Email" id="email" name="email" ref="email" defaultValue={this.state.information.email === "blank" ? "" : this.state.information.email} required/> :
                                            <input className="input--style-3" type="text" placeholder="Email" id="email" name="email" ref="email" defaultValue={this.state.information.email === "blank" ? "" : this.state.information.email} required disabled/> }
                                        {/* <input className="input--style-3" type="text" placeholder="Email" id="email" name="email" ref="email" defaultValue={this.state.information.email === "blank" ? "" : this.state.information.email} required disabled/> */}
                                    </div>
                                    <div className="p-t-10">
                                        <center><button className="btn btn--pill btn--green" type="submit" onClick={this.validateInput}>Lưu</button></center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Information;