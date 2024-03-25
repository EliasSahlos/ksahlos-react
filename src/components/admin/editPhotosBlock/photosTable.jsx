import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useState} from "react";
import DeleteModal from "../../modal/deleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tooltip} from "@mui/material";
import InfoAlert from "../../shared/alerts/info/infoAlert";
import EditModal from "../../modal/editModal";

function PhotosTable({photos, imageCategory}) {
    //Modal Open-Close
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    //Modal info
    const [selectedUID, setSelectedUID] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedNumber, setSelectedNumber] = useState(null);
    //Deletion-Edit Alert
    const [isDocDeleted, setIsDocDeleted] = useState(false);
    const [docDeletionMessage, setDocDeletionMessage] = useState("");
    const [isDocEdited, setIsDocEdited] = useState(false);
    const [docEditedMessage, setDocEditedMessage] = useState("");

    function handleDeleteModalOpen() {
        setIsDeleteModalOpen(true);
    }

    function handleDeleteModalClose() {
        setIsDeleteModalOpen(false);
    }

    function docDeletionCompleted(message) {
        setDocDeletionMessage(message);
        setIsDocDeleted(true);
        setIsDeleteModalOpen(false);
    }

    function handleEditModalClose() {
        setIsEditModalOpen(false);
    }

    function handleEditModalOpen() {
        setIsEditModalOpen(true);
    }

    function docEditCompleted(message) {
        setDocEditedMessage(message);
        setIsDocEdited(true);
        setIsEditModalOpen(false);
    }

    return (
        <div>
            {isDocEdited &&
                <div className='my-4'><InfoAlert message={docEditedMessage}/></div>
            }
            {isDocDeleted &&
                <div className='my-4'><InfoAlert message={docDeletionMessage}/></div>}
            <TableContainer className="max-h-[500px] overflow-y-scroll">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {photos.map((photo) => (
                            <TableRow key={photo.uid}>
                                <TableCell>
                                    <img src={photo.url} alt='broken-img' height={40} width={40}/>
                                </TableCell>
                                <TableCell align="center">{photo.title}</TableCell>
                                <TableCell align="center">{photo.desc.slice(0, 60)}..</TableCell>
                                <TableCell align="center">{photo.number}</TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Edit">
                                        <EditIcon
                                            className="mx-2 cursor-pointer hover:text-green-500"
                                            onClick={() => {
                                                handleEditModalOpen();
                                                setSelectedUID(photo.uid);
                                                setSelectedTitle(photo.title);
                                                setSelectedDescription(photo.desc);
                                                setSelectedNumber(photo.number);
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <DeleteIcon
                                            className="mx-2 cursor-pointer hover:text-red-500"
                                            onClick={() => {
                                                handleDeleteModalOpen();
                                                setSelectedUID(photo.uid);
                                                setSelectedTitle(photo.title);
                                            }}
                                        />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isDeleteModalOpen && (
                <DeleteModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    onHandleDeleteModalClose={handleDeleteModalClose}
                    onDocDeletionComplete={docDeletionCompleted}
                    imageCategory={imageCategory}
                    selectedUID={selectedUID}
                    selectedTitle={selectedTitle}
                />
            )}
            {isEditModalOpen && (
                <EditModal
                    isEditModalOpen={isEditModalOpen}
                    onModalCloseHandler={handleEditModalClose}
                    onDocEditComplete={docEditCompleted}
                    selectedUID={selectedUID}
                    imageCategory={imageCategory}
                    selectedTitle={selectedTitle}
                    selectedDescription={selectedDescription}
                    selectedNumber={selectedNumber}
                />
            )}
        </div>
    );
}

export default PhotosTable;
