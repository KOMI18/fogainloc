import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { SidebarProvider } from "../components/SidebarContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getDocs, collection , docs } from "firebase/firestore";
import { firestore } from "../fireStore";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { Link } from "react-router-dom";
function AllFacture () {
    const [facture , setFacture] = useState([]);
    const [Loadings , setLoading] = useState(true)
    const [searchTerm , setSearchTerm] = useState('')
    useEffect(()=>{
        setLoading(true)
         const fetchUsers = async () => {
            try {
              const querySnapshot = await getDocs(collection(firestore, 'factures'));
              const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              console.log('Fetched users: ', usersList);
              setFacture(usersList);
            } catch (error) {
              console.error("Error fetching users: ", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchUsers();
    }, [])
    console.log(JSON.stringify(facture, null, 2))
   const handleSearch = (term) => {
        setSearchTerm(term)
   }
   const filteredItems = facture.filter(item => 
    item.locataire.toLowerCase().includes(searchTerm.toLowerCase())
   )
   const downloadList = () => {
        const currentDate = new Date().getDate()
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1 ;

        const doc = new jsPDF()
        const tableRows = []
        const tableColumn = ["Nom", "Ville", "Type", "Téléphone", "Loyer", "CNI", "Date paiement"];

        doc.text('TOUTES LES FACTURES' , 20 ,10)
        doc.text(`${currentDate} / ${currentMonth} / ${currentYear}` , 20  , 20)

        filteredItems.forEach(item =>{
            const itemData = [
                item.locataire,
                item.montant,
                item.date,
                item.reste
               
              ];
              tableRows.push(itemData)
        }
            
        )
        doc.autoTable({
            startY : 30,
            head: [tableColumn],
            body: tableRows,
        })
        doc.save('Facture.pdf')
   }
    return(
<SidebarProvider>
{Loadings ===true ? (
        <Loading/>
) : (
 <div>
    <div id="wrapper">
        <SideBar/>

            <div id="content-wrapper" class="d-flex flex-column">
                        <TopBar onSearch={handleSearch}/>
            
                <div id="content">

                
                    <div class="container-fluid">

                      
                        <h1 class="h3 mb-2 text-gray-800">Toutes les Factures</h1>
                    
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">
                                <Link onClick={downloadList} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i class="fas fa-download fa-sm text-white-50"></i> Télécharger
                                 </Link>
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Montant</th>
                                                <th>Date</th>
                                                <th>Reste</th>
                                            

                                            </tr>
                                        </thead>
                                    
                                        <tbody>
                                        {filteredItems.length > 0 ? filteredItems.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.locataire}</td>
                                                <td>{data.montant}</td>
                                                <td>{data.date}</td>

                                                <td>{data.reste}</td>
                                            

                                            </tr>
                                            )) : (
                                            <tr>
                                                <td colSpan="7">Aucune facture trouvé.</td>
                                            </tr>
                                            )}
                                    
                                        
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                   

                </div>
              
                <Footer/>
                

            </div>


    </div>
</div>
)}

</SidebarProvider>
     
    )
}
export default AllFacture ;