import { useState } from "react";
import { Link } from "react-router-dom"
import {auth }from '../fireStore'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// import { useHistory } from 'react-router-dom';


function Login () {
    // const history = useHistory();
    const navigate = useNavigate()
    const [message , setMessage] = useState('')
    const [Loading , setLoading] = useState(false)

    const [data , setData]  = useState({
        email : '',
        password : ''
    });
    const handleChange =  (e) => {
            const {name , value} = e.target ;
            setData(prevData =>({
                ...prevData,
                [name] : value 
            }))
       
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
            try{
                // logique firebase auth
            const userCredential = await signInWithEmailAndPassword(auth , data.email , data.password)
            localStorage.setItem('uid' , userCredential.user.uid)
            navigate('/Index')
            setMessage('Connecter avec sucesse')
            setLoading(false)
            }catch(error){
                setMessage("Une erreur c'est produite verifier vos idantifiant")
                setLoading(false)
            }
        

    }   
    return (
        <div class="container">

        {/* <!-- Outer Row --> */}
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image">
                                {/* <img src="../img/undraw_posting_photo.svg" ></img> */}
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        {message && <p className="alert alert-danger">{message}</p>}
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" 
                                                
                                                class="form-control form-control-user"
                                                id="exampleInputEmail" 
                                                aria-describedby="emailHelp"
                                                name="email"
                                                placeholder="Enter Email Address..."
                                                value={data.email}  
                                                onChange={handleChange}  
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input 
                                                type="password" 
                                                class="form-control form-control-user"
                                                id="exampleInputPassword" 
                                                name="password"
                                                placeholder="Password"
                                                value={data.password}
                                                onChange={handleChange}    
                                            />
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <button type="submit"  onClick={handleSubmit} class="btn btn-primary btn-user btn-block">
                                            {Loading === true ?
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '5vh' }}>
                                                <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>

                                            : 'Login'}
                                        </button>
                                        <hr/>
                                        <Link to="index.html" class="btn btn-google btn-user btn-block disabled" >
                                            <i class="fab fa-google fa-fw"></i> Login with Google <sup>Beta</sup>
                                        </Link>
                                       
                                    </form>
                                    <hr/>
                                   
                                    <div class="text-center">
                                        <Link class="small" to="/Register">Create an Account!
                                        
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}
export default Login ;