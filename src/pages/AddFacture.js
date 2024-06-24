import React, { useState , useEffect} from 'react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { SidebarProvider } from "../components/SidebarContext";
// import firestore from '../fireStore';
import { firestore } from '../fireStore';
import { collection, addDoc ,getDocs } from 'firebase/firestore';
function AddFacture() {
    const [message ,setMessage] = useState('')
    const [locataire , setLocataire] = useState([]);
    const [Loading ,setLoading] = useState(true);
  const [formData, setFormData] = useState({
    locataire: '',
    montant: '',
    reste: '',
    date: ''
    
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
useEffect(()=>{
            
  const fetchUsers = async () => {
     try {
       const querySnapshot = await getDocs(collection(firestore, 'locataires'));
       const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       console.log('Fetched users: ', usersList);
       setLocataire(usersList);
     } catch (error) {
       console.error("Error fetching users: ", error);
     } finally {
       setLoading(false);
     }
   };

   fetchUsers();
}, [])
console.log(JSON.stringify(locataire, null, 2))

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // Fonction pour ajouter un document à une collection
    const AddFactures = async (data) => {
        try {
            const collectionRef = collection(firestore, "factures"); 
            
            await addDoc(collectionRef, data);
           
            setMessage('Facture ajouter ')
        } catch (error) {
            setMessage("Erreur lors de l'ajout")
            console.error("Error adding data:", error);
        }
    };
    
   
    
    AddFactures(formData);
    


    // Optionally, reset the form
    setFormData({
        locataire: '',
        montant: 0,
        reste: 0,
        date: ''
    });
  };

  return (
<SidebarProvider>
  <div id="wrapper" className="container-fluid">
    <SideBar />
    <div className="c d-flex flex-column" id="content-wrapper">
      <TopBar />
      <div className="container mt-4">
        <h2 className="text-center">Ajout d'une facture</h2>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
          <div className="form-group col-md-6">
              <label htmlFor="rentalType">Selectioner Le locataire</label>
              
              <select
                className="form-control"
                id="locataire"
                name="locataire"
                value={formData.locataire}
                onChange={handleChange}
                required
              >
                  <option disabled>Selectioner</option>

                {locataire.length > 0 ? locataire.map((loc, index) => (
                   <option key={index} value={loc.firstName}>{loc.firstName} {loc.lastName}</option>
                )) : (
                  <option disabled>Aucun locataire trouvé</option>
                )}
              
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Montant</label>
              <input
                type="number"
                className="form-control"
                id="montant"
                name="montant"
                value={formData.montant}
                onChange={handleChange}
                placeholder="Entrez le montant"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="numero_cni">Reste</label>
              <input
                type="number"
                className="form-control"
                id="reste"
                name="reste"
                value={formData.reste}
                onChange={handleChange}
                placeholder="Entrez le montant"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="tel">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Entrez la date"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
  <Footer/>
</SidebarProvider>


  );
}

export default AddFacture;
