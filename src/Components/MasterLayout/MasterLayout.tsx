
import { Outlet } from 'react-router-dom'
import SidebarSec from "../SidebarSec/SidebarSec.tsx"
import Navbar from "../Navbar/Navbar.tsx"

export default function MasterLayout() {
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 d-flex">
            <div>
                <SidebarSec/>
            </div>
            <div className="w-100" style={{ backgroundColor:"#f2f1f1" }} >
                <Navbar/>
                <Outlet/>
            </div>
          </div>

        </div>
    </div>
  )
}
