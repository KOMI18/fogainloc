import React, { useState , useEffect} from 'react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import Loading from '../components/Loading';
import { SidebarProvider } from "../components/SidebarContext";
// import firestore from '../fireStore';
import { firestore } from '../fireStore';
import { collection, addDoc } from 'firebase/firestore';
function AddLocataire() {
    const [message ,setMessage] = useState('')
    const [Looder , setLoadeur] = useState(false)
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    rentalType: '',
    numero_cni : '',
    tel: '',
    montant_loyer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(() => {
    if (message) {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000); // 3000 millisecondes = 3 secondes

        // Cleanup the timer
        return () => clearTimeout(timer);
    }
}, [message]);
  const handleSubmit = (e) => {
    setLoadeur(true)
    e.preventDefault();
    // Handle form submission logic here

    // Fonction pour ajouter un document à une collection
    const Addlocataires = async (data) => {
        try {
            const collectionRef = collection(firestore, "locataires"); 
            
            await addDoc(collectionRef, data);
           
            setMessage('Locataire ajouter ')
            setLoadeur(false)
        } catch (error) {
            setMessage("Erreur lors de l'ajout")
            console.error("Error adding data:", error);
            setLoadeur(false)
        }
    };
    
   
    
    Addlocataires(formData);
    


    // Optionally, reset the form
    setFormData({
      firstName: '',
      lastName: '',
      city: '',
      rentalType: '',
      numero_cni: '',
      telephone : '',
      montant_loyer : ''
    });
  };
  
  return (
<SidebarProvider>
  <div id="wrapper" className="container-fluid">
    <SideBar />
    <div className="c d-flex flex-column" id="content-wrapper">
      <TopBar  />
      <div className="container mt-4">
        <h3 className="text-center">Ajouter d'un locataire</h3>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">Nom</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Entrez le nom"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Entrez le prénom"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="numero_cni">Numéro CNI</label>
              <input
                type="text"
                className="form-control"
                id="numero_cni"
                name="numero_cni"
                value={formData.numero_cni}
                onChange={handleChange}
                placeholder="Entrez le n*"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="tel">Téléphone</label>
              <input
                type="number"
                className="form-control"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Entrez le numéro de téléphone"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Entrez la ville"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="rentalType">Type de location</label>
              <select
                className="form-control"
                id="rentalType"
                name="rentalType"
                value={formData.rentalType}
                onChange={handleChange}
                required
              >
                <option disabled>Sélectionnez le type de location</option>
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
                <option value="Boutique">Boutique</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="montant_loyer">Montant de location</label>
              <input
                type="number"
                className="form-control"
                id="montant_loyer"
                name="montant_loyer"
                value={formData.montant_loyer}
                onChange={handleChange}
                placeholder="Entrez une somme"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">{Looder===true ? <Loading/> : 'Enregistrer'}</button>
        </form>
      </div>
    </div>
  </div>
  <Footer/>
</SidebarProvider>


  );
}

export default AddLocataire;
