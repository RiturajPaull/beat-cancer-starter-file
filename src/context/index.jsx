import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
} from "react";

import { db } from "../utils/dbConfig";
import { UserSchema, RecordSchema } from "../utils/schema";
import { eq } from "drizzle-orm";
import { Result } from "postcss";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  //get user
  const fetchUser = useCallback(async () => {
    try {
      const response = await db.select().from(UserSchema).execute();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching the user details", error);
    }
  }, []);

  // get userdeatils by email
  const fetchUserByEmail = useCallback(async (email) => {
    try {
      const response = await db
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.createdBy, email));

      if (response.length > 0) {
        setCurrentUser(response[0]);
      }
    } catch (error) {
      console.error("Error fetching the user by email", error);
    }
  }, []);

  // post user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(UserSchema)
        .values(userData)
        .returning()
        .execute();

      setUsers((prevUser) => [...prevUser, newUser[0]]);
      return newUser[0];
    } catch (error) {
      console.error("Error creating the user", error);
      return null;
    }
  }, []);

  //get records

  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(RecordSchema)
        .where(eq(RecordSchema.createdBy, userEmail))
        .execute();

      setRecords(result);
    } catch (error) {
      console.log("Error fetching the records", error);
      return null;
    }
  }, []);

  //post new record

  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(RecordSchema)
        .values(recordData)
        .returning()
        .execute();

      setRecords((prevRecord) => {
        return [...prevRecord, newRecord[0]];
      });
    } catch (error) {
      console.error("Cannot fetch record data", error);
      return null;
    }
  }, []);

  //update record

  const updateRecord = useCallback(async (recordData) => {
    try {
      const [documentID, ...dataToUpdate] = recordData;
      const updatedRecord = await db
        .update(RecordSchema)
        .set(dataToUpdate)
        .where(eq(RecordSchema.id, documentID))
        .returning()
        .execute();

      // if the record id matches with the record id in the records array, update the record in the records array
      setRecords((prevRecord) =>
        prevRecord.map((record) =>
          record.id === documentID ? updateRecord[0] : record,
        ),
      );
    } catch (error) {
      console.error("Error updating the record", error);
      return null;
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        currentUser,
        fetchUser,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        updateRecord,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// custom hook to use this context
export const useStateContext = () => useContext(StateContext);
