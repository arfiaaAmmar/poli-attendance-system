import { API_BASE_URL } from "shared-library/src/declarations/constants";
import { firstLetterUppercase } from "../helpers/shared-helpers";
import { DeleteControllerItem } from "shared-library/src/declarations/types";

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
      console.log(`${firstLetterUppercase(type)} with ID ${id} deleted successfully.`);
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
