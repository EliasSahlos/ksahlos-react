import Spinner from "../spinner/spinner";
import {useEffect, useState, useMemo} from "react";
import ModalCloseButton from "../shared/buttons/photoModalButtons/closeButton";
import ModalInfoButton from "../shared/buttons/photoModalButtons/infoButton";

function ModalComponent({itemImg, itemDesc, itemTitle, onModalIsClosed}) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isImageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        setImageLoading(true);
    }, [itemImg]);

    function modalCloseHandler() {
        onModalIsClosed();
    }

    const handleImageLoad = () => {
        setImageLoading(false);
    }

    function descriptionButtonClickHandler() {
        setIsDescriptionOpen(!isDescriptionOpen)
    }

    const memoizedImage = useMemo(() => (
        <img
            src={itemImg}
            alt="broken-img"
            style={{objectFit: 'contain', objectPosition: 'center'}}
            onLoad={handleImageLoad}
            className="absolute inset-0 w-full h-full"
        />
    ), [itemImg]);

    return (
        <div className='fixed inset-0 z-10' data-aos='zoom-in'>
            <div className="bg-[#F2F2F2] flex md:flex-row justify-between items-center p-12 w-full h-screen">
                <div className="w-full h-full relative">
                    {isImageLoading &&
                        <div className='flex justify-center items-center w-full h-screen'>
                            <Spinner/>
                        </div>
                    }
                    <div className={!isImageLoading ? "w-full h-full" : "hidden"}>
                        {memoizedImage}
                    </div>
                    {isDescriptionOpen && (
                        <div
                            className="absolute inset-0 bg-white/40 backdrop-blur-md w-full h-full flex justify-center items-center"
                        >
                            <div className='mx-52 mb-24'>
                                <h1 className='text-sm font-semibold text-center my-2'>{itemTitle}</h1>
                                <hr className='mx-32'/>
                                <h1 className='text-sm text-center'>{itemDesc}</h1>
                            </div>
                        </div>
                    )}
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 bottom-2 md:left-8 2xl:left-14 2xl:bottom-5">
                        <ModalCloseButton onModalCloseHandler={modalCloseHandler}/>
                        <ModalInfoButton onDescriptionButtonClickHandler={descriptionButtonClickHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;