import caretCircle from '../../assets//imgs/caret-circle-down 1.png'
import { FiBell } from 'react-icons/fi'


export default function Navbar() {

  return (
    <div className="row">
      <div className="col-12">
        {/* <div className="d-flex justify-content-between mx-5">
          <div className='my-2'>
            <img src={caretCircle} alt='caretCircle'  />
          </div>

          <div className='d-flex mx-2 my-2'>
            <input type="text" className={`form-control inputStyle`} placeholder='Enter Email'/>
            
          </div>

        </div> */}

          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <img src={caretCircle} alt='caretCircle' className='mx-5' />
              <form className="d-flex mx-5">
                <input className="form-control me-2 inputStyle" type="search" placeholder="Search" aria-label="Search"/>
                <FiBell className='mt-2' size={ 20 } color={'rgb(212 213 213)'}/>
              </form>
            </div>
        </nav>
      </div>
    </div>
  )
}
