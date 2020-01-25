// import React, { Component } from 'react';

// class Home extends Component {
//     constructor() {
//       super()
//       this.state = {
//         img: '',
//         caption: '',
//         errors: {},
//         loading:true
//       }
  
//       this.onChange = this.onChange.bind(this)
//       this.onSubmit = this.onSubmit.bind(this)
//     }
  
//     onChange(e) {
//       this.setState({ [e.target.img]: e.target.value })
//     }
//     onSubmit(e) {
//       e.preventDefault()
//       axios.post("http://localhost:5000/registration/Login",{email: this.state.email,
//       password: this.state.password})
//       .then(res=>{
  
//         reactLocalStorage.set("Token",res.data.token);
        
//         this.setState({ 
//           loading : false
//         })
//         this.props.history.push('/profile')
//       })
//       .catch(err=>{
//         this.setState({
//           loading : false
//         })
//       })
//     };
//     render() {
//       return (
//         <div className="container">
//           <div className="row">
//             <div class="thumbnail">
//                 <a href="/lights.jpg" target="_blank">
//                 <img src="/w3images/lights.jpg" alt="Lights" style="width:100%">
//                 <div class="caption">
//                     <p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>
//                 </div>
//                 </a>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   }
  
//   export default Home