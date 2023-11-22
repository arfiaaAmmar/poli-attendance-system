import { useCallback, useEffect, useState } from "react";
import {
  CurrentUser,
  Notification,
} from "shared-library/src/declarations/types";
import { postNotification } from "../api/notification-api";

/**
 * Format timestamp according to locale
 *
 * @param {number} timestamp
 * @returns {string}
 */
export const timeStampFormatter = (timestamp: number | string | null) => {
  const data = new Date(timestamp!);
  if (typeof timestamp === "string") parseInt(timestamp);
  const date = data.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = data.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return {
    date: date,
    time: time,
  };
};

/**
 * Sends notification to student or admin
 *
 * @param {string} receiverId
 * @param {string} title
 * @param {string} remarks
 */
export const sendNotification = async (
  receiverId: string,
  title: string,
  remarks: string
) => {
  try {
    const currentUserData: CurrentUser = JSON.parse(
      sessionStorage.getItem("userData")!
    );
    await postNotification({
      sender: currentUserData._id!,
      receiver: receiverId,
      userType: currentUserData.userType,
      title,
      remarks,
      isRead: false,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handle fetch response
 *
 * @param {Response} response
 * @return {any}
 */
export const handleFetchResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

/**
 * Determine what values are considered empty or default
 *
 * @param {Record<string, any>} obj
 * @return {boolean}
 */
export const isEmpty = (value: any): boolean =>
  value === "" ||
  value === "" ||
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0);

// TODO: Not yet working
/**
 * Check if object properties are 'empty' or 'default'
 *
 * @param {Record<string, any>} obj
 * @return {boolean}
 */
export const isEmptyObject = (obj: Record<string, any>): boolean =>
  Object.values(obj).some((value) => isEmpty(value));

// TODO: Not yet working
/**
 * To return default empty object properties
 *
 * @param {T} obj
 * @param {Partial<T>} overrides
 * @return {T}
 */
// export const createDefaultObj = <T extends Record<string, any>>(
//   obj: T,
//   overrides: Partial<T>
// ): T => {
//   const defaults = {} as T;

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       switch (typeof obj[key]) {
//         case "string":
//           defaults[key] = "" as any;
//           break;
//         case "number":
//           defaults[key] = null as any;
//           break;
//         case "object":
//           if (obj[key] === null) defaults[key] = null as any;
//           if (key in overrides) defaults[key] = overrides[key];
//           if (Array.isArray(obj[key])) defaults[key] = [] as any;
//           else defaults[key] = {} as any;
//           break;
//         case "boolean":
//           defaults[key] = false as any;
//           break;
//         // Add more cases for other types as needed
//         default:
//           defaults[key] = {} as any;
//           break;
//       }
//     }
//   }

//   return { ...defaults, ...obj, ...overrides };
// };

/**
 * A generic handleChange function for objects
 *
 * @param {any} e
 * @return {void}
 */
export const handleInputChange = <T>(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setState((prevData) => ({ ...prevData, [name]: value }));
};

// /**
//  * Handles file input change
//  *
//  * @param {React.ChangeEvent<HTMLInputElement>} e
//  */
// const handleInputChange =
//   <T>(state: FormState<T>, setState: Dispatch<SetStateAction<FormState<T>>>) =>
//   (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value, type } = e.target;

//     if (type === "checkbox") {
//       setState({
//         ...state,
//         [name]: (e.target as HTMLInputElement).checked,
//       });
//     } else {
//       setState({
//         ...state,
//         [name]: value,
//       });
//     }
//   };

/**
 * Helper function for creating data fetching hooks.
 *
 * @template T
 * @param {(() => Promise<T | null>)} fetchFunction
 * @return {*}
 */
export const useDataFetching = <T>(fetchFunction: () => Promise<T | null>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const memoizedFetchFunction = useCallback(fetchFunction, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await memoizedFetchFunction();
      if (result !== null) {
        setData(result);
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [memoizedFetchFunction]);

  return { data, isLoading, error, refetch };
};

// STRING RELATED FUNCTIONS

export const truncateText = (txt: string, maxLength: number): string => {
  if (txt.length <= maxLength) {
    return txt;
  } else {
    return txt.substring(0, maxLength) + "...";
  }
};

export const firstLetterUppercase = (txt: string) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};
