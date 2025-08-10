import { ArrowRight } from 'lucide-react';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LogOutBtn() {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleSignOut = () => {
    Swal.fire({
      title: 'Do You Want To Log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'mx-2 px-4 py-2 bg-blue-500 text-white rounded-lg',
        cancelButton: 'mx-2 px-4 py-2 bg-gray-300 text-black rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            navigate('/'); // Navigate to home after successful logout
          })
          .catch(error => {
            console.error(error);
            // Optionally show error message to user
            Swal.fire({
              title: 'Error!',
              text: 'Failed to log out',
              icon: 'error'
            });
          });
      }
    });
  };

  return (
    <div 
      onClick={handleSignOut} 
      className="group relative cursor-pointer p-2 w-32 border bg-white rounded-full overflow-hidden text-black text-center font-semibold"
    >
      <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block">
        LogOut
      </span>
      <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
        <span>LogOut</span>
        <ArrowRight />
      </div>
      <div className="absolute top-[40%] left-[20%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%]"></div>
    </div>
  );
}

export default LogOutBtn;