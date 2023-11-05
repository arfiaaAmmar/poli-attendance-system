import { DeleteControllerItem } from "shared-library/declarations/types";
import { API_BASE_URL } from "shared-library/declarations/constants";
import { makeFirstLetterOfWordUpperCase } from "../helpers/shared-helpers";

/**
 * Handle delete item
 *
 * @param {(string | undefined)} id
 * @param {DeleteControllerItem} type
 */
export const handleDelete = async (id: string | undefined, type: DeleteControllerItem) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-${type}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`${makeFirstLetterOfWordUpperCase(type)} with ID ${id} deleted successfully.`);
    } else {
      console.error(`Failed to delete ${type} with ID ${id}.`);
    }
  } catch (error) {
    console.error(
      `An error occurred while deleting ${type} with ID ${id}.`,
      error
    );
  }
};
