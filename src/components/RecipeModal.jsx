import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function RecipeModal({ result, onDelete }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(result.id);
    onOpenChange(false);
  };

  const handleEdit = () => {
    navigate(`/add-recipe/${result.id}`);
    onOpenChange(false);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="items-center w-28 my-4 py-2 ml-4 rounded-full bg-[#f22b29] text-white size-10"
      >
        View
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {result.title} <small>~ {result.category}</small>
              </ModalHeader>
              <ModalBody>
                <img
                  src={result.image}
                  alt={result.title}
                  className="max-w-full h-auto"
                />
                <label className="text-black">Ingredients</label>
                <p className="text-gray-600">{result.ingredients.join(", ")}</p>
                <label className="text-black">Instructions</label>
                <p className="text-gray-600">{result.instructions}</p>
                <label className="text-black">Preparation Time</label>
                <p className="text-gray-600">{result.preparationTime}</p>
                <label className="text-black">Cooking Time</label>
                <p className="text-gray-600">{result.cookingTime}</p>
                <label className="text-black">Servings</label>
                <p className="text-gray-600">{result.servings}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={handleEdit}>
                  Edit
                </Button>

                <Button color="danger" variant="light" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
