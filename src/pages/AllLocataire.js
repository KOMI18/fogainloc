import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { SidebarProvider } from "../components/SidebarContext";
import { useEffect, useState } from "react";
import { getDocs, collection , docs } from "firebase/firestore";
import { firestore } from "../fireStore";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function AllLocataire () {
    const [userData , setUserData] = useState([]);
    const [searchTerm  , setSearchTerm] = useState('')
    const [Loadings , setLoading] = useState(true)
    const [currentMonth ,setCurrentMonth] = useState (new Date().getMonth() + 1)
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
    console.log(JSON.stringify(userData, null, 2))
   
    const handleSearch = (term) => {
        setSearchTerm(term)
    }
    const filteredItems = userData.filter(item =>
        item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadList = () => {
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const doc = new jsPDF();
    
        doc.text("Table des locataires", 20, 10);
        doc.text(`${currentDay} / ${currentMonth} / ${currentYear}`, 20, 20);

        
        const tableColumn = ["Nom", "MOntant", "Date", "Reste"];
        const tableRows = [];
    
        filteredItems.forEach(item => {
          const itemData = [
            item.firstName,
            item.city,
            item.rentalType,
            item.tel,
            item.montant_loyer || 'N/A',
            item.numero_cni,
            `${item.date_paiement || '15 '}/${currentMonth}`
          ];
          tableRows.push(itemData);
        });
        doc.autoTable({
            startY: 30, // Start after the title and date text
            head: [tableColumn],
            body: tableRows,
          });
        // doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('Liste.pdf');
      };
    
    return(
<SidebarProvider>
{Loadings === true ? (
        <Loading/>
) : (
<div>
    <div id="wrapper">
         <SideBar/>

     
        <div id="content-wrapper" class="d-flex flex-column">
                    <TopBar onSearch={handleSearch}/>
            {/* <!-- Main Content --> */}
            <div id="content">

      
        <div class="container-fluid">

            {/* <!-- Page Heading --> */}
            <h1 class="h3 mb-2 text-gray-800">Tous les locataires</h1>
           
            {/* <!-- DataTales Example --> */}
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
                                    <th>ville</th>
                                    <th>Type</th>
                                    <th>Telephone</th>
                                    <th>Loyer</th>
                                    <th>CNI</th>
                                    <th>Date paiement</th>

                                </tr>
                            </thead>
                           
                            <tbody>
                            {filteredItems.length > 0 ? filteredItems.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.firstName}</td>
                                    <td>{data.city}</td>
                                    <td>{data.rentalType}</td>

                                    <td>{data.tel}</td>
                                    <td>{data.montant_loyer || 'N/A'}</td>

                                    <td>{data.numero_cni}</td>
                                    <td>{data.date_paiement || '15 '}/ {currentMonth}</td>

                                </tr>
                                )) : (
                                <tr>
                                    <td colSpan="7">Aucun locataire trouvé.</td>
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
export default AllLocataire ;