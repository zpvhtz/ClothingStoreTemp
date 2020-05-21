import React from 'react';
import './style.css';
// eslint-disable-next-line no-unused-vars
import Index from '../../index/Index'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal= withReactContent(Swal);

class Main extends React.Component{
    state={
        token: '',
        information: [],
        address: '',
        phone: '',
        email: '',
        customerId:'00000000-0000-0000-0000-000000000000',
        isLoggedIn: false,
        provinces: [],
        provinceId: 0,
        districts: [],
        districtId: 0,
        wards: [],
        wardCode: '',
        redirect: false
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getInformation();
            });
        } else {
            window.location.href = "/";
        }
    }

    checkPreviousUrl = () => {
        let url = document.referrer;
        let suffix = url.substring(url.lastIndexOf("/") + 1, url.length);
        
        if(suffix !== "cartdetail") {
            window.location.href = "/";
        }
    }

    getProvinceToRender = () => {
        let address = this.state.address;
        if(address !== "blank") {
            let provinceName = address.substring(address.lastIndexOf("TT.") + 3, address.length);
            console.log("Province")
            console.log(provinceName);
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

    getDistrictsByProvinceId = () => {
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
                        console.log("District")
                        console.log(provinceName);
                        console.log(districtName);
                        fetch(`https://localhost:44376/api/customer/delivery/getDistrictByProvinceAndDistrictName?provinceName=${provinceName}&districtName=${districtName}`)
                        .then(res => res.json())
                        .then(res => {
                            this.setState({
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

                        console.log("District")
                        console.log(wardCode);
                        window.$("#ward").val(wardCode);
                        this.setState({
                            wardCode: wardCode,
                            address: this.state.information.address
                        }, () => {
                            window.$("#spinnerLoader").hide();
                            this.onChangeInformation();
                        })
                    }
                }
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getInformation=()=>{
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token,
                // customerId:this.state.information.customerId
            })
        })
        .then(res => res.json())
        .then(res => {
            let information = res;
            let address = res.address;
            information.address = information.address.substring(0, information.address.lastIndexOf("PX") - 1);
            //localStorage.setItem("name",information.name);
            this.setState({
                information: information,
                address: address,
                phone: res.phone,
                email: res.email
            }, () => {
                this.getProvinceToRender();
                this.onChangeInformation();
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    updateinfomation=()=>{
        let dcValidity= this.checkPhoneValidity(window.$("#phone").val());
        if(dcValidity=== false){
            return;
        }

        let emailValidity= this.checkEmailValidity(window.$("#email").val());
        if(emailValidity=== false){
            return;
        }

        let information = this.state.information;
        information.address = window.$("#address").val();
        information.email = window.$("#email").val();
        information.phone = window.$("#phone").val();

        this.setState({
            information: information,
            address: window.$("#address").val(),
            email: window.$("#email").val(),
            phone: window.$("#phone").val()
        }, () => {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                icon: 'success',
                html: "<p style='font-size: 15px'>Cập nhật thông tin thành công</p>"
            })
            .then((res) => {
                this.onChangeInformation();
            });
        })
       
        
        // console.log(information.address)
        // localStorage.setItem("address",JSON.stringify(window.$("#address").val()));
        // localStorage.setItem("email",JSON.stringify(window.$("#email").val()));
        // localStorage.setItem("phone",JSON.stringify(window.$("#phone").val()));
    }

    checkEmailValidity=(email)=>{
        // eslint-disable-next-line no-useless-escape
        let emailcheck=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailcheck))
        {
            return true;
        }
        
        else{
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Email không hợp lệ</p>"
            })
            return false;
        }
    }

    checkPhoneValidity=(phone)=>{
        //eslint-disable-line
        let phonecheck= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phone.match(phonecheck))
        {
            return true;
        }
        else{
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Số điện thoại không hợp lệ</p>"
            })
            return false;
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
            this.onChangeInformation();
        });
    }

    onChangeDistrict = () => {
        let districtId = window.$("#district").val();

        this.setState({
            districtId: districtId
        }, () => {
            window.$("#ward").val("blank");
            this.getWards();
            this.onChangeInformation();
        });
    }

    onChangeWard = () => {
        let wardCode = window.$("#ward").val();

        this.setState({
            wardCode: wardCode
        }, () => {
            // this.getWards();
            this.onChangeInformation();
        });
    }

    onChangeInformation = () => {
        let address = window.$("#address").val();
        let email = window.$("#email").val();
        let phone = window.$("#phone").val();
        let province = window.$("#province").val();
        let district = window.$("#district").val();
        let ward = window.$("#ward").val();

        // //getinformation
        // let informationdelivery={
        //     name:this.state.information.name,
        //     address: `${window.$("#address").val()},${window.$("#ward").val()}, ${window.$("#district").val()}, ${window.$("#province").val()}`,
        //     email: window.$("#email").val(),
        //     phone: window.$("#phone").val()
        // }

        //localStorage.setItem("Delivery",informationdelivery);

        if(address !== this.state.address || email !== this.state.email || phone !== this.state.phone) {
            window.$("#btnHuy").prop("disabled", false);
            window.$("#btnOk").prop("disabled", true);
        } else {
            if(province === null || district === null || ward === null || province === "blank" || district === "blank" || ward === "blank") {
                window.$("#btnHuy").prop("disabled", true);
                window.$("#btnOk").prop("disabled", true);
            }
            else {
                window.$("#btnHuy").prop("disabled", true);
                window.$("#btnOk").prop("disabled", false);
            }
        }        
    }

    renderRedirect = () => {
        if(this.state.redirect) {
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
            
            let address = this.refs.address.value;
            address += ` PX.${wardName} QH.${districtName} TT.${provinceName}`
            
            let information = this.state.information;
            information.address = address;
            localStorage.setItem("information", JSON.stringify(information));

            let districtId= this.state.districtId;
            localStorage.setItem('district', districtId);
            
            
            return <Redirect to="/pay"/>
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
        
            // let dc= `${this.state.information.address} PX.${this.state.wardName} QH.${this.state.districtName} TT.${this.state.provinceName}`;
            // localStorage.setItem("address",dc);
    }

    renderFormDiaChi = () => {
        if(this.state.information.length !== 0) {
            const listItems = <div className="panel-body">
                                <p className="form-group name">{this.state.information.name}</p>
                                <div className="form-group address">
                                    <label className="address-label">Địa chỉ: </label>
                                    <div>
                                        <input className="input-address" id="address" ref="address" defaultValue={this.state.information.address} onChange={this.onChangeInformation}></input>
                                    </div>
                                    <div>
                                        <select className="input-address" id="province" ref="province" defaultValue="blank" onChange={this.onChangeProvince}>
                                            <option value="blank" disabled>Vui lòng chọn tỉnh thành</option>
                                            {this.renderProvinces()}
                                        </select>
                                    </div>
                                    <div>
                                        <select className="input-address" id="district" ref="district" defaultValue="blank" onChange={this.onChangeDistrict}>
                                            <option value="blank" disabled>Vui lòng chọn quận huyện</option>
                                            {this.renderDistricts()}
                                        </select>
                                    </div>
                                    <div>
                                        <select className="input-address" id="ward" ref="ward" defaultValue="blank" onChange={this.onChangeWard}>
                                            <option value="blank" disabled>Vui lòng chọn phường xã</option>
                                            {this.renderWards()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group email">
                                    <label className="email-lable">Email:</label>
                                    <div>
                                        <input className="input-email" id="email" defaultValue={this.state.information.email} onChange={this.onChangeInformation}></input>
                                    </div>
                                </div>
                                <div className="form-group phone">
                                    <label className="phone-lable">Điện thoại:</label>
                                    <div>
                                        <input className="input-phone" id="phone" defaultValue={this.state.information.phone} onChange={this.onChangeInformation}></input>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="button" className="btn btn-default ok" id="btnOk" style={{marginRight: "1em"}} onClick={this.setRedirect}> Giao đến địa chỉ này</button>
                                    <button type="button" className="btn btn-default huy" id="btnHuy" onClick={this.updateinfomation}>Sửa</button>
                                </div>
                                <span className="default">Mặc định</span>
                            </div>
            return listItems;
        }
    }

    renderProvinces = () => {
        if(this.state.provinces.length !== 0) {
            const provinces = this.state.provinces.map((item, idx) =>
                <option key={idx} value={item.provinceId}>{item.provinceName}</option>
            );

            return provinces;
        }
    }

    renderDistricts = () => {
        if(this.state.districts.length !== 0) {
            const districts = this.state.districts.map((item, idx) =>
                <option key={idx} value={item.districtId}>{item.districtName}</option>
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
   
    componentDidMount=()=>{
        // this.checkPreviousUrl(); Khi nào xong thì gỡ comment
        this.checkLoggedIn();
        this.getProvinces();
    }
    render()
    {
        return ( //Phải để (1 ngay đây
           
            <div className="row-address-list">
                <div className="col-lg-6 col-md-6 col-sm-6 item">
                    <div className="panel panel-default address-item">
                        {this.renderRedirect()}
                        {this.renderFormDiaChi()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Main;