
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Outlet/>
        </div>
      </div>
    </div>
    
  )
}
