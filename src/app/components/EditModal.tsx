"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface PasteData {
    [key: string]: string;
}

interface EditProps {
    paste: {
        title: string;
        type: string;
        pub_date: string;
        exp_date: string;
    };
}

const EditModal: React.FC<EditProps> = ({ paste }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pasteData, setPasteData] = useState<PasteData>({});

    // change lables when we determine what needs to be editable
    const labels = {
        title: "Title",
        type: "Type",
        pub_date: "Publication Date",
        exp_date: "Experation Date",
    };

    useEffect(() => {
        if (paste) {
            setPasteData(paste);
            openModal();
        }
    }, [paste]);

    const handleInputChange = (label: string, value: string) => {
        setPasteData({
            ...pasteData,
            [label]: value,
        });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic for api call to edit paste
        closeModal();
    };

    const modalStyles: Modal.Styles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            borderRadius: "20px",
            width: "50%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Modal"
                style={modalStyles}
            >
                <form
                    className="mx-auto"
                    style={{ width: "80%" }}
                    onSubmit={handleSubmit}
                >
                    <div className="mt-5 grid grid-cols-2 gap-4">
                        {Object.entries(labels).map(([key, labelText]) => (
                            <div className="mb-5" key={key}>
                                <label
                                    htmlFor={key}
                                    className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700"
                                >
                                    {labelText}
                                </label>
                                <input
                                    type="text"
                                    id={key}
                                    value={pasteData[key] || ""}
                                    onChange={(e) =>
                                        handleInputChange(key, e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder={`Enter ${labelText}`}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 flex justify-center">
                        <button
                            className="mx-auto h-10 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditModal;
