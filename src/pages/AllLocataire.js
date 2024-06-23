import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { SidebarProvider } from "../components/SidebarContext";
import { useEffect, useState } from "react";
import { getDocs, collection , docs } from "firebase/firestore";
import { firestore } from "../fireStore";
import Footer from "../components/Footer";
function AllLocataire () {
    const [userData , setUserData] = useState([]);
    const [Loading , setLoading] = useState(true)
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
   
    return(
<SidebarProvider>
<div>
            <div id="wrapper">

{/* <!-- Sidebar --> */}
        <SideBar/>

{/* <!-- End of Sidebar --> */}

{/* <!-- Content Wrapper --> */}
<div id="content-wrapper" class="d-flex flex-column">
            <TopBar/>
    {/* <!-- Main Content --> */}
    <div id="content">

      
        <div class="container-fluid">

            {/* <!-- Page Heading --> */}
            <h1 class="h3 mb-2 text-gray-800">Tout les locataires</h1>
           
            {/* <!-- DataTales Example --> */}
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Information</h6>
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
                            {userData.length > 0 ? userData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.firstName}</td>
                                    <td>{data.city}</td>
                                    <td>{data.rentalType}</td>

                                    <td>{data.tel}</td>
                                    <td>{data.montant_loyer || 'N/A'}</td>

                                    <td>{data.numero_cni}</td>
                                    <td>{data.date_paiement || '15 '}</td>

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
        {/* <!-- /.container-fluid --> */}

    </div>
    {/* <!-- End of Main Content --> */}

    {/* <!-- Footer --> */}
            <Footer/>
    {/* <!-- End of Footer --> */}

</div>
{/* <!-- End of Content Wrapper --> */}

</div>
        </div>
</SidebarProvider>
     
    )
}
export default AllLocataire ;