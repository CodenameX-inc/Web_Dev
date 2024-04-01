
// "use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import  {AiOutlineClose} from 'react-icons/ai'

function Component() {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteTask = async () => {
    setOpenModal(false)
    // setLoading(true);
    axios
      .delete(`http://localhost:${PORT}/tasks/delete-task/${task.uid}`,{
        headers: {'Authorization':authState.token}
      })
      .then(() => {
        // setLoading(false);
        enqueueSnackbar('Task Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        // setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error.message);
      });
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>

      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteTask}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
