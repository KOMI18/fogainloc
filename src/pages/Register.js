import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {firestore , auth} from '../fireStore'
import { collection, addDoc } from 'firebase/firestore';
import Loading from "../components/Loading";
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
function Register() {
    const [message ,setMessage] = useState('')
    const [messageSucess , setMessageSucess] = useState('')
    const [Loadings , setLoading] = useState(false)
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log(data);
    }
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000); // 3000 millisecondes = 3 secondes
    
            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    //    logique d'inscription avec firebase 
        if(data.password !== data.repeatPassword){
            setMessage('Les mots de passe sont incompatible')
          
        }else{
            try { 
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                
                const collectionRef = collection(firestore, "Admin"); 
                await addDoc(collectionRef, {
                    uid: userCredential.user.uid,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,

                });
                
                const users = userCredential.user
                await updateProfile(users  , {
                    displayName: data.firstName, 
                    photoURL: data.email
                  })
               
                // Utilisateur créé avec succès
                setMessageSucess('Votre compte a ete cree ')
                console.log("User signed up successfully!");
                setLoading(false)
            } catch (error) {
               console.log(error.message);
               setMessage('Une erreur est survenue')
               setLoading(false)
            }
        }
            


    // renitialisation du formulaire
        setData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        });
    }

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                  <h1 className="h4 text-gray-900 mb-4">Crée un Compte!</h1>
                                  {message && <p className="alert alert-danger">{message}</p>}
                                  {messageSucess && <p className="alert alert-info">{messageSucess} <Link to='/Login'> se connecter</Link></p>}
                                  
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="FirstName"
                                                placeholder="Nom"
                                                value={data.firstName}
                                                onChange={handleChange}
                                                name="firstName"
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="LastName"
                                                placeholder="Prénom"
                                                value={data.lastName}  // Correction ici
                                                onChange={handleChange}
                                                name="lastName"  // Correction ici
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="InputEmail"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="InputPassword"
                                                name="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="RepeatPassword"
                                                name="repeatPassword"  // Correction ici
                                                value={data.repeatPassword}
                                                onChange={handleChange}
                                                placeholder="Repeat Password"
                                            />
                                        </div>
                                    </div>
                                      
                                    <button type="submit"  onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                        
                                        {Loadings === true ? <Loading/>: 'Register Account'}
                                    </button>
                                    <hr />
                                    <Link to="index.html" class="btn btn-google btn-user btn-block disabled" >
                                        <i className="fab fa-google fa-fw"></i> Register with Google <sup>Beta</sup>
                                    </Link>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <Link className="small" to="/Login">Already have an account? Login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
