import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { SidebarProvider } from "../components/SidebarContext";
import { Link , useNavigate} from "react-router-dom";
import { useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect} from "react";
import Loading from "../components/Loading";
import { auth , firestore} from "../fireStore";
import { getDocs ,collection } from "firebase/firestore";
function getCurrentMonthFactures(factures) {
    const currentMonth = new Date().getMonth() + 1; // getMonth() retourne un index de 0 à 11, donc +1 pour avoir de 1 à 12
    const currentYear = new Date().getFullYear();
  
    return factures.filter(facture => {
      const factureDateParts = facture.date.split('-'); // Séparer la date en parties
      const factureYear = parseInt(factureDateParts[0], 10);
      const factureMonth = parseInt(factureDateParts[1], 10);
      return (
        factureYear === currentYear && 
        factureMonth === currentMonth
      );
    });
  }
function Index (){
    const [userData , setUserData] = useState([]);
    const [Loadings , setLoading] = useState(true)
    const [user , setUser] = useState();
    const navigate = useNavigate();
    const [sumMontant , setSumMontant] = useState(0)
    const [sumReste , setSumReste] = useState(0)
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [total , setTotal] = useState(0)
    const marginTopVal = '200px'
    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };
  
    useEffect(()=>{
            
         const fetchUsers = async () => {
            try {
              const querySnapshot = await getDocs(collection(firestore, 'locataires'));
              const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              console.log('Fetched users: ', usersList);
              setUserData(usersList);
            } catch (error) {
              console.error("Error fetching users: ", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchUsers();
    }, [])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
           if (currentUser) {
                setUser(currentUser)
            console.log('Utilisateur connecté :', currentUser);
            
          } else {
            // Aucun utilisateur n'est connecté
            console.log('Aucun utilisateur connecté');
            navigate('/Login')

           
          }
        });
    
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const fetchFactures = async () => {
          setLoading(true);
          try {
            const facturesRef = collection(firestore, 'factures');
            const querySnapshot = await getDocs(facturesRef);
            const factures = querySnapshot.docs.map(doc => doc.data());
            const currentMonthFactures = getCurrentMonthFactures(factures);
    
            let sum = 0;
            let sumR = 0;
            currentMonthFactures.forEach(data => {
              if (data.montant) {
                sum += parseFloat(data.montant); // Convertir en nombre avant d'additionner
              }
              if (data.reste) {
                sumR += parseFloat(data.reste); // Convertir en nombre avant d'additionner
              }
            });
            setSumMontant(sum);
            setSumReste(sumR)
            setLoading(false)
          } catch (error) {
            console.error("Error fetching factures: ", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFactures();
      }, []);
    
      useEffect(() => {
        const fetchFactures = async () => {
          setLoading(true);
          try {
            const facturesRef = collection(firestore, 'locataires');
            const querySnapshot = await getDocs(facturesRef);
            let sumTotal = 0 ;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.montant_loyer) {
                  sumTotal += parseFloat(data.montant_loyer); // Convertir en nombre avant d'additionner
                }
             
             
            });
            setTotal(sumTotal);
           
          } catch (error) {
            console.error("Error fetching factures: ", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFactures();
      }, []);
    
    return(
   
<SidebarProvider>
    {Loadings === true ? (
            <Loading marginTop={marginTopVal}/>
        ) : (
            <div>
            <div id="wrapper">
                <SideBar  />
            
                    <div id="content-wrapper" class="d-flex flex-column">
    
                        <div id="content">
    
                            <TopBar user={user} />
    
                            <div class="container-fluid">
    
                                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                                    <Link to="/Login" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                            class="fas fa-download fa-sm text-white-50"></i> Generate Report</Link>
                                </div>
    
                                {/* <!-- Content Row --> */}
                                <div class="row">
    
                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div class="col-xl-3 col-md-6 mb-4">
                                        <div class="card border-left-primary shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Recu ce mois</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{sumMontant} FCFA</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div class="col-xl-3 col-md-6 mb-4">
                                        <div class="card border-left-success shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Reste a recevoire</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{parseInt(total - sumMontant - sumReste)} FCFA</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* <!-- Earnings (Monthly) Card Example --> */}
                                    <div class="col-xl-3 col-md-6 mb-4">
                                        <div class="card border-left-info shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Aeré
                                                        </div>
                                                        <div class="row no-gutters align-items-center">
                                                            <div class="col-auto">
                                                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{sumReste} FCFA</div>
                                                            </div>
                                                            <div class="col">
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* <!-- Pending Requests Card Example --> */}
                                    <div class="col-xl-3 col-md-6 mb-4">
                                        <div class="card border-left-warning shadow h-100 py-2">
                                            <div class="card-body">
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col mr-2">
                                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Nombre de locataire</div>
                                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{userData.length}</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                {/* <!-- Content Row --> */}
    
                            
                            </div>
                            {/* <!-- /.container-fluid --> */}
    
                        </div>
                        {/* <!-- End of Main Content --> */}
    
                        {/* <!-- Footer --> */}
                                <Footer/>
                        {/* <!-- End of Footer --> */}
    
                    </div>
            {/* <!-- End of Content Wrapper --> */}
    
        </div>
        {/* <!-- End of Page Wrapper --> */}
    
        {/* <!-- Scroll to Top Button--> */}
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    
        {/* <!-- Logout Modal--> */}
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    
     </div>
        ) }
    
</SidebarProvider>
    );

}
export default Index ;