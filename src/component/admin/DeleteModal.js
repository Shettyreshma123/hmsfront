import axios from "axios";
import { toast } from "react-toastify";



const DeleteModal = (id) => {
  // const handleDelete = (id) => {
  if (window.confirm("Do you want to delete this user?")) {
    axios({
      url: `http://localhost:3000/api/hbms/delete_user/${id}`,
      method: "delete",
      headers: {
        auth: localStorage.getItem("access_token"),
      },
    })
      .then((res) => {
        console.log(res);
        toast.success("Item deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete item. Please try again.");
      });
  }
};

export default DeleteModal;
